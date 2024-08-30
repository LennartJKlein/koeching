<script setup lang="ts">
import type { ApiCoachCoach } from '@/types'

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
  populate: {
    interventions: '*',
    photos: '*',
    programs: '*',
    seminars: '*',
    trainings: '*',
    seo_keywords: '*',
  },
})

useHead({
  title: `${coach.attributes.name} | Coach bij de praktijk van Koeching`,
  meta: [
    {
      property: 'og:title',
      content: `${coach.attributes.name} | Coach bij de praktijk van Koeching`,
    },
    {
      name: 'description',
      content: coach.attributes.intro,
    },
    {
      property: 'og:description',
      content: coach.attributes.intro,
    },
  ],
})

const goBack = function () {
  const router = useRouter()
  router.push('/ontdek')
}

const { classes: contentClasses } = useContentStyles()
const { trimImgSrc } = useImgUtils()
</script>

<template>
  <Modal
    :aria-label="`Meer over ${coach.attributes.name}`"
    id="coachModal"
    open
    :overflow-header="
      coach.attributes.photos.data && coach.attributes.photos.data.length > 0
    "
    @close="goBack"
  >
    <template v-slot:heading>
      <h1
        v-if="coach.attributes.name"
        class="mb-3 flex flex-col font-display text-3xl font-bold leading-none text-sky-900 md:text-4xl"
      >
        <span
          class="order-1 block font-sans text-sm uppercase tracking-wide text-sky-300"
        >
          {{ coach.attributes.external ? 'Externe' : undefined }} Coach
        </span>
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
        <NuxtImg
          v-for="photo in coach.attributes.photos.data"
          :class="[
            coach.attributes.photos.data.length > 1
              ? 'aspect-square w-10/12 flex-shrink-0 snap-start sm:aspect-[5/3]'
              : 'aspect-[5/3] w-full',
            'overflow-hidden rounded-xl object-cover',
          ]"
          :placeholder="[800, 600, 10]"
          :src="trimImgSrc(photo.attributes.url)"
          height="600"
          provider="cloudinary"
          role="listitem"
          width="800"
        />
      </div>
      <div
        v-if="coach.attributes.bio"
        :class="[...contentClasses, 'mb-14']"
        v-html="$sanitize(coach.attributes.bio)"
      />
      <template v-if="coach.attributes.programs.data.length">
        <h4 class="mb-3 mt-8 font-display text-2xl font-bold leading-none text-brown-200">
          Deze trajecten begeleid ik
        </h4>
        <div
          class="mb-12 flex flex-wrap items-start justify-start gap-2 md:mt-4 md:gap-4"
        >
          <Button
            v-for="program in coach.attributes.programs.data"
            class="min-w-fit"
            :label="`Meer info over ${program.attributes.name}`"
            small
            squared
            color="brown-200"
            :to="`/aanbod/trajecten/${program.attributes.slug}`"
          >
            {{ program.attributes.name }}
          </Button>
        </div>
      </template>
      <template v-if="coach.attributes.trainings.data.length">
        <h4 class="mb-3 mt-8 font-display text-2xl font-bold leading-none text-brown-200">
          Deze trainingen geef ik
        </h4>
        <div
          class="mb-12 flex flex-wrap items-start justify-start gap-2 md:mt-4 md:gap-4"
        >
          <Button
            v-for="training in coach.attributes.trainings.data"
            class="min-w-fit"
            color="brown-200"
            :label="`Meer info over ${training.attributes.name}`"
            small
            squared
            :to="`/aanbod/trajecten/${training.attributes.slug}`"
          >
            {{ training.attributes.name }}
          </Button>
        </div>
      </template>
      <template v-if="coach.attributes.seminars.data.length">
        <h4 class="mb-3 mt-8 font-display text-2xl font-bold leading-none text-brown-200">
          Mijn informatieavonden
        </h4>
        <div
          class="mb-12 flex flex-wrap items-start justify-start gap-2 md:mt-4 md:gap-4"
        >
          <Button
            v-for="seminar in coach.attributes.seminars.data"
            class="min-w-fit"
            color="brown-200"
            :label="`Meer info over ${seminar.attributes.name}`"
            small
            squared
            :to="`/aanbod/informatieavonden/${seminar.attributes.slug}`"
          >
            {{ seminar.attributes.name }}
          </Button>
        </div>
      </template>
      <Divider color="sky-100" />
      <template v-if="coach.attributes.interventions.data.length">
        <h4 class="mb-3 mt-8 font-display text-2xl font-bold leading-none text-sky-400">
          Ik beheers deze interventies
        </h4>
        <div
          class="mb-12 flex flex-wrap items-start justify-start gap-2 md:mt-4 md:gap-4"
        >
          <Button
            v-for="intervention in coach.attributes.interventions.data"
            class="min-w-fit"
            :label="`Meer info over ${intervention.attributes.name}`"
            small
            squared
            :to="`/aanbod/interventies/${intervention.attributes.slug}`"
          >
            {{ intervention.attributes.name }}
          </Button>
        </div>
      </template>
    </section>
  </Modal>
</template>
