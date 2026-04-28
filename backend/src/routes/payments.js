import express from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { Transaction } from "../models/index.js";

export const paymentsRouter = express.Router();

const CreatePaymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3).default("KES"),
  method: z.enum(["bank_transfer", "mpesa", "card", "paypal"]),
  reference: z.string().min(3).max(64),
  customer: z
    .object({
      name: z.string().min(1).max(120).optional(),
      email: z.string().email().optional(),
    })
    .optional(),
});

paymentsRouter.post("/payments", requireAuth, async (req, res) => {
  const parsed = CreatePaymentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_body" });

  const userId = req.user.sub;
  const { amount, currency, method, reference, customer } = parsed.data;

  // For scaffold: create a "pending" transaction record.
  // Later: integrate provider rails + webhooks, then update status.
  const tx = await Transaction.create({
    userId,
    amount,
    fee: 0,
    currency,
    method,
    status: "pending",
    reference,
    customerName: customer?.name ?? null,
    customerEmail: customer?.email ?? null,
  });

  return res.status(201).json({
    payment: {
      id: tx.id,
      status: tx.status,
      reference: tx.reference,
      amount: Number(tx.amount),
      currency: tx.currency,
      method: tx.method,
      createdAt: tx.createdAt,
    },
  });
});

