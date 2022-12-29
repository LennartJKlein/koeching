// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '~/assets/css/main.css',
    '~/assets/css/fonts/oxygen.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/image-edge',
    '@nuxtjs/strapi',
  ],
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
  },
})
