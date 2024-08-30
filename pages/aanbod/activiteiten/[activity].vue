<script setup lang="ts">
import { Ref, ref } from 'vue'
import type { ApiActivityActivity } from '@/types'
import { useDateFormat } from '@vueuse/core'

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
  title: `${
    activity.attributes.seo_title || activity.attributes.name
  } | Activiteit bij Koeching`,
  meta: [
    {
      property: 'og:title',
      content: `${
        activity.attributes.seo_title || activity.attributes.name
      } | Activiteit bij Koeching`,
    },
    {
      name: 'description',
      content: activity.attributes.seo_description || activity.attributes.intro,
    },
    {
      property: 'og:description',
      content: activity.attributes.seo_description || activity.attributes.intro,
    },
    {
      property: 'keywords',
      content: activity.attributes.seo_keywords?.map((k: any) => k.keyword).join(', '),
    },
  ],
})

const media = [
  ...(activity.attributes.thumbnail.data ? [activity.attributes.thumbnail.data] : []),
  ...(activity.attributes.photos.data ? activity.attributes.photos.data : []),
]

const goBack = function () {
  const router = useRouter()
  router.push('/aanbod')
}

const openDetails: Ref<string[]> = ref([])
const toggleDetails = (description: string) => {
  openDetails.value.indexOf(description) >= 0
    ? openDetails.value.splice(openDetails.value.indexOf(description))
    : openDetails.value.push(description)
}

const readableDate = function (date: string) {
  return useDateFormat(date, 'D MMMM YYYY, HH:mm uur', {
    locales: 'nl-NL',
  }).value.replaceAll('"', '')
}

const { classes: contentClasses } = useContentStyles()
const { trimImgSrc } = useImgUtils()
</script>

