<script setup lang="ts">
import type { ApiProgramProgram } from '@/types'

const { find } = useStrapi()
const route = useRoute()
const {
  data: [program],
} = await find<ApiProgramProgram>('programs', {
  filters: {
    slug: {
      $eq: route.params.program,
    },
  },
  populate: {
    coaches: {
      populate: '*',
    },
    interventions: '*',
    photos: '*',
    pricings: '*',
    seo_keywords: '*',
  },
})

useHead({
  title: `${
    program.attributes.seo_title || program.attributes.name
  } | Traject om te volgen bij Koeching`,
  meta: [
    {
      property: 'og:title',
      content: `${
        program.attributes.seo_title || program.attributes.name
      } | Traject om te volgen bij Koeching`,
    },
    {
      name: 'description',
      content: program.attributes.seo_description || program.attributes.intro,
    },
    {
      property: 'og:description',
      content: program.attributes.seo_description || program.attributes.intro,
    },
    {
      property: 'keywords',
      content: program.attributes.seo_keywords?.map((k: any) => k.keyword).join(', '),
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
    :aria-label="`Meer over ${program.attributes.name}`"
    id="programModal"
    open
    :overflow-header="
      program.attributes.photos.data && program.attributes.photos.data.length > 0
    "
    @close="goBack"
  >
    <template v-slot:heading>
      <h1
        v-if="program.attributes.name"
        class="mb-3 flex flex-col font-display text-3xl font-bold leading-none text-sky-900 md:text-4xl"
      >
        <span
          class="order-1 block font-sans text-sm uppercase tracking-wide text-sky-300"
        >
          Traject
        </span>
        {{ program.attributes.name }}
      </h1>
      <p
        v-if="program.attributes.intro"
        class="text-lg font-bold text-sky-500"
      >
        {{ program.attributes.intro }}
      </p>
    </template>
    <section>
      <div
        v-if="program.attributes.photos.data"
        :class="[
          'my-5',
          program.attributes.photos.data.length > 1 &&
            '-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-scroll px-5 md:snap-proximity',
        ]"
        role="list"
      >
        <NuxtImg
          v-for="photo in program.attributes.photos.data"
          :class="[
            program.attributes.photos.data.length > 1
              ? 'aspect-square w-10/12 flex-shrink-0 snap-start sm:aspect-[4/3]'
              : 'aspect-[4/3] w-full',
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
        v-if="program.attributes.content"
        :class="contentClasses"
        v-html="$sanitize(program.attributes.content)"
      />
      <template v-if="program.attributes.interventions.data.length">
        <h4 class="mb-3 mt-14 font-display text-2xl font-bold leading-none text-sky-400">
          Interventies in dit traject
        </h4>
        <div
          class="mb-12 flex flex-wrap items-start justify-start gap-2 md:mt-4 md:gap-4"
        >
          <Button
            v-for="intervention in program.attributes.interventions.data"
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
      <template v-if="program.attributes.coaches.data.length">
        <h4 class="mb-3 mt-14 font-display text-2xl font-bold leading-none text-sky-400">
          Coaches die dit traject verzorgen
        </h4>
        <div
          class="-mx-5 mb-10 mt-4 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 md:grid md:grid-cols-3"
          role="list"
        >
          <PhotoCard
            v-for="coach in program.attributes.coaches.data"
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
        v-if="program.attributes.pricings.data || program.attributes.location"
        class="mb-12 mt-8 flex flex-col gap-3 md:flex-row"
      >
        <div
          v-if="program.attributes.pricings.data.length"
          class="border-pencil-sky-500 flex-1"
        >
          <dt
            class="flex items-center gap-1 font-bold before:block before:h-4 before:w-4 before:bg-euro before:bg-contain before:bg-center before:bg-no-repeat before:content-['']"
          >
            {{ program.attributes.pricings.data.length > 1 ? 'Tarieven' : 'Tarief' }}
          </dt>
          <template v-for="price in program.attributes.pricings.data">
            <dd class="ml-5 mt-1 leading-snug">{{ price.attributes.description }}</dd>
          </template>
        </div>
        <div
          v-if="program.attributes.location"
          class="border-pencil-brown-300 flex-1"
        >
          <dt
            class="flex items-center gap-1 font-bold before:block before:h-4 before:w-4 before:bg-location before:bg-contain before:bg-center before:bg-no-repeat before:content-['']"
          >
            Locatie
          </dt>
          <dd class="ml-5 mt-1 leading-snug">{{ program.attributes.location }}</dd>
        </div>
      </dl>
      <div
        class="z-1 border-pencil-black relative -mx-6 flex flex-col items-center justify-between gap-5 bg-brown-300 py-10 md:flex-row md:px-4"
      >
        <span class="font-display text-xl leading-none text-white md:text-2xl lg:text-3xl"
          >Past dit traject bij jouw vraag?</span
        >
        <Button
          color="brown-200"
          class="flex-shrink-0"
          label="Contact opnemen"
          to="/contact"
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
