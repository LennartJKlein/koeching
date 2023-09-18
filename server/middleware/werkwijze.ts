export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  if (url.pathname === '/__nuxt_error') return

  if (url.pathname == '/werkwijze') {
    sendRedirect(event, '/aanbod/trajecten/werkwijze-en-procedure')
  }
})
