/** @type {import('tailwindcss').Config} */
export default {
    important: true,
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
      extend: {
        fontFamily: {
          poppins: ["Inter", "sans-serif"],
        },
        colors: {
          primary: "var(--color-primary)",
          disabled: "var(--color-disabled)",
          destructive: "var(--color-destructive)",
          grey: "var(--color-grey)",
          inactive: "var(--color-inactive)",
        },
      },
    },
  };