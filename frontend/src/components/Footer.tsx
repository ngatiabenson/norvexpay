export function Footer() {
  return (
    <footer className="border-t border-gray-200/70 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-norvex-500 to-indigo-600 text-white shadow-sm">
                <span className="text-sm font-extrabold tracking-tight">N</span>
              </div>
              <div className="text-sm font-extrabold tracking-tight text-gray-900">Norvex Pay</div>
            </div>
            <p className="max-w-md text-sm text-gray-600">
              Discreet, high-trust payments infrastructure for high-value transactions. Built for reliability,
              compliance, and developer velocity.
            </p>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Norvex Pay. All rights reserved.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">Product</div>
              <div className="grid gap-2 text-sm">
                <a className="font-semibold text-gray-700 transition hover:text-gray-900" href="/#products">
                  Products
                </a>
                <a className="font-semibold text-gray-700 transition hover:text-gray-900" href="/pricing">
                  Pricing
                </a>
                <a className="font-semibold text-gray-700 transition hover:text-gray-900" href="/developers">
                  Developers
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">Resources</div>
              <div className="grid gap-2 text-sm">
                <a className="font-semibold text-gray-700 transition hover:text-gray-900" href="/docs">
                  Docs
                </a>
                <a className="font-semibold text-gray-700 transition hover:text-gray-900" href="#">
                  Security
                </a>
                <a className="font-semibold text-gray-700 transition hover:text-gray-900" href="#">
                  Compliance
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">Company</div>
              <div className="grid gap-2 text-sm">
                <a className="font-semibold text-gray-700 transition hover:text-gray-900" href="#">
                  Privacy
                </a>
                <a className="font-semibold text-gray-700 transition hover:text-gray-900" href="#">
                  Terms
                </a>
                <a className="font-semibold text-gray-700 transition hover:text-gray-900" href="#">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-gray-200/70 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <div>Service status: Operational</div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500/80" />
              <span>99.99% uptime target</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Security-first by design</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

