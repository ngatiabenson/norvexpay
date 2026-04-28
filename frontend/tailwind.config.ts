import type { Config } from "tailwindcss";

export default {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        norvex: {
          50: "#F6F9FF",
          100: "#EAF2FF",
          200: "#CFE2FF",
          300: "#A9C8FF",
          400: "#73A5FF",
          500: "#1A5FD1",
          600: "#1553BB",
          700: "#0F3F93",
          800: "#0B2A4A",
          900: "#081C32"
        }
      },
      boxShadow: {
        fintech: "0 14px 34px rgba(2, 28, 58, 0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config;

