import sanitizeHtml from 'sanitize-html'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('sanitize', (dirty: string, options?: any): string => {
    return sanitizeHtml(dirty, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    })
  })
})
