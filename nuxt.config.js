export default {
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.BACKEND_URL || 'http://localhost:1337/graphql'
      }
    }
  },
  axios: {},
  build: {
  },
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  css: [
  ],
  components: true,
  env: {
    strapiBaseUri: process.env.API_URL || 'http://localhost:1337'
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
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
  ],
  plugins: [
  ],
  pwa: {
    manifest: {
      lang: 'en'
    }
  }
}
