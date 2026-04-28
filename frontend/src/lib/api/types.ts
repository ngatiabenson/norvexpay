export type TxStatus = "succeeded" | "pending" | "failed" | "refunded";

export type TxMethod = "bank_transfer" | "mpesa" | "card" | "paypal";

export type Transaction = {
  id: string;
  createdAt: string; // ISO string
  customer: {
    name: string;
    email: string;
  };
  method: TxMethod;
  currency: "KES" | "USD" | "EUR";
  amount: number; // minor units not enforced here; keep simple for UI scaffold
  fee: number;
  status: TxStatus;
  reference: string;
};

export type Summary = {
  totalPayments: number;
  refunds: number;
  settlements: number;
};

export type RevenuePoint = {
  date: string; // YYYY-MM-DD
  revenue: number;
};

