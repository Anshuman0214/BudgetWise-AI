import type { Response } from "express";
import type { AuthRequest } from "../../core/types.js";
import { InvestmentPlanModel } from "./investment.model.js";
import { InvestmentCalculator } from "./investment.service.js";

const calculator = new InvestmentCalculator();

export const listPlans = async (req: AuthRequest, res: Response) => res.json(await InvestmentPlanModel.find({ userId: req.user!.id }));
export const createPlan = async (req: AuthRequest, res: Response) => res.status(201).json(await InvestmentPlanModel.create({ ...req.body, userId: req.user!.id }));
export const calculateProjection = async (req: AuthRequest, res: Response) => res.json({ projectedValue: calculator.futureValue(req.body) });
