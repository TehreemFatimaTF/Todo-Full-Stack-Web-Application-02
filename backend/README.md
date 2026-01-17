# Todo Web Application Backend

Backend API for the Todo Web Application built with FastAPI, SQLModel, and PostgreSQL.

## Features

- JWT-based authentication verification using Better Auth shared secret
- User-isolated task management with persistent storage in Neon PostgreSQL
- Full CRUD operations for tasks
- Secure access control ensuring users can only access their own data

## Technology Stack

- **Language**: Python 3.11+
- **Framework**: FastAPI
- **ORM**: SQLModel
- **Database**: Neon Serverless PostgreSQL
- **Auth**: JWT verification using Better Auth secret

## Installation

1. Install the required dependencies:
```bash
pip install -r requirements.txt
```

2. Set up your environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Environment Variables

- `BETTER_AUTH_SECRET`: Secret key used to verify JWT tokens issued by Better Auth
- `DATABASE_URL`: PostgreSQL connection string for Neon database

## Running the Application

Start the development server:
```bash
uvicorn main:app --reload --port 8000
```

## API Endpoints

All API endpoints are protected by JWT authentication and follow the pattern:
- `GET    /api/{user_id}/tasks` - Get all tasks for a user
- `POST   /api/{user_id}/tasks` - Create a new task for a user
- `GET    /api/{user_id}/tasks/{id}` - Get a specific task
- `PUT    /api/{user_id}/tasks/{id}` - Update a specific task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a specific task
- `PATCH  /api/{user_id}/tasks/{id}/complete` - Toggle task completion status

## Security Features

- JWT tokens issued by Better Auth are verified using the shared secret
- All requests require valid JWT authentication
- Users can only access their own data
- Cross-user data access is prevented