"use client";

import { motion, type Variants } from "framer-motion";

type Plan = {
  name: string;
  price: string;
  monthly?: string;
  note: string;
  highlight?: boolean;
  features: string[];
  cta: { label: string; href: string };
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "Free",
    monthly: "to launch",
    note: "For early-stage teams shipping fast.",
    features: [
      "Card + M-Pesa support",
      "Webhooks + basic reporting",
      "Up to 100 transactions/mo",
      "Email support",
    ],
    cta: { label: "Get started free", href: "/login" },
  },
  {
    name: "Growth",
    price: "2.9%",
    monthly: "+ KES 30 / txn",
    note: "Best for scaling businesses needing more control.",
    highlight: true,
    features: [
      "All payment methods",
      "Advanced risk controls",
      "Priority support (24/7)",
      "Payout scheduling",
      "Multi-currency settlements",
    ],
    cta: { label: "Create account", href: "/login" },
  },
  {
    name: "Enterprise",
    price: "Custom",
    monthly: "volume pricing",
    note: "For regulated workflows and bespoke requirements.",
    features: [
      "Dedicated account manager",
      "Custom SLAs & uptime",
      "Compliance reviews",
      "Multi-entity reporting",
      "White-label options",
    ],
    cta: { label: "Contact sales", href: "/#contact" },
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.07 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Pricing() {
  return (
    <section id="pricing" className="bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-14">
          {/* Header */}
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm"
            >
              <span className="size-1.5 rounded-full bg-[#0052CC]" />
              Simple, transparent pricing
            </motion.div>
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={1}
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              Plans that grow with you
            </motion.h2>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={2}
              className="text-slate-600"
            >
              No hidden fees. Upgrade or downgrade at any time.
            </motion.p>
          </div>

          {/* Cards */}
          <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {plans.map((p, idx) => (
              <motion.div
                key={p.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={idx}
                className={[
                  "relative flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl",
                  p.highlight
                    ? "border-[#0052CC]/40 shadow-[0_0_0_1px_rgba(0,82,204,0.18),0_20px_50px_rgba(0,82,204,0.12)]"
                    : "border-slate-200",
                ].join(" ")}
              >
                {p.highlight && (
                  <div className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-[#FFAB00] px-3 py-1 text-xs font-extrabold text-slate-900 shadow-sm">
                    <svg viewBox="0 0 24 24" className="size-3" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>
                    Most Popular
                  </div>
                )}

                {/* Plan header */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{p.name}</div>
                  <div className="mt-3 flex items-end gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900">{p.price}</span>
                    {p.monthly && <span className="mb-1 text-sm font-semibold text-slate-500">{p.monthly}</span>}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{p.note}</p>
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-slate-100" />

                {/* Features */}
                <div className="flex-1 grid gap-3">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div className={["mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", p.highlight ? "bg-[#0052CC]/15 text-[#0052CC]" : "bg-slate-100 text-slate-600"].join(" ")}>
                        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <a
                    href={p.cta.href}
                    className={[
                      "block w-full rounded-lg px-5 py-3.5 text-center text-sm font-extrabold shadow-sm transition duration-200 hover:scale-[1.03]",
                      p.highlight
                        ? "bg-[#0052CC] text-white hover:bg-[#0047B3] shadow-[#0052CC]/25 shadow-lg"
                        : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {p.cta.label}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom note */}
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={0}
            className="text-center text-sm text-slate-500"
          >
            All plans include SSL, fraud detection, and 99.9% uptime SLA.{" "}
            <a href="/#contact" className="font-semibold text-[#0052CC] hover:underline">Talk to sales</a> for volume discounts.
          </motion.p>
        </div>
      </div>
    </section>
  );
}