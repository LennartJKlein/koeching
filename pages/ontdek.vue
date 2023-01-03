<script setup lang="ts">
import type { ApiCoachCoach } from "~/types/schemas";
const { find } = useStrapi();
const { data: coaches } = await find<ApiCoachCoach>("coaches", {
  populate: "*",
  sort: "id",
});
// const coaches: ApiCoachCoach[] = [];
</script>

<template>
  <div
    class="overflow-hidden bg-[url(~/assets/svg/farm-sky.svg)] bg-[length:200vw_500px] bg-top bg-no-repeat px-3 md:bg-[length:200vw_55vw]"
  >
    <SpeechBubble class="mx-auto mt-14 max-w-2xl md:mt-20" color="sky-500">
      <PageTitle class="text-center">Ga op ontdekkingstocht</PageTitle>
      <p class="mt-1 font-bold sm:mt-2 sm:text-lg">
        Maak kennis met alles en iedereen op boerderij Borreveld! Kom meer te
        weten over de mensen, de boerderij de methodes en natuurlijk de lieve
        dieren!
      </p>
    </SpeechBubble>
    <div
      class="relative -mx-3 mt-8 overflow-hidden bg-[url(~/assets/svg/farm-from-distance.svg),linear-gradient(#83A500,#83A500)] bg-[length:auto_1140px,cover] bg-[position:center_3rem,center_20vw] bg-no-repeat pb-12 md:mt-12 md:bg-[length:100%_auto,cover]"
    >
      <div class="relative mx-auto max-w-4xl px-3">
        <p class="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          De boerderij
        </p>
        <div class="absolute top-0 right-3">
          <Button
            color="white"
            label="Lees meer over de boerderij"
            to="/ontdek/borreveld"
            aria-controls="farmModal"
            icon-only
            ><span
              class="flex h-4 w-4 items-center justify-center font-display text-2xl font-bold text-sky-500"
              >?</span
            ></Button
          >
        </div>
        <PageH2 class="mt-[400px] text-white md:mt-[45vw] xl:mt-[35vw]">
          De coaches
        </PageH2>
        <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <Card
            v-for="coach in coaches"
            :description="coach.attributes.intro"
            :label="`Lees meer over ${coach.attributes.name}`"
            :image="coach.attributes.photos?.data[0]?.attributes.url"
            :title="coach.attributes.name"
            :to="`/ontdek/coaches/${coach.attributes.slug}`"
            class="mt-6 mb-8 md:mb-12"
            color="white"
            modal="coachModal"
          />
        </div>
      </div>
      <div
        class="-mx-3 mt-8 overflow-hidden bg-bottom-nav bg-[length:cover,auto_25px] px-3 pt-14 pb-12 lg:pb-20"
      >
        <PageH2 class="mx-auto max-w-4xl text-white md:mt-16">De dieren</PageH2>
        <div class="border-fence mx-auto mt-3 max-w-7xl lg:mt-8">
          <p class="my-12 italic">Todo: de dieren</p>
        </div>
      </div>
      <div class="-mx-3 overflow-hidden bg-brown-500 px-3 py-8">
        <PageH2 class="mx-auto max-w-4xl text-white md:mt-16">Methodes</PageH2>
        <p class="my-12 mx-auto max-w-4xl italic">
          Todo: de verschillende methodes die worden toegepast
        </p>
      </div>
      <p class="my-12 mx-3 italic">Todo: lidmaatschappen van koeching</p>
    </div>
    <p class="my-12 mx-3 italic">
      Todo: footer met linkjes naar voorwaarden, tarieven, andere coaches, etc
    </p>
  </div>
  <NuxtPage />
</template>
