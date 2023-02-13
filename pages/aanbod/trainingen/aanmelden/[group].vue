<script setup lang="ts">
import { Ref, ref } from 'vue'
import type { ApiTrainingTraining } from '~/types/schemas'
import { useDateFormat } from '@vueuse/core'

const { find } = useStrapi()
const route = useRoute()
const {
  data: [training],
} = await find<ApiTrainingTraining>('trainings', {
  filters: {
    slug: {
      $eq: route.params.training,
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
  },
})

const media = [
  training.attributes.thumbnail.data ? training.attributes.thumbnail.data : [],
  ...(training.attributes.photos.data ? training.attributes.photos.data : []),
]

const goBack = function () {
  const router = useRouter()
  router.push(`/aanbod/trainingen/${route.params.training}`)
}

const openDetails: Ref<string[]> = ref([])
const toggleDetails = (description: string) => {
  openDetails.value.indexOf(description) >= 0
    ? openDetails.value.splice(openDetails.value.indexOf(description))
    : openDetails.value.push(description)
}

const readableDate = function (date: string) {
  return useDateFormat(date, 'D MMMM YYYY, HH:mm uur').value.replaceAll('"', '')
}

const { $markdown } = useNuxtApp()
const { classes: mdClasses } = useMdStyles()
</script>

<template>
  <Modal
    :aria-label="`Aanmelden voor ${training.attributes.name}`"
    id="trainingParticipateModal"
    open
    @close="goBack"
  >
    <template v-slot:heading>
      <h1 class="mb-3 flex flex-col font-display text-3xl font-bold leading-none text-sky-900 md:text-4xl">
        <span
          class="order-1 block font-sans text-sm uppercase tracking-wide text-sky-300"
        >
          {{ training.attributes.name }}
        </span>
        Aanmelden
      </h1>
      <p
        v-if="training.attributes.intro"
        class="text-lg font-bold text-sky-500"
      >
        {{ training.attributes.intro }}
      </p>
    </template>
  </Modal>
</template>
