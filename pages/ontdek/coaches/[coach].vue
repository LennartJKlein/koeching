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
  populate: {
    interventions: '*',
    photos: '*',
    programs: '*',
    seminars: '*',
    trainings: '*',
  },
})

const goBack = function () {
  const router = useRouter()
  router.push('/ontdek')
}

const { $markdown } = useNuxtApp()
const { classes: mdClasses } = useMdStyles()
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
          Coach
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
            'rounded-xl object-cover',
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
        :class="[...mdClasses, 'mb-14']"
        v-html="$markdown.render(coach.attributes.bio)"
      />
      <template v-if="coach.attributes.programs.data.length">
        <h4 class="mt-8 mb-3 font-display text-2xl font-bold leading-none text-brown-200">
          Trajecten met deze coach
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
        <h4 class="mt-8 mb-3 font-display text-2xl font-bold leading-none text-brown-200">
          Trainingen door deze coach
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
        <h4 class="mt-8 mb-3 font-display text-2xl font-bold leading-none text-brown-200">
          Informatieavonden met deze coach
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
        <h4 class="mt-8 mb-3 font-display text-2xl font-bold leading-none text-sky-400">
          Interventies met deze coach
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
