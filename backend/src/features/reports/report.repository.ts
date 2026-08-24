import { BaseRepository } from "../../core/baseRepository.js";
import { FinancialReportModel, type FinancialReport } from "./report.model.js";

export class FinancialReportRepository extends BaseRepository<FinancialReport> {
  constructor() {
    super(FinancialReportModel);
  }
}
