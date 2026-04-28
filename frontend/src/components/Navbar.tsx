"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

type NavItem = { label: string; href: string };

const nav: NavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Careers", href: "/#careers" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={["sticky top-0 z-50 border-b transition-all duration-300", scrolled ? "border-slate-200/80 bg-white/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80" : "border-slate-200/50 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60"].join(" ")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="grid size-9 place-items-center rounded-xl bg-[#0052CC] text-white shadow-sm transition duration-200 group-hover:bg-[#0047B3]">
              <span className="text-sm font-extrabold tracking-tight">N</span>
            </div>
            <span className="text-sm font-extrabold tracking-tight text-slate-900">Norvex Pay</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-slate-900">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="/login" className="text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-slate-900">Log In</a>
            <a href="/login" className="rounded-lg bg-[#0052CC] px-4 py-2 text-sm font-bold text-white shadow-sm transition duration-200 hover:scale-[1.05] hover:bg-[#0047B3]">Create Account</a>
          </div>

          <button type="button" className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (<><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>) : (<><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>)}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="md:hidden pb-4">
              <div className="mt-2 grid gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                {nav.map((l) => (
                  <a key={l.label} href={l.href} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" onClick={() => setOpen(false)}>{l.label}</a>
                ))}
                <div className="mt-1 grid gap-2 p-1">
                  <a href="/login" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-sm font-bold text-slate-900 hover:bg-slate-50" onClick={() => setOpen(false)}>Log In</a>
                  <a href="/login" className="rounded-lg bg-[#0052CC] px-3 py-2 text-center text-sm font-bold text-white shadow-sm transition duration-200 hover:bg-[#0047B3]" onClick={() => setOpen(false)}>Create Account</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}