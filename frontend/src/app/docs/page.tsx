"use client";

import * as React from "react";
import { motion } from "framer-motion";

type Section = { id: string; title: string; items: { id: string; label: string }[] };

const SECTIONS: Section[] = [
  { id: "getting-started", title: "Getting Started", items: [{ id: "quickstart", label: "Quickstart" }, { id: "auth", label: "Authentication" }, { id: "idempotency", label: "Idempotency" }] },
  { id: "payments", title: "Payments", items: [{ id: "create", label: "Create a payment" }, { id: "refunds", label: "Refunds" }, { id: "disputes", label: "Disputes" }] },
  { id: "webhooks", title: "Webhooks", items: [{ id: "events", label: "Events" }, { id: "signatures", label: "Signatures" }, { id: "retries", label: "Retries" }] },
  { id: "sdks", title: "SDKs", items: [{ id: "node", label: "Node.js" }, { id: "python", label: "Python" }, { id: "php", label: "PHP" }] },
];

type Lang = "Node" | "Python" | "PHP";
const SDK_CODE: Record<Lang, string> = {
  Node: `import { gateway } from "@norvexpay/sdk";

const payment = await gateway.pay({
  amount: 12400,
  currency: "KES",
  reference: "INV-001",
  customer: { email: "buyer@example.com" }
});

console.log(payment.checkout_url);
// https://checkout.norvexpay.com/pay_84A2`,
  Python: `from norvexpay import gateway

payment = gateway.pay({
    "amount": 12400,
    "currency": "KES",
    "reference": "INV-001",
    "customer": {"email": "buyer@example.com"}
})

print(payment["checkout_url"])
# https://checkout.norvexpay.com/pay_84A2`,
  PHP: `<?php
use NorvexPay\\Gateway;

$payment = Gateway::pay([
    "amount"    => 12400,
    "currency"  => "KES",
    "reference" => "INV-001",
    "customer"  => ["email" => "buyer@example.com"],
]);

echo $payment["checkout_url"];
// https://checkout.norvexpay.com/pay_84A2`,
};

