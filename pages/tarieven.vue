<script setup lang="ts">
import { Ref, ref } from 'vue'
import type { ApiPricingPricing } from '~/types/schemas'
const { find } = useStrapi()
const { data: pricings = [] } = await find<ApiPricingPricing>('pricings', {
  populate: '*',
  sort: 'rank:asc',
})

const openDetails: Ref<string[]> = ref([])
const toggleDetails = (description: string) => {
  openDetails.value.indexOf(description) >= 0
    ? openDetails.value.splice(openDetails.value.indexOf(description))
    : openDetails.value.push(description)
}
</script>

<template>
  <main
    class="min-h-screen bg-brown-600 bg-[url(~/assets/svg/wood-pattern.svg)] bg-[length:450px_auto] bg-blend-soft-light"
  >
    <div
      class="min-h-[19.5vw] bg-[url(~/assets/svg/desk-clutter-money.svg)] bg-[length:100%_auto] bg-left-top bg-no-repeat px-[16vw]"
    >
      <div class="mx-auto max-w-xl pt-[8vw] pb-[6vw]">
        <PageTitle class="text-white">Tarieven</PageTitle>
      </div>
      <ul class="mx-auto max-w-xl">
        <li
          v-for="pricing in pricings"
          class="flex flex-wrap items-center justify-between text-xl text-white"
        >
          <h3 class="font-bold">
            {{ pricing.attributes.description }}
          </h3>
          <Button
            small
            color="black"
            label="Toon aanbod met dit tarief"
            @click="toggleDetails(pricing.attributes.description)"
          >
            Bekijk aanbod
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
          <Divider class="my-10 w-full" />
        </li>
      </ul>
    </div>
  </main>
</template>
