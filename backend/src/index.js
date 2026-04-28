import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { healthRouter } from "./routes/health.js";
import { authRouter } from "./routes/auth.js";
import { meRouter } from "./routes/me.js";
import { transactionsRouter } from "./routes/transactions.js";
import { paymentsRouter } from "./routes/payments.js";
import { paymentsProcessRouter } from "./routes/paymentsProcess.js";
import { sequelize, PaymentOption } from "./models/index.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  return res.json({ ok: true, service: "norvexpay-backend" });
});

app.use("/api", healthRouter);
app.use("/api", authRouter);
app.use("/api", meRouter);
app.use("/api", transactionsRouter);
app.use("/api", paymentsRouter);
app.use("/api", paymentsProcessRouter);

async function start() {
  await sequelize.sync();

  // Seed payment options (idempotent-ish for scaffold).
  const defaults = [
    { code: "bank_transfer", displayName: "Bank Transfer", enabled: true },
    { code: "mpesa", displayName: "M-Pesa", enabled: true },
    { code: "card", displayName: "Card", enabled: true },
    { code: "paypal", displayName: "PayPal", enabled: true },
  ];
  for (const opt of defaults) {
    // eslint-disable-next-line no-await-in-loop
    await PaymentOption.findOrCreate({ where: { code: opt.code }, defaults: opt });
  }

  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Norvex Pay API listening on http://localhost:${env.PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server", err);
  process.exit(1);
});

