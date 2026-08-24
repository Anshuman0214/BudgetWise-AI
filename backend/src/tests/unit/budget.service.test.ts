import { BudgetService } from "../../features/budgets/budget.service.js";

describe("BudgetService", () => {
  it("creates 50/30/20 allocations", () => {
    const allocations = new BudgetService().buildAllocations(100000, "50_30_20");
    expect(allocations).toEqual([
      expect.objectContaining({ key: "needs", amount: 50000 }),
      expect.objectContaining({ key: "wants", amount: 30000 }),
      expect.objectContaining({ key: "savings", amount: 20000 })
    ]);
  });
});
