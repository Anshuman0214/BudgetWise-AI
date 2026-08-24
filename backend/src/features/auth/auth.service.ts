import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.js";
import { HttpError } from "../../core/httpError.js";
import { UserModel } from "../users/user.model.js";

const signTokens = (payload: { id: string; email: string; role: "user" | "admin" }) => ({
  accessToken: jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"] }),
  refreshToken: jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"] })
});

export class AuthService {
  async register(input: { name: string; email: string; password: string }) {
    const existing = await UserModel.findOne({ email: input.email });
    if (existing) throw new HttpError(409, "Email already registered");
    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await UserModel.create({ name: input.name, email: input.email, passwordHash });
    return { user: this.publicUser(user), ...signTokens({ id: user.id, email: user.email, role: user.role }) };
  }

  async login(input: { email: string; password: string }) {
    const user = await UserModel.findOne({ email: input.email });
    if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) throw new HttpError(401, "Invalid credentials");
    return { user: this.publicUser(user), ...signTokens({ id: user.id, email: user.email, role: user.role }) };
  }

  async forgotPassword(email: string) {
    const user = await UserModel.findOne({ email });
    const token = crypto.randomBytes(32).toString("hex");
    if (user) {
      user.resetPasswordTokenHash = crypto.createHash("sha256").update(token).digest("hex");
      user.resetPasswordExpiresAt = new Date(Date.now() + env.PASSWORD_RESET_EXPIRES_MINUTES * 60_000);
      await user.save();
    }
    return { resetToken: env.NODE_ENV === "production" ? undefined : token };
  }

  async resetPassword(token: string, password: string) {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = await UserModel.findOne({ resetPasswordTokenHash: tokenHash, resetPasswordExpiresAt: { $gt: new Date() } });
    if (!user) throw new HttpError(400, "Invalid or expired reset token");
    user.passwordHash = await bcrypt.hash(password, 12);
    user.resetPasswordTokenHash = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
  }

  private publicUser(user: { _id: unknown; name: string; email: string; role: string; currency?: string }) {
    return { id: String(user._id), name: user.name, email: user.email, role: user.role, currency: user.currency };
  }
}
