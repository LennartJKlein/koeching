export default function (to: any, from: any, savedPosition: any) {
  if (
    (from.path.includes('/ontdek') && to.path.includes('/ontdek')) ||
    (from.path.includes('/aanbod') && to.path.includes('/aanbod'))
  ) {
    return savedPosition
  } else {
    return {
      left: 0,
      top: 0,
      behaviour: 'smooth',
    }
  }
}
