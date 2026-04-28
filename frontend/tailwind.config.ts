import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        norvex: {
          50: "#F9FAFB",
          100: "#EAF2FF",
          200: "#CFE2FF",
          300: "#A9C8FF",
          400: "#73A5FF",
          500: "#0052CC",
          600: "#0047B3",
          700: "#003A99",
          800: "#0B2A4A",
          900: "#1E293B",
        },
        teal: {
          DEFAULT: "#00B8D9",
        },
        amber: {
          brand: "#FFAB00",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        fintech: "0 14px 34px rgba(2, 28, 58, 0.10)",
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
} satisfies Config;