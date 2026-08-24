import type { Response } from "express";
import type { AuthRequest } from "../../core/types.js";
import { UserModel } from "./user.model.js";

export const getProfile = async (req: AuthRequest, res: Response) => {
  const user = await UserModel.findById(req.user!.id).select("-passwordHash -resetPasswordTokenHash");
  res.json(user);
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const user = await UserModel.findByIdAndUpdate(req.user!.id, req.body, { new: true, runValidators: true }).select("-passwordHash -resetPasswordTokenHash");
  res.json(user);
};
