import cron from "node-cron";
import { BudgetCycleModel } from "../features/budgets/budget.model.js";
import { BudgetService } from "../features/budgets/budget.service.js";
import { logger } from "./logger.js";

export const startCronJobs = () => {
  cron.schedule("10 0 * * *", async () => {
    const today = new Date().getDate();
    const cycles = await BudgetCycleModel.find({ status: "active", resetMode: "automatic", salaryCreditDay: today });
    const service = new BudgetService();
    await Promise.all(cycles.map((cycle) => service.createCycle(String(cycle.userId), {
      salary: cycle.salary,
      salaryCreditDay: cycle.salaryCreditDay,
      resetMode: "automatic",
      formulaRule: "50_30_20"
    })));
    if (cycles.length) logger.info("Automatic budget resets completed", { count: cycles.length });
  });
};
