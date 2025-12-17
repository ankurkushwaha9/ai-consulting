# AI Request Desk

## Overview

AI Request Desk is a centralized SaaS platform for managing AI-related requests across an organization. It allows employees from various departments (Sales, Marketing, Product, Engineering, etc.) to submit, track, and manage AI initiative requests through a structured workflow. The platform includes role-based access control with three user types: submitters (regular employees), reviewers (AI team members), and admins.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Build Tool**: Vite with React plugin
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ES modules)
- **Session Management**: Express sessions with PostgreSQL session store
- **Authentication**: Passport.js with local strategy (username/password)
- **Password Security**: Scrypt hashing with timing-safe comparison

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Migrations**: Drizzle Kit with `db:push` command

### Key Design Patterns
- **Monorepo Structure**: Client code in `/client`, server in `/server`, shared types in `/shared`
- **API Design**: RESTful endpoints under `/api/*` prefix
- **Authentication Flow**: Session-based auth with protected routes
- **Role-Based Access**: Three roles (submitter, reviewer, admin) with middleware enforcement

### Request Workflow States
Requests flow through: `pending` → `in_progress` → `completed` or `rejected`

## External Dependencies

### Database
- PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- connect-pg-simple for session storage

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Minimum 32 characters for session encryption

### Key NPM Packages
- **UI**: @radix-ui/* components, lucide-react icons, embla-carousel
- **Forms**: react-hook-form, @hookform/resolvers, zod
- **Data**: @tanstack/react-query, drizzle-orm, drizzle-zod
- **Auth**: passport, passport-local, express-session
- **Utilities**: date-fns, class-variance-authority, clsx, tailwind-merge