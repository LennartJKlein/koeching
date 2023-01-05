<script setup lang="ts">
import type { ApiAnimalAnimal, ApiCoachCoach } from "~/types/schemas";
const { find } = useStrapi();
const { data: coaches = [] } = await find<ApiCoachCoach>("coaches", {
  populate: "*",
  sort: "rank:asc",
});
const { data: animals = [] } = await find<ApiAnimalAnimal>("animals", {
  populate: "*",
  sort: "rank:asc",
});
</script>

<template>
  <div
    class="overflow-hidden bg-[url(~/assets/svg/farm-sky.svg)] bg-[length:200vw_500px] bg-top bg-no-repeat px-4 md:bg-[length:200vw_55vw]"
  >
    <SpeechBubble class="mx-auto mt-10 max-w-2xl md:mt-20" color="sky-500">
      <PageTitle class="text-center">Ga op ontdekkingstocht</PageTitle>
      <p class="mt-1 font-bold sm:mt-2 sm:text-lg">
        Maak kennis met alles en iedereen op boerderij Borreveld! Kom meer te
        weten over de mensen, de boerderij en natuurlijk de lieve dieren!
      </p>
    </SpeechBubble>
    <div
      class="relative -mx-4 mt-8 overflow-hidden bg-[url(~/assets/svg/farm-from-distance.svg),linear-gradient(#83A500,#83A500)] bg-[length:auto_1140px,cover] bg-[position:center_3rem,center_20vw] bg-no-repeat md:mt-12 md:bg-[length:100%_auto,cover]"
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
        <p class="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          De boerderij
        </p>
        <template v-if="coaches.length">
          <PageH2 class="mt-[400px] text-white md:mt-[45vw] xl:mt-[35vw]">
            De coaches
          </PageH2>
          <div
            class="-mx-4 mt-5 mb-16 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 md:grid md:grid-cols-3"
            role="list"
          >
            <PhotoCard
              v-for="coach in coaches"
              :description="coach.attributes.intro"
              :label="`Lees meer over ${coach.attributes.name}`"
              :image="
                coach.attributes.photos.data &&
                coach.attributes.photos.data[0].attributes.url
              "
              placeholder="person"
              role="listitem"
              :title="coach.attributes.name"
              :to="`/ontdek/coaches/${coach.attributes.slug}`"
              class="w-9/12 flex-shrink-0 snap-start md:w-auto"
              color="white"
              modal="coachModal"
            />
          </div>
        </template>
        <template v-if="animals.length">
          <PageH2 class="mx-auto max-w-4xl text-white md:mt-44">
            De dieren
          </PageH2>
          <div class="-mx-4">
            <div
              class="border-fence mx-auto mt-3 mb-36 grid max-w-7xl grid-cols-2 gap-3 md:gap-4 lg:mt-8 lg:grid-cols-3"
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
      </div>
    </div>
    <div class="-mx-4 bg-brown-500 px-4 py-8 md:pt-20">
      <PageH2 class="mx-auto max-w-4xl text-white">Lidmaatschappen</PageH2>
      <p class="my-12 mx-auto max-w-4xl italic">
        Todo: de verschillende lidmaatschappen van koeching
      </p>
    </div>
    <p class="my-12 mx-4 italic">
      Todo: footer met linkjes naar voorwaarden, tarieven, andere coaches, etc
    </p>
  </div>
  <NuxtPage />
</template>
