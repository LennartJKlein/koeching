<script setup lang="ts">
import type { ApiActivityActivity } from '@/typess'

const { find } = useStrapi()
const route = useRoute()
const {
  data: [activity],
} = await find<ApiActivityActivity>('activities', {
  filters: {
    slug: {
      $eq: route.params.activity,
    },
  },
  populate: {
    coaches: {
      populate: '*',
    },
    interventions: '*',
    photos: '*',
    thumbnail: '*',
    moments: '*',
    pricings: '*',
    seo_keywords: '*',
  },
})

useHead({
  title: `Aanmelden voor ${
    activity.attributes.seo_title || activity.attributes.name
  } | bij Koeching`,
  meta: [
    {
      property: 'og:title',
      content: `Aanmelden voor ${
        activity.attributes.seo_title || activity.attributes.name
      } | bij Koeching`,
    },
    {
      name: 'description',
      content: 'Meld jou, je kind of gezin vandaag nog aan voor deze activiteit!',
    },
    {
      property: 'og:description',
      content: 'Meld jou, je kind of gezin vandaag nog aan voor deze activiteit!',
    },
    {
      property: 'keywords',
      content: 'aanmelden koeching, aanmelden voor activiteiten op boerderij',
    },
  ],
})

const group = activity.attributes.moments
  .filter((moment: any) => moment.open)
  .find((moment: any) => moment.id == route.params.group)
if (!group) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Activiteit bestaat niet of is niet langer beschikbaar',
  })
}

const goBack = function () {
  const router = useRouter()
  router.push(`/aanbod/activiteiten/${route.params.activity}`)
}
</script>

<template>
  <Modal
    :aria-label="`Aanmelden voor ${activity.attributes.name}`"
    id="activityParticipateModal"
    open
    narrow
    bg-classes="bg-brown-50"
    heading-classes="bg-brown-100"
    draggable-classes="fill-brown-300"
    @close="goBack"
  >
    <template v-slot:heading>
      <h1 class="-mt-3 flex flex-col font-bold text-brown-600">
        <span
          v-if="group.title"
          class="mb-3 block font-display text-4xl leading-[0.95] text-black"
        >
          {{ group.title }}
        </span>
        Aanmeldformulier voor deze activiteit: {{ activity.attributes.name }}.
      </h1>
    </template>
    <ParticipateForm
      :group="group"
      :activity="activity"
    />
  </Modal>
</template>
