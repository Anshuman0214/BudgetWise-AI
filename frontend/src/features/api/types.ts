export interface AuthResponse { accessToken: string; refreshToken: string; user: { id: string; name: string; email: string } }
export interface BudgetItem { key: string; label: string; percentage: number; amount: number; spent: number }
export interface Dashboard {
  salary: number;
  budgetAllocation: BudgetItem[];
  spendingAnalytics: Array<{ category: string; amount: number; spentAt: string }>;
  remainingBudget: number;
  savingsProgress: number;
  investmentProjectedValue: number;
  financialHealthScore: number;
}
