export default function LoginPage() {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-md rounded-[2.25rem] border border-gray-200 bg-white p-8 shadow-fintech">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">Login</div>
            <h1 className="text-2xl font-extrabold tracking-tight">Welcome back</h1>
            <p className="text-sm text-gray-600">
              UI placeholder auth page. Hook this into your existing auth flow without changing backend contracts.
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            <label className="grid gap-2">
              <span className="text-xs font-semibold text-gray-600">Email</span>
              <input
                className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/20"
                placeholder="you@company.com"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-semibold text-gray-600">Password</span>
              <input
                type="password"
                className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/20"
                placeholder="••••••••"
              />
            </label>
            <button
              type="button"
              className="mt-2 h-11 rounded-xl bg-gradient-to-r from-norvex-500 to-indigo-600 text-sm font-extrabold text-white shadow-fintech transition duration-200 hover:from-norvex-600 hover:to-indigo-700"
            >
              Continue
            </button>
            <div className="mt-2 text-center text-xs text-gray-500">
              By continuing, you agree to the terms and privacy policy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

