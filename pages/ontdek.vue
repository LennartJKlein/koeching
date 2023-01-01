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
  <Hero image="schaap" />
  <div class="mx-auto max-w-2xl px-3">
    <SpeechBubble color="brown-300" class="-mt-12">
      <PageTitle class="text-center">Ontdekken</PageTitle>
      <p class="font-bold">
        Maak kennis met alles en iedereen op boerderij Borreveld! Kom meer te
        weten over de mensen, de boerderij en natuurlijk de lieve dieren!
      </p>
    </SpeechBubble>
    <Card
      v-for="coach in coaches"
      :description="coach.attributes.intro"
      :label="`Lees meer over ${coach.attributes.name}`"
      :image="coach.attributes.photos?.data[0]?.attributes.url"
      :title="coach.attributes.name"
      :to="`/ontdek/coaches/${coach.attributes.slug}`"
      class="mt-8 mb-16"
      color="brown-200"
      modal="coachModal"
    />
  </div>
  <p class="my-12 mx-3 italic">Todo: de dieren</p>
  <p class="my-12 mx-3 italic">Todo: over de boerderij</p>
  <p class="my-12 mx-3 italic">Todo: lidmaatschappen van koeching</p>
  <p class="my-12 mx-3 italic">
    Todo: de verschillende methodes die worden toegepast
  </p>
  <p class="my-12 mx-3 italic">
    Todo: footer met linkjes naar voorwaarden, tarieven, andere coaches, etc
  </p>
  <NuxtPage />
</template>
