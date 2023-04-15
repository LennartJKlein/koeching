import { $fetch } from 'ofetch'

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
    '~/assets/css/fonts/karla.css',
    '~/assets/css/fonts/berlin-sans.css',
  ],
  image: {
    cloudinary: {
      baseURL:
        process.env.CLOUDINARY_URL ||
        'https://res.cloudinary.com/deppvwtko/image/upload/',
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
    'nuxt-simple-sitemap',
  ],
  routeRules: {
    '/hetteam.php': { redirect: '/ontdek' },
    '/mijnaanpak.php': { redirect: '/aanbod' },
    '/archief.php': { redirect: '/nieuws' },
    '/tarieven.php': { redirect: '/tarieven' },
    '/contact.php': { redirect: '/contact' },
    '/algemene-voorwaarden.php': { redirect: '/algemene-voorwaarden' },
    '/res/docs/privacyreglement-koeching-2020.pdf': { redirect: '/privacyreglement' },
    '/res/docs/web-privacy-policy-koeching-2020.pdf': { redirect: '/privacyverklaring' },
  },
  strapi: {
    url: process.env.STRAPI_URL || 'http://127.0.0.1:1337',
  },
  sitemap: {
    siteUrl: 'https://koeching.nl',
  },
})
