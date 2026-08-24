import type { Response } from "express";
import type { AuthRequest } from "../../core/types.js";
import { BudgetService } from "./budget.service.js";

const service = new BudgetService();

export const setSalary = async (req: AuthRequest, res: Response) => res.status(201).json(await service.createCycle(req.user!.id, req.body));
export const getActiveBudget = async (req: AuthRequest, res: Response) => res.json(await service.active(req.user!.id));
export const manualReset = async (req: AuthRequest, res: Response) => res.status(201).json(await service.createCycle(req.user!.id, req.body));
