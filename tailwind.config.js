/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      animation: {
        "gelatine": "gelatine 300ms linear forwards",
      },
      fontFamily: {
        "sans": ["Oxygen", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        gelatine: {
          "0%, 100%": { transform: "scale(1, 1)" },
          "25%": { transform: "scale(0.85, 1.15)" },
          "50%": { transform: "scale(1.15, 0.85)" },
          "75%": { transform: "scale(0.92, 1.02)" },
        },
      },
      transitionProperty: {
        "clip": "clip-path",
        "bg-size": "background-size",
      },
    },
  },
  plugins: [],
}
