<script setup lang="ts">
import type {
  ApiInterventionIntervention,
  ApiProgramProgram,
  ApiSeminarSeminar,
  ApiTrainingTraining,
} from '~/types/schemas'
const { find } = useStrapi()
const { data: interventions = [] } = await find<ApiInterventionIntervention>(
  'interventions',
  {
    populate: '*',
    sort: 'rank:asc',
  }
)
const { data: programs = [] } = await find<ApiProgramProgram>('programs', {
  populate: '*',
  sort: 'rank:asc',
})
const { data: seminars = [] } = await find<ApiSeminarSeminar>('seminars', {
  populate: '*',
  sort: 'rank:asc',
})
const { data: trainings = [] } = await find<ApiTrainingTraining>('trainings', {
  populate: '*',
  sort: 'rank:asc',
})
</script>

<template>
  <main class="min-h-screen">
    <div
      class="overflow-hidden bg-[url(~/assets/svg/grass-with-bushes.svg)] bg-[length:1200px_500px] bg-right-top bg-no-repeat px-4 md:bg-[length:100vw_45vw]"
    >
      <SpeechBubble
        class="mx-auto mt-10 max-w-2xl md:mt-20"
        color="white"
      >
        <PageTitle class="text-center">Vind jouw aanpak</PageTitle>
        <p class="mt-1 font-bold sm:mt-2 sm:text-lg">
          Bij Koeching hebben we allerlei manieren om met jou, je kind of gezin aan de
          slag gaan met je hulpvraag. Wat past er bij jou?
        </p>
      </SpeechBubble>
      <div
        class="relative -mx-4 overflow-hidden bg-[url(~/assets/svg/paddock-from-above.svg),linear-gradient(#C19E6B,#C19E6B)] bg-[length:auto_1140px,cover] bg-[position:left_3rem,center_20vw] bg-no-repeat pt-[260px] md:bg-[length:100%_auto,cover] md:pt-[30vw] lg:pt-[25vw]"
      >
        <div class="relative mx-auto max-w-5xl px-4">
          <template v-if="programs.length">
            <PageH2>Trajecten</PageH2>
            <div
              class="-mx-4 mt-5 mb-16 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 pt-2 lg:grid lg:grid-cols-4"
              role="list"
            >
              <PaperCard
                v-for="program in programs"
                :label="`Lees meer over ${program.attributes.name}`"
                :image="
                  program.attributes.thumbnail.data &&
                  program.attributes.thumbnail.data.attributes.url
                "
                placeholder="method"
                role="listitem"
                :title="program.attributes.name"
                :to="`/aanbod/trajecten/${program.attributes.slug}`"
                class="w-9/12 flex-shrink-0 snap-start md:w-auto"
                color="white"
                modal="programModal"
              />
            </div>
          </template>
          <template v-if="trainings.length">
            <PageH2 class="text-center">Groepstrainingen</PageH2>
            <div
              class="-mx-4 mt-5 mb-16 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 pt-2 lg:grid lg:grid-cols-2"
              role="list"
            >
              <PaperCardWide
                v-for="training in trainings"
                accent-color="sky"
                :description="training.attributes.intro"
                :label="`Lees meer over ${training.attributes.name}`"
                :image="
                  training.attributes.thumbnail.data &&
                  training.attributes.thumbnail.data.attributes.url
                "
                placeholder="method"
                role="listitem"
                :title="training.attributes.name"
                :to="`/aanbod/trainingen/${training.attributes.slug}`"
                class="w-11/12 flex-shrink-0 snap-start"
                color="white"
                modal="trainingModal"
              />
            </div>
          </template>
          <template v-if="seminars.length">
            <PageH2>Informatieavonden</PageH2>
            <div
              class="-mx-4 mt-5 mb-16 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 pt-2 md:grid md:grid-cols-2"
              role="list"
            >
              <PaperCardWide
                v-for="seminar in seminars"
                :description="seminar.attributes.intro"
                :label="`Lees meer over ${seminar.attributes.name}`"
                :image="
                  seminar.attributes.thumbnail.data &&
                  seminar.attributes.thumbnail.data.attributes.url
                "
                placeholder="method"
                role="listitem"
                :title="seminar.attributes.name"
                :to="`/aanbod/informatieavonden/${seminar.attributes.slug}`"
                class="w-11/12 flex-shrink-0 snap-start md:w-auto"
                color="white"
                modal="seminarModal"
              />
            </div>
          </template>
          <div
            :class="`
          -mx-4
          max-w-3xl
          bg-[url(~/assets/svg/paper-top.svg),url(~/assets/svg/paper-middle.svg),url(~/assets/svg/paper-bottom.svg)]
          bg-[length:100%_auto,100%_calc(100%-52vw),100%_auto]
          bg-[position:center_top,center_38vw,center_bottom]
          bg-no-repeat
          px-[10vw]
          pt-[9vw] pb-[8vw] drop-shadow-2xl
          md:mx-auto
          md:bg-[length:100%_auto,100%_calc(100%-380px),100%_auto] md:bg-[position:center_top,center_280px,center_bottom]
          lg:px-20 lg:pt-20 lg:pb-10`"
            v-if="interventions.length"
          >
            <div>
              <h2 class="font-display text-3xl font-bold text-gray-600 md:text-4xl">
                Interventies
              </h2>
              <p class="max-w-2xl text-sm text-gray-500 md:text-base lg:my-4">
                Dit zijn alle methodes die we toepassen in de trajecten, trainingen en
                informatieavonden. Als een bepaalde interventie je aanspreekt, is het ook
                mogelijk ze als losse sessies te boeken!
              </p>
              <ul class="mt-5 lg:mt-6">
                <PaperRow
                  v-for="intervention in interventions"
                  placeholder="method"
                  accent-color="sky"
                  class="w-full"
                  color="white"
                  :image="
                    intervention.attributes.thumbnail.data &&
                    intervention.attributes.thumbnail.data.attributes.url
                  "
                  :label="`Lees meer over ${intervention.attributes.name}`"
                  modal="interventionModal"
                  role="listitem"
                  :title="intervention.attributes.name"
                  :to="`/aanbod/interventies/${intervention.attributes.slug}`"
                />
              </ul>
            </div>
          </div>
        </div>
        <p
          class="my-12 mx-auto max-w-xs text-center text-black md:mb-20 md:text-lg lg:mt-16 xl:mt-20"
        >
          Geen idee hoe we jou kunnen helpen? Vraag gratis advies aan onze coaches!
          <Button
            label="Neem contact op"
            class="mx-auto mt-5"
            color="sky-400"
          >
            Vraag advies
          </Button>
        </p>
      </div>
    </div>
    <NuxtPage />
  </main>
</template>
