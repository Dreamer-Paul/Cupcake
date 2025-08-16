/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mi: "MiSans",
      },
      animation: {
        "spinner-bar": "spinnerBar 6s linear infinite",
        "fade-in": "fadeIn .3s both",
        "fade-out": "fadeOut .3s both",
        "fade-in-left": "fadeInLeft .3s backwards",
        "fade-off-right": "fadeOffRight .3s forwards",
      },
      keyframes: {
        spinnerBar: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeInLeft: {
          "0%": { opacity: 0, transform: "translateX(1.5rem)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeOffRight: {
          "0%": { opacity: 1, transform: "translateX(0)" },
          "100%": { opacity: 0, transform: "translateX(1.5rem)" },
        },
      },
    },
  },
  plugins: [],
};
