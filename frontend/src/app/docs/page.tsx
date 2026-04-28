export default function DocsPage() {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-20 lg:h-[calc(100dvh-6rem)]">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-4 py-3">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">Docs</div>
              </div>

              <nav className="p-2 text-sm">
                {[
                  {
                    title: "Getting started",
                    items: ["Quickstart", "Authentication", "Idempotency"],
                  },
                  {
                    title: "Payments",
                    items: ["Create a payment", "Refunds", "Disputes"],
                  },
                  {
                    title: "Webhooks",
                    items: ["Events", "Signatures", "Retries"],
                  },
                  {
                    title: "SDKs",
                    items: ["Node", "Python", "PHP"],
                  },
                ].map((g) => (
                  <div key={g.title} className="p-2">
                    <div className="px-2 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                      {g.title}
                    </div>
                    <div className="mt-1 grid gap-1">
                      {g.items.map((i) => (
                        <a
                          key={i}
                          href="#"
                          className="rounded-xl px-3 py-2 font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
                        >
                          {i}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="space-y-3">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Documentation</h1>
                <p className="max-w-3xl text-gray-600">
                  Sidebar docs layout (Stripe-style) for a production-ready feel. You can wire these links to your
                  existing documentation system later without changing backend contracts.
                </p>
              </div>

              <div className="mt-8 grid gap-6">
                <section className="space-y-3">
                  <h2 className="text-lg font-extrabold tracking-tight">Quickstart</h2>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <pre className="overflow-auto text-sm leading-6 text-gray-800">
                      <code>{`POST /v1/payments
Authorization: Bearer <api_key>

{
  "amount": 100,
  "currency": "KES"
}`}</code>
                    </pre>
                  </div>
                </section>

                <section className="grid gap-4 sm:grid-cols-2">
                  {[
                    { t: "API reference", d: "Endpoints, errors, and pagination." },
                    { t: "Webhooks", d: "Event delivery with signatures and retries." },
                    { t: "SDKs", d: "Node, Python, and PHP examples." },
                    { t: "Sandbox", d: "Test flows without risk." },
                  ].map((x) => (
                    <a
                      key={x.t}
                      href="#"
                      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:border-gray-300 hover:shadow-md"
                    >
                      <div className="text-base font-extrabold tracking-tight text-gray-900">{x.t}</div>
                      <div className="mt-1 text-sm text-gray-600">{x.d}</div>
                    </a>
                  ))}
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

