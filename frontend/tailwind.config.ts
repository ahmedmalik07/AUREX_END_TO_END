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
          900: "#1A336F", // Surface Blue
          950: "#01011B", // Primary Navy
        },
        brand: {
          50: "#fff9eb",
          100: "#ffefc6",
          200: "#ffe088",
          300: "#fdcd4a",
          400: "#fcbc23",
          500: "#FBBB2E", // Action Orange
          600: "#e09f06",
          700: "#b97808",
          800: "#955e0e",
          900: "#7a4d10",
        },
        accent: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
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
