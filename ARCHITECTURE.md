# BudgetWise AI Architecture

## Folder Structure

```text
backend/src
  config               environment and MongoDB setup
  core                 shared types, interfaces, base repository, HTTP errors
  features/auth        register, login, forgot password, reset password
  features/users       profile management
  features/budgets     salary, budget formulas, cycles, allocations
  features/expenses    expense CRUD and budget utilization
  features/investments investment plans, transactions, calculators
  features/dashboard   analytics summary
  features/reports     monthly, quarterly, annual reports, PDF, Excel
  infrastructure       logging and cron jobs
  middleware           auth, validation, security, errors
  tests                unit and integration tests

frontend/src
  app                  Redux store and typed hooks
  components           application shell and UI primitives
  features/api         RTK Query API and shared DTOs
  features/auth        auth slice
  pages                route-level pages
  lib                  shared utilities
```

## MongoDB Collections

- `User`
- `BudgetFormula`
- `BudgetCycle`
- `BudgetAllocation`
- `Expense`
- `InvestmentPlan`
- `InvestmentTransaction`
- `FinancialReport`

Schemas live in `backend/src/features/**/**.model.ts`. Explicit TypeScript interfaces live in `backend/src/core/interfaces.ts`.

## API Routes

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`
- `GET /api/v1/users/me`
- `PATCH /api/v1/users/me`
- `GET /api/v1/budgets/active`
- `POST /api/v1/budgets/salary`
- `POST /api/v1/budgets/reset`
- `GET /api/v1/expenses`
- `POST /api/v1/expenses`
- `PATCH /api/v1/expenses/:id`
- `DELETE /api/v1/expenses/:id`
- `GET /api/v1/investments`
- `POST /api/v1/investments`
- `POST /api/v1/investments/calculate`
- `GET /api/v1/dashboard`
- `GET /api/v1/reports`
- `POST /api/v1/reports`
- `GET /api/v1/reports/:id/pdf`
- `GET /api/v1/reports/:id/excel`

Swagger UI is mounted at `/api/docs`.

## Budget Formulas

The backend supports:

- 50/30/20 Rule
- 70/20/10 Rule
- 60/20/20 Rule
- 80/20 Rule
- Zero-Based Budget
- Pay Yourself First
- Custom Budget

Formula allocation logic lives in `backend/src/features/budgets/budget.service.ts`.

## Redux Architecture

- `frontend/src/app/store.ts` configures Redux Toolkit.
- `frontend/src/features/api/apiSlice.ts` owns RTK Query endpoints, auth headers, cache tags, and invalidation.
- `frontend/src/features/auth/authSlice.ts` stores the current user and access token.

## Testing

- Backend unit tests cover budget allocation and investment projection services.
- Backend integration tests cover auth registration and login with MongoDB Memory Server.
- Frontend unit test covers dashboard rendering with a mocked RTK Query hook.

## Production Notes

- Use MongoDB Atlas or a managed MongoDB-compatible service.
- Rotate JWT secrets through your cloud secret manager.
- Send password reset tokens through a transactional email provider before production launch.
- Replace local token persistence with httpOnly refresh-token cookies for higher-security deployments.
- Add object storage if report artifacts should be persisted instead of streamed.
