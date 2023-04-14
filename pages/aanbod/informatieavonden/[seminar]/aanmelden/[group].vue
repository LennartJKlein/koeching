<script setup lang="ts">
import type { ApiSeminarSeminar } from '~/types/schemas'

const { find } = useStrapi()
const route = useRoute()
const {
  data: [seminar],
} = await find<ApiSeminarSeminar>('seminars', {
  filters: {
    slug: {
      $eq: route.params.seminar,
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
    seminar.attributes.seo_title || seminar.attributes.name
  } | bij Koeching`,
  meta: [
    {
      property: 'og:title',
      content: `Aanmelden voor ${
        seminar.attributes.seo_title || seminar.attributes.name
      } | bij Koeching`,
    },
    {
      name: 'description',
      content: 'Meld jou, je kind of gezin vandaag nog aan voor deze informatieavond!',
    },
    {
      property: 'og:description',
      content: 'Meld jou, je kind of gezin vandaag nog aan voor deze informatieavond!',
    },
    {
      property: 'keywords',
      content:
        'aanmelden koeching, aanmelden voor informatieavond, aanmelden voor seminar',
    },
  ],
})

const group = seminar.attributes.moments
  .filter((moment: any) => moment.open)
  .find((moment: any) => moment.id == route.params.group)
if (!group) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Informatieavond bestaat niet of is niet langer beschikbaar',
  })
}

const goBack = function () {
  const router = useRouter()
  router.push(`/aanbod/informatieavonden/${route.params.seminar}`)
}
</script>

<template>
  <Modal
    :aria-label="`Aanmelden voor ${seminar.attributes.name}`"
    id="seminarParticipateModal"
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
        Aanmeldformulier voor de informatieavond: {{ seminar.attributes.name }}.
      </h1>
    </template>
    <ParticipateForm
      :group="group"
      :seminar="seminar"
    />
  </Modal>
</template>
