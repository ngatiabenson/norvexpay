"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const particles = Array.from({ length: 24 }, (_, i) => ({
  key: `p-${i}`,
  top: `${(i * 7 + 5) % 90}%`,
  left: `${(i * 13 + 3) % 95}%`,
  size: 2 + ((i * 3) % 5),
  delay: (i % 9) * 0.2,
  duration: 8 + (i % 7) * 1.3,
  opacity: 0.15 + (i % 5) * 0.07,
}));

const orbitDots = [
  { r: 52, speed: 18, color: "#00B8D9", size: 9 },
  { r: 44, speed: 26, color: "#FFAB00", size: 7 },
  { r: 58, speed: 14, color: "#0052CC", size: 10 },
  { r: 38, speed: 32, color: "#00B8D9", size: 5 },
];

export function HeroSection() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.5 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const textShiftX = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const textShiftY = useTransform(sy, [-0.5, 0.5], [-4, 4]);

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
      className="relative min-h-[92vh] overflow-hidden flex items-center"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* ── Globe full-bleed background ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/70 to-[#0a1628]/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-[#0a1628]/20 z-10" />

        {/* Spinning globe */}
        <motion.div
          className="absolute inset-0 flex items-center justify-end pr-0 lg:pr-8"
          style={{ rotateX, rotateY }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="relative w-[110vmin] max-w-[760px] aspect-square opacity-80"
            style={{ translateX: "15%" }}
          >
            <img
              src="/globe.png"
              alt="Global payments network"
              className="absolute inset-0 h-full w-full select-none"
              draggable={false}
            />

            {/* Orbit rings */}
            {orbitDots.map((o, i) => (
              <React.Fragment key={i}>
                {/* Ring */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    width: `${o.r * 2}%`,
                    height: `${o.r * 2}%`,
                    borderColor: `${o.color}30`,
                  }}
                />
                {/* Orbiting dot */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: o.speed, repeat: Infinity, ease: "linear" }}
                  style={{ width: `${o.r * 2}%`, height: `${o.r * 2}%` }}
                >
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: o.size,
                      height: o.size,
                      background: o.color,
                      boxShadow: `0 0 14px ${o.color}99`,
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

        {/* Drifting particles */}
        {particles.map((p) => (
          <motion.span
            key={p.key}
            className="absolute rounded-full bg-[#00B8D9] z-20"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size, opacity: p.opacity }}
            animate={{ y: [0, -20, 0], x: [0, 14, 0] }}
            transition={{ delay: p.delay, duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 w-full">
        <motion.div
          style={{ x: textShiftX, y: textShiftY }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/80 backdrop-blur-sm mb-6"
          >
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Trusted by businesses across Africa & beyond
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]"
          >
            Secure Payments for{" "}
            <span className="bg-gradient-to-r from-[#00B8D9] to-[#FFAB00] bg-clip-text text-transparent">
              Growing Businesses
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base text-white/75 sm:text-lg leading-relaxed"
          >
            Accept local and global payments with bank-grade security. From M-Pesa to international cards—one integration, complete control.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="/login"
              className="rounded-lg bg-[#0052CC] px-7 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-[#0052CC]/30 transition duration-200 hover:scale-[1.05] hover:bg-[#0047B3]"
            >
              Create Account
            </a>
            <a
              href="/#contact"
              className="rounded-lg border border-white/30 bg-white/10 px-7 py-3.5 text-center text-sm font-bold text-white backdrop-blur-sm transition duration-200 hover:scale-[1.05] hover:bg-white/20"
            >
              Contact Sales
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {[
              { k: "Security", v: "Tokenization + encryption by default" },
              { k: "Reliability", v: "Built for high-volume traffic" },
              { k: "Control", v: "Signed webhooks + idempotency" },
            ].map((row) => (
              <div
                key={row.k}
                className="rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur-sm transition duration-200 hover:bg-white/12"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <div className="text-sm font-bold text-white">{row.k}</div>
                <div className="mt-1 text-xs text-white/60">{row.v}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}