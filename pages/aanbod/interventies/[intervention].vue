<script setup lang="ts">
import type { ApiInterventionIntervention } from '@/typess'

const { find } = useStrapi()
const route = useRoute()
const {
  data: [intervention],
} = await find<ApiInterventionIntervention>('interventions', {
  filters: {
    slug: {
      $eq: route.params.intervention,
    },
  },
  populate: {
    coaches: {
      populate: '*',
    },
    programs: '*',
    trainings: '*',
    seminars: '*',
    photos: '*',
    pricings: '*',
    seo_keywords: '*',
  },
})

useHead({
  title: `${
    intervention.attributes.seo_title || intervention.attributes.name
  } | Interventie die Koeching aanbiedt`,
  meta: [
    {
      property: 'og:title',
      content: `${
        intervention.attributes.seo_title || intervention.attributes.name
      } | Interventie die Koeching aanbiedt`,
    },
    {
      name: 'description',
      content: intervention.attributes.seo_description || intervention.attributes.intro,
    },
    {
      property: 'og:description',
      content: intervention.attributes.seo_description || intervention.attributes.intro,
    },
    {
      property: 'keywords',
      content: intervention.attributes.seo_keywords
        ?.map((k: any) => k.keyword)
        .join(', '),
    },
  ],
})

const goBack = function () {
  const router = useRouter()
  router.push('/aanbod')
}

const { classes: contentClasses } = useContentStyles()
const { trimImgSrc } = useImgUtils()
</script>

<template>
  <Modal
    :aria-label="`Meer over ${intervention.attributes.name}`"
    id="interventionModal"
    open
    :overflow-header="
      intervention.attributes.photos.data &&
      intervention.attributes.photos.data.length > 0
    "
    @close="goBack"
  >
    <template v-slot:heading>
      <h1
        v-if="intervention.attributes.name"
        class="mb-3 flex flex-col font-display text-3xl font-bold leading-none text-sky-900 md:text-4xl"
      >
        <span
          class="order-1 block font-sans text-sm uppercase tracking-wide text-sky-300"
        >
          Interventie
        </span>
        {{ intervention.attributes.name }}
      </h1>
      <p
        v-if="intervention.attributes.intro"
        class="text-lg font-bold text-sky-500"
      >
        {{ intervention.attributes.intro }}
      </p>
    </template>
    <section>
      <div
        v-if="intervention.attributes.photos.data"
        :class="[
          'my-5',
          intervention.attributes.photos.data.length > 1 &&
            '-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-scroll px-5 md:snap-proximity',
        ]"
        role="list"
      >
        <NuxtImg
          v-for="photo in intervention.attributes.photos.data"
          :placeholder="[800, 600, 10]"
          :src="trimImgSrc(photo.attributes.url)"
          class="w-[80vw] flex-shrink-0 snap-start overflow-hidden rounded-xl object-cover sm:h-60 sm:w-auto md:h-80"
          height="600"
          provider="cloudinary"
          role="listitem"
          width="800"
        />
      </div>
      <div
        v-if="intervention.attributes.content"
        :class="contentClasses"
        v-html="$sanitize(intervention.attributes.content)"
      />
      <template v-if="intervention.attributes.programs.data.length">
        <h4 class="mb-3 mt-14 font-display text-2xl font-bold leading-none text-sky-400">
          Trajecten met deze interventie
        </h4>
        <div
          class="mb-12 flex flex-wrap items-start justify-start gap-2 md:mt-4 md:gap-4"
        >
          <Button
            v-for="program in intervention.attributes.programs.data"
            class="w-min-fit text-white"
            :label="`Meer info over ${program.attributes.name}`"
            small
            squared
            :to="`/aanbod/trajecten/${program.attributes.slug}`"
          >
            {{ program.attributes.name }}
          </Button>
        </div>
      </template>
      <template v-if="intervention.attributes.coaches.data.length">
        <h4 class="mb-3 mt-14 font-display text-2xl font-bold leading-none text-sky-400">
          Coaches die dit faciliteren
        </h4>
        <div
          :class="[
            '-mx-5 mb-10 mt-4 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 md:grid',
            intervention.attributes.coaches.data.length > 4 ||
            intervention.attributes.coaches.data.length < 4
              ? 'md:grid-cols-3'
              : 'md:grid-cols-4',
          ]"
          role="list"
        >
          <PhotoCard
            v-for="coach in intervention.attributes.coaches.data"
            :label="`Lees meer over ${coach.attributes.name}`"
            :image="
              coach.attributes.photos.data &&
              coach.attributes.photos.data[0].attributes.url
            "
            placeholder="person"
            role="listitem"
            title-small
            :title="coach.attributes.name"
            :to="`/ontdek/coaches/${coach.attributes.slug}`"
            class="w-9/12 flex-shrink-0 snap-start md:w-auto"
            color="white"
            modal="coachModal"
          />
        </div>
      </template>
      <dl
        v-if="intervention.attributes.pricings.data || intervention.attributes.location"
        class="mb-12 mt-8 flex flex-col gap-3 md:flex-row"
      >
        <div
          v-if="intervention.attributes.pricings.data.length"
          class="border-pencil-sky-500 flex-1"
        >
          <dt
            class="flex items-center gap-1 font-bold before:block before:h-4 before:w-4 before:bg-euro before:bg-contain before:bg-center before:bg-no-repeat before:content-['']"
          >
            {{ intervention.attributes.pricings.data.length > 1 ? 'Tarieven' : 'Tarief' }}
          </dt>
          <template v-for="price in intervention.attributes.pricings.data">
            <dd class="ml-5 mt-1 leading-snug">{{ price.attributes.description }}</dd>
          </template>
          <p v-if="!intervention.attributes.pricings.data.length">
            Het tarief is nog niet bekend
          </p>
        </div>
        <div
          v-if="intervention.attributes.location"
          class="border-pencil-brown-300 flex-1"
        >
          <dt
            class="flex items-center gap-1 font-bold before:block before:h-4 before:w-4 before:bg-location before:bg-contain before:bg-center before:bg-no-repeat before:content-['']"
          >
            Locatie
          </dt>
          <dd class="ml-5 mt-1 leading-snug">{{ intervention.attributes.location }}</dd>
        </div>
      </dl>
      <div
        class="z-1 border-pencil-black relative -mx-6 flex flex-col items-center justify-between gap-5 bg-brown-300 py-10 md:flex-row md:px-4"
      >
        <span class="font-display text-xl leading-none text-white md:text-2xl lg:text-3xl"
          >Past deze interventie bij jouw vraag?</span
        >
        <Button
          color="brown-200"
          class="flex-shrink-0"
          label="Contact opnemen"
        >
          <Icon
            id="send"
            size="5"
            class="mr-2 fill-white"
          />
          Neem contact op
        </Button>
      </div>
    </section>
  </Modal>
</template>
