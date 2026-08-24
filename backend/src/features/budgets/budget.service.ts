import type { BudgetRule } from "../../core/types.js";
import { HttpError } from "../../core/httpError.js";
import { BudgetAllocationModel, BudgetCycleModel, BudgetFormulaModel } from "./budget.model.js";

const formulaMap: Record<Exclude<BudgetRule, "CUSTOM" | "ZERO_BASED">, Array<{ key: string; label: string; percentage: number }>> = {
  "50_30_20": [{ key: "needs", label: "Needs", percentage: 50 }, { key: "wants", label: "Wants", percentage: 30 }, { key: "savings", label: "Savings", percentage: 20 }],
  "70_20_10": [{ key: "living", label: "Living Expenses", percentage: 70 }, { key: "savings", label: "Savings", percentage: 20 }, { key: "giving", label: "Giving/Debt", percentage: 10 }],
  "60_20_20": [{ key: "essentials", label: "Essentials", percentage: 60 }, { key: "savings", label: "Savings", percentage: 20 }, { key: "personal", label: "Personal", percentage: 20 }],
  "80_20": [{ key: "spending", label: "Spending", percentage: 80 }, { key: "savings", label: "Savings", percentage: 20 }],
  PAY_YOURSELF_FIRST: [{ key: "savings", label: "Savings First", percentage: 25 }, { key: "expenses", label: "Expenses", percentage: 75 }]
};

export class BudgetService {
  buildAllocations(salary: number, rule: BudgetRule, custom?: Array<{ key: string; label: string; percentage: number }>) {
    const source = rule === "CUSTOM" || rule === "ZERO_BASED" ? custom : formulaMap[rule];
    if (!source?.length) throw new HttpError(400, "Allocations are required for this budget rule");
    const total = source.reduce((sum, item) => sum + item.percentage, 0);
    if (Math.round(total) !== 100) throw new HttpError(400, "Budget allocation percentages must equal 100");
    return source.map((item) => ({ ...item, amount: Number(((salary * item.percentage) / 100).toFixed(2)), spent: 0 }));
  }

  async createCycle(userId: string, input: { salary: number; salaryCreditDay: number; resetMode: "manual" | "automatic"; formulaRule: BudgetRule; customAllocations?: Array<{ key: string; label: string; percentage: number }> }) {
    await BudgetCycleModel.updateMany({ userId, status: "active" }, { status: "closed" });
    const now = new Date();
    const startsAt = new Date(now.getFullYear(), now.getMonth(), input.salaryCreditDay);
    const endsAt = new Date(startsAt.getFullYear(), startsAt.getMonth() + 1, input.salaryCreditDay - 1, 23, 59, 59);
    const allocations = this.buildAllocations(input.salary, input.formulaRule, input.customAllocations);
    const formula = await BudgetFormulaModel.create({ userId, name: input.formulaRule, rule: input.formulaRule, allocations });
    const cycle = await BudgetCycleModel.create({ userId, salary: input.salary, salaryCreditDay: input.salaryCreditDay, startsAt, endsAt, resetMode: input.resetMode });
    const budgetAllocation = await BudgetAllocationModel.create({ userId, cycleId: cycle.id, formulaId: formula.id, items: allocations });
    return { cycle, formula, budgetAllocation };
  }

  async active(userId: string) {
    const cycle = await BudgetCycleModel.findOne({ userId, status: "active" }).sort({ createdAt: -1 });
    const allocation = cycle ? await BudgetAllocationModel.findOne({ userId, cycleId: cycle.id }) : null;
    return { cycle, allocation };
  }
}
