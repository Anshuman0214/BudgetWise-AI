import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { apiLimiter, corsMiddleware, helmetMiddleware } from "./middleware/security.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { apiRoutes } from "./routes.js";
import { swaggerSpec } from "./swagger.js";

export const createApp = () => {
  const app = express();
  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(apiLimiter);
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("combined"));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/v1", apiRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
};
