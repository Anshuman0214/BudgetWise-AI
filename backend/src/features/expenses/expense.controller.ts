import type { Response } from "express";
import type { AuthRequest } from "../../core/types.js";
import { ExpenseModel } from "./expense.model.js";
import { BudgetAllocationModel } from "../budgets/budget.model.js";

export const listExpenses = async (req: AuthRequest, res: Response) => res.json(await ExpenseModel.find({ userId: req.user!.id }).sort({ spentAt: -1 }));
export const createExpense = async (req: AuthRequest, res: Response) => {
  const expense = await ExpenseModel.create({ ...req.body, userId: req.user!.id });
  await BudgetAllocationModel.updateOne(
    { userId: req.user!.id, cycleId: req.body.cycleId, "items.key": req.body.category },
    { $inc: { "items.$.spent": req.body.amount } }
  );
  res.status(201).json(expense);
};
export const updateExpense = async (req: AuthRequest, res: Response) => res.json(await ExpenseModel.findOneAndUpdate({ _id: req.params.id, userId: req.user!.id }, req.body, { new: true }));
export const deleteExpense = async (req: AuthRequest, res: Response) => { await ExpenseModel.findOneAndDelete({ _id: req.params.id, userId: req.user!.id }); res.status(204).send(); };
