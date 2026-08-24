import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { getActiveBudget, manualReset, setSalary } from "./budget.controller.js";
import { salarySchema } from "./budget.validation.js";

export const budgetRoutes = Router();
budgetRoutes.use(requireAuth);
budgetRoutes.get("/active", getActiveBudget);
budgetRoutes.post("/salary", validate(salarySchema), setSalary);
budgetRoutes.post("/reset", validate(salarySchema), manualReset);
