import type { RevenuePoint, Summary, Transaction } from "./types";

export const mockSummary: Summary = {
  totalPayments: 1284300,
  refunds: 48200,
  settlements: 892500,
};

export const mockRevenue: RevenuePoint[] = [
  { date: "2026-04-01", revenue: 54000 },
  { date: "2026-04-05", revenue: 62000 },
  { date: "2026-04-09", revenue: 59000 },
  { date: "2026-04-13", revenue: 68000 },
  { date: "2026-04-17", revenue: 72000 },
  { date: "2026-04-21", revenue: 76000 },
  { date: "2026-04-25", revenue: 83000 },
];

export const mockTransactions: Transaction[] = [
  {
    id: "tx_10294",
    createdAt: "2026-04-27T18:20:11.000Z",
    customer: { name: "Amina N.", email: "amina@example.com" },
    method: "mpesa",
    currency: "KES",
    amount: 12850,
    fee: 185,
    status: "succeeded",
    reference: "INV-94021",
  },
  {
    id: "tx_10293",
    createdAt: "2026-04-27T16:01:43.000Z",
    customer: { name: "Neptune Stores", email: "billing@neptune.co" },
    method: "card",
    currency: "USD",
    amount: 249,
    fee: 6.2,
    status: "succeeded",
    reference: "ORD-33881",
  },
  {
    id: "tx_10292",
    createdAt: "2026-04-27T14:44:02.000Z",
    customer: { name: "Kariuki W.", email: "kariuki@example.com" },
    method: "bank_transfer",
    currency: "KES",
    amount: 56000,
    fee: 0,
    status: "pending",
    reference: "BNK-11902",
  },
  {
    id: "tx_10291",
    createdAt: "2026-04-26T20:22:37.000Z",
    customer: { name: "Greenfield Ltd", email: "finance@greenfield.io" },
    method: "paypal",
    currency: "EUR",
    amount: 129,
    fee: 4.1,
    status: "refunded",
    reference: "RF-22011",
  },
  {
    id: "tx_10290",
    createdAt: "2026-04-26T12:11:19.000Z",
    customer: { name: "Marta S.", email: "marta@example.com" },
    method: "card",
    currency: "USD",
    amount: 79,
    fee: 2.3,
    status: "failed",
    reference: "ORD-33855",
  },
];

