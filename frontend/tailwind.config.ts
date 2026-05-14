import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        head: ["var(--font-jakarta)", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#ffffff",
          100: "#f8f9fa",
          200: "#e2e8f0",
          300: "#B0B0B0", // Secondary Text Gray
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#0a1628", // Surface Blue-Navy
          950: "#020c1b", // Primary Deep Navy (atomcamp space bg)
        },
        brand: {
          50:  "#edfff5",
          100: "#c7ffe4",
          200: "#8fffc9",
          300: "#4dffa8",
          400: "#1aff8c",
          500: "#00ED64", // AtomCamp primary — neon green
          600: "#00c252",
          700: "#009940",
          800: "#006e2e",
          900: "#00451c",
        },
        accent: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 8s ease-in-out infinite 2s",
        shimmer: "shimmer 2.5s infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
}

export default config
