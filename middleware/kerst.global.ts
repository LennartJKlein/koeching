export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to, from)
  if (to.path === '/kerst') {
    if (process.client)
      window.location.href =
        'https://657598261b4717161c4c4544--lovely-cocada-f705bb.netlify.app/'
  }
})
