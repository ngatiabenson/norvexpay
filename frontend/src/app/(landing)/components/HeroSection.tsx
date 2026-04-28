"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const particles = Array.from({ length: 30 }, (_, i) => ({
  key: `p-${i}`,
  top: `${(i * 7 + 5) % 92}%`,
  left: `${(i * 13 + 3) % 96}%`,
  size: 2 + ((i * 3) % 4),
  delay: (i % 9) * 0.2,
  duration: 9 + (i % 7) * 1.3,
  opacity: 0.12 + (i % 5) * 0.06,
}));

const orbitDots = [
  { r: 50, speed: 20, color: "#00B8D9", size: 9 },
  { r: 42, speed: 28, color: "#FFAB00", size: 7 },
  { r: 56, speed: 15, color: "#0066FF", size: 10 },
  { r: 36, speed: 35, color: "#00B8D9", size: 5 },
  { r: 62, speed: 12, color: "#FFAB00", size: 6 },
];

export function HeroSection() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 70, damping: 22, mass: 0.5 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const textShiftX = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const textShiftY = useTransform(sy, [-0.5, 0.5], [-5, 5]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <header
      id="home"
      ref={ref}
      className="relative min-h-[94vh] overflow-hidden flex items-center"
      style={{ background: "#050d1a" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* ── Full-bleed globe background — clips to hero bounds ── */}
      <div className="pointer-events-none absolute inset-0 z-0">

        {/* Radial ambient glow behind globe */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 72% 50%, rgba(0,82,204,0.18) 0%, rgba(0,184,217,0.10) 40%, transparent 70%)",
          }}
        />

        {/* Spinning globe — fills entire hero, clipped by overflow-hidden */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ rotateX, rotateY }}
        >
          {/* Globe wrapper: oversized so it bleeds to edges */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute"
            style={{
              width: "min(130vw, 130vh)",
              height: "min(130vw, 130vh)",
              right: "-15%",
              top: "50%",
              translateY: "-50%",
            }}
          >
            {/* The globe image itself */}
            <img
              src="/globe.png"
              alt="Global payments network"
              className="absolute inset-0 h-full w-full select-none object-cover"
              style={{ opacity: 0.55 }}
              draggable={false}
            />

            {/* Orbit rings + dots */}
            {orbitDots.map((o, i) => (
              <React.Fragment key={i}>
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    width: `${o.r * 2}%`,
                    height: `${o.r * 2}%`,
                    borderColor: `${o.color}28`,
                  }}
                />
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: o.speed, repeat: Infinity, ease: "linear" }}
                  style={{ width: `${o.r * 2}%`, height: `${o.r * 2}%` }}
                >
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: o.size,
                      height: o.size,
                      background: o.color,
                      boxShadow: `0 0 18px ${o.color}cc`,
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                </motion.div>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* Readability gradients — left-heavy so text is always legible */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(5,13,26,0.96) 0%, rgba(5,13,26,0.82) 38%, rgba(5,13,26,0.45) 65%, rgba(5,13,26,0.18) 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,13,26,0.55) 0%, transparent 20%, transparent 75%, rgba(5,13,26,0.7) 100%)",
          }}
        />

        {/* Drifting particles */}
        {particles.map((p) => (
          <motion.span
            key={p.key}
            className="absolute rounded-full bg-[#00B8D9] z-20"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size, opacity: p.opacity }}
            animate={{ y: [0, -22, 0], x: [0, 16, 0] }}
            transition={{ delay: p.delay, duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 w-full">
        <motion.div style={{ x: textShiftX, y: textShiftY }} className="max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/80 backdrop-blur-sm mb-6"
          >
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            Trusted by businesses across Africa &amp; beyond
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.07]"
          >
            Secure Payments for{" "}
            <span className="bg-gradient-to-r from-[#00B8D9] via-[#0099cc] to-[#FFAB00] bg-clip-text text-transparent">
              Growing Businesses
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base text-/70 sm:text-lg leading-relaxed"
          >
            Accept local and global payments with bank-grade security. From M-Pesa to international cards—one integration, complete control.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="/login"
              className="rounded-lg bg-gradient-to-r from-[#0052CC] to-[#0066FF] px-7 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-[#0052CC]/35 transition duration-200 hover:scale-[1.05] hover:shadow-[#0052CC]/55"
            >
              Create Account
            </a>
            <a
              href="/#contact"
              className="rounded-lg border border-white/28 bg-white/10 px-7 py-3.5 text-center text-sm font-bold text-white backdrop-blur-sm transition duration-200 hover:scale-[1.05] hover:bg-white/18"
            >
              Contact Sales
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {[
              { k: "Security", v: "Tokenization + encryption by default" },
              { k: "Reliability", v: "Built for high-volume traffic" },
              { k: "Control", v: "Signed webhooks + idempotency" },
            ].map((row) => (
              <div
                key={row.k}
                className="rounded-2xl border border-white/14 p-4 backdrop-blur-sm transition duration-200 hover:border-white/25"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <div className="text-sm font-bold text-white">{row.k}</div>
                <div className="mt-1 text-xs text-white/55">{row.v}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}