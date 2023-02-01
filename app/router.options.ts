import type { RouterOptions } from '@nuxt/schema'

export default <RouterOptions>{
  /** Prevent scroll to top for these routes */
  scrollBehavior(to, from, savedPosition) {
    if (
      (from.path.includes('/ontdek') && to.path.includes('/ontdek')) ||
      (from.path.includes('/aanbod') && to.path.includes('/aanbod'))
    ) {
      return savedPosition
    } else {
      return {
        left: 0,
        top: 0,
      }
    }
  },
}
