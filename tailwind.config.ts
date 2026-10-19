import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "modal-fade": { from: { opacity: "0" }, to: { opacity: "1" } },
        "modal-pop": {
          from: { opacity: "0", transform: "translateY(12px) scale(0.97)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "modal-fade": "modal-fade 0.25s ease-out both",
        "modal-pop": "modal-pop 0.35s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      fontFamily: {
        sans: [
          "var(--font-satoshi)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        page: "rgb(var(--c-page) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        "line-strong": "rgb(var(--c-line-strong) / <alpha-value>)",
      },
      borderRadius: {
        "af-sm": "0",
        "af-md": "0",
        "af-lg": "0",
      },
      boxShadow: {
        "surface-top": "none",
        "surface-bottom": "none",
        "surface-depth": "none",
        "focus-ring": "0 0 0 2px rgb(var(--c-surface)), 0 0 0 4px rgb(var(--c-ink))",
        "card-drop": "none",
      },
    },
  },
  plugins: [],
};

export default config;
