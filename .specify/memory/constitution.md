<!-- Sync Impact Report:
Version change: 1.0.0 → 1.1.0
Modified principles: All principles updated to match the new specification
Added sections: Detailed sections for each principle category
Removed sections: Previous generic principles
Templates requiring updates: ✅ Updated
Follow-up TODOs: None
-->
# Todo Full-Stack Web Application (Phase II: Full-Stack Multi-User Todo Web Application) Constitution

## Core Principles

### Spec-First Development
All implementation decisions must be driven by specifications located in /specs. No feature should be implemented without aligning with an existing or updated spec.

### Security by Default
All backend APIs must be protected via JWT-based authentication. No unauthenticated access is allowed to any task-related endpoint.

### User Data Isolation
Each user must only be able to access, modify, or delete their own tasks. Task ownership must be enforced at the database and API layer.

### Separation of Concerns
Frontend, backend, database, and authentication logic must be clearly separated while remaining interoperable within a monorepo structure.

### Deterministic Behavior
Given the same inputs (JWT, request payload), the system must behave predictably and consistently.

## Technology Standards

### Frontend
- Next.js 16+ using App Router
- TypeScript
- Tailwind CSS
- Better Auth for authentication
- API access via a centralized API client

### Backend
- Python FastAPI
- SQLModel ORM
- JWT verification middleware
- RESTful API design

### Database
- Neon Serverless PostgreSQL
- Persistent storage for all tasks
- Indexed user-based filtering

### Spec System
- GitHub Spec-Kit Plus
- Claude Code for implementation
- Structured specs under /specs directory

## Authentication & Authorization Standards

### Authentication Handling
- Authentication is handled exclusively on the frontend using Better Auth.
- Better Auth must be configured to issue JWT tokens.
- JWT tokens must include user identity (user_id, email).

### API Request Requirements
- All frontend API requests must include:
  Authorization: Bearer <JWT_TOKEN>

### Backend Security Requirements
- Backend must verify JWT signature using shared secret
- Reject invalid or expired tokens with 401 Unauthorized
- Extract authenticated user_id from JWT
- Never trust user_id sent from frontend request body or URL

### Shared Secret Configuration
- Environment variable: BETTER_AUTH_SECRET
- Must be identical in frontend and backend environments

## Database Schema Requirements

### User Table
- id: string (primary key)
- email: string (unique, required)
- password_hash: string (required)
- created_at: timestamp
- updated_at: timestamp

### Task Table
- id: string (primary key)
- user_id: string (foreign key, required)
- title: string (1–200 chars, required)
- description: text (optional, max 1000 chars)
- completed: boolean (default false)
- created_at: timestamp
- updated_at: timestamp

### Indexes
- tasks.user_id
- tasks.completed

## Monorepo & Documentation Rules

### Monorepo Structure
- /frontend → Next.js application
- /backend → FastAPI application
- /specs → All specifications
- /.spec-kit → Spec-Kit configuration
- CLAUDE.md files at root, frontend, and backend levels

### Documentation Requirements
- Claude Code must read Root CLAUDE.md for global context
- Read feature-specific specs before implementation
- Follow frontend and backend CLAUDE.md rules

## Project Constraints

### Implementation Scope
- Transform existing console-based Todo application into a modern, secure, multi-user full-stack web application
- Support persistent storage, authenticated users, and strict data isolation per user
- Follow spec-driven development methodology

### Architecture Requirements
- All features must comply with the technology standards specified
- Database schema must match the defined structure exactly
- Authentication must be implemented using Better Auth with JWT

### Quality Standards
- Zero tolerance for cross-user data access
- All API endpoints must be properly secured
- Proper error handling and validation for all inputs

## Governance

### Amendment Procedure
- All changes to this constitution must follow the spec-driven development process
- Major changes require review and approval from project stakeholders
- Version increments follow semantic versioning (MAJOR.MINOR.PATCH)

### Versioning Policy
- MAJOR: Backward incompatible governance/principle removals or redefinitions
- MINOR: New principle/section added or materially expanded guidance
- PATCH: Clarifications, wording, typo fixes, non-semantic refinements

### Compliance Review
- Regular reviews to ensure implementation aligns with constitutional principles
- All pull requests must be validated against constitutional requirements
- Non-compliant implementations will be rejected until alignment is achieved

**Version**: 1.1.0 | **Ratified**: 2026-01-11 | **Last Amended**: 2026-01-11