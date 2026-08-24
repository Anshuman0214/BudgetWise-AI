import { Schema, model, type InferSchemaType } from "mongoose";

const expenseSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cycleId: { type: Schema.Types.ObjectId, ref: "BudgetCycle", required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    merchant: String,
    notes: String,
    spentAt: { type: Date, required: true, default: Date.now }
  },
  { timestamps: true }
);

export type Expense = InferSchemaType<typeof expenseSchema>;
export const ExpenseModel = model("Expense", expenseSchema);
