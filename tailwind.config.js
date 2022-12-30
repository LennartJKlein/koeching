/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

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
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      sky: colors.sky,
    },
    extend: {
      animation: {
        "gelatine": "gelatine 300ms linear forwards",
      },
      backgroundImage: {
        "bottom-nav": "linear-gradient(transparent 24px,#96BF14 24px), url(~/assets/svg/grass-light.svg)",
        "borreveld": "linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0)), url('/assets/webp/boerderij-borreveld.webp')",
      },
      colors: {
        brown: {
          50: '#ece9e6',
          100: '#cec8c0',
          200: '#aea496',
          300: '#8e7f6c',
          400: '#75634d',
          500: '#5d482d',
          600: '#554128',
          700: '#4b3822',
          800: '#41301c',
          900: '#302111',
        },
      },
      fontFamily: {
        "sans": ["Oxygen", ...defaultTheme.fontFamily.sans],
        "display": ["Berlin Sans", "Oxygen", ...defaultTheme.fontFamily.sans],
      },
      height: {
        "60v": "60vh",
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
  safelist: [
    {
      pattern: /(bg)-(brown|sky|gray)-(200|600)/,
    },
    {
      pattern: /border-pencil-/,
    },
  ],
  plugins: [],
}
