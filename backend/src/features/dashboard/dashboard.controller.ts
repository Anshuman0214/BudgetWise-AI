import type { Response } from "express";
import type { AuthRequest } from "../../core/types.js";
import { BudgetAllocationModel, BudgetCycleModel } from "../budgets/budget.model.js";
import { ExpenseModel } from "../expenses/expense.model.js";
import { InvestmentPlanModel } from "../investments/investment.model.js";
import { InvestmentCalculator } from "../investments/investment.service.js";

export const getDashboard = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const cycle = await BudgetCycleModel.findOne({ userId, status: "active" }).sort({ createdAt: -1 });
  const allocation = cycle ? await BudgetAllocationModel.findOne({ userId, cycleId: cycle.id }) : null;
  const expenses = cycle ? await ExpenseModel.find({ userId, cycleId: cycle.id }) : [];
  const plans = await InvestmentPlanModel.find({ userId });
  const calculator = new InvestmentCalculator();
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const salary = cycle?.salary ?? 0;
  const investmentProjectedValue = plans.reduce((sum, plan) => sum + calculator.futureValue(plan), 0);
  const savingsRate = salary ? Math.max(0, (salary - totalSpent) / salary) : 0;
  const utilization = salary ? totalSpent / salary : 0;
  const financialHealthScore = Math.round(Math.min(100, savingsRate * 60 + (1 - Math.min(utilization, 1)) * 25 + (plans.length ? 15 : 0)));

  res.json({
    salary,
    budgetAllocation: allocation?.items ?? [],
    spendingAnalytics: expenses,
    remainingBudget: Math.max(0, salary - totalSpent),
    savingsProgress: Number((savingsRate * 100).toFixed(2)),
    investmentProjectedValue,
    financialHealthScore
  });
};
