<script setup lang="ts">
import { Ref, ref } from 'vue'
import type { ApiPricingPricing, ApiReimbursementReimbursement } from '@/typess'

useHead({
  title: 'Tarieven | Koeching, kinder- en jeugdtherapie op de boerderij',
  meta: [
    {
      property: 'og:title',
      content: 'Tarieven | Koeching, kinder- en jeugdtherapie op de boerderij',
    },
    {
      name: 'description',
      content:
        'De tarieven die worden gehanteerd voor therapie, interventies, activiteiten, trainingen en seminars.',
    },
    {
      property: 'og:description',
      content:
        'De tarieven die worden gehanteerd voor therapie, interventies, activiteiten, trainingen en seminars.',
    },
  ],
})

const { find } = useStrapi()
const { data: pricings = [] } = await find<ApiPricingPricing>('pricings', {
  populate: '*',
  sort: 'rank:asc',
})
const { data } = (await find<ApiReimbursementReimbursement>('reimbursement', {
  populate: '*',
})) as any
const reimbursement: ApiReimbursementReimbursement = data

const { classes: contentClasses } = useContentStyles()

const openDetails: Ref<string[]> = ref([])
const toggleDetails = (description: string) => {
  openDetails.value.indexOf(description) >= 0
    ? openDetails.value.splice(openDetails.value.indexOf(description))
    : openDetails.value.push(description)
}
</script>

<template>
  <main
    class="min-h-screen bg-brown-600 bg-[url(~/assets/svg/wood-pattern.svg)] bg-[length:450px_auto] pb-10 bg-blend-soft-light"
  >
    <div
      class="mb-20 min-h-[19.5vw] bg-[url(~/assets/svg/desk-clutter-money.svg)] bg-[length:100%_auto] bg-left-top bg-no-repeat px-5 md:px-[16vw]"
    >
      <div class="mx-auto max-w-xl pb-[10vw] pl-[13vw] pt-[8vw] md:pb-[6vw] md:pl-0">
        <PageTitle class="text-white">Tarieven</PageTitle>
      </div>
      <ul class="mx-auto max-w-xl">
        <li
          v-for="pricing in pricings"
          class="grid grid-cols-[auto_110px] items-center justify-between gap-3 text-xl text-white sm:grid-cols-[auto_145px]"
        >
          <h3 class="text-lg font-bold md:text-xl">
            {{ pricing.attributes.description }}
          </h3>
          <Button
            class="mx-auto sm:ml-auto sm:mr-0"
            small
            color="black"
            label="Toon aanbod met dit tarief"
            @click="toggleDetails(pricing.attributes.description)"
          >
            <span class="mr-1 hidden sm:inline">Bekijk</span> aanbod
            <Icon
              id="arrow-down"
              :class="[
                'ml-2',
                openDetails.indexOf(pricing.attributes.description) >= 0 && 'rotate-180',
                'transition-all',
              ]"
              size="3"
            />
          </Button>
          <Transition>
            <div
              v-show="openDetails.indexOf(pricing.attributes.description) >= 0"
              class="w-full"
            >
              <h4
                v-if="pricing.attributes.programs.data.length"
                class="mt-3 text-sm font-bold leading-tight text-brown-100"
              >
                Trajecten
              </h4>
              <ul>
                <li
                  v-for="program in pricing.attributes.programs.data"
                  class="text-sm leading-tight"
                >
                  {{ program.attributes.name }}
                </li>
              </ul>
              <h4
                v-if="pricing.attributes.interventions.data.length"
                class="mt-3 text-sm font-bold leading-tight text-brown-100"
              >
                Interventies
              </h4>
              <ul>
                <li
                  v-for="intervention in pricing.attributes.interventions.data"
                  class="text-sm leading-tight"
                >
                  {{ intervention.attributes.name }}
                </li>
              </ul>
              <h4
                v-if="pricing.attributes.trainings.data.length"
                class="mt-3 text-sm font-bold leading-tight text-brown-100"
              >
                Trainingen
              </h4>
              <ul>
                <li
                  v-for="training in pricing.attributes.trainings.data"
                  class="text-sm leading-tight"
                >
                  {{ training.attributes.name }}
                </li>
              </ul>
              <h4
                v-if="pricing.attributes.seminars.data.length"
                class="mt-3 text-sm font-bold leading-tight text-brown-100"
              >
                Informatieavonden
              </h4>
              <ul>
                <li
                  v-for="seminar in pricing.attributes.seminars.data"
                  class="text-sm leading-tight"
                >
                  {{ seminar.attributes.name }}
                </li>
              </ul>
            </div>
          </Transition>
          <Divider class="col-span-2 mb-8 mt-4 w-full" />
        </li>
      </ul>
      <div class="mx-auto my-14 max-w-2xl">
        <template
          v-if="
            reimbursement.attributes.files.data &&
            reimbursement.attributes.files.data.length
          "
        >
          <PageH2 class="text-white">Vergoeding door verzekering</PageH2>
          <p class="mb-8 mt-4 text-white">
            De beroepsvereniging heeft overzichten opgesteld waarop u kunt zien welke
            ziektekostenverzekeraars de kosten van de kinder- en jeugdtherapeut
            (gedeeltelijk) vergoeden. Aan deze lijsten kunnen geen rechten worden
            ontleend. We raden aan om voor aanmelding te informeren bij uw
            zorgverzekeraar.
          </p>
          <Button
            v-for="file in reimbursement.attributes.files.data"
            class="my-4"
            color="brown-200"
            label="Lidnummers en certificeringen"
            small
            :to="file.attributes.url"
            squared
          >
            {{
              file.attributes.name
                ?.replaceAll('-', ' ')
                ?.replaceAll('_', ' ')
                ?.replace(/(.[^.]+)$/i, ' ($1)') || 'Download het bestand'
            }}
          </Button>
        </template>
      </div>

      <div
        v-if="reimbursement.attributes.content"
        :class="`
          -mx-4
          max-w-3xl
          bg-[url(~/assets/svg/paper-top.svg),url(~/assets/svg/paper-middle.svg),url(~/assets/svg/paper-bottom.svg)]
          bg-[length:100%_auto,100%_calc(100%-52vw),100%_auto]
          bg-[position:center_top,center_38vw,center_bottom]
          bg-no-repeat
          px-[10vw]
          pb-[8vw] pt-[9vw] drop-shadow-2xl
          md:mx-auto
          md:bg-[length:100%_auto,100%_calc(100%-380px),100%_auto] md:bg-[position:center_top,center_280px,center_bottom]
          lg:px-20 lg:pb-10 lg:pt-20`"
      >
        <div
          :class="contentClasses"
          v-html="$sanitize(reimbursement.attributes.content)"
        />
      </div>
    </div>
  </main>
</template>
