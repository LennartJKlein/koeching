/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const FormKitVariants = require('@formkit/themes/tailwindcss')

module.exports = {
  content: [
    './app.vue',
    './error.vue',
    './components/**/*.{js,vue,ts}',
    './composables/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './nuxt.config.{js,ts}',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs',
  ],
  theme: {
    colors: {
      black: colors.black,
      current: 'currentColor',
      gray: colors.stone,
      red: colors.red,
      transparent: 'transparent',
      white: colors.white,
    },
    extend: {
      animation: {
        gelatine: 'gelatine 300ms linear forwards',
        'fly-in': 'fly-in 1.5s cubic-bezier(.4,1.45,.55,.95) forwards',
        'zoom-in-once': 'zoom-in 4.5s linear forwards',
        'zoom-in': 'zoom-in 6s ease-in-out infinite alternate',
        'contact-sky': 'contact-sky 15s ease-in-out infinite alternate',
        'contact-pen': 'contact-pen 2s ease-in-out infinite alternate',
        'contact-phone': 'contact-ring 150ms infinite',
        'contact-envelop': 'contact-envelop 2s ease-in forwards',
        'contact-phone-sound': 'contact-ring 200ms infinite',
        'contact-smartphone-light': 'contact-light-up 750ms ease-in-out infinite',
      },
      backgroundImage: {
        'bottom-nav':
          'linear-gradient(transparent 24px,#96BF14 24px), url(~/assets/svg/grass-light.svg)',
        euro: "url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI3IiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMjcgMzIiPgogIDxwYXRoCiAgICBkPSJNMjcuMzE2IDIzLjc0OWMtMS4zNjkgNS43MjUtOS41ODEgOS45MDgtMTQuOTAxIDcuMjg3LTMuNjI0LTEuNzkzLTUuODQxLTUuNjg3LTYuOTQtOS42MTktMS41NjEgMC0zLjItMC4wOTYtNC4yOTktMC43NzEtMC41NC0wLjMyOC0wLjczMy0wLjkwNi0wLjYxNy0xLjUwNGwwLjAzOS0wLjE1NGMwLjAzOS0wLjEzNSAwLjEzNS0wLjE5MyAwLjIxMi0wLjI3cS0wLjAzOSAwLTAuMDU4IDBjMC4wMzktMC4wMzkgMC4wNzctMC4wMzkgMC4xMTYtMC4wNzcgMCAwIDAtMC4wMTkgMC4wMTktMC4wMTkgMC44MS0wLjcxMyAxLjk2Ni0wLjQ0MyAyLjk2OS0wLjQ4MiAwLjEzNS0wLjAxOSAwLjI3LTAuMDE5IDAuNDA1LTAuMDE5IDAuMDc3LTAuMTkzIDAuMjEyLTAuMzg2IDAuNDQzLTAuNDQzLTAuMTczLTEuNTYxLTAuMjUxLTMuMjE5LTAuMTkzLTQuODc3LTAuMjg5LTAuMDE5LTAuNTc4LTAuMDM5LTAuODY3LTAuMDE5LTEuMjE0IDAuNTAxLTIuNDY3IDAuODQ4LTMuMzU0LTAuNjE3LTAuNDQzLTAuNzUyLTAuMjctMS42MTkgMC4yODktMi4yMzYgMS4wMDItMS4wOTkgMi43MTgtMS4zMyA0LjUxMS0xLjI3MiAwLjU3OC0yLjI3NSAxLjYtNC4zOTUgMy4zMzUtNS45OTUgNC43MjMtNC4zNzYgMTEuOTEzLTIuNjk5IDE2LjEzNSAxLjYgMC45MDYgMC45MjUgMCAyLjM5LTEuMjE0IDIuMTAxLTMuNjYzLTAuODY3LTguODEtMy4xNDItMTEuNzU5IDAuNDQzLTAuNTQgMC42NTUtMC45NDUgMS40NDYtMS4yNTMgMi4yNzUgMy40NyAwLjAzOSA3LjU5NS0wLjc5IDEwLjc3NiAwLjU3OCAxLjA4MCAwLjQ2MyAwLjczMyAxLjg3IDAgMi40MjktMi4yOTQgMS43NTQtNS42NjcgMS4zMTEtOC40MDUgMS4yMTQtMS4wMjItMC4wMzktMi4wNDMtMC4wOTYtMy4wNjUtMC4xNTQtMC4wMzkgMS40MjcgMC4wMTkgMi44NzIgMC4yNTEgNC4xMDYgMCAwLjA1OCAwLjAxOSAwLjEzNSAwLjAzOSAwLjIxMnEwLjA1OCAwIDAuMTE2IDBjMi4yNzUgMC4wMzkgNS4yNjMtMC4zODYgNy40MjIgMC4zNjYgMS4wODAgMC4zNjYgMS4xNTcgMS42NTggMC4zMjggMi4yMzYtMC4wNzcgMC44MS0wLjY3NSAxLjU0Mi0xLjcxNiAxLjU0Mi0xLjY3NyAwLTMuMzU0LTAuMDk2LTUuMDUxLTAuMTc0IDAuNzcxIDIuMDQzIDEuOTA4IDMuOTcxIDMuNzU5IDQuODk2IDMuNzIgMS44NTEgNi41MzUtMy40NyA5LjQ4NC00Ljk5MyAxLjYzOS0wLjg0OCAzLjUyOCAwLjUyIDMuMDQ2IDIuNDF6Ij4KICA8L3BhdGg+Cjwvc3ZnPg==')",
        location:
          "url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjIzIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMjMgMzIiPgogIDxwYXRoCiAgICBkPSJNMC4yMzggMTAuNDczcS0wLjAyNi0wLjM3LTAuMDI2LTAuNzQxYy0wLjAxMy0wLjYyMSAwLjAxMy0xLjI1NiAwLjEwNi0xLjg5MXEwLjA1My0wLjM0NCAwLjExOS0wLjY4OCAwLjA3OS0wLjMzMSAwLjE3Mi0wLjY2MSAwLjE1OS0wLjU2OSAwLjM5Ny0xLjExMSAwLjI3OC0wLjYwOCAwLjYyMS0xLjE2NGMxLjU4Ny0yLjQ3MyA0LjMzNy0zLjk5MyA3LjQ5OC00LjA3M3EwLjI1MS0wLjEwNiAwLjUxNi0wLjEwNmgwLjU2OWMwLjQyMy0wLjAyNiAwLjkxMi0wLjA0MCAxLjQwMi0wLjA0MCA0LjA4NiAwIDcuMDYxIDEuMTUgOC44MiAzLjQxMiAxLjY1MyAyLjExNiAyLjM4IDQuOTMyIDIuMTI5IDguMTg1LTAuMDEzIDAuMjI1LTAuMDI2IDAuNDUtMC4wNTMgMC42ODhzLTAuMDY2IDAuNDc2LTAuMTA2IDAuNzI3Yy0wLjAyNiAwLjIyNS0wLjA1MyAwLjQ1LTAuMDkzIDAuNjc0cy0wLjA3OSAwLjQ1LTAuMTMyIDAuNjc0Yy0wLjExOSAwLjYzNS0wLjI1MSAxLjI2OS0wLjQxIDEuODkxcS0wLjA5MyAwLjMzMS0wLjE5OCAwLjY3NGMtMC4wNjYgMC4yMjUtMC4xMTkgMC40NS0wLjE4NSAwLjY3NC0wLjMwNCAwLjk3OS0wLjY2MSAxLjk1Ny0xLjA0NSAyLjkwOS0xLjY2NiA0LjA0Ni00LjExMiA3LjgwMi03LjA0OCAxMC42NTgtMC4xNTkgMC4xNDUtMC4zNDQgMC4yNjQtMC41NTUgMC4zMzFxLTAuMDI2IDAuMDEzLTAuMDUzIDAuMDQwYy0wLjI3OCAwLjI3OC0wLjYzNSAwLjQyMy0xLjAwNSAwLjQyM3MtMC43MjctMC4xNTktMS4wMDUtMC40NWMtNC43MjEtNS4xNDQtOC4yNzgtMTEuNDI1LTkuNzcyLTE3LjI0M3EtMC4wNTMtMC4xOTgtMC4xMDYtMC40MjNjLTAuMTk4LTAuNzgtMC4zODMtMS42NjYtMC40ODktMi42MThxLTAuMDQwLTAuMzctMC4wNjYtMC43NTR6TTQuMDQ2IDExLjI1M2MwLjAxMyAwLjIzOCAwLjA0MCAwLjQ3NiAwLjA3OSAwLjcxNCAwLjA0MCAwLjIyNSAwLjA3OSAwLjQ4OSAwLjEzMiAwLjcyNyAwLjAxMyAwLjA3OSAwLjAyNiAwLjE4NSAwLjA1MyAwLjI2NCAwLjE5OCAwLjkyNiAwLjQ4OSAxLjkwNCAwLjg3MyAyLjk0OSAxLjU0NyA0LjIxOCAzLjc5NSA4LjE3MiA2LjU0NSAxMS41MDQgMS4yNjktMS4zODggMi40MzMtMi45NzUgMy40MjUtNC43MjEgMS4wMDUtMS43ODUgMS44NTEtMy42ODkgMi40NDYtNS42NDZxMC4xMDYtMC4zMDQgMC4xODUtMC42MDggMC4wOTMtMC4zMDQgMC4xNzItMC42MDggMC4yMzgtMC44ODYgMC4zOTctMS43NTkgMC4wNTMtMC4zMDQgMC4xMDYtMC42MDhjMC4wMTMtMC4xMTkgMC4wNDAtMC4yMjUgMC4wNDAtMC4zNDQgMC4wMjYtMC4wOTMgMC4wMjYtMC4xODUgMC4wNDAtMC4yNzhxMC4wNDAtMC4yMTIgMC4wNTMtMC40MWMwLjMwNC0yLjc5LTAuMDkzLTQuODkzLTEuMTc3LTYuMjE1LTEuMjMtMS41MzQtMy4xNi0yLjI2MS01LjkxMS0yLjI2MXEtMC4zODMgMC0wLjc1NCAwLjAxMy0wLjExOSAwLjAyNi0wLjIzOCAwLjAyNmgtMC4yNjRxLTAuMjI1IDAuMDkzLTAuNDYzIDAuMDkzaC0wLjE5OGMtMi4yMjEgMC00LjA3MyAxLjEzNy00Ljk3MiAyLjkzNi0wLjE4NSAwLjM1Ny0wLjM0NCAwLjc0LTAuNDM2IDEuMTVxLTAuMDUzIDAuMjM4LTAuMDkzIDAuNDc2Yy0wLjAxMyAwLjA1My0wLjAxMyAwLjEwNi0wLjAyNiAwLjE0NS0wLjAxMyAwLjIxMi0wLjA0MCAwLjQyMy0wLjA2NiAwLjY0OC0wLjA0MCAwLjU4Mi0wLjAyNiAxLjE5IDAuMDUzIDEuODEyeiI+CiAgPC9wYXRoPgogIDxwYXRoCiAgICBkPSJNNy4wMjEgMTMuMDI1Yy0wLjIzOC0wLjUwMi0wLjM4My0xLjA0NS0wLjQxLTEuNjI2cTAtMC4yMzggMC0wLjQ3NiAwLjAxMy0wLjAyNiAwLjAxMy0wLjA1MyAwLjAyNi0wLjI2NCAwLjA2Ni0wLjUxNiAwLjA0MC0wLjIxMiAwLjEwNi0wLjQyM2MwLjU0Mi0xLjg5MSAyLjIyMS0zLjA4MSA0LjQxNy0yLjk4OGgwLjEzMmMxLjgxMiAwIDMuNTU3IDAuNzE0IDQuNTYyIDEuODc4IDAuNzU0IDAuODQ2IDEuMDU4IDEuOTA0IDAuODk5IDMuMDQxcS0wLjAxMyAwLjE0NS0wLjA1MyAwLjI5MWMtMC4wOTMgMC40MzYtMC4yNTEgMC44NDYtMC40ODkgMS4yNDNxLTAuMTMyIDAuMjM4LTAuMzA0IDAuNDUtMC4xNTkgMC4yMjUtMC4zNTcgMC40MzZjLTAuNDIzIDAuNDUtMC45NTIgMC44NDYtMS41MjEgMS4xMzdxLTAuMzgzIDAuMTg1LTAuNzggMC4zMTdjLTAuMzMxIDAuMTE5LTAuNjg4IDAuMTk4LTEuMDMxIDAuMjM4cS0wLjI2NCAwLjAyNi0wLjUyOSAwLjAyNi0wLjE3MiAwLTAuMzMxLTAuMDEzYy0xLjE3Ny0wLjA3OS0yLjM1NC0wLjYwOC0zLjI1My0xLjQyOC0wLjI3OC0wLjI1MS0wLjUyOS0wLjUyOS0wLjc0LTAuODItMC4xNTktMC4yMjUtMC4yOTEtMC40NjMtMC4zOTctMC43MTR6TTkuMjQzIDEyLjM1YzAuMzgzIDAuNzkzIDEuMTUgMS4zODggMi4yMjEgMS4zODggMC40MjMgMCAwLjg3My0wLjA3OSAxLjI4My0wLjIyNSAwLjI1MS0wLjA3OSAwLjQ3Ni0wLjE4NSAwLjcwMS0wLjMxN3EwLjI3OC0wLjE3MiAwLjUwMi0wLjM4MyAwLjEzMi0wLjEzMiAwLjI1MS0wLjI3OGMwLjE5OC0wLjI2NCAwLjM0NC0wLjU1NSAwLjM4My0wLjg4NiAwLjA3OS0wLjU1NS0wLjA0MC0xLjAzMS0wLjM5Ny0xLjQxNS0wLjY3NC0wLjc4LTEuOTctMS4wNTgtMi44NjktMS4wNThoLTAuMjc4Yy0xLjI4MyAwLTEuODc4IDAuNzE0LTIuMDM2IDEuNTA3LTAuMDQwIDAuMTQ1LTAuMDUzIDAuMzA0LTAuMDUzIDAuNDVxMCAwLjAyNiAwLjAxMyAwLjA1MyAwIDAuMjc4IDAuMDY2IDAuNTU1YzAuMDQwIDAuMjEyIDAuMTE5IDAuNDIzIDAuMjEyIDAuNjA4eiI+CiAgPC9wYXRoPgo8L3N2Zz4=')",
      },
      borderWidth: {
        16: '16px',
        18: '18px',
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
        green: {
          50: '#d7e98d',
          100: '#bfd858',
          200: '#a7cc09',
          300: '#96ba00',
          400: '#85a500',
          500: '#7b9c00',
          600: '#7b9c00',
          700: '#5f7800',
          800: '#5c7200',
          900: '#415100',
        },
      },
      fontFamily: {
        sans: ['Karla', ...defaultTheme.fontFamily.sans],
        display: ['Berlin Sans', 'Karla', ...defaultTheme.fontFamily.sans],
      },
      height: {
        '30v': '30vh',
        '55v': '55vh',
      },
      keyframes: {
        'contact-sky': {
          '0%': {
            rotate: '10deg',
          },
          '100%': {
            rotate: '-10deg',
          },
        },
        'contact-envelop': {
          '0%': {
            opacity: '0',
            transform: 'translate(5%, 5%) scale(0)',
          },
          '15%': {
            opacity: '1',
            transform: 'translate(5%, 5%) scale(0.11)',
          },
          '20%': {
            opacity: '1',
            transform: 'translate(5%, 5%) scale(0.1)',
          },
          '30%': {
            opacity: '1',
            transform: 'translate(5%, 5%) scale(0.1)',
          },
          '100%': {
            opacity: '1',
            transform:
              'translate(5%, 16.5%) rotate(88deg) skew(0, -43deg) scale(0.025, 0.05)',
          },
        },
        'contact-pen': {
          '0%': {
            rotate: '1deg',
          },
          '20%': {
            rotate: '-2deg',
          },
          '50%': {
            rotate: '2deg',
          },
          '75%': {
            rotate: '-1deg',
          },
          '100%': {
            rotate: '1deg',
          },
        },
        'contact-ring': {
          '0%': {
            rotate: '-2deg',
          },
          '50%': {
            rotate: '2deg',
          },
          '100%': {
            rotate: '-2deg',
          },
        },
        'contact-light-up': {
          '0%': {
            opacity: 0,
          },
          '50%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        gelatine: {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '25%': { transform: 'scale(0.85, 1.15)' },
          '50%': { transform: 'scale(1.15, 0.85)' },
          '75%': { transform: 'scale(0.92, 1.02)' },
        },
        'fly-in': {
          '0%': { transform: 'translateY(120%) rotate(30deg)' },
          '70%': { transform: 'translateY(120%) rotate(30deg)' },
          '100%': { transform: 'translateY(0%) rotate(0deg)' },
        },
        'zoom-in': {
          '0%': {
            scale: '1',
          },
          '100%': {
            scale: '1.1',
          },
        },
      },
      transitionProperty: {
        clip: 'clip-path',
        'bg-size': 'background-size',
      },
      transitionTimingFunction: {
        overshoot: 'cubic-bezier(.38,1.24,.58,.99)',
        anticipate: 'cubic-bezier(.81,.02,.95,-0.34)',
        out: 'cubic-bezier(.25,1,.43,1)',
        in: 'cubic-bezier(.5,0,.55,0)',
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
  plugins: [FormKitVariants, require('@tailwindcss/container-queries')],
}
