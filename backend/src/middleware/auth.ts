import jwt from "jsonwebtoken";
import type { NextFunction, Response } from "express";
import { env } from "../config/env.js";
import type { AuthRequest, AuthUser } from "../core/types.js";
import { HttpError } from "../core/httpError.js";

export const requireAuth = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) throw new HttpError(401, "Authentication required");

  try {
    req.user = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthUser;
    next();
  } catch {
    throw new HttpError(401, "Invalid or expired token");
  }
};
