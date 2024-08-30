<script setup lang="ts">
import type { ApiAnimalAnimal, ApiCoachCoach } from '@/types'

useHead({
  title: 'Ontdekken | Koeching, therapie op de boerderij',
  meta: [
    {
      property: 'og:title',
      content: 'Ontdekken | Koeching, therapie op de boerderij',
    },
    {
      name: 'description',
      content:
        'Maak kennis met alles en iedereen op boerderij Borreveld! Kom meer te weten over de mensen, de boerderij en natuurlijk de lieve dieren!',
    },
    {
      property: 'og:description',
      content:
        'Maak kennis met alles en iedereen op boerderij Borreveld! Kom meer te weten over de mensen, de boerderij en natuurlijk de lieve dieren!',
    },
  ],
})

const { find } = useStrapi()
const { data: coaches = [] } = await find<ApiCoachCoach>('coaches', {
  populate: '*',
  sort: 'rank:asc',
})
const { data: animals = [] } = await find<ApiAnimalAnimal>('animals', {
  populate: '*',
  sort: 'rank:asc',
})
</script>

<template>
  <main class="min-h-screen">
    <div
      class="overflow-hidden bg-[url(~/assets/svg/farm-sky.svg)] bg-[length:200vw_500px] bg-top bg-no-repeat px-4 md:bg-[length:200vw_55vw]"
    >
      <SpeechBubble
        class="mx-auto mt-10 max-w-2xl md:mt-20"
        color="sky-500"
      >
        <PageTitle class="text-center">Ontdek de praktijk</PageTitle>
        <p class="mt-1 text-center leading-snug sm:mt-2 sm:text-lg sm:leading-snug">
          Maak kennis met het leven op boerderij Borreveld. Kom meer te weten over de
          coach, de boerderij en natuurlijk onze lieve dieren.
        </p>
      </SpeechBubble>
      <div
        class="relative -mx-4 mt-8 overflow-hidden bg-[url(~/assets/svg/farm-from-distance.svg),linear-gradient(#83A500,#83A500)] bg-[length:auto_1140px,cover] bg-[position:center_3rem,center_20vw] bg-no-repeat pb-10 md:mt-12 md:bg-[length:100%_auto,cover]"
      >
        <div class="relative mx-auto max-w-4xl px-4">
          <Button
            class="float-right -mt-1"
            color="white"
            label="Lees meer over de boerderij"
            to="/ontdek/borreveld"
            aria-controls="farmModal"
            icon-only
            ><span
              class="flex h-4 w-4 items-center justify-center font-display text-2xl font-bold text-sky-500"
              >?</span
            >
          </Button>
          <PageH2 class="mt-3 text-white"> De boerderij </PageH2>
          <template v-if="coaches.length > 0">
            <PageH2 class="mt-72 text-white md:mt-[28vw]"> De coach </PageH2>
            <div
              class="-mx-4 mb-16 mt-5 grid items-start justify-start gap-4 px-4 pb-4 md:grid-cols-2"
              role="list"
            >
              <PhotoCard
                v-for="coach in coaches.filter((coach) => !coach.attributes.external)"
                :description="coach.attributes.intro"
                :label="`Lees meer over ${coach.attributes.name}`"
                :image="
                  coach.attributes.photos.data &&
                  coach.attributes.photos.data[0].attributes.url
                "
                wide
                placeholder="person"
                role="listitem"
                :title="coach.attributes.name"
                :to="`/ontdek/coaches/${coach.attributes.slug}`"
                class="flex-shrink-0 snap-start"
                color="white"
                modal="coachModal"
              />
            </div>
          </template>
          <template v-if="animals.length">
            <PageH2 class="mx-auto max-w-4xl text-white"> De dieren </PageH2>
            <div class="-mx-4">
              <div
                class="border-fence mx-auto mb-32 mt-3 grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:mt-8"
                role="list"
              >
                <PhotoCard
                  v-for="animal in animals"
                  :label="`Lees meer over ${animal.attributes.name}`"
                  :image="
                    animal.attributes.photos.data &&
                    animal.attributes.photos.data[0].attributes.url
                  "
                  placeholder="animal"
                  role="listitem"
                  :title="animal.attributes.name"
                  title-small
                  :to="`/ontdek/dieren/${animal.attributes.slug}`"
                  color="white"
                  modal="animalModal"
                />
              </div>
            </div>
          </template>
          <template v-if="coaches.length > 1">
            <PageH2 class="text-white md:mt-32"> Andere praktijken </PageH2>
            <div
              class="-mx-4 mb-16 mt-5 grid items-start justify-start gap-4 px-4 pb-4 md:grid-cols-2"
              role="list"
            >
              <PhotoCard
                v-for="coach in coaches.filter((coach) => coach.attributes.external)"
                :description="coach.attributes.intro"
                :label="`Lees meer over ${coach.attributes.name}`"
                :image="
                  coach.attributes.photos.data &&
                  coach.attributes.photos.data[0].attributes.url
                "
                wide
                placeholder="person"
                role="listitem"
                :title="coach.attributes.name"
                :to="`/ontdek/coaches/${coach.attributes.slug}`"
                class="flex-shrink-0 snap-start"
                color="white"
                modal="coachModal"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
    <NuxtPage />
  </main>
</template>
