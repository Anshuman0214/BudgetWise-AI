import { Schema, model, type InferSchemaType } from "mongoose";

const financialReportSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    period: { type: String, enum: ["monthly", "quarterly", "annual"], required: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    summary: {
      salary: Number,
      totalSpent: Number,
      totalSaved: Number,
      investmentProjectedValue: Number,
      financialHealthScore: Number
    }
  },
  { timestamps: true }
);

export type FinancialReport = InferSchemaType<typeof financialReportSchema>;
export const FinancialReportModel = model("FinancialReport", financialReportSchema);
