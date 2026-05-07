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
        page: "#f4f4f5",
        surface: "#ffffff",
        ink: "#0a0a0a",
        muted: "#52525b",
        line: "#e4e4e7",
        "line-strong": "#d4d4d8",
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
        "focus-ring": "0 0 0 2px #fff, 0 0 0 4px #0a0a0a",
        "card-drop": "none",
      },
    },
  },
  plugins: [],
};

export default config;
