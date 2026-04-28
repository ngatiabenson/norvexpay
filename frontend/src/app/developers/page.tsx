"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

type Lang = "Node" | "Python" | "PHP";

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-fintech">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-rose-400/80" />
          <span className="size-2 rounded-full bg-amber-300/80" />
          <span className="size-2 rounded-full bg-emerald-300/80" />
        </div>
        <div className="text-xs font-semibold text-white/60">Sandbox</div>
      </div>
      <pre className="overflow-auto p-4 text-sm leading-6 text-white/90">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function GlassCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-fintech">
      <div className="flex items-start gap-3">
        <div className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-black/20 text-white/90">
          {icon}
        </div>
        <div>
          <div className="text-base font-extrabold tracking-tight text-white">{title}</div>
          <div className="mt-1 text-sm text-white/70">{desc}</div>
        </div>
      </div>
    </div>
  );
}

export default function DevelopersPage() {
  const [lang, setLang] = React.useState<Lang>("Node");

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

  const docs = {
    Node: `import { gateway } from "@norvexpay/sdk";

const payment = await gateway.pay({
  amount: 100,
  currency: "KES",
});
`,
    Python: `from norvexpay import gateway

payment = gateway.pay({
  "amount": 100,
  "currency": "KES",
})
`,
    PHP: `<?php
use NorvexPay\\Gateway;

$payment = Gateway::pay([
  "amount" => 100,
  "currency" => "KES",
]);
`,
  } satisfies Record<Lang, string>;

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#050B16] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-norvex-500/30 to-indigo-500/20 blur-3xl" />
          <div className="absolute -right-24 top-40 size-72 rounded-full bg-gradient-to-r from-indigo-500/25 to-norvex-500/15 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
                  <span className="size-1.5 rounded-full bg-indigo-300" />
                  Developers
                </p>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-4xl font-extrabold tracking-tight sm:text-5xl"
              >
                Powerful payments API for developers
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="max-w-xl text-base text-white/70 sm:text-lg"
              >
                Build once, ship globally. Clean APIs, reliable webhooks, and a sandbox designed for fast iteration.
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="flex gap-3">
                <a
                  className="rounded-xl bg-gradient-to-r from-norvex-500 to-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-fintech transition duration-200 hover:from-norvex-600 hover:to-indigo-700"
                  href="/docs"
                >
                  Read docs
                </a>
                <a
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/90 backdrop-blur transition duration-200 hover:bg-white/10"
                  href="/login"
                >
                  Get API keys
                </a>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              <CodeBlock
                children={`const payment = await gateway.pay({
  amount: 100,
  currency: "KES",
});`}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Everything you need to integrate</h2>
            <p className="text-white/70">A developer-first gateway: predictable, typed, and testable.</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "API",
                desc: "Clean endpoints for payments, refunds, and customer data.",
                icon: (
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                  </svg>
                ),
              },
              {
                title: "Webhooks",
                desc: "Idempotent events with retries and signatures.",
                icon: (
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12a4 4 0 0 1 4-4h2" />
                    <path d="M20 12a4 4 0 0 1-4 4h-2" />
                    <path d="M8 16l-2 2a3 3 0 0 0 4 4l2-2" />
                    <path d="M16 8l2-2a3 3 0 0 0-4-4l-2 2" />
                    <path d="M8 12h8" />
                  </svg>
                ),
              },
              {
                title: "SDKs",
                desc: "Drop-in client libraries for popular stacks.",
                icon: (
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l-6-6 6-6" />
                    <path d="M15 6l6 6-6 6" />
                  </svg>
                ),
              },
              {
                title: "Sandbox",
                desc: "Test payments end-to-end without risk.",
                icon: (
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l10 6-10 6L2 8l10-6z" />
                    <path d="M2 8v8l10 6 10-6V8" />
                    <path d="M12 14v8" />
                  </svg>
                ),
              },
            ].map((f) => (
              <GlassCard key={f.title} title={f.title} desc={f.desc} icon={f.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* API preview */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Request / response preview</h2>
              <p className="text-white/70">
                Your backend stays in control. Initiate a payment, receive a clean response, and subscribe to webhooks
                for lifecycle events.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-fintech backdrop-blur">
                <div className="text-xs font-semibold text-white/60">Request</div>
                <pre className="mt-3 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-white/90">
                  <code>{`POST /v1/payments
Authorization: Bearer <api_key>

{
  "amount": 100,
  "currency": "KES",
  "reference": "INV-1024"
}`}</code>
                </pre>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-fintech backdrop-blur">
                <div className="text-xs font-semibold text-white/60">Response</div>
                <pre className="mt-3 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-white/90">
                  <code>{`{
  "id": "pay_84A2",
  "status": "pending",
  "amount": 100,
  "currency": "KES",
  "checkout_url": "https://checkout.norvexpay.com/pay_84A2"
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Docs preview */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.25rem] border border-white/10 bg-white/5 p-8 shadow-fintech backdrop-blur sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">Docs preview</div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Typed examples for your stack</h2>
                <p className="text-white/70">Switch tabs to preview integration snippets.</p>
              </div>

              <div className="inline-flex rounded-2xl border border-white/10 bg-black/20 p-1">
                {(["Node", "Python", "PHP"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className={cn(
                      "rounded-xl px-4 py-2 text-sm font-bold transition duration-200",
                      lang === l ? "bg-white text-[#050B16]" : "text-white/80 hover:bg-white/10"
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <CodeBlock children={docs[lang]} />
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Integrate anywhere</h2>
            <p className="text-white/70">Commerce platforms or custom backends — plug in fast.</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Shopify", sub: "Checkout extensions", tag: "Ready" },
              { name: "WooCommerce", sub: "Plugin-friendly", tag: "Ready" },
              { name: "Custom API", sub: "Backend-first", tag: "Recommended" },
              { name: "Webhooks", sub: "Realtime events", tag: "Built-in" },
            ].map((i) => (
              <div
                key={i.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-200 hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="text-base font-extrabold tracking-tight text-white">{i.name}</div>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold text-white/80">
                    {i.tag}
                  </span>
                </div>
                <div className="mt-2 text-sm text-white/70">{i.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            <a
              className="rounded-xl bg-gradient-to-r from-norvex-500 to-indigo-600 px-6 py-3 text-center text-sm font-extrabold text-white shadow-fintech transition duration-200 hover:from-norvex-600 hover:to-indigo-700"
              href="/docs"
            >
              Explore docs
            </a>
            <a
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-center text-sm font-bold text-white/90 backdrop-blur transition duration-200 hover:bg-white/10"
              href="/#get-started"
            >
              Start building
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

