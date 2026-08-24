import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { getProfile, updateProfile } from "./user.controller.js";
import { updateProfileSchema } from "./user.validation.js";

export const userRoutes = Router();
userRoutes.use(requireAuth);
userRoutes.get("/me", getProfile);
userRoutes.patch("/me", validate(updateProfileSchema), updateProfile);
