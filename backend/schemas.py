
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Response wrappers to match frontend expectations
class APIResponse(BaseModel):
    success: bool
    data: Optional[dict] = None
    error: Optional[str] = None
    statusCode: int

# Task schemas
class TaskRequest(BaseModel):
    title: str
    description: Optional[str] = None
    dueDate: Optional[datetime] = None

class TaskResponse(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    completed: bool
    userId: str
    createdAt: datetime
    updatedAt: datetime
    dueDate: Optional[datetime] = None

class TasksResponse(BaseModel):
    tasks: List[TaskResponse]

class TaskUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    dueDate: Optional[datetime] = None

# User schema (for compatibility with frontend expectations)
class UserResponse(BaseModel):
    id: str
    email: str
    name: Optional[str] = None
    createdAt: datetime
    updatedAt: datetime