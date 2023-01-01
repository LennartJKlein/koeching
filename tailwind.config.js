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
      gray: colors.stone,
    },
    extend: {
      animation: {
        "gelatine": "gelatine 300ms linear forwards",
      },
      backgroundImage: {
        "bottom-nav": "linear-gradient(transparent 24px,#96BF14 24px), url(~/assets/svg/grass-light.svg)",
      },
      borderWidth: {
        '16': "16px",
        '18': "18px",
      },
      colors: {
        brown: {
          50: '#dcccb7',
          100: '#c3a783',
          200: '#b18c5e',
          300: '#866841',
          400: '#725837',
          500: '#5d482d',
          600: '#483823',
          700: '#342819',
          800: '#1f180f',
          900: '#0a0805',
        },
        sky: {
          50: '#e9f3f7',
          100: '#c8e1eb',
          200: '#a3cdde',
          300: '#7eb9d0',
          400: '#62aac6',
          500: '#469bbc',
          600: '#3f93b6',
          700: '#3789ad',
          800: '#2f7fa5',
          900: '#206d97',
        },
      },
      fontFamily: {
        "sans": ["Oxygen", ...defaultTheme.fontFamily.sans],
        "display": ["Berlin Sans", "Oxygen", ...defaultTheme.fontFamily.sans],
      },
      height: {
        "30v": "30vh",
        "55v": "55vh",
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
      pattern: /bg-(black|brown|sky|gray)-/,
    },
    {
      pattern: /border-pencil-/,
    },
  ],
  plugins: [],
}
