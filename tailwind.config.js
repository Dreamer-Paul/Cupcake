/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "mi": "MiSans",
      },
      animation: {
        'spinner-bar': 'spinnerBar 6s linear infinite',
      },
      keyframes: {
        spinnerBar: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        }
      }
    },
  },
  plugins: [],
}

