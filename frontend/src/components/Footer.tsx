export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-xl bg-[#0052CC] text-white shadow-sm">
                <span className="text-sm font-extrabold tracking-tight">N</span>
              </div>
              <div className="text-sm font-extrabold tracking-tight text-white">Norvex Pay</div>
            </div>
            <p className="max-w-md text-sm text-gray-400">
              Secure, reliable payments infrastructure for modern businesses—built for trust, speed, and global reach.
            </p>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Norvex Pay. All rights reserved.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">Company</div>
              <div className="grid gap-2 text-sm">
                <a className="font-semibold text-gray-300 transition hover:text-white" href="/#home">Home</a>
                <a className="font-semibold text-gray-300 transition hover:text-white" href="/#pricing">Pricing</a>
                <a id="careers" className="font-semibold text-gray-300 transition hover:text-white" href="#">Careers</a>
                <a className="font-semibold text-gray-300 transition hover:text-white" href="/docs">Docs</a>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">Legal</div>
              <div className="grid gap-2 text-sm">
                <a className="font-semibold text-gray-300 transition hover:text-white" href="#">Privacy Policy</a>
                <a className="font-semibold text-gray-300 transition hover:text-white" href="#">Terms</a>
                <a className="font-semibold text-gray-300 transition hover:text-white" href="#">Compliance</a>
                <a className="font-semibold text-gray-300 transition hover:text-white" href="#">Security</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-gray-800 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <div>Questions? Contact sales for a tailored rollout.</div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500/80" />
              <span>Bank-grade security posture</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Transparent compliance readiness</span>
          </div>
        </div>
      </div>
    </footer>
  );
}