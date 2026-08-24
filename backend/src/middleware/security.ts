import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

export const helmetMiddleware = helmet();
export const corsMiddleware = cors({ origin: env.CLIENT_URL, credentials: true });
export const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 });
