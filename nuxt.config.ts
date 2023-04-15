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
    '/agenda.php': { redirect: '/aanbod' },
    '/algemene-voorwaarden.php': { redirect: '/algemene-voorwaarden' },
    '/archief.php': { redirect: '/nieuws' },
    '/contact.php': { redirect: '/contact' },
    '/hetteam.php': { redirect: '/ontdek' },
    '/leren': { redirect: '/aanbod' },
    '/mijnaanpak.php': { redirect: '/aanbod' },
    '/opleidingen.php': { redirect: '/aanbod' },
    '/res/docs/privacyreglement-koeching-2020.pdf': { redirect: '/privacyreglement' },
    '/res/docs/web-privacy-policy-koeching-2020.pdf': { redirect: '/privacyverklaring' },
    '/tarieven.php': { redirect: '/tarieven' },
    '/therapie': { redirect: '/aanbod' },
    '/workshops.php': { redirect: '/aanbod' },
  },
  strapi: {
    url: process.env.STRAPI_URL || 'http://127.0.0.1:1337',
  },
  sitemap: {
    siteUrl: 'https://koeching.nl',
  },
})
