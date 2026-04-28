import type { RevenuePoint, Summary, Transaction } from "./types";
import { mockRevenue, mockSummary, mockTransactions } from "./mockData";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ?? "http://localhost:4000/api";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

/**
 * API surface for wiring the dashboard later.
 * For now, it returns mock data by default.
 */
export const api = {
  async getSummary(): Promise<Summary> {
    if (process.env.NEXT_PUBLIC_USE_MOCKS !== "false") return mockSummary;
    return http<Summary>("/merchant/summary");
  },
  async getRevenueTrend(): Promise<RevenuePoint[]> {
    if (process.env.NEXT_PUBLIC_USE_MOCKS !== "false") return mockRevenue;
    return http<RevenuePoint[]>("/merchant/revenue-trend");
  },
  async listRecentTransactions(): Promise<Transaction[]> {
    if (process.env.NEXT_PUBLIC_USE_MOCKS !== "false") return mockTransactions;
    return http<Transaction[]>("/transactions?limit=10");
  },
};

