"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = { label: string; href: string };

const nav: NavItem[] = [
  { label: "Products", href: "/#products" },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-norvex-500 to-indigo-600 text-white shadow-sm">
              <span className="text-sm font-extrabold tracking-tight">N</span>
            </div>
            <span className="text-sm font-extrabold tracking-tight text-gray-900">Norvex Pay</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-semibold text-gray-600 transition duration-200 hover:text-gray-900"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/login"
              className="text-sm font-semibold text-gray-600 transition duration-200 hover:text-gray-900"
            >
              Login
            </a>
            <a
              href="/#get-started"
              className="rounded-xl bg-gradient-to-r from-norvex-500 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition duration-200 hover:from-norvex-600 hover:to-indigo-700"
            >
              Get Started
            </a>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition hover:bg-gray-50 md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden pb-4"
            >
              <div className="mt-2 grid gap-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
                {nav.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
                <div className="mt-1 grid gap-2 p-1">
                  <a
                    href="/login"
                    className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-center text-sm font-bold text-gray-900 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </a>
                  <a
                    href="/#get-started"
                    className="rounded-xl bg-gradient-to-r from-norvex-500 to-indigo-600 px-3 py-2 text-center text-sm font-bold text-white transition duration-200 hover:from-norvex-600 hover:to-indigo-700"
                    onClick={() => setOpen(false)}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

