// Centralized API client for backend communication with JWT handling
import { Task } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Backend response types
interface BackendResponse<T> {
  data: T;
}

interface TasksResponse {
  tasks: Task[];
}

interface TaskResponse {
  task: Task;
}

interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

class ApiClient {
  private baseUrl: string;
  private cache = new Map<string, { data: any; timestamp: number }>();
  private CACHE_TTL = 30000; // 30 seconds cache

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const method = options.method || 'GET';

    // Check cache for GET requests only
    if (method === 'GET') {
      const cached = this.cache.get(endpoint);
      if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
        return { data: cached.data, status: 200 };
      }
    }

    // Get JWT token from wherever it's stored (localStorage, cookies, etc.)
    // This will depend on how Better Auth stores the token
    const token = localStorage.getItem('better-auth-token') ||
                  (typeof window !== 'undefined' ? (window as any).betterAuth?.getToken?.() : null);

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Handle 401 Unauthorized - token is invalid or expired
        if (response.status === 401) {
          // Clear the token from localStorage
          if (typeof window !== 'undefined') {
            localStorage.removeItem('better-auth-token');
          }

          // Redirect to login page
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }

        return {
          error: responseData.detail || `HTTP error! status: ${response.status}`,
          status: response.status,
        };
      }

      // Cache successful GET responses
      if (method === 'GET') {
        this.cache.set(endpoint, { data: responseData, timestamp: Date.now() });
      } else {
        // Invalidate cache on mutations (POST, PUT, PATCH, DELETE)
        this.cache.clear();
      }

      return {
        data: responseData,
        status: response.status,
      };
    } catch (error) {
      console.error('API Request error:', error);
      return {
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0,
      };
    }
  }

  // Authentication endpoints
  async register(email: string, password: string, name?: string) {
    return this.request<BackendResponse<AuthResponse>>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async login(email: string, password: string) {
    return this.request<BackendResponse<AuthResponse>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request<BackendResponse<{}>>('/auth/logout', {
      method: 'POST',
    });
  }

  // Task endpoints
  async getTasks(completed?: boolean) {
    const queryParams = completed !== undefined ? `?completed=${completed}` : '';
    return this.request<BackendResponse<TasksResponse>>(`/tasks${queryParams}`);
  }

  async getTask(id: string) {
    return this.request<BackendResponse<TaskResponse>>(`/tasks/${id}`);
  }

  async createTask(title: string, description?: string) {
    return this.request<BackendResponse<TaskResponse>>('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
    });
  }

  async updateTask(id: string, updates: { title?: string; description?: string; completed?: boolean }) {
    return this.request<BackendResponse<TaskResponse>>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteTask(id: string) {
    return this.request<BackendResponse<{ message: string }>>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  async toggleTaskCompletion(id: string) {
    return this.request<BackendResponse<TaskResponse>>(`/tasks/${id}/toggle`, {
      method: 'PATCH',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default ApiClient;