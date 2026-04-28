"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockSummary, mockRevenue, mockTransactions } from "../../lib/api/mockData";
import type { TxStatus, TxMethod } from "../../lib/api/types";
import { useRouter } from "next/navigation";

/* ─── helpers ─── */
const fmt = (n: number, currency = "KES") =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const STATUS_STYLES: Record<TxStatus, string> = {
  succeeded: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  pending: "bg-amber-400/15 text-amber-400 border-amber-400/25",
  failed: "bg-red-500/15 text-red-400 border-red-500/25",
  refunded: "bg-slate-400/15 text-slate-400 border-slate-400/25",
};

const METHOD_LABELS: Record<TxMethod, string> = {
  mpesa: "M-Pesa",
  card: "Card",
  bank_transfer: "Bank",
  paypal: "PayPal",
};

/* ─── Mini sparkline SVG ─── */
function Sparkline({ data, color = "#0052CC" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 80, h = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts.split(" ").at(-1)!.split(",")[0]} cy={pts.split(" ").at(-1)!.split(",")[1]} r="3" fill={color} />
    </svg>
  );
}

/* ─── Revenue bar chart ─── */
function RevenueChart() {
  const max = Math.max(...mockRevenue.map((r) => r.revenue));
  return (
    <div className="flex items-end gap-2 h-32">
      {mockRevenue.map((r, i) => (
        <div key={r.date} className="flex flex-col items-center gap-1 flex-1">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(r.revenue / max) * 100}%` }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-t-md bg-gradient-to-t from-[#0052CC] to-[#00B8D9] min-h-[4px]"
            style={{ opacity: 0.7 + (i / mockRevenue.length) * 0.3 }}
          />
          <span className="text-[9px] text-white/35 hidden sm:block">{r.date.slice(5)}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Sidebar nav items ─── */
type NavId = "overview" | "transactions" | "payouts" | "settings" | "developers";

const SIDEBAR: { id: NavId; label: string; icon: React.ReactNode }[] = [
  {
    id: "overview", label: "Overview",
    icon: <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    id: "transactions", label: "Transactions",
    icon: <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>,
  },
  {
    id: "payouts", label: "Payouts",
    icon: <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  },
  {
    id: "developers", label: "Developers",
    icon: <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  },
  {
    id: "settings", label: "Settings",
    icon: <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
];

/* ─── Overview tab ─── */
function OverviewTab() {
  const stats = [
    { label: "Total Volume", value: fmt(mockSummary.totalPayments), change: "+12.4%", up: true, spark: [54,62,59,68,72,76,83] },
    { label: "Settlements", value: fmt(mockSummary.settlements), change: "+8.1%", up: true, spark: [40,44,48,52,55,60,65] },
    { label: "Refunds", value: fmt(mockSummary.refunds), change: "-2.3%", up: false, spark: [12,10,11,9,8,10,9] },
    { label: "Success Rate", value: "94.2%", change: "+0.8%", up: true, spark: [90,91,93,92,94,93,94] },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/10 p-5"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="text-xs font-semibold text-white/50">{s.label}</div>
              <span className={`text-xs font-bold ${s.up ? "text-emerald-400" : "text-red-400"}`}>{s.change}</span>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-white tracking-tight">{s.value}</div>
            <div className="mt-3">
              <Sparkline data={s.spark} color={s.up ? "#00B8D9" : "#f87171"} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="rounded-2xl border border-white/10 p-6"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-base font-extrabold text-white">Revenue — April 2026</div>
            <div className="text-sm text-white/45 mt-0.5">Daily settlements (KES)</div>
          </div>
          <div className="text-sm font-bold text-[#00B8D9]">+18.7% vs last month</div>
        </div>
        <RevenueChart />
      </motion.div>

      {/* Recent transactions preview */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, duration: 0.5 }}
        className="rounded-2xl border border-white/10 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <div className="text-base font-extrabold text-white">Recent Transactions</div>
          <span className="text-xs font-semibold text-[#00B8D9] cursor-pointer hover:underline">View all →</span>
        </div>
        <div className="divide-y divide-white/6">
          {mockTransactions.slice(0, 4).map((tx) => (
            <div key={tx.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/5 transition">
              <div className="size-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-white/60">{tx.customer.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white truncate">{tx.customer.name}</div>
                <div className="text-xs text-white/40">{tx.reference} · {timeAgo(tx.createdAt)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white">{tx.currency} {tx.amount.toLocaleString()}</div>
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLES[tx.status]}`}>{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Transactions tab ─── */
function TransactionsTab() {
  const [filter, setFilter] = React.useState<TxStatus | "all">("all");
  const filtered = filter === "all" ? mockTransactions : mockTransactions.filter(t => t.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {(["all", "succeeded", "pending", "failed", "refunded"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${filter === f ? "bg-[#0052CC] text-white" : "bg-white/8 text-white/55 hover:bg-white/15 hover:text-white"}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-left">
                {["ID", "Customer", "Method", "Amount", "Fee", "Status", "Time"].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-bold text-white/40 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6">
              <AnimatePresence>
                {filtered.map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-white/50">{tx.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white">{tx.customer.name}</div>
                      <div className="text-xs text-white/35">{tx.customer.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-lg bg-white/10 px-2 py-1 text-xs font-bold text-white/70">
                        {METHOD_LABELS[tx.method]}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-white">{tx.currency} {tx.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-white/50">{tx.fee > 0 ? `${tx.currency} ${tx.fee}` : "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${STATUS_STYLES[tx.status]}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-white/40">{timeAgo(tx.createdAt)}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-white/35">No transactions match this filter.</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Payouts tab ─── */
function PayoutsTab() {
  const payouts = [
    { id: "po_0091", amount: 284120, currency: "KES", bank: "Equity Bank · ****3821", status: "settled", date: "2026-04-27" },
    { id: "po_0090", amount: 156400, currency: "KES", bank: "KCB · ****1144", status: "settled", date: "2026-04-25" },
    { id: "po_0089", amount: 31540, currency: "KES", bank: "Equity Bank · ****3821", status: "in_transit", date: "2026-04-28" },
    { id: "po_0088", amount: 98700, currency: "KES", bank: "NCBA · ****5512", status: "settled", date: "2026-04-22" },
  ];
  const statusStyle: Record<string, string> = {
    settled: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    in_transit: "bg-amber-400/15 text-amber-400 border-amber-400/25",
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Available balance", value: "KES 126,500", sub: "Ready to payout" },
          { label: "In transit", value: "KES 31,540", sub: "Expected Apr 29" },
          { label: "Paid out (Apr)", value: "KES 539,220", sub: "3 payouts complete" },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-white/10 p-5" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="text-xs font-semibold text-white/45">{c.label}</div>
            <div className="mt-1.5 text-2xl font-extrabold text-white">{c.value}</div>
            <div className="mt-1 text-xs text-white/35">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="px-6 py-4 border-b border-white/8 text-base font-extrabold text-white">Payout history</div>
        <div className="divide-y divide-white/6">
          {payouts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">{p.bank}</div>
                <div className="text-xs text-white/35">{p.id} · {p.date}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white">{p.currency} {p.amount.toLocaleString()}</div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusStyle[p.status]}`}>
                  {p.status.replace("_", " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Developers tab ─── */
function DevelopersTab() {
  const [copied, setCopied] = React.useState(false);
  const apiKey = "npk_live_4Xm9qR2TzK8wJdVn3pYsB7cL";

  const copy = () => {
    navigator.clipboard.writeText(apiKey).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* API Key */}
      <div className="rounded-2xl border border-white/10 p-6" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div className="text-sm font-extrabold text-white mb-3">Your API Key</div>
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-xl bg-black/30 border border-white/10 px-4 py-2.5 font-mono text-xs text-white/60 truncate">
            {apiKey}
          </div>
          <button onClick={copy}
            className="rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition flex-shrink-0">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="mt-3 text-xs text-white/35">Keep this secret. Rotate it below if compromised.</p>
      </div>

      {/* Quickstart */}
      <div className="rounded-2xl border border-white/10 p-6" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div className="text-sm font-extrabold text-white mb-4">Quickstart</div>
        <div className="rounded-xl bg-black/40 border border-white/10 p-4 font-mono text-xs text-white/80 leading-6">
          <div className="text-white/35 mb-1"># Install</div>
          <div>npm install @norvexpay/sdk</div>
          <div className="mt-3 text-white/35 mb-1"># Initiate a payment</div>
          <div>{"const { gateway } = require('@norvexpay/sdk');"}</div>
          <div>{"const pay = await gateway.pay({"}</div>
          <div className="pl-4">{"amount: 12400, currency: 'KES',"}</div>
          <div className="pl-4">{"reference: 'INV-001'"}</div>
          <div>{"});"}</div>
        </div>
      </div>

      {/* Links */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { t: "API Reference", d: "Full endpoint docs", href: "/docs" },
          { t: "Webhooks guide", d: "Events + signatures", href: "/docs" },
          { t: "Sandbox", d: "Test without risk", href: "/docs" },
        ].map((l) => (
          <a key={l.t} href={l.href}
            className="rounded-2xl border border-white/10 p-5 hover:bg-white/8 hover:border-white/20 transition group"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="text-sm font-extrabold text-white group-hover:text-[#00B8D9] transition">{l.t}</div>
            <div className="mt-1 text-xs text-white/40">{l.d}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── Settings tab ─── */
function SettingsTab() {
  const [name, setName] = React.useState("Acme Corp");
  const [email, setEmail] = React.useState("billing@acmecorp.com");
  const [saved, setSaved] = React.useState(false);
  const [notif, setNotif] = React.useState(true);
  const [twofa, setTwofa] = React.useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="space-y-5 max-w-lg">
      <div className="rounded-2xl border border-white/10 p-6" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div className="text-sm font-extrabold text-white mb-4">Business profile</div>
        <div className="space-y-3">
          {[{ label: "Business name", val: name, set: setName }, { label: "Billing email", val: email, set: setEmail }].map(({ label, val, set }) => (
            <div key={label}>
              <label className="text-xs font-semibold text-white/50">{label}</label>
              <input value={val} onChange={e => set(e.target.value)}
                className="mt-1 w-full h-10 rounded-xl border border-white/12 bg-white/6 px-3 text-sm text-white outline-none focus:border-[#00B8D9]/50 focus:ring-2 focus:ring-[#00B8D9]/15 transition" />
            </div>
          ))}
          <button onClick={save}
            className="mt-2 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0066FF] px-5 py-2.5 text-sm font-bold text-white transition hover:scale-[1.03]">
            {saved ? "✓ Saved!" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 p-6" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div className="text-sm font-extrabold text-white mb-4">Security & notifications</div>
        <div className="space-y-4">
          {[
            { label: "Email notifications", sub: "Receive alerts for new transactions", val: notif, set: setNotif },
            { label: "Two-factor auth", sub: "Add an extra layer of security", val: twofa, set: setTwofa },
          ].map(({ label, sub, val, set }) => (
            <div key={label} className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">{label}</div>
                <div className="text-xs text-white/40">{sub}</div>
              </div>
              <button onClick={() => set(!val)}
                className={`relative w-11 h-6 rounded-full transition-colors ${val ? "bg-[#0052CC]" : "bg-white/15"}`}>
                <div className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${val ? "translate-x-5" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ─── */
export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = React.useState<NavId>("overview");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const TAB_COMPONENTS: Record<NavId, React.ReactNode> = {
    overview: <OverviewTab />,
    transactions: <TransactionsTab />,
    payouts: <PayoutsTab />,
    developers: <DevelopersTab />,
    settings: <SettingsTab />,
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#07111f" }}>
      {/* ── Sidebar ── */}
      <aside
        className={[
          "flex-shrink-0 w-60 flex flex-col border-r border-white/8 transition-transform duration-300 z-30",
          "fixed inset-y-0 left-0 lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        style={{ background: "#050d1a" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/8">
          <div className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-[#0052CC] to-[#00B8D9] text-white shadow-md shadow-[#0052CC]/25">
            <span className="text-xs font-extrabold">N</span>
          </div>
          <span className="text-sm font-extrabold text-white">Norvex <span className="text-[#00B8D9]">Pay</span></span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {SIDEBAR.map((item) => (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className={[
                "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                tab === item.id
                  ? "bg-[#0052CC]/25 text-white border border-[#0052CC]/30"
                  : "text-white/50 hover:bg-white/8 hover:text-white",
              ].join(" ")}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User footer */}
        <div className="border-t border-white/8 p-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-gradient-to-br from-[#0052CC] to-[#00B8D9] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">A</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">Acme Corp</div>
              <div className="text-[10px] text-white/35 truncate">billing@acmecorp.com</div>
            </div>
          </div>
          <button
            onClick={() => router.push("/")}
            className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-semibold text-white/50 hover:bg-white/10 hover:text-white transition"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-shrink-0" style={{ background: "#07111f" }}>
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden rounded-lg border border-white/15 bg-white/8 p-2 text-white/60 hover:text-white transition"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <div className="text-sm font-extrabold text-white capitalize">{tab}</div>
              <div className="text-xs text-white/35">April 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {TAB_COMPONENTS[tab]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}