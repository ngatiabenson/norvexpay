import express from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { Transaction } from "../models/index.js";

export const transactionsRouter = express.Router();

const QuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

transactionsRouter.get("/transactions", requireAuth, async (req, res) => {
  const parsed = QuerySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: "invalid_query" });

  const { limit } = parsed.data;
  const userId = req.user.sub;

  const rows = await Transaction.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
    limit,
  });

  return res.json({
    transactions: rows.map((t) => ({
      id: t.id,
      createdAt: t.createdAt,
      reference: t.reference,
      currency: t.currency,
      amount: Number(t.amount),
      fee: Number(t.fee),
      method: t.method,
      status: t.status,
      customer: { name: t.customerName, email: t.customerEmail },
    })),
  });
});

