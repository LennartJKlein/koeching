<script setup lang="ts">
import type {
  ApiActivityActivity,
  ApiInterventionIntervention,
  ApiProgramProgram,
  ApiSeminarSeminar,
  ApiTrainingTraining,
} from '@/types'

useHead({
  title: 'Aanbod | Koeching, therapie op de boerderij',
  meta: [
    {
      property: 'og:title',
      content: 'Aanbod | Koeching, therapie op de boerderij',
    },
    {
      name: 'description',
      content:
        'Bij Koeching hebben we allerlei manieren om met jou, je kind of gezin aan de slag gaan met je hulpvraag. Wat past er bij jou?',
    },
    {
      property: 'og:description',
      content:
        'Bij Koeching hebben we allerlei manieren om met jou, je kind of gezin aan de slag gaan met je hulpvraag. Wat past er bij jou?',
    },
  ],
})

const { find } = useStrapi()
const { data: activities = [] } = await find<ApiActivityActivity>('activities', {
  populate: '*',
  sort: 'rank:asc',
})
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
        <p class="mt-1 text-center leading-snug sm:mt-2 sm:text-lg sm:leading-snug">
          Bij Koeching hebben we allerlei manieren om met jou, je kind of gezin aan de
          slag gaan met je hulpvraag. Wat past er bij jou?
        </p>
      </SpeechBubble>
      <div
        class="relative -mx-4 overflow-hidden bg-[url(~/assets/svg/paddock-from-above.svg),linear-gradient(#C19E6B,#C19E6B)] bg-[length:auto_1140px,cover] bg-[position:left_3rem,center_20vw] bg-no-repeat pb-10 pt-[260px] md:bg-[length:100%_auto,cover] md:pt-[30vw] lg:pt-[25vw]"
      >
        <div class="relative mx-auto max-w-5xl px-4">
          <template v-if="programs.length">
            <PageH2 class="text-center">Trajecten</PageH2>
            <p class="mx-auto max-w-xl text-center">
              We gaan met je persoonlijke hulpvraag aan de slag. We kijken samen hoeveel
              sessies je nodig hebt en welke methodes en interventies daarbij passen.
            </p>
            <Button
              class="mx-auto my-3 w-fit"
              color="sky-400"
              label="Meer info over werkwijze en procedure"
              to="/aanbod/trajecten/werkwijze-en-procedure"
            >
              Wat is de werkwijze?
              <Icon
                id="dots"
                class="ml-3 fill-white"
              />
            </Button>
            <div
              class="-mx-4 mb-16 mt-5 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 pt-2 lg:grid lg:grid-cols-4"
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
            <PageH2 class="text-center">(Groeps)trainingen</PageH2>
            <p class="mx-auto max-w-xl text-center">
              In een aantal bijeenkomsten werk je via een werkboek aan je hulpvraag. Een
              veilige omgeving waar je samen met anderen kunt groeien.
            </p>
            <div
              class="-mx-4 mb-16 mt-5 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 pt-2 lg:grid lg:grid-cols-2"
              role="list"
            >
              <PaperCardWide
                v-for="training in trainings"
                accent-color="sky"
                :description="training.attributes.intro"
                :image="
                  training.attributes.thumbnail.data &&
                  training.attributes.thumbnail.data.attributes.url
                "
                :label="`Lees meer over ${training.attributes.name}`"
                :title="training.attributes.name"
                :to="`/aanbod/trainingen/${training.attributes.slug}`"
                class="w-11/12 flex-shrink-0 snap-start md:w-7/12 lg:w-full"
                color="white"
                image-rounded
                modal="trainingModal"
                placeholder="method"
                role="listitem"
              />
            </div>
          </template>
          <template v-if="activities.length">
            <PageH2 class="text-center">Activiteiten</PageH2>
            <p class="mx-auto max-w-xl text-center">
              Koeching biedt verschillende activiteiten voor zowel kinderen, jeugd,
              volwassenen als gezinnen.
            </p>
            <div
              class="-mx-4 mb-16 mt-5 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 pt-2 md:grid md:grid-cols-2"
              role="list"
            >
              <PaperCardWide
                v-for="activity in activities"
                :description="activity.attributes.intro"
                :label="`Lees meer over ${activity.attributes.name}`"
                :image="
                  activity.attributes.thumbnail.data &&
                  activity.attributes.thumbnail.data.attributes.url
                "
                placeholder="method"
                role="listitem"
                :title="activity.attributes.name"
                :to="`/aanbod/activiteiten/${activity.attributes.slug}`"
                class="w-11/12 flex-shrink-0 snap-start md:w-auto"
                color="white"
                modal="activityModal"
              />
            </div>
          </template>
          <template v-if="seminars.length">
            <PageH2 class="text-center">Lezingen</PageH2>
            <p class="mx-auto max-w-xl text-center">
              Deze informatieavonden zijn dé manier om meer te leren over hoe we werken
              met kinderen, jeugd, volwassenen en gezinnen.
            </p>
            <div
              class="-mx-4 mb-16 mt-5 flex snap-x snap-mandatory scroll-px-4 items-start justify-start gap-4 overflow-y-hidden overflow-x-scroll px-4 pb-4 pt-2 md:grid md:grid-cols-2"
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
            class="-mx-4 max-w-3xl bg-[url(~/assets/svg/paper-top.svg),url(~/assets/svg/paper-middle.svg),url(~/assets/svg/paper-bottom.svg)] bg-[length:100%_auto,100%_calc(100%-52vw),100%_auto] bg-[position:center_top,center_38vw,center_bottom] bg-no-repeat px-[10vw] pb-[8vw] pt-[9vw] drop-shadow-2xl md:mx-auto md:bg-[length:100%_auto,100%_calc(100%-380px),100%_auto] md:bg-[position:center_top,center_280px,center_bottom] lg:px-20 lg:pb-10 lg:pt-20"
            v-if="interventions.length"
          >
            <div>
              <h2 class="font-display text-3xl font-bold text-gray-600 md:text-4xl">
                Interventies
              </h2>
              <p class="max-w-2xl text-sm text-gray-500 md:text-base lg:my-4">
                Dit zijn alle methodes die we toepassen in de trajecten, trainingen,
                activiteiten en informatieavonden. Als een bepaalde interventie je
                aanspreekt, is het ook mogelijk ze als losse sessies te boeken!
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
          class="mx-auto my-12 max-w-sm px-4 text-center font-bold text-white md:mb-20 md:text-lg lg:mt-16 xl:mt-20"
        >
          Geen idee waarmee jij geholpen zou zijn? Leg je vraag gratis voor aan onze
          coaches en krijg een advies op maat!
          <Button
            label="Neem contact op"
            class="mx-auto mt-5"
            color="sky-400"
            to="/contact"
          >
            Vraag advies
          </Button>
        </p>
      </div>
    </div>
    <NuxtPage />
  </main>
</template>
