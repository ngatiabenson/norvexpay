"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050d1a 0%, #0a1628 60%, #0d1f10 100%)" }}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, #0052CC 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, #00B8D9 0%, transparent 70%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#0052CC] to-[#00B8D9] text-white shadow-lg shadow-[#0052CC]/30">
            <span className="text-base font-extrabold tracking-tight">N</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Norvex <span className="text-[#00B8D9]">Pay</span>
          </span>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/12 p-8 shadow-2xl backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Welcome back</h1>
            <p className="text-sm text-white/55">Sign in to your Norvex Pay account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/60">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full h-11 rounded-xl border border-white/15 bg-white/8 px-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#00B8D9]/60 focus:ring-2 focus:ring-[#00B8D9]/20 focus:bg-white/10"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-white/60">Password</label>
                <a href="#" className="text-xs font-semibold text-[#00B8D9] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 rounded-xl border border-white/15 bg-white/8 px-3.5 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#00B8D9]/60 focus:ring-2 focus:ring-[#00B8D9]/20 focus:bg-white/10"
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition">
                  {showPw ? (
                    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-400">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full h-11 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0066FF] text-sm font-extrabold text-white shadow-lg shadow-[#0052CC]/30 transition duration-200 hover:scale-[1.02] hover:shadow-[#0052CC]/45 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="size-4 rounded-full border-2 border-white/30 border-t-white"
                  />
                  Signing in…
                </>
              ) : "Sign in →"}
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-white/35">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-semibold text-[#00B8D9] hover:underline">Request access</a>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-white/70">
          Demo: any email + password works. You&apos;ll land on the dashboard.
        </p>
      </motion.div>
    </div>
  );
}