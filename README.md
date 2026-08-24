# BudgetWise AI

A production-grade MERN personal finance platform for salary-based budgeting, expense tracking, investment planning, analytics, and reports.

## Stack

- Frontend: React, TypeScript, Tailwind CSS, Shadcn-style UI primitives, Redux Toolkit, RTK Query, React Hook Form, Zod, Recharts
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, Bcrypt, Swagger, Cron
- Quality: Clean Architecture, Repository Pattern, Zod validation, centralized error handling, logging, unit and integration tests

## Quick Start

```bash
docker compose up --build
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000  
Swagger: http://localhost:5000/api/docs

## Local Development

```bash
cd backend
cp .env.example .env
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

## Architecture

```text
BudgetWise-AI/
  backend/
    src/
      config/
      core/
      features/
        auth/
        users/
        salary/
        budgets/
        expenses/
        investments/
        dashboard/
        reports/
      infrastructure/
      tests/
  frontend/
    src/
      app/
      components/
      features/
      lib/
      pages/
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guidance.
