export default {
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  components: true,
  env: {
    STRAPI_URL: process.env.STRAPI_URL || 'http://localhost:1337'
  },
  head: {
    title: 'Koeching',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/strapi',
  ],
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  strapi: {
    entities: [
      'animals',
      'coaches',
      'colleagues',
      'memberships',
      'messages',
      'products',
      'users',
    ],
    url: process.env.STRAPI_URL || 'http://localhost:1337',
  },
  target: 'static',
}
