import PDFDocument from "pdfkit";
import XLSX from "xlsx";
import type { Response } from "express";
import type { AuthRequest } from "../../core/types.js";
import { FinancialReportModel } from "./report.model.js";
import { ExpenseModel } from "../expenses/expense.model.js";

const rangeFromPeriod = (period: "monthly" | "quarterly" | "annual") => {
  const now = new Date();
  const monthOffset = period === "monthly" ? 1 : period === "quarterly" ? 3 : 12;
  return { startsAt: new Date(now.getFullYear(), now.getMonth() - monthOffset + 1, 1), endsAt: now };
};

export const createReport = async (req: AuthRequest, res: Response) => {
  const { period } = req.body as { period: "monthly" | "quarterly" | "annual" };
  const { startsAt, endsAt } = rangeFromPeriod(period);
  const expenses = await ExpenseModel.find({ userId: req.user!.id, spentAt: { $gte: startsAt, $lte: endsAt } });
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const report = await FinancialReportModel.create({ userId: req.user!.id, period, startsAt, endsAt, summary: { totalSpent } });
  res.status(201).json(report);
};

export const listReports = async (req: AuthRequest, res: Response) => res.json(await FinancialReportModel.find({ userId: req.user!.id }).sort({ createdAt: -1 }));

export const exportPdf = async (req: AuthRequest, res: Response) => {
  const report = await FinancialReportModel.findOne({ _id: req.params.id, userId: req.user!.id });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=budgetwise-report.pdf");
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.fontSize(20).text("BudgetWise AI Financial Report");
  doc.moveDown().fontSize(12).text(JSON.stringify(report?.summary ?? {}, null, 2));
  doc.end();
};

export const exportExcel = async (req: AuthRequest, res: Response) => {
  const report = await FinancialReportModel.findOne({ _id: req.params.id, userId: req.user!.id });
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet([report?.summary ?? {}]);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Summary");
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", "attachment; filename=budgetwise-report.xlsx");
  res.send(buffer);
};
