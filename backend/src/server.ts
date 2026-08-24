import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
import { createApp } from "./app.js";
import { logger } from "./infrastructure/logger.js";
import { startCronJobs } from "./infrastructure/cron.js";

await connectDatabase();
startCronJobs();

createApp().listen(env.PORT, () => {
  logger.info(`BudgetWise AI API listening on port ${env.PORT}`);
});
