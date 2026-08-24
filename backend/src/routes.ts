import { Router } from "express";
import { authRoutes } from "./features/auth/auth.routes.js";
import { budgetRoutes } from "./features/budgets/budget.routes.js";
import { dashboardRoutes } from "./features/dashboard/dashboard.routes.js";
import { expenseRoutes } from "./features/expenses/expense.routes.js";
import { investmentRoutes } from "./features/investments/investment.routes.js";
import { reportRoutes } from "./features/reports/report.routes.js";
import { userRoutes } from "./features/users/user.routes.js";

export const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/users", userRoutes);
apiRoutes.use("/budgets", budgetRoutes);
apiRoutes.use("/expenses", expenseRoutes);
apiRoutes.use("/investments", investmentRoutes);
apiRoutes.use("/dashboard", dashboardRoutes);
apiRoutes.use("/reports", reportRoutes);
