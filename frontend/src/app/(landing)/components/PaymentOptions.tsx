"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Option = {
  title: string;
  description: string;
  icon: ReactNode;
};

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <div className="grid size-11 place-items-center rounded-2xl border border-slate-200 bg-white text-[#0052CC] shadow-sm">
      {children}
    </div>
  );
}

const options: Option[] = [
  {
    title: "Bank Transfer",
    description: "Secure transfers with clear reconciliation and settlement.",
    icon: (
      <IconWrap>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 10h16" />
          <path d="M6 10V7l6-3 6 3v3" />
          <path d="M6 10v8" />
          <path d="M10 10v8" />
          <path d="M14 10v8" />
          <path d="M18 10v8" />
          <path d="M4 18h16" />
        </svg>
      </IconWrap>
    ),
  },
  {
    title: "M-Pesa",
    description: "Fast mobile money flows built for conversion and trust.",
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
  {
    title: "Card",
    description: "Visa & Mastercard support with modern 3DS-ready UX.",
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
    title: "PayPal",
    description: "Offer a familiar wallet checkout for international buyers.",
    icon: (
      <IconWrap>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 20h7a6 6 0 0 0 0-12H9a4 4 0 0 0-4 4v8" />
          <path d="M7 14h7" />
        </svg>
      </IconWrap>
    ),
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function PaymentOptions() {
  return (
    <section id="features" className="bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Payment options you can trust
            </h2>
            <p className="text-slate-600">Offer local rails and global methods with a single secure integration.</p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {options.map((opt, idx) => (
              <motion.div
                key={opt.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={idx}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                {opt.icon}
                <div className="mt-4 text-base font-extrabold text-slate-900">{opt.title}</div>
                <div className="mt-2 text-sm text-slate-600">{opt.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

