import { Schema, model, type InferSchemaType } from "mongoose";

const allocationItem = new Schema(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    amount: { type: Number, required: true, min: 0 },
    spent: { type: Number, default: 0, min: 0 }
  },
  { _id: false }
);

const budgetFormulaSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    rule: { type: String, enum: ["50_30_20", "70_20_10", "60_20_20", "80_20", "ZERO_BASED", "PAY_YOURSELF_FIRST", "CUSTOM"], required: true },
    allocations: { type: [allocationItem], required: true },
    isSystem: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const budgetCycleSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    salary: { type: Number, required: true, min: 0 },
    salaryCreditDay: { type: Number, required: true, min: 1, max: 31 },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    status: { type: String, enum: ["active", "closed"], default: "active" },
    resetMode: { type: String, enum: ["manual", "automatic"], default: "automatic" }
  },
  { timestamps: true }
);

const budgetAllocationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cycleId: { type: Schema.Types.ObjectId, ref: "BudgetCycle", required: true },
    formulaId: { type: Schema.Types.ObjectId, ref: "BudgetFormula", required: true },
    items: { type: [allocationItem], required: true }
  },
  { timestamps: true }
);

export type BudgetFormula = InferSchemaType<typeof budgetFormulaSchema>;
export type BudgetCycle = InferSchemaType<typeof budgetCycleSchema>;
export type BudgetAllocation = InferSchemaType<typeof budgetAllocationSchema>;
export const BudgetFormulaModel = model("BudgetFormula", budgetFormulaSchema);
export const BudgetCycleModel = model("BudgetCycle", budgetCycleSchema);
export const BudgetAllocationModel = model("BudgetAllocation", budgetAllocationSchema);
