import { BaseRepository } from "../../core/baseRepository.js";
import { BudgetAllocationModel, BudgetCycleModel, BudgetFormulaModel, type BudgetAllocation, type BudgetCycle, type BudgetFormula } from "./budget.model.js";

export class BudgetFormulaRepository extends BaseRepository<BudgetFormula> { constructor() { super(BudgetFormulaModel); } }
export class BudgetCycleRepository extends BaseRepository<BudgetCycle> { constructor() { super(BudgetCycleModel); } }
export class BudgetAllocationRepository extends BaseRepository<BudgetAllocation> { constructor() { super(BudgetAllocationModel); } }
