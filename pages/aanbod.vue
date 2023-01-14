<script setup lang="ts">
import type {
  ApiCoachingCoaching,
  ApiSeminarSeminar,
  ApiTherapyTherapy,
  ApiTrainingTraining,
} from '~/types/schemas'
const { find } = useStrapi()
const { data: coachings = [] } = await find<ApiCoachingCoaching>('coachings', {
  populate: '*',
  sort: 'rank:asc',
})
const { data: seminars = [] } = await find<ApiSeminarSeminar>('seminars', {
  populate: '*',
  sort: 'rank:asc',
})
const { data: therapies = [] } = await find<ApiTherapyTherapy>('therapies', {
  populate: '*',
  sort: 'rank:asc',
})
const { data: trainings = [] } = await find<ApiTrainingTraining>('trainings', {
  populate: '*',
  sort: 'rank:asc',
})
</script>

<template>
  <div
    class="overflow-hidden bg-[url(~/assets/svg/grass-with-bushes.svg)] bg-[length:1200px_500px] bg-right-top bg-no-repeat px-4 md:bg-[length:100vw_45vw]"
  >
    <SpeechBubble
      class="mx-auto mt-10 max-w-2xl md:mt-20"
      color="white"
    >
      <PageTitle class="text-center">Vind jouw aanpak</PageTitle>
      <p class="mt-1 font-bold sm:mt-2 sm:text-lg">
        Bij Koeching hebben we allerlei manieren om met jou, je kind of gezin aan de slag
        gaan met je hulpvraag. Wat past er bij jou?
      </p>
    </SpeechBubble>
    <div
      class="relative -mx-4 overflow-hidden bg-[url(~/assets/svg/paddock-from-above.svg),linear-gradient(#C19E6B,#C19E6B)] bg-[length:auto_1140px,cover] bg-[position:left_3rem,center_20vw] bg-no-repeat pt-[260px] md:bg-[length:100%_auto,cover] md:pt-[30vw] xl:pt-[25vw]"
    >
      <div class="relative mx-auto max-w-4xl px-4">
        <template v-if="therapies.length">
          <PageH2>Therapie</PageH2>
          <div
            class="-mx-4 mt-5 mb-16 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 pt-2 md:grid md:grid-cols-3"
            role="list"
          >
            <PaperCard
              v-for="therapy in therapies"
              :description="therapy.attributes.intro"
              :label="`Lees meer over ${therapy.attributes.name}`"
              :image="
                therapy.attributes.thumbnail.data &&
                therapy.attributes.thumbnail.data.attributes.url
              "
              placeholder="person"
              role="listitem"
              :title="therapy.attributes.name"
              :to="`/aanbod/therapie/${therapy.attributes.slug}`"
              class="w-9/12 flex-shrink-0 snap-start md:w-auto"
              color="white"
              modal="therapyModal"
            />
          </div>
        </template>
        <template v-if="coachings.length">
          <PageH2>Begeleiding</PageH2>
          <div
            class="-mx-4 mt-5 mb-16 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 pt-2 md:grid md:grid-cols-3"
            role="list"
          >
            <PaperCard
              v-for="coaching in coachings"
              :description="coaching.attributes.intro"
              :label="`Lees meer over ${coaching.attributes.name}`"
              :image="
                coaching.attributes.thumbnail.data &&
                coaching.attributes.thumbnail.data.attributes.url
              "
              placeholder="person"
              role="listitem"
              :title="coaching.attributes.name"
              :to="`/aanbod/begeleiding/${coaching.attributes.slug}`"
              class="w-9/12 flex-shrink-0 snap-start md:w-auto"
              color="white"
              modal="coachingModal"
            />
          </div>
        </template>
        <template v-if="trainings.length">
          <PageH2>Trainingen</PageH2>
          <div
            class="-mx-4 mt-5 mb-16 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 pt-2 md:grid md:grid-cols-3"
            role="list"
          >
            <PaperCard
              v-for="training in trainings"
              :description="training.attributes.intro"
              :label="`Lees meer over ${training.attributes.name}`"
              :image="
                training.attributes.thumbnail.data &&
                training.attributes.thumbnail.data.attributes.url
              "
              placeholder="person"
              role="listitem"
              :title="training.attributes.name"
              :to="`/aanbod/trainingen/${training.attributes.slug}`"
              class="w-9/12 flex-shrink-0 snap-start md:w-auto"
              color="white"
              modal="trainingModal"
            />
          </div>
        </template>
        <template v-if="seminars.length">
          <PageH2> Informatieavonden </PageH2>
          <div
            class="-mx-4 mt-5 mb-16 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 pt-2 md:grid md:grid-cols-3"
            role="list"
          >
            <PaperCard
              v-for="seminar in seminars"
              :description="seminar.attributes.intro"
              :label="`Lees meer over ${seminar.attributes.name}`"
              :image="
                seminar.attributes.thumbnail.data &&
                seminar.attributes.thumbnail.data.attributes.url
              "
              placeholder="person"
              role="listitem"
              :title="seminar.attributes.name"
              :to="`/aanbod/informatieavonden/${seminar.attributes.slug}`"
              class="w-9/12 flex-shrink-0 snap-start md:w-auto"
              color="white"
              modal="seminarModal"
            />
          </div>
        </template>
      </div>
    </div>
    <p class="my-12 mx-3 italic">
      Todo: call to action om contact op te nemen als je niet weet wat je wil
    </p>
    <p class="my-12 mx-3 italic">
      Todo: footer met linkjes naar voorwaarden, tarieven, andere coaches, etc
    </p>
  </div>
  <NuxtPage />
</template>
