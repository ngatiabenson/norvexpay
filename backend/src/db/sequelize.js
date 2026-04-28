import { Sequelize } from "sequelize";
import { env } from "../config/env.js";

export const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: "postgres",
  logging: env.NODE_ENV === "development" ? false : false,
});

export async function dbHealthcheck() {
  try {
    await sequelize.authenticate();
    return true;
  } catch {
    return false;
  }
}

