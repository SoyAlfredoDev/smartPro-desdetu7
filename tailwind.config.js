/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        surface: "var(--color-surface)",
        background: "var(--color-background)",
        "text-main": "var(--color-text-main)",
        "text-muted": "var(--color-text-muted)",
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ":root": {
          "--color-primary": "#ff6600", // orange from mockup
          "--color-surface": "#ffffff",
          "--color-background": "#f5f7fa",
          "--color-text-main": "#111827",
          "--color-text-muted": "#6b7280",
        },
      });
    },
  ],
};
