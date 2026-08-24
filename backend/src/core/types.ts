import type { Request } from "express";

export type Id = string;
export type BudgetRule = "50_30_20" | "70_20_10" | "60_20_20" | "80_20" | "ZERO_BASED" | "PAY_YOURSELF_FIRST" | "CUSTOM";
export type ExpenseCategory = "housing" | "utilities" | "food" | "transport" | "health" | "insurance" | "debt" | "entertainment" | "shopping" | "education" | "travel" | "savings" | "investment" | "other";
export type InvestmentType = "sip" | "mutual_fund" | "stock" | "fixed_deposit" | "real_estate" | "emergency_fund" | "retirement";
export type ReportPeriod = "monthly" | "quarterly" | "annual";

export interface AuthUser {
  id: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
