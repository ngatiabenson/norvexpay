export function Footer() {
  return (
    <footer
      id="contact"
      style={{ background: "linear-gradient(175deg, #07111f 0%, #0a1628 60%, #0f1a10 100%)" }}
      className="text-gray-400"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-3 md:items-start">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <a href="/" className="flex items-center gap-2.5 w-fit">
              <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#0052CC] to-[#00B8D9] text-white shadow-md shadow-[#0052CC]/30">
                <span className="text-sm font-extrabold tracking-tight">N</span>
              </div>
              <span className="text-sm font-extrabold tracking-tight text-white">
                Norvex <span className="text-[#00B8D9]">Pay</span>
              </span>
            </a>
            <p className="max-w-xs text-sm text-gray-400 leading-relaxed">
              Secure, reliable payments infrastructure for modern businesses — built for trust, speed, and global reach.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { label: "X", title: "Twitter / X" },
                { label: "in", title: "LinkedIn" },
                { label: "gh", title: "GitHub" },
              ].map((s) => (
                <a key={s.label} href="#" title={s.title}
                  className="size-8 rounded-lg border border-white/12 bg-white/8 flex items-center justify-center text-gray-500 transition hover:border-white/25 hover:text-white hover:bg-white/12">
                  <span className="text-xs font-bold">{s.label}</span>
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-600">© {new Date().getFullYear()} Norvex Pay. All rights reserved.</p>
          </div>

          {/* Links */}
          <div className="grid gap-6 sm:grid-cols-2 md:col-span-2">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-600">Product</div>
              <div className="grid gap-2 text-sm">
                {[
                  ["Home", "/"],
                  ["About Us", "/#why-us"],
                  ["Demo", "/#demo"],
                  ["Pricing", "/#pricing"],
                  ["Developer Resources", "/docs"],
                ].map(([l, h]) => (
                  <a key={l} href={h} className="font-semibold text-gray-400 transition hover:text-white w-fit">{l}</a>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-600">Legal</div>
              <div className="grid gap-2 text-sm">
                {[["Privacy Policy", "#"], ["Terms of Service", "#"], ["Compliance", "#"], ["Security", "#"]].map(([l, h]) => (
                  <a key={l} href={h} className="font-semibold text-gray-400 transition hover:text-white w-fit">{l}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <div>Questions? <a href="/#contact" className="text-gray-400 hover:text-white transition font-semibold">Contact our sales team</a> for a tailored rollout.</div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500/70 shadow-[0_0_6px_#10b981]" />
              <span>Bank-grade security</span>
            </span>
            <span className="hidden sm:inline">·</span>
            <span>99.9% uptime SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}