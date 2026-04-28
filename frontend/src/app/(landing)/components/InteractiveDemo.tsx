"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.07 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function PanelShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-extrabold text-slate-900">{title}</div>
          <div className="mt-1 text-sm text-slate-600">{subtitle}</div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Live preview
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function InteractiveDemo() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={0}
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              See It In Action
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={1}
              className="text-slate-600"
            >
              A polished experience across checkout, mobile money, and operations workflows.
            </motion.p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={0}
            >
              <PanelShell title="Checkout Demo" subtitle="Fast, branded checkout that customers trust.">
                <div className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-slate-900">Norvex Store</div>
                    <div className="text-sm font-extrabold text-slate-900">KES 12,400</div>
                  </div>
                  <div className="mt-3 grid gap-2">
                    {[
                      { t: "Card", s: "Visa / Mastercard" },
                      { t: "M-Pesa", s: "Push / STK" },
                      { t: "PayPal", s: "Wallet checkout" },
                    ].map((m) => (
                      <div
                        key={m.t}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 transition duration-200 hover:border-slate-300"
                      >
                        <div className="text-sm font-semibold text-slate-900">{m.t}</div>
                        <div className="text-xs font-semibold text-slate-500">{m.s}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full rounded-lg bg-[#0052CC] px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition duration-200 hover:scale-[1.02] hover:bg-[#0047B3]"
                  >
                    Pay now
                  </button>
                  <div className="mt-3 text-center text-xs text-slate-500">
                    Encrypted • Tokenized • Audit-friendly
                  </div>
                </div>
              </PanelShell>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={1}
            >
              <PanelShell title="Mobile Payment" subtitle="Mobile-first flows built for speed and clarity.">
                <div className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-slate-900">Pay via M-Pesa</div>
                    <div className="text-xs font-semibold text-slate-500">~8 seconds</div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {[
                      { k: "Phone number", v: "+254 7XX XXX XXX" },
                      { k: "Prompt", v: "Approve on your device" },
                      { k: "Status", v: "Pending confirmation" },
                    ].map((x) => (
                      <div
                        key={x.k}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2"
                      >
                        <div className="text-sm font-semibold text-slate-900">{x.k}</div>
                        <div className="text-xs font-semibold text-slate-500">{x.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-xl border border-[#00B8D9]/35 bg-white px-3 py-2">
                    <div className="text-sm font-semibold text-slate-900">Secure channel</div>
                    <div className="text-xs font-semibold text-[#00B8D9]">Verified</div>
                  </div>
                </div>
              </PanelShell>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={2}
            >
              <PanelShell title="Invoice & Payouts" subtitle="Operational visibility for finance teams.">
                <div className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-slate-900">Payout summary</div>
                    <div className="text-xs font-semibold text-slate-500">Last 24h</div>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {[
                      { k: "Settled", v: "KES 284,120", c: "text-emerald-600" },
                      { k: "Pending", v: "KES 31,540", c: "text-amber-600" },
                      { k: "Refunds", v: "KES 3,200", c: "text-slate-600" },
                    ].map((x) => (
                      <div key={x.k} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2">
                        <div className="text-sm font-semibold text-slate-900">{x.k}</div>
                        <div className={`text-sm font-extrabold ${x.c}`}>{x.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2">
                    <div className="text-sm font-semibold text-slate-900">Exports</div>
                    <div className="text-xs font-semibold text-slate-500">CSV • Ledger-ready</div>
                  </div>
                </div>
              </PanelShell>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

