import { BaseRepository } from "../../core/baseRepository.js";
import { InvestmentPlanModel, InvestmentTransactionModel, type InvestmentPlan, type InvestmentTransaction } from "./investment.model.js";

export class InvestmentPlanRepository extends BaseRepository<InvestmentPlan> { constructor() { super(InvestmentPlanModel); } }
export class InvestmentTransactionRepository extends BaseRepository<InvestmentTransaction> { constructor() { super(InvestmentTransactionModel); } }
