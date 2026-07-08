/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1F2328",
        canvas: "#F6F8FA",
        surface: "#FFFFFF",
        border: "#D8DEE4",
        muted: "#6E7781",
        sidebar: {
          DEFAULT: "#0D1117",
          border: "#21262D",
          muted: "#8B949E",
          hover: "#161B22",
        },
        accent: {
          DEFAULT: "#2563EB",
          dark: "#1D4ED8",
          soft: "#EFF6FF",
        },
        format: {
          swagger: "#2563EB",
          postman: "#D97706",
          insomnia: "#0D9488",
        },
        danger: "#DC2626",
      },
      fontFamily: {
        display: ["Instrument Sans", "system-ui", "sans-serif"],
        body: ["Instrument Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(22,23,27,0.04), 0 1px 12px rgba(22,23,27,0.05)",
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle, #D8DEE4 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "16px 16px",
      },
    },
  },
  plugins: [],
};