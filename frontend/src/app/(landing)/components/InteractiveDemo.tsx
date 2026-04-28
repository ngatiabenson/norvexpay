"use client";

import * as React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.07 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ─── Flow step types ─── */
type FlowStep = { id: string; label: string; sub: string; icon: React.ReactNode; color: string };

const flowSteps: FlowStep[] = [
  {
    id: "init",
    label: "Initiate",
    sub: "Customer taps Pay",
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.07a1 1 0 011.447.894V15.5a1 1 0 01-1.447.894L15 14M3 8h12a2 2 0 012 2v4a2 2 0 01-2 2H3a2 2 0 01-2-2v-4a2 2 0 012-2z" />
      </svg>
    ),
    color: "#0052CC",
  },
  {
    id: "auth",
    label: "Authenticate",
    sub: "3DS / PIN verified",
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    color: "#00B8D9",
  },
  {
    id: "process",
    label: "Process",
    sub: "Gateway routes funds",
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "#FFAB00",
  },
  {
    id: "settle",
    label: "Settle",
    sub: "Funds hit your account",
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "#36B37E",
  },
];

/* ─── Animated flow diagram ─── */
function PaymentFlow() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % flowSteps.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-3xl border border-[#e8edf5] bg-white p-6 shadow-sm hover:shadow-lg transition duration-200">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="text-base font-extrabold text-slate-900">Payment Flow</div>
          <div className="mt-0.5 text-sm text-slate-500">End-to-end in milliseconds</div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>

      <div className="flex items-center gap-0">
        {flowSteps.map((step, i) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1 min-w-0">
              <motion.div
                animate={{
                  background: i <= active ? step.color : "#f1f5f9",
                  scale: i === active ? 1.12 : 1,
                  boxShadow: i === active ? `0 0 22px ${step.color}66` : "none",
                }}
                transition={{ duration: 0.4 }}
                className="size-11 rounded-full flex items-center justify-center text-white"
                style={{ color: i <= active ? "#fff" : "#94a3b8" }}
              >
                {step.icon}
              </motion.div>
              <div className="mt-2 text-center">
                <div className="text-xs font-bold text-slate-800 truncate">{step.label}</div>
                <div className="text-[10px] text-slate-500 truncate hidden sm:block">{step.sub}</div>
              </div>
            </div>
            {i < flowSteps.length - 1 && (
              <div className="flex-shrink-0 mx-1 mb-4">
                <motion.div
                  animate={{ background: i < active ? "#0052CC" : "#e2e8f0" }}
                  transition={{ duration: 0.4 }}
                  className="h-0.5 w-6 sm:w-10 rounded-full"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3"
          >
            <div
              className="size-2.5 rounded-full flex-shrink-0"
              style={{ background: flowSteps[active].color, boxShadow: `0 0 8px ${flowSteps[active].color}88` }}
            />
            <div className="text-sm font-semibold text-slate-700">{flowSteps[active].label}: {flowSteps[active].sub}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Interactive click-to-pay ─── */
type PayStep = "idle" | "method" | "confirm" | "processing" | "done";

const METHODS = [
  { id: "card", label: "Visa / Mastercard", sub: "Card ending ·· 4242", icon: "💳" },
  { id: "mpesa", label: "M-Pesa STK Push", sub: "+254 7XX XXX XXX", icon: "📱" },
  { id: "paypal", label: "PayPal Wallet", sub: "user@email.com", icon: "🅿️" },
];

function ClickToPay() {
  const [step, setStep] = React.useState<PayStep>("idle");
  const [selected, setSelected] = React.useState<string | null>(null);

  const reset = () => { setStep("idle"); setSelected(null); };

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => setStep("done"), 2000);
  };

  return (
    <div className="rounded-3xl border border-[#e8edf5] bg-white p-6 shadow-sm hover:shadow-lg transition duration-200 h-full">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="text-base font-extrabold text-slate-900">Checkout Demo</div>
          <div className="mt-0.5 text-sm text-slate-500">Click to pay — fully interactive</div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Try it
        </span>
      </div>

      <AnimatePresence mode="wait">
        {/* IDLE */}
        {step === "idle" && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-900">Norvex Store</span>
                <span className="text-base font-extrabold text-slate-900">KES 12,400</span>
              </div>
              <div className="text-xs text-slate-500">1× Enterprise Integration License</div>
            </div>
            <button
              onClick={() => setStep("method")}
              className="w-full rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0066FF] px-4 py-3 text-sm font-extrabold text-white shadow-md shadow-[#0052CC]/25 transition duration-200 hover:scale-[1.02] hover:shadow-[#0052CC]/40 active:scale-[0.99]"
            >
              Proceed to Pay →
            </button>
            <div className="mt-3 text-center text-xs text-slate-400">Encrypted · Tokenized · Audit-ready</div>
          </motion.div>
        )}

        {/* METHOD SELECT */}
        {step === "method" && (
          <motion.div key="method" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Select payment method</div>
            <div className="grid gap-2 mb-4">
              {METHODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  className={[
                    "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition duration-150",
                    selected === m.id
                      ? "border-[#0052CC] bg-[#0052CC]/6 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300",
                  ].join(" ")}
                >
                  <span className="text-xl">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900">{m.label}</div>
                    <div className="text-xs text-slate-500">{m.sub}</div>
                  </div>
                  {selected === m.id && (
                    <div className="size-4 rounded-full bg-[#0052CC] flex items-center justify-center flex-shrink-0">
                      <svg className="size-2.5" fill="none" stroke="white" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={reset} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Back</button>
              <button
                onClick={() => selected && setStep("confirm")}
                disabled={!selected}
                className="flex-1 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0066FF] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition duration-200 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {/* CONFIRM */}
        {step === "confirm" && (
          <motion.div key="confirm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 mb-4 space-y-2">
              {[
                { k: "Method", v: METHODS.find(m => m.id === selected)?.label ?? "" },
                { k: "Amount", v: "KES 12,400" },
                { k: "Merchant", v: "Norvex Store" },
                { k: "Security", v: "TLS 1.3 + Tokenized" },
              ].map(row => (
                <div key={row.k} className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">{row.k}</span>
                  <span className="text-xs font-bold text-slate-900">{row.v}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handlePay}
              className="w-full rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0066FF] px-4 py-3 text-sm font-extrabold text-white shadow-md shadow-[#0052CC]/25 transition duration-200 hover:scale-[1.02] active:scale-[0.99]"
            >
              Confirm &amp; Pay KES 12,400
            </button>
            <button onClick={() => setStep("method")} className="mt-2 w-full text-center text-xs text-slate-400 hover:text-slate-600 transition">← Change method</button>
          </motion.div>
        )}

        {/* PROCESSING */}
        {step === "processing" && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-8 gap-4">
            <div className="relative size-14">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-[#0052CC]/20"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0052CC]"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="text-sm font-bold text-slate-700">Processing payment…</div>
            <div className="text-xs text-slate-400">Routing via secure gateway</div>
          </motion.div>
        )}

        {/* DONE */}
        {step === "done" && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-6 gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="size-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"
            >
              <svg className="size-8" fill="none" stroke="white" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <div className="text-base font-extrabold text-slate-900">Payment Successful!</div>
            <div className="text-sm text-slate-500">KES 12,400 settled to Norvex Store</div>
            <button onClick={reset} className="mt-1 text-xs font-semibold text-[#0052CC] hover:underline transition">Try again →</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Payout summary panel ─── */
function PayoutSummary() {
  return (
    <div className="rounded-3xl border border-[#e8edf5] bg-white p-6 shadow-sm hover:shadow-lg transition duration-200">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="text-base font-extrabold text-slate-900">Payout Summary</div>
          <div className="mt-0.5 text-sm text-slate-500">Operational visibility for finance teams</div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Live data
        </span>
      </div>

      <div className="grid gap-2">
        {[
          { k: "Settled", v: "KES 284,120", c: "text-emerald-600", bar: 82 },
          { k: "Pending", v: "KES 31,540", c: "text-amber-500", bar: 18 },
          { k: "Refunds", v: "KES 3,200", c: "text-slate-500", bar: 6 },
        ].map((x) => (
          <div key={x.k} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-slate-700">{x.k}</div>
              <div className={`text-sm font-extrabold ${x.c}`}>{x.v}</div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${x.bar}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{
                  background: x.k === "Settled" ? "#10b981" : x.k === "Pending" ? "#f59e0b" : "#94a3b8",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5">
        <div className="text-sm font-semibold text-slate-700">Export reports</div>
        <div className="text-xs font-semibold text-[#0052CC]">CSV · Ledger-ready</div>
      </div>
    </div>
  );
}

/* ─── Main export ─── */
export function InteractiveDemo() {
  return (
    <section
      className="py-16 sm:py-20 lg:py-24"
      style={{
        background: "linear-gradient(160deg, #f0f4fa 0%, #e8f0f9 50%, #f5f0e8 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-[#0052CC]/25 bg-[#0052CC]/8 px-3 py-1 text-xs font-semibold text-[#0052CC] mb-2"
            >
              <span className="size-1.5 rounded-full bg-[#0052CC]" />
              Interactive Demo
            </motion.div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={1}
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              See It In Action
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={2}
              className="text-slate-600"
            >
              A polished experience across checkout, mobile money, and operations. Click to pay — it actually works.
            </motion.p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={0}>
              <PaymentFlow />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={1}>
              <ClickToPay />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={2}>
              <PayoutSummary />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}