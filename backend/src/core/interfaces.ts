import type { BudgetRule, ExpenseCategory, InvestmentType, ReportPeriod } from "./types.js";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  phone?: string;
  currency: string;
}

export interface IBudgetFormula {
  userId?: string;
  name: string;
  rule: BudgetRule;
  allocations: IBudgetAllocationItem[];
  isSystem: boolean;
}

export interface IBudgetCycle {
  userId: string;
  salary: number;
  salaryCreditDay: number;
  startsAt: Date;
  endsAt: Date;
  status: "active" | "closed";
  resetMode: "manual" | "automatic";
}

export interface IBudgetAllocationItem {
  key: string;
  label: string;
  percentage: number;
  amount: number;
  spent: number;
}

export interface IExpense {
  userId: string;
  cycleId: string;
  category: ExpenseCategory | string;
  amount: number;
  merchant?: string;
  notes?: string;
  spentAt: Date;
}

export interface IInvestmentPlan {
  userId: string;
  type: InvestmentType;
  name: string;
  principal: number;
  monthlyContribution: number;
  expectedAnnualReturn: number;
  horizonMonths: number;
  targetAmount?: number;
}

export interface IInvestmentTransaction {
  userId: string;
  planId: string;
  type: "buy" | "sell" | "dividend" | "interest" | "deposit" | "withdrawal";
  amount: number;
  units?: number;
  transactionAt: Date;
}

export interface IFinancialReport {
  userId: string;
  period: ReportPeriod;
  startsAt: Date;
  endsAt: Date;
  summary: Record<string, number | undefined>;
}
