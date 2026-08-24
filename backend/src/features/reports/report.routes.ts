import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { createReport, exportExcel, exportPdf, listReports } from "./report.controller.js";
import { reportSchema } from "./report.validation.js";

export const reportRoutes = Router();
reportRoutes.use(requireAuth);
reportRoutes.get("/", listReports);
reportRoutes.post("/", validate(reportSchema), createReport);
reportRoutes.get("/:id/pdf", exportPdf);
reportRoutes.get("/:id/excel", exportExcel);
