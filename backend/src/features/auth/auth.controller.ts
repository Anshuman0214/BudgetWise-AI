import type { RequestHandler } from "express";
import { AuthService } from "./auth.service.js";

const service = new AuthService();

export const register: RequestHandler = async (req, res, next) => {
  try { res.status(201).json(await service.register(req.body)); } catch (error) { next(error); }
};
export const login: RequestHandler = async (req, res, next) => {
  try { res.json(await service.login(req.body)); } catch (error) { next(error); }
};
export const forgotPassword: RequestHandler = async (req, res, next) => {
  try { res.json(await service.forgotPassword(req.body.email)); } catch (error) { next(error); }
};
export const resetPassword: RequestHandler = async (req, res, next) => {
  try { await service.resetPassword(req.body.token, req.body.password); res.status(204).send(); } catch (error) { next(error); }
};
