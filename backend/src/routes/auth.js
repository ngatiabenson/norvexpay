import express from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import { issueJwt } from "../middleware/auth.js";

export const authRouter = express.Router();

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

authRouter.post("/auth/signup", async (req, res) => {
  const parsed = SignupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_body" });

  const { email, password } = parsed.data;
  const existing = await User.findOne({ where: { email } });
  if (existing) return res.status(409).json({ error: "email_in_use" });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ email, passwordHash, role: "merchant" });

  const token = issueJwt(user);
  return res.status(201).json({
    token,
    tokenType: "Bearer",
    user: { id: user.id, email: user.email, role: user.role },
  });
});

authRouter.post("/auth/login", async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_body" });

  const { email, password } = parsed.data;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: "invalid_credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "invalid_credentials" });

  const token = issueJwt(user);
  return res.json({
    token,
    tokenType: "Bearer",
    user: { id: user.id, email: user.email, role: user.role },
  });
});

