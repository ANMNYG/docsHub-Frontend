/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12141C",
        paper: "#F5F6F8",
        surface: "#FFFFFF",
        line: "#DEE2E8",
        muted: "#6B7280",
        accent: {
          DEFAULT: "#0E7C7B",
          dark: "#0A5F5E",
          light: "#E4F3F2",
        },
        amber: {
          DEFAULT: "#E8A33D",
          dark: "#B9791F",
          light: "#FBF0DD",
        },
        danger: "#D64545",
      },
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,20,28,0.04), 0 1px 12px rgba(18,20,28,0.05)",
      },
    },
  },
  plugins: [],
};
