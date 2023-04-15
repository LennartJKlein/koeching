import VueGtag from 'vue-gtag'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'G-RDWEGZH8QG',
    },
  })
})
