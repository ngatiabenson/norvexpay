/* eslint-disable react/no-unescaped-entities */
"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

type PaymentOption = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid size-11 place-items-center rounded-2xl border border-norvex-500/15 bg-norvex-500/5 text-norvex-700 shadow-sm">
      {children}
    </div>
  );
}

const paymentOptions: PaymentOption[] = [
  {
    title: "Cards",
    description: "Accept Visa & Mastercard with SCA-ready checkout flows.",
    icon: (
      <IconWrap>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7h18v10H3z" />
          <path d="M3 10h18" />
          <path d="M7 14h4" />
        </svg>
      </IconWrap>
    ),
  },
  {
    title: "Crypto",
    description: "Let customers pay with crypto, auto-converted at settlement.",
    icon: (
      <IconWrap>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20" />
          <path d="M8 6h6a3 3 0 0 1 0 6H8" />
          <path d="M8 12h7a3 3 0 0 1 0 6H8" />
          <path d="M7 7h1" />
        </svg>
      </IconWrap>
    ),
  },
  {
    title: "Wallets",
    description: "Apple Pay / Google Pay style wallet experiences (mock-ready).",
    icon: (
      <IconWrap>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7h18v12H3z" />
          <path d="M3 10h18" />
          <path d="M16 14h3" />
          <path d="M7 14h5" />
        </svg>
      </IconWrap>
    ),
  },
  {
    title: "Mobile Money",
    description: "M-Pesa-style checkout optimized for speed and conversion.",
    icon: (
      <IconWrap>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 2h8" />
          <path d="M7 4h10v16H7z" />
          <path d="M10 19h4" />
        </svg>
      </IconWrap>
    ),
  },
];

export default function LandingPage() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.08 * i,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <header
        id="home"
        className="relative overflow-hidden bg-[radial-gradient(900px_520px_at_50%_0%,rgba(26,95,209,0.16)_0%,rgba(26,95,209,0)_60%),linear-gradient(180deg,rgba(246,249,255,1)_0%,rgba(255,255,255,1)_60%)]"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-norvex-500/20 to-indigo-500/15 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-20 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-8">
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                  <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-gray-700 shadow-sm">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Security-first payments infrastructure
                  </p>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                >
                  Accept payments globally.{" "}
                  <span className="bg-gradient-to-r from-norvex-700 to-indigo-700 bg-clip-text text-transparent">
                    Cards, crypto, wallets—one API.
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="max-w-2xl text-base text-gray-600 sm:text-lg"
                >
                  A discreet, high-trust payment gateway for high-value businesses. Secure checkout, robust risk controls,
                  and developer-friendly APIs designed for reliability.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
                >
                  <a
                    id="get-started"
                    className="rounded-xl bg-gradient-to-r from-norvex-500 to-indigo-600 px-6 py-3 text-center text-sm font-bold text-white shadow-fintech transition duration-200 hover:from-norvex-600 hover:to-indigo-700"
                    href="/login"
                  >
                    Get Started
                  </a>
                  <a
                    className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-center text-sm font-bold text-gray-900 shadow-sm transition duration-200 hover:bg-gray-50"
                    href="/docs"
                  >
                    View Docs
                  </a>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                  className="grid gap-3 sm:grid-cols-3"
                >
                  {[
                    { k: "Encryption", v: "TLS in transit + tokenization" },
                    { k: "Uptime", v: "99.99% target + monitoring" },
                    { k: "Controls", v: "Idempotency + signed webhooks" },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition duration-200 hover:shadow-md"
                    >
                      <div className="text-sm font-bold text-gray-900">{row.k}</div>
                      <div className="mt-1 text-sm text-gray-600">{row.v}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="relative"
              >
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-b from-norvex-500/10 to-transparent blur-2xl" />

                <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-fintech">
                  <div className="border-b border-gray-200 px-5 py-4">
                    <div className="text-sm font-extrabold text-gray-900">Checkout that feels native</div>
                    <div className="mt-1 text-sm text-gray-600">Multiple payment methods, one secure flow.</div>
                  </div>
                  <div className="p-5">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-gray-900">Pay Neptune Corporate</div>
                        <div className="text-sm font-extrabold text-gray-900">KES 12,400</div>
                      </div>
                      <div className="mt-3 grid gap-2">
                        {[
                          { t: "Card", s: "Visa, Mastercard" },
                          { t: "Mobile Money", s: "M-Pesa / wallets" },
                          { t: "Crypto", s: "Stablecoin settlement" },
                        ].map((m) => (
                          <div
                            key={m.t}
                            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 transition duration-200 hover:border-gray-300"
                          >
                            <div className="text-sm font-semibold text-gray-900">{m.t}</div>
                            <div className="text-xs font-semibold text-gray-500">{m.s}</div>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="mt-4 w-full rounded-xl bg-gradient-to-r from-norvex-500 to-indigo-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition duration-200 hover:from-norvex-600 hover:to-indigo-700"
                      >
                        Continue
                      </button>
                      <div className="mt-3 text-center text-xs text-gray-500">
                        Secured by tokenization • PCI-aligned handling
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Payment methods */}
      <section id="products" className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="mx-auto max-w-2xl text-center space-y-3">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Payment methods your customers trust
              </h2>
              <p className="text-gray-600">Offer cards, crypto, wallets, and mobile money with one integration.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {paymentOptions.map((opt, idx) => (
                <motion.div
                  key={opt.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  custom={idx}
                  className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-fintech"
                >
                  {opt.icon}
                  <div className="mt-4 text-base font-extrabold text-gray-900">{opt.title}</div>
                  <div className="mt-2 text-sm text-gray-600">{opt.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.25rem] border border-gray-200 bg-white p-8 shadow-fintech sm:p-10">
            <div className="grid gap-10 lg:grid-cols-3 lg:items-center">
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">Trust & security</div>
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Built for regulated workflows</h2>
                <p className="text-gray-600">
                  Discreet controls, audit-friendly visibility, and secure processing designed for high-value financial
                  operations.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
                {[
                  { k: "Encryption", v: "TLS in transit + tokenized data handling" },
                  { k: "Availability", v: "Uptime targets with active monitoring" },
                  { k: "Auditability", v: "Structured events and reconciliation data" },
                  { k: "Reliability", v: "Idempotency + signed webhooks" },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition duration-200 hover:bg-white"
                  >
                    <div className="text-sm font-extrabold text-gray-900">{x.k}</div>
                    <div className="mt-1 text-sm text-gray-600">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-gray-200 bg-[radial-gradient(800px_260px_at_10%_20%,rgba(26,95,209,0.12)_0%,rgba(26,95,209,0)_60%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(246,249,255,1)_100%)] p-10 shadow-fintech">
            <div className="absolute -right-20 -top-24 size-72 rounded-full bg-gradient-to-r from-indigo-500/15 to-norvex-500/10 blur-3xl" />
            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Start accepting payments in minutes
                </h2>
                <p className="text-gray-600">
                  Integrate once, accept multiple payment methods, and keep your operations audit-ready.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  className="rounded-xl bg-gradient-to-r from-norvex-500 to-indigo-600 px-6 py-3 text-center text-sm font-extrabold text-white shadow-sm transition duration-200 hover:from-norvex-600 hover:to-indigo-700"
                  href="/login"
                >
                  Create account
                </a>
                <a
                  className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-center text-sm font-bold text-gray-900 shadow-sm transition duration-200 hover:bg-gray-50"
                  href="/developers"
                >
                  For developers
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}