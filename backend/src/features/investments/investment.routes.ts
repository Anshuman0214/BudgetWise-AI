import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { calculateProjection, createPlan, listPlans } from "./investment.controller.js";
import { investmentPlanSchema } from "./investment.validation.js";

export const investmentRoutes = Router();
investmentRoutes.use(requireAuth);
investmentRoutes.get("/", listPlans);
investmentRoutes.post("/", validate(investmentPlanSchema), createPlan);
investmentRoutes.post("/calculate", validate(investmentPlanSchema.pick({ body: true })), calculateProjection);
