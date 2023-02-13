// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/fonts/oxygen.css',
    '~/assets/css/fonts/berlin-sans.css',
  ],
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/deppvwtko/image/upload/',
      modifiers: {
        fit: 'cover',
        quality: 'auto:best',
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@formkit/nuxt',
    '@nuxt/image-edge',
    '@nuxtjs/strapi',
    '@vueuse/nuxt',
  ],
  strapi: {
    url: process.env.STRAPI_URL || 'http://127.0.0.1:1337',
  },
})
