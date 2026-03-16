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
        /* ArchFlow design system */
        page: "#16171d",
        surface: "#14121a",
        accent: "#6D28D9",
        "accent-soft-15": "rgba(109, 40, 217, 0.15)",
        "accent-soft-25": "rgba(109, 40, 217, 0.25)",
        "accent-soft-35": "rgba(109, 40, 217, 0.35)",
        "line": "#7C3AED",
      },
      borderRadius: {
        "af-sm": "4px",
        "af-md": "2px",
        "af-lg": "0",
      },
      boxShadow: {
        "surface-top": "inset 0 1px 0 rgba(255,255,255,0.08)",
        "surface-bottom": "inset 0 -1px 0 rgba(0,0,0,0.22)",
        "surface-depth": "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.22)",
        "focus-ring": "0 0 0 3px rgba(109,40,217,0.15), 0 0 0 1px rgba(109,40,217,0.25)",
        "card-drop": "0 24px 70px rgba(0,0,0,0.55)",
      },
      transitionDuration: {
        "af": "180ms",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-left": "fadeInLeft 0.6s ease-out forwards",
        "fade-in-right": "fadeInRight 0.6s ease-out forwards",
        "slide-up-in": "slideUpIn 0.4s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "float-reverse": "floatReverse 2.5s ease-in-out infinite",
        "terminal-line": "terminalLine 0.25s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-100px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideUpIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        terminalLine: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
