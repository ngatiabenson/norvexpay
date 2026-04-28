import axios from "axios";
import { env } from "../config/env.js";

function paypalBase() {
  const mode = env.PAYPAL_ENV ?? "sandbox";
  return mode === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
}

async function getPaypalAccessToken() {
  if (!env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET) return null;
  const auth = Buffer.from(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`).toString(
    "base64"
  );
  const res = await axios.post(
    `${paypalBase()}/v1/oauth2/token`,
    new URLSearchParams({ grant_type: "client_credentials" }).toString(),
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return res.data?.access_token ?? null;
}

/**
 * Creates a PayPal order (capture later via webhook or capture endpoint).
 */
export async function processPaypalOrder({ amount, currency, reference }) {
  const token = await getPaypalAccessToken();
  if (!token) {
    return {
      provider: "paypal",
      mode: "mock",
      status: "created",
      reference,
      orderId: "PAYPAL_ORDER_MOCK",
      approveUrl: "https://www.sandbox.paypal.com/checkoutnow?token=PAYPAL_ORDER_MOCK",
    };
  }

  const res = await axios.post(
    `${paypalBase()}/v2/checkout/orders`,
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: reference,
          amount: { currency_code: currency.toUpperCase(), value: String(amount) },
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const approve = (res.data?.links ?? []).find((l) => l.rel === "approve")?.href ?? null;

  return {
    provider: "paypal",
    mode: "live",
    status: res.data?.status ?? "created",
    reference,
    orderId: res.data?.id,
    approveUrl: approve,
  };
}

