"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

type NavItem = { label: string; href: string };

const nav: NavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "Demo", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Developers resources", href: "/docs" },
  /*{ label: "Careers", href: "/#careers" },*/
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
    <div
      className={[
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-white/10 bg-[#07111f]/95 shadow-lg shadow-black/30 backdrop-blur supports-[backdrop-filter]:bg-[#07111f]/90"
          : "border-white/8 bg-[#07111f]/80 backdrop-blur supports-[backdrop-filter]:bg-[#07111f]/70",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#0052CC] to-[#00B8D9] text-white shadow-md shadow-[#0052CC]/30 transition duration-200 group-hover:shadow-[#0052CC]/50">
              <span className="text-sm font-extrabold tracking-tight">N</span>
            </div>
            <span className="text-sm font-extrabold tracking-tight text-white">
              Norvex <span className="text-[#00B8D9]">Pay</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-semibold text-white/60 transition-colors duration-200 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="/login" className="text-sm font-semibold text-white/60 transition-colors duration-200 hover:text-white">
              Log In
            </a>
            <a
              href="/login"
              className="rounded-lg bg-gradient-to-r from-[#0052CC] to-[#0066FF] px-4 py-2 text-sm font-bold text-white shadow-md shadow-[#0052CC]/25 transition duration-200 hover:scale-[1.04] hover:shadow-[#0052CC]/40"
            >
              Create Account
            </a>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 p-2 text-white transition hover:bg-white/20 md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
              ) : (
                <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden pb-4"
            >
              <div className="mt-2 grid gap-1 rounded-2xl border border-white/12 bg-[#0d1f38] p-2 shadow-xl">
                {nav.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="rounded-xl px-3 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
                <div className="mt-1 grid gap-2 p-1">
                  <a href="/login" className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center text-sm font-bold text-white hover:bg-white/15" onClick={() => setOpen(false)}>Log In</a>
                  <a href="/login" className="rounded-lg bg-gradient-to-r from-[#0052CC] to-[#0066FF] px-3 py-2 text-center text-sm font-bold text-white shadow-sm" onClick={() => setOpen(false)}>Create Account</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}