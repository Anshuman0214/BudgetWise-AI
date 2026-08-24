import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { createExpense, deleteExpense, listExpenses, updateExpense } from "./expense.controller.js";
import { expenseSchema } from "./expense.validation.js";

export const expenseRoutes = Router();
expenseRoutes.use(requireAuth);
expenseRoutes.get("/", listExpenses);
expenseRoutes.post("/", validate(expenseSchema), createExpense);
expenseRoutes.patch("/:id", updateExpense);
expenseRoutes.delete("/:id", deleteExpense);
