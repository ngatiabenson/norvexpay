import Stripe from "stripe";
import { env } from "../config/env.js";

function getStripe() {
  if (!env.STRIPE_SECRET_KEY) return null;
  return new Stripe(env.STRIPE_SECRET_KEY);
}

/**
 * Creates a Stripe PaymentIntent (card payments).
 * Frontend later can confirm it using Stripe.js.
 */
export async function processStripeCardPayment({
  amount,
  currency,
  reference,
  customerEmail,
}) {
  const stripe = getStripe();
  if (!stripe) {
    return {
      provider: "stripe",
      mode: "mock",
      status: "requires_payment_method",
      clientSecret: "pi_mock_client_secret",
      reference,
    };
  }

  // Stripe expects amount in the smallest currency unit for most currencies.
  // This scaffold assumes amount is already in minor units for KES/USD/EUR when wired properly.
  const intent = await stripe.paymentIntents.create({
    amount: Math.round(amount),
    currency: currency.toLowerCase(),
    description: `Norvex Pay - ${reference}`,
    receipt_email: customerEmail || undefined,
    metadata: { reference },
    automatic_payment_methods: { enabled: true },
  });

  return {
    provider: "stripe",
    mode: "live",
    status: intent.status,
    paymentIntentId: intent.id,
    clientSecret: intent.client_secret,
    reference,
  };
}

