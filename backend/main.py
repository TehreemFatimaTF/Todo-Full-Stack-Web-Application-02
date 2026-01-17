from dotenv import load_dotenv

# Load environment variables FIRST before any other imports
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import create_db_and_tables
from routes import auth, tasks
import os

# Create FastAPI app
app = FastAPI(
    title="Todo API",
    description="Backend API for Todo Web Application",
    version="1.0.0"
)

# Configure CORS
origins = [
    "http://localhost:3000",  # Frontend development server
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with /api prefix
app.include_router(auth.router, prefix="/api", tags=["Authentication"])
app.include_router(tasks.router, prefix="/api", tags=["Tasks"])

# Create database tables on startup
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Root endpoint
@app.get("/")
def read_root():
    return {
        "message": "Todo API is running",
        "version": "1.0.0",
        "docs": "/docs"
    }

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy"}