<template>
  <div>
    <Modal
      :aria-label="`Meer over ${activity.attributes.name}`"
      id="activityModal"
      open
      :overflow-header="media && media.length > 0"
      @close="goBack"
    >
      <template v-slot:heading>
        <h1
          v-if="activity.attributes.name"
          class="mb-3 flex flex-col font-display text-3xl font-bold leading-none text-sky-900 md:text-4xl"
        >
          <span
            class="order-1 block font-sans text-sm uppercase tracking-wide text-sky-300"
          >
            Activiteit
          </span>
          {{ activity.attributes.name }}
        </h1>
        <p
          v-if="activity.attributes.intro"
          class="text-lg font-bold text-sky-500"
        >
          {{ activity.attributes.intro }}
        </p>
      </template>
      <section>
        <div
          v-if="media && media.length > 0"
          :class="[
            'my-5',
            media.length > 1 &&
              '-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-scroll px-5 md:snap-proximity',
          ]"
          role="list"
        >
          <NuxtImg
            v-for="photo in media"
            :class="[
              media.length > 1
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
          v-if="activity.attributes.content"
          :class="contentClasses"
          v-html="$sanitize(activity.attributes.content)"
        />
        <template v-if="activity.attributes.interventions.data.length">
          <h4
            class="mb-3 mt-14 font-display text-2xl font-bold leading-none text-sky-400"
          >
            Interventies die ik toepas
          </h4>
          <div
            class="mb-12 flex flex-wrap items-start justify-start gap-2 md:mt-4 md:gap-4"
          >
            <Button
              v-for="intervention in activity.attributes.interventions.data"
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
        <template v-if="activity.attributes.coaches.data.length">
          <h4
            class="mb-3 mt-14 font-display text-2xl font-bold leading-none text-sky-400"
          >
            Coaches die deze activiteit verzorgen
          </h4>
          <div
            class="-mx-5 mb-10 mt-4 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 md:grid md:grid-cols-3"
            role="list"
          >
            <PhotoCard
              v-for="coach in activity.attributes.coaches.data"
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
          v-if="activity.attributes.pricings || activity.attributes.location"
          class="mb-12 mt-8 flex flex-col gap-3 md:flex-row"
        >
          <div
            v-if="activity.attributes.pricings.data.length"
            class="border-pencil-sky-500 flex-1"
          >
            <dt
              class="flex items-center gap-1 font-bold before:block before:h-4 before:w-4 before:bg-euro before:bg-contain before:bg-center before:bg-no-repeat before:content-['']"
            >
              {{ activity.attributes.pricings.length > 1 ? 'Tarieven' : 'Tarief' }}
            </dt>
            <template v-for="price in activity.attributes.pricings.data">
              <dd class="ml-5 mt-1 leading-snug">{{ price.attributes.description }}</dd>
            </template>
            <p v-if="!activity.attributes.pricings.data.length">
              Het tarief is nog niet bekend
            </p>
          </div>
          <div
            v-if="activity.attributes.location"
            class="border-pencil-brown-300 flex-1"
          >
            <dt
              class="flex items-center gap-1 font-bold before:block before:h-4 before:w-4 before:bg-location before:bg-contain before:bg-center before:bg-no-repeat before:content-['']"
            >
              Locatie
            </dt>
            <dd class="ml-5 mt-1 leading-snug">{{ activity.attributes.location }}</dd>
          </div>
        </dl>
        <div
          class="z-1 border-pencil-black relative -mx-6 -mb-1 flex flex-col gap-5 bg-brown-300 px-3 pb-10 pt-7 md:gap-3 md:px-4"
        >
          <h3
            class="font-display text-xl leading-none text-white md:text-2xl lg:text-3xl"
          >
            Aanmelden en meedoen
          </h3>
          <ul
            v-if="activity.attributes.moments.filter((moment: any) => moment.open).length > 0"
          >
            <li
              v-for="moment in activity.attributes.moments.filter((moment: any) => moment.open)"
              class="border-pencil-brown-500 grid cursor-pointer grid-cols-[auto_110px] items-center justify-between gap-3 bg-white sm:grid-cols-[auto_145px]"
              @click="toggleDetails(moment.title)"
            >
              <span class="pl-2 text-lg font-bold text-brown-500">
                {{ moment.title || 'Bekijk deze groep' }}
              </span>
              <Button
                class="mx-auto sm:ml-auto sm:mr-0"
                color="white"
                icon-only
                label="Toon informatie over deze groep"
                small
                outlined
                @click.stop="toggleDetails(moment.title)"
              >
                <Icon
                  id="arrow-down"
                  :class="[
                    openDetails.indexOf(moment.title) >= 0 && 'rotate-180',
                    'transition-all',
                  ]"
                  size="4"
                />
              </Button>
              <Transition>
                <div
                  v-show="openDetails.indexOf(moment.title) >= 0"
                  class="col-span-2 -mx-2 -mb-2 bg-gray-100 p-3"
                >
                  <div v-if="moment.start_date">
                    <dt class="mr-2 inline font-bold">Start:</dt>
                    <dd class="inline leading-snug">
                      {{ readableDate(moment.start_date) }}
                    </dd>
                  </div>
                  <div v-if="moment.end_date">
                    <dt class="mr-2 inline font-bold">Eind:</dt>
                    <dd class="inline leading-snug">
                      {{ readableDate(moment.end_date) }}
                    </dd>
                  </div>
                  <template v-if="moment.description">
                    <h4 class="mb-0 mt-3 font-bold">Meer info:</h4>
                    <div
                      :class="contentClasses"
                      v-html="$sanitize(moment.description)"
                    />
                  </template>
                  <Button
                    class="ml-auto mr-0 w-min"
                    small
                    color="black"
                    label="Toon aanbod met dit tarief"
                    aria-controls="activityParticipateModal"
                    :to="`/aanbod/activiteiten/${$route.params.activity}/aanmelden/${moment.id}`"
                  >
                    aanmelden
                    <Icon
                      id="send"
                      class="ml-2"
                      size="4"
                    />
                  </Button>
                </div>
              </Transition>
            </li>
          </ul>
          <p
            v-else
            class="italic text-white"
          >
            Er zijn nog geen data ingepland voor deze activiteit. Houd deze pagina in de
            gaten voor updates of neem contact op om te laten weten dat je geïnteresseerd
            bent.
          </p>
        </div>
        <div
          class="z-1 border-pencil-black relative -mx-6 flex flex-col items-center justify-between gap-5 bg-sky-500 py-10 md:flex-row md:gap-3 md:px-4"
        >
          <span
            class="font-display text-xl leading-none text-white md:text-2xl lg:text-3xl"
          >
            Vragen over deze activiteit?
          </span>
          <Button
            color="sky-400"
            class="flex-shrink-0"
            label="Contact opnemen"
            to="/contact"
          >
            <Icon
              id="send"
              size="5"
              class="mr-2 fill-white"
            />
            Contact opnemen
          </Button>
        </div>
        <NewsletterSubscribe
          heading="Op de hoogte blijven van aankomende activiteiten? Meld je aan voor de nieuwsbrief"
          class="mx-auto my-8"
        />
      </section>
    </Modal>
    <NuxtPage />
  </div>
</template>
