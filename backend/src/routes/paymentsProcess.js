import express from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { Transaction } from "../models/index.js";
import { processStripeCardPayment } from "../services/stripeService.js";
import { processMpesaStkPush } from "../services/mpesaService.js";
import { processPaypalOrder } from "../services/paypalService.js";

export const paymentsProcessRouter = express.Router();

const ProcessSchema = z.object({
  method: z.enum(["card", "mpesa", "paypal"]),
  amount: z.number().positive(),
  currency: z.string().length(3).default("KES"),
  reference: z.string().min(3).max(64),
  customer: z
    .object({
      name: z.string().min(1).max(120).optional(),
      email: z.string().email().optional(),
    })
    .optional(),
  mpesa: z
    .object({
      phone: z.string().min(10).max(15),
    })
    .optional(),
});

paymentsProcessRouter.post("/payments/process", requireAuth, async (req, res) => {
  const parsed = ProcessSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_body" });

  const userId = req.user.sub;
  const { method, amount, currency, reference, customer, mpesa } = parsed.data;

  // Ensure a transaction exists for dashboard queries later.
  const tx = await Transaction.create({
    userId,
    amount,
    fee: 0,
    currency,
    method: method === "card" ? "card" : method,
    status: "pending",
    reference,
    customerName: customer?.name ?? null,
    customerEmail: customer?.email ?? null,
  });

  let providerResult;
  if (method === "card") {
    providerResult = await processStripeCardPayment({
      amount,
      currency,
      reference,
      customerEmail: customer?.email,
    });
  } else if (method === "mpesa") {
    if (!mpesa?.phone) return res.status(400).json({ error: "mpesa_phone_required" });
    providerResult = await processMpesaStkPush({ amount, reference, phone: mpesa.phone });
  } else {
    providerResult = await processPaypalOrder({ amount, currency, reference });
  }

  return res.status(201).json({
    transaction: {
      id: tx.id,
      status: tx.status,
      reference: tx.reference,
      amount: Number(tx.amount),
      currency: tx.currency,
      method: tx.method,
      createdAt: tx.createdAt,
    },
    provider: providerResult,
  });
});

