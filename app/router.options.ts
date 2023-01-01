import type { RouterOptions } from '@nuxt/schema';

export default <RouterOptions> { 
  /** Prevent scroll to top for these routes */
  scrollBehavior(to, from, savedPosition) {
    if (
      from.path === '/ontdek' ||
      to.path.includes('/ontdek/coaches') ||
      to.path.includes('/ontdek/dieren')
    ) {
      return savedPosition
    }
  }
}