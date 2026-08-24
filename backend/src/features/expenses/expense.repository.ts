import { BaseRepository } from "../../core/baseRepository.js";
import { ExpenseModel, type Expense } from "./expense.model.js";

export class ExpenseRepository extends BaseRepository<Expense> {
  constructor() {
    super(ExpenseModel);
  }
}
