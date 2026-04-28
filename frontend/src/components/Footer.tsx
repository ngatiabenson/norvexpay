export function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: "linear-gradient(175deg, #07111f 0%, #0a1628 60%, #0f1a10 100%)",
      }}
      className="text-gray-400"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#0052CC] to-[#00B8D9] text-white shadow-md shadow-[#0052CC]/30">
                <span className="text-sm font-extrabold tracking-tight">N</span>
              </div>
              <div className="text-sm font-extrabold tracking-tight text-white">
                Norvex <span className="text-[#00B8D9]">Pay</span>
              </div>
            </div>
            <p className="max-w-md text-sm text-gray-400 leading-relaxed">
              Secure, reliable payments infrastructure for modern businesses—built for trust, speed, and global reach.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {["twitter", "linkedin", "github"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="size-8 rounded-lg border border-white/12 bg-white/8 flex items-center justify-center text-gray-500 transition hover:border-white/25 hover:text-white hover:bg-white/12"
                >
                  <span className="text-xs font-bold uppercase">{s[0]}</span>
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-600">© {new Date().getFullYear()} Norvex Pay. All rights reserved.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-600">Company</div>
              <div className="grid gap-2 text-sm">
                {[["Home", "/#home"], ["Pricing", "/#pricing"], ["Careers", "#"], ["Docs", "/docs"]].map(([l, h]) => (
                  <a key={l} href={h} className="font-semibold text-gray-400 transition hover:text-white">{l}</a>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-600">Legal</div>
              <div className="grid gap-2 text-sm">
                {[["Privacy Policy", "#"], ["Terms", "#"], ["Compliance", "#"], ["Security", "#"]].map(([l, h]) => (
                  <a key={l} href={h} className="font-semibold text-gray-400 transition hover:text-white">{l}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <div>Questions? Contact sales for a tailored rollout.</div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500/70 shadow-[0_0_6px_#10b981]" />
              <span>Bank-grade security posture</span>
            </span>
            <span className="hidden sm:inline">·</span>
            <span>Transparent compliance readiness</span>
          </div>
        </div>
      </div>
    </footer>
  );
}