import { Schema, model, type InferSchemaType } from "mongoose";

const investmentPlanSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["sip", "mutual_fund", "stock", "fixed_deposit", "real_estate", "emergency_fund", "retirement"], required: true },
    name: { type: String, required: true },
    principal: { type: Number, required: true, min: 0 },
    monthlyContribution: { type: Number, default: 0, min: 0 },
    expectedAnnualReturn: { type: Number, required: true, min: 0 },
    horizonMonths: { type: Number, required: true, min: 1 },
    targetAmount: { type: Number, min: 0 }
  },
  { timestamps: true }
);

const investmentTransactionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    planId: { type: Schema.Types.ObjectId, ref: "InvestmentPlan", required: true },
    type: { type: String, enum: ["buy", "sell", "dividend", "interest", "deposit", "withdrawal"], required: true },
    amount: { type: Number, required: true, min: 0 },
    units: Number,
    transactionAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export type InvestmentPlan = InferSchemaType<typeof investmentPlanSchema>;
export type InvestmentTransaction = InferSchemaType<typeof investmentTransactionSchema>;
export const InvestmentPlanModel = model("InvestmentPlan", investmentPlanSchema);
export const InvestmentTransactionModel = model("InvestmentTransaction", investmentTransactionSchema);
