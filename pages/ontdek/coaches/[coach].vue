<script setup lang="ts">
import type { ApiCoachCoach } from '~/types/schemas'

const { find } = useStrapi()
const route = useRoute()
const {
  data: [coach],
} = await find<ApiCoachCoach>('coaches', {
  filters: {
    slug: {
      $eq: route.params.coach,
    },
  },
  populate: '*',
})
// const coach = { attributes: { name: "Annet" } };

const goBack = function () {
  const router = useRouter()
  router.push('/ontdek')
}

const { $markdown } = useNuxtApp()
const { classes: mdClasses } = useMdStyles()
</script>

<template>
  <Modal
    :aria-label="`Meer over ${coach.attributes.name}`"
    id="coachModal"
    open
    @close="goBack"
  >
    <template v-slot:heading>
      <h1
        v-if="coach.attributes.name"
        class="mb-3 font-display text-3xl font-bold leading-none text-sky-900 md:text-4xl"
      >
        {{ coach.attributes.name }}
      </h1>
      <p
        v-if="coach.attributes.intro"
        class="text-lg font-bold text-sky-500"
      >
        {{ coach.attributes.intro }}
      </p>
    </template>
    <section>
      <div
        v-if="coach.attributes.photos.data"
        :class="[
          'my-5',
          coach.attributes.photos.data.length > 1 &&
            '-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-scroll px-5 md:snap-proximity',
        ]"
        role="list"
      >
        <img
          v-for="photo in coach.attributes.photos.data"
          :class="[
            coach.attributes.photos.data.length > 1
              ? 'aspect-square w-10/12 flex-shrink-0 snap-start sm:aspect-[4/3]'
              : 'aspect-[4/3] w-full',
            'rounded-xl object-cover',
          ]"
          role="listitem"
          :src="photo.attributes.url"
        />
      </div>
      <div
        v-if="coach.attributes.bio"
        :class="mdClasses"
        v-html="$markdown.render(coach.attributes.bio)"
      />
      <p class="my-12 mx-3 italic">Todo: methodes die deze coach beheerst</p>
      <p class="my-12 mx-3 italic">Todo: diensten/producten die deze coach faciliteert</p>
    </section>
  </Modal>
</template>
