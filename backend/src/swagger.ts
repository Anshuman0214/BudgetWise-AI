import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "BudgetWise AI API", version: "1.0.0" },
    servers: [{ url: "/api/v1" }],
    components: {
      securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } }
    },
    security: [{ bearerAuth: [] }],
    paths: {
      "/auth/register": { post: { tags: ["Auth"], summary: "Register user", security: [], responses: { "201": { description: "Registered" } } } },
      "/auth/login": { post: { tags: ["Auth"], summary: "Login user", security: [], responses: { "200": { description: "Authenticated" } } } },
      "/auth/forgot-password": { post: { tags: ["Auth"], summary: "Request password reset", security: [], responses: { "200": { description: "Reset requested" } } } },
      "/auth/reset-password": { post: { tags: ["Auth"], summary: "Reset password", security: [], responses: { "204": { description: "Password updated" } } } },
      "/users/me": { get: { tags: ["Users"], summary: "Get profile", responses: { "200": { description: "Profile" } } }, patch: { tags: ["Users"], summary: "Update profile", responses: { "200": { description: "Profile updated" } } } },
      "/budgets/salary": { post: { tags: ["Budgets"], summary: "Create salary budget cycle", responses: { "201": { description: "Budget cycle created" } } } },
      "/budgets/active": { get: { tags: ["Budgets"], summary: "Get active budget", responses: { "200": { description: "Active budget" } } } },
      "/budgets/reset": { post: { tags: ["Budgets"], summary: "Manual budget reset", responses: { "201": { description: "Budget reset" } } } },
      "/expenses": { get: { tags: ["Expenses"], summary: "List expenses", responses: { "200": { description: "Expenses" } } }, post: { tags: ["Expenses"], summary: "Create expense", responses: { "201": { description: "Expense created" } } } },
      "/investments": { get: { tags: ["Investments"], summary: "List investment plans", responses: { "200": { description: "Plans" } } }, post: { tags: ["Investments"], summary: "Create investment plan", responses: { "201": { description: "Plan created" } } } },
      "/investments/calculate": { post: { tags: ["Investments"], summary: "Calculate projection", responses: { "200": { description: "Projection" } } } },
      "/dashboard": { get: { tags: ["Dashboard"], summary: "Get dashboard analytics", responses: { "200": { description: "Dashboard" } } } },
      "/reports": { get: { tags: ["Reports"], summary: "List reports", responses: { "200": { description: "Reports" } } }, post: { tags: ["Reports"], summary: "Create report", responses: { "201": { description: "Report created" } } } },
      "/reports/{id}/pdf": { get: { tags: ["Reports"], summary: "Export PDF", responses: { "200": { description: "PDF file" } } } },
      "/reports/{id}/excel": { get: { tags: ["Reports"], summary: "Export Excel", responses: { "200": { description: "Excel file" } } } }
    }
  },
  apis: ["src/**/*.routes.ts"]
});
