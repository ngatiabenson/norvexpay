export default function PricingPage() {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">Pricing</div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Enterprise pricing for high-value payments
            </h1>
            <p className="max-w-2xl text-gray-600">
              Pricing is tailored to your risk profile, volumes, and settlement needs. Get clear, auditable terms — not
              a generic tier chart.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { k: "Custom contracts", v: "Volume-based + negotiated settlement terms" },
                { k: "SLAs", v: "Uptime targets and incident response expectations" },
                { k: "Compliance", v: "Support for audit and reporting workflows" },
                { k: "Support", v: "Dedicated onboarding and escalation paths" },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-gray-900">{x.k}</div>
                  <div className="mt-1 text-sm text-gray-600">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.25rem] border border-gray-200 bg-white p-8 shadow-fintech sm:p-10">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">Request a quote</div>
              <div className="text-2xl font-extrabold tracking-tight">Let’s price your use case</div>
              <p className="text-sm text-gray-600">
                We’ll propose terms based on payment methods, average ticket size, and operational requirements.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              {[
                "Cards, mobile money, wallets, and crypto support",
                "Signed webhooks + idempotency patterns",
                "Reconciliation-ready reporting",
                "KYC/KYB workflow alignment (where applicable)",
              ].map((f) => (
                <div key={f} className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <span className="mt-1 size-2 rounded-full bg-emerald-600/80" />
                  <div className="text-sm font-semibold text-gray-800">{f}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-norvex-500 to-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-fintech transition duration-200 hover:from-norvex-600 hover:to-indigo-700"
              >
                Get started
              </a>
              <a
                href="/docs"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-900 shadow-sm transition duration-200 hover:bg-gray-50"
              >
                Review docs
              </a>
            </div>

            <div className="mt-6 text-xs text-gray-500">
              This page is UI-only and does not change backend contracts.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