const CONTENT: Record<string, React.ReactNode> = {
  quickstart: (
    <div className="space-y-5">
      <h2 className="text-2xl font-extrabold text-slate-900">Quickstart</h2>
      <p className="text-slate-600">Make your first payment in under 5 minutes. Install the SDK, grab your API key, and initiate a payment.</p>
      <div className="rounded-2xl bg-[#050d1a] border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
          <span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-yellow-400" /><span className="size-2.5 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-white/50 font-mono">terminal</span>
        </div>
        <pre className="p-5 text-sm text-white/85 leading-6 overflow-auto"><code>{`npm install @norvexpay/sdk\n\n# Set your key\nexport NORVEX_API_KEY="npk_live_..."`}</code></pre>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[{ t: "Create account", d: "Get your API key from the dashboard." }, { t: "Read the API", d: "Explore endpoints and error codes." }, { t: "Sandbox testing", d: "Run test transactions with no risk." }, { t: "Go live", d: "Flip to production keys when ready." }].map(c => (
          <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition">
            <div className="font-extrabold text-slate-900">{c.t}</div>
            <div className="mt-1 text-sm text-slate-500">{c.d}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  auth: (
    <div className="space-y-5">
      <h2 className="text-2xl font-extrabold text-slate-900">Authentication</h2>
      <p className="text-slate-600">All API requests must carry a Bearer token in the <code className="rounded bg-slate-100 px-1 py-0.5 text-sm font-mono text-slate-700">Authorization</code> header.</p>
      <div className="rounded-2xl bg-[#050d1a] border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
          <span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-yellow-400" /><span className="size-2.5 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-white/50 font-mono">HTTP</span>
        </div>
        <pre className="p-5 text-sm text-white/85 leading-6 overflow-auto"><code>{`POST /v1/payments\nAuthorization: Bearer npk_live_4Xm9qR2T...\nContent-Type: application/json`}</code></pre>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Never expose your API key</strong> in client-side code or public repos. Rotate immediately if compromised.
      </div>
    </div>
  ),
  idempotency: (
    <div className="space-y-5">
      <h2 className="text-2xl font-extrabold text-slate-900">Idempotency</h2>
      <p className="text-slate-600">Pass an <code className="rounded bg-slate-100 px-1 py-0.5 text-sm font-mono text-slate-700">Idempotency-Key</code> header to safely retry requests without duplicate charges.</p>
      <div className="rounded-2xl bg-[#050d1a] border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
          <span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-yellow-400" /><span className="size-2.5 rounded-full bg-green-400" />
        </div>
        <pre className="p-5 text-sm text-white/85 leading-6 overflow-auto"><code>{`POST /v1/payments\nAuthorization: Bearer npk_live_...\nIdempotency-Key: unique-client-ref-1024\n\n{ "amount": 12400, "currency": "KES" }`}</code></pre>
      </div>
      <p className="text-slate-600 text-sm">If the same key is sent again within 24 hours, the original response is returned — no duplicate payment is made.</p>
    </div>
  ),
  create: (
    <div className="space-y-5">
      <h2 className="text-2xl font-extrabold text-slate-900">Create a Payment</h2>
      <p className="text-slate-600">Initiate a payment and redirect your customer to the hosted checkout page.</p>
      <div className="rounded-2xl bg-[#050d1a] border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
          <span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-yellow-400" /><span className="size-2.5 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-white/50 font-mono">Response 200</span>
        </div>
        <pre className="p-5 text-sm text-white/85 leading-6 overflow-auto"><code>{`{\n  "id": "pay_84A2",\n  "status": "pending",\n  "amount": 12400,\n  "currency": "KES",\n  "reference": "INV-001",\n  "checkout_url": "https://checkout.norvexpay.com/pay_84A2",\n  "created_at": "2026-04-28T10:00:00Z"\n}`}</code></pre>
      </div>
    </div>
  ),
  refunds: (
    <div className="space-y-5">
      <h2 className="text-2xl font-extrabold text-slate-900">Refunds</h2>
      <p className="text-slate-600">Issue full or partial refunds against any succeeded payment.</p>
      <div className="rounded-2xl bg-[#050d1a] border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
          <span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-yellow-400" /><span className="size-2.5 rounded-full bg-green-400" />
        </div>
        <pre className="p-5 text-sm text-white/85 leading-6 overflow-auto"><code>{`POST /v1/payments/pay_84A2/refund\n\n{ "amount": 5000 }   // partial refund in minor units`}</code></pre>
      </div>
    </div>
  ),
  events: (
    <div className="space-y-5">
      <h2 className="text-2xl font-extrabold text-slate-900">Webhook Events</h2>
      <p className="text-slate-600">Subscribe to lifecycle events and receive real-time delivery to your endpoint.</p>
      <div className="grid gap-3">
        {["payment.succeeded","payment.failed","payment.refunded","payout.settled"].map(e => (
          <div key={e} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
            <code className="text-sm font-mono text-slate-800">{e}</code>
            <span className="text-xs font-semibold text-slate-400">POST to your endpoint</span>
          </div>
        ))}
      </div>
    </div>
  ),
  signatures: (
    <div className="space-y-5">
      <h2 className="text-2xl font-extrabold text-slate-900">Webhook Signatures</h2>
      <p className="text-slate-600">Every delivery includes a <code className="rounded bg-slate-100 px-1 py-0.5 text-sm font-mono text-slate-700">X-Norvex-Signature</code> header. Verify it with your webhook secret.</p>
      <div className="rounded-2xl bg-[#050d1a] border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
          <span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-yellow-400" /><span className="size-2.5 rounded-full bg-green-400" />
        </div>
        <pre className="p-5 text-sm text-white/85 leading-6 overflow-auto"><code>{`const sig = req.headers["x-norvex-signature"];\nconst computed = hmac("sha256", secret, payload);\nif (sig !== computed) throw new Error("Invalid");`}</code></pre>
      </div>
    </div>
  ),
};

const DEFAULT_CONTENT = (label: string) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-extrabold text-slate-900">{label}</h2>
    <p className="text-slate-600">Documentation for this section is being finalized. Check back soon or contact <a href="/#contact" className="text-[#0052CC] hover:underline font-semibold">developer support</a>.</p>
  </div>
);

export default function DocsPage() {
  const [active, setActive] = React.useState("quickstart");
  const [lang, setLang] = React.useState<Lang>("Node");
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const activeLabel = SECTIONS.flatMap(s => s.items).find(i => i.id === active)?.label ?? active;
  const content = active === "sdks" || ["node","python","php"].includes(active)
    ? null
    : CONTENT[active] ?? DEFAULT_CONTENT(activeLabel);

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Page header */}
        <div className="mb-8 space-y-1">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Documentation</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Developer Resources</h1>
          <p className="text-slate-500 text-sm">Everything you need to integrate Norvex Pay into your product.</p>
        </div>

        {/* Mobile nav toggle */}
        <button
          className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm lg:hidden"
          onClick={() => setMobileNavOpen(v => !v)}
        >
          <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          {mobileNavOpen ? "Close nav" : "Browse topics"}
        </button>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className={`${mobileNavOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-20`}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Contents</div>
              <nav className="p-2 text-sm">
                {SECTIONS.map((s) => (
                  <div key={s.id} className="mb-1">
                    <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">{s.title}</div>
                    {s.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setActive(item.id === "node" || item.id === "python" || item.id === "php" ? "sdks" : item.id); setMobileNavOpen(false); if (["node","python","php"].includes(item.id)) setLang(item.label as Lang); }}
                        className={`w-full text-left rounded-xl px-3 py-2 font-semibold transition text-sm ${active === item.id || (active === "sdks" && ["node","python","php"].includes(item.id)) ? "bg-[#0052CC]/10 text-[#0052CC]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
            >
              {active === "sdks" ? (
                <div className="space-y-5">
                  <h2 className="text-2xl font-extrabold text-slate-900">SDK Reference</h2>
                  <p className="text-slate-600">Drop-in client libraries for your stack. Switch tabs to see examples.</p>
                  <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 gap-1">
                    {(["Node","Python","PHP"] as Lang[]).map((l) => (
                      <button key={l} onClick={() => setLang(l)}
                        className={`rounded-lg px-4 py-1.5 text-sm font-bold transition ${lang === l ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                  <div className="rounded-2xl bg-[#050d1a] border border-slate-200 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
                      <span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-yellow-400" /><span className="size-2.5 rounded-full bg-green-400" />
                      <span className="ml-2 text-xs text-white/50 font-mono">{lang.toLowerCase()}</span>
                    </div>
                    <pre className="p-5 text-sm text-white/85 leading-6 overflow-auto"><code>{SDK_CODE[lang]}</code></pre>
                  </div>
                </div>
              ) : content}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}