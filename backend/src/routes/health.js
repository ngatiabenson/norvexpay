import express from "express";
import { dbHealthcheck } from "../db/sequelize.js";

export const healthRouter = express.Router();

healthRouter.get("/health", async (req, res) => {
  let dbOk = false;
  try {
    dbOk = await dbHealthcheck();
  } catch {
    dbOk = false;
  }

  return res.json({
    ok: true,
    service: "norvexpay-backend",
    db: dbOk ? "ok" : "down",
    ts: new Date().toISOString(),
  });
});

