/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        telegram: {
          bg: "var(--tg-theme-bg-color, #ffffff)",
          text: "var(--tg-theme-text-color, #000000)",
          hint: "var(--tg-theme-hint-color, #707579)",
          link: "var(--tg-theme-link-color, #3390ec)",
          button: "var(--tg-theme-button-color, #3390ec)",
          buttonText: "var(--tg-theme-button-text-color, #ffffff)",
        },
      },
    },
  },
  plugins: [],
};
