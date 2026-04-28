import axios from "axios";
import { env } from "../config/env.js";

function baseUrl() {
  const mode = env.MPESA_ENV ?? "sandbox";
  return mode === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";
}

async function getAccessToken() {
  if (!env.MPESA_CONSUMER_KEY || !env.MPESA_CONSUMER_SECRET) return null;
  const auth = Buffer.from(`${env.MPESA_CONSUMER_KEY}:${env.MPESA_CONSUMER_SECRET}`).toString(
    "base64"
  );
  const res = await axios.get(`${baseUrl()}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  return res.data?.access_token ?? null;
}

function timestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return (
    d.getFullYear() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  );
}

function stkPassword(ts) {
  if (!env.MPESA_SHORTCODE || !env.MPESA_PASSKEY) return null;
  return Buffer.from(`${env.MPESA_SHORTCODE}${env.MPESA_PASSKEY}${ts}`).toString("base64");
}

/**
 * Initiates an STK Push request.
 * phone should be in MSISDN format (e.g., 2547XXXXXXXX).
 */
export async function processMpesaStkPush({ amount, reference, phone }) {
  const token = await getAccessToken();
  const ts = timestamp();
  const password = stkPassword(ts);

  if (!token || !password || !env.MPESA_SHORTCODE || !env.MPESA_CALLBACK_URL) {
    return {
      provider: "mpesa",
      mode: "mock",
      status: "pending",
      reference,
      checkoutRequestId: "ws_CO_mock",
      customerMessage: "STK push initiated (mock).",
    };
  }

  const res = await axios.post(
    `${baseUrl()}/mpesa/stkpush/v1/processrequest`,
    {
      BusinessShortCode: env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: ts,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(amount),
      PartyA: phone,
      PartyB: env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: env.MPESA_CALLBACK_URL,
      AccountReference: reference,
      TransactionDesc: `Norvex Pay - ${reference}`,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return {
    provider: "mpesa",
    mode: "live",
    status: "pending",
    reference,
    merchantRequestId: res.data?.MerchantRequestID,
    checkoutRequestId: res.data?.CheckoutRequestID,
    responseCode: res.data?.ResponseCode,
    customerMessage: res.data?.CustomerMessage,
  };
}

