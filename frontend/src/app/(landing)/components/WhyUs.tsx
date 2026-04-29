"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.07 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const pillars = [
  {
    icon: (
      <svg className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Bank-Grade Security",
    body: "Every transaction is protected by TLS 1.3, AES-256 tokenisation, and real-time fraud scoring — the same standards used by tier-one banks.",
    stat: "256-bit", statLabel: "encryption",
    accent: "#0052CC",
    iconBg: "bg-[#0052CC]/10 text-[#0052CC]",
    border: "border-[#0052CC]/20 hover:border-[#0052CC]/40",
  },
  {
    icon: (
      <svg className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Built for Speed",
    body: "Payments authorise in under 800 ms on average. Our infrastructure handles high-volume African and global traffic without throttling.",
    stat: "<800ms", statLabel: "avg authorisation",
    accent: "#00B8D9",
    iconBg: "bg-[#00B8D9]/10 text-[#00B8D9]",
    border: "border-[#00B8D9]/20 hover:border-[#00B8D9]/40",
  },
  {
    icon: (
      <svg className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "One API, Every Rail",
    body: "M-Pesa, Visa, Mastercard, PayPal, and bank transfers — one clean REST integration with typed SDKs for Node, Python, and PHP.",
    stat: "4+", statLabel: "payment rails",
    accent: "#FFAB00",
    iconBg: "bg-[#FFAB00]/10 text-[#FFAB00]",
    border: "border-[#FFAB00]/20 hover:border-[#FFAB00]/40",
  },
  {
    icon: (
      <svg className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Transparent Reporting",
    body: "Real-time dashboards, ledger-ready CSV exports, and signed webhooks for every lifecycle event. Audit teams love us.",
    stat: "99.9%", statLabel: "uptime SLA",
    accent: "#36B37E",
    iconBg: "bg-[#36B37E]/10 text-[#36B37E]",
    border: "border-[#36B37E]/20 hover:border-[#36B37E]/40",
  },
];

const trustedBy = ["Neptune Fiduciaries", "Greenfield Ltd", "Acme Corp", "Kariuki & Co.", "Neptune Stores"];

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{
        background: "linear-gradient(180deg, #0a1628 0%, #0f2240 40%, #e8f0f9 100%)",
      }}
    >
      {/* Top dark-to-light transition overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{ background: "linear-gradient(to bottom, #0a1628, transparent)" }} />
      {/* Soft glow mid-section */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, #0052CC, transparent 70%)" }} />
        <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, #00B8D9, transparent 70%)" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header — on dark */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold text-white/70 mb-4 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-[#00B8D9]" />
            Why Norvex Pay
          </motion.div>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={1}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Built for businesses that{" "}
            <span className="bg-gradient-to-r from-[#00B8D9] to-[#FFAB00] bg-clip-text text-transparent">
              can&apos;t afford to fail
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={2}
            className="mt-4 text-white/55 leading-relaxed">
            From day-one startups to regulated enterprises — the same infrastructure the world&apos;s largest networks rely on.
          </motion.p>
        </div>

        {/* Cards — bright white on light bg, bridging the gradient */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.div key={p.title}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} custom={i}
              className={`group relative rounded-3xl border bg-white p-6 transition duration-300 hover:-translate-y-1 ${p.border}`}
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)" }}>
              {/* Coloured top accent bar */}
              <div className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: p.accent }} />

              {/* Icon */}
              <div className={`size-12 rounded-2xl flex items-center justify-center mb-4 ${p.iconBg}`}>
                {p.icon}
              </div>

              <div className="text-base font-extrabold text-slate-900 mb-2">{p.title}</div>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">{p.body}</p>

              {/* Stat */}
              <div className="inline-flex items-baseline gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5">
                <span className="text-base font-extrabold" style={{ color: p.accent }}>{p.stat}</span>
                <span className="text-xs text-slate-400">{p.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trusted by — on the lighter bottom portion */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} custom={0}
          className="mt-14 border-t border-slate-200 pt-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400 mb-5">Trusted by businesses including</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustedBy.map((name) => (
              <span key={name} className="text-sm font-semibold text-slate-400 hover:text-slate-700 transition">{name}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}