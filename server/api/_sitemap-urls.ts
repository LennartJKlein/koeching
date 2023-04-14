export default cachedEventHandler(
  async (e) => {
    function mapToSitemapEntries(
      items: [],
      contentType: string
    ): { loc: string; lastmod: string }[] {
      let pathPrefix = ''
      if (contentType === 'activities') pathPrefix = '/activiteiten/'
      if (contentType === 'animals') pathPrefix = '/ontdek/dieren/'
      if (contentType === 'coaches') pathPrefix = '/ontdek/coaches/'
      if (contentType === 'interventions') pathPrefix = '/interventies/'
      if (contentType === 'programs') pathPrefix = '/trajecten/'
      if (contentType === 'seminars') pathPrefix = '/informatieavonden/'
      if (contentType === 'trainings') pathPrefix = '/trainingen/'
      return items.map((p: any) => {
        return {
          loc: `${pathPrefix}${p.attributes.slug}`,
          lastmod: p.attributes.updatedAt,
        }
      })
    }

    // Get all dynamic content
    const config = useRuntimeConfig()
    let [
      { data: activities = [] },
      { data: animals = [] },
      { data: coaches = [] },
      { data: interventions = [] },
      { data: programs = [] },
      { data: seminars = [] },
      { data: trainings = [] },
    ] = await Promise.all([
      $fetch<any>(`${config.strapi.url}/api/activities`),
      $fetch<any>(`${config.strapi.url}/api/animals`),
      $fetch<any>(`${config.strapi.url}/api/coaches`),
      $fetch<any>(`${config.strapi.url}/api/interventions`),
      $fetch<any>(`${config.strapi.url}/api/programs`),
      $fetch<any>(`${config.strapi.url}/api/seminars`),
      $fetch<any>(`${config.strapi.url}/api/trainings`),
    ])

    // Return objects for sitemap
    activities = mapToSitemapEntries(activities, 'activities')
    animals = mapToSitemapEntries(animals, 'animals')
    coaches = mapToSitemapEntries(coaches, 'coaches')
    interventions = mapToSitemapEntries(interventions, 'interventions')
    programs = mapToSitemapEntries(programs, 'programs')
    seminars = mapToSitemapEntries(seminars, 'seminars')
    trainings = mapToSitemapEntries(trainings, 'trainings')

    const sitemapEntries = [
      ...activities,
      ...animals,
      ...coaches,
      ...interventions,
      ...programs,
      ...seminars,
      ...trainings,
    ]

    console.log(sitemapEntries)

    return sitemapEntries
  },
  {
    name: 'sitemap-dynamic-urls',
    maxAge: 60 * 60 * 12, // cache URLs for 12 hours
  }
)
