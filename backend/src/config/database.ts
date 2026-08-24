import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../infrastructure/logger.js";

export const connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.MONGO_URI);
  logger.info("MongoDB connected");
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
};
