<script setup lang="ts">
import type { ApiMembershipMembership } from '~/types/schemas'
const NuxtLink = resolveComponent('NuxtLink')

const { find } = useStrapi()
const { data: memberships = [] } = await find<ApiMembershipMembership>('memberships', {
  populate: '*',
  sort: 'rank:asc',
})
</script>

<template>
  <main
    class="min-h-screen bg-brown-600 bg-[url(~/assets/svg/wood-pattern.svg)] bg-[length:450px_auto] pb-10 bg-blend-soft-light"
  >
    <div
      class="min-h-[19.5vw] bg-[url(~/assets/svg/desk-clutter-certifications.svg)] bg-[length:100%_auto] bg-left-top bg-no-repeat px-5 md:px-[16vw]"
    >
      <div class="mx-auto max-w-xl px-[6vw] pt-[8vw] pb-[10vw] md:pb-[6vw] lg:max-w-2xl">
        <PageTitle class="text-center text-white">Certificeringen</PageTitle>
        <p class="mt-4 text-white sm:text-center">
          Koeching heeft zich aangesloten bij verschillende verenigingen, initiatieven en
          certificeringen behaald om de kwaliteit van de coaching te garanderen.
        </p>
      </div>
      <ul
        class="mx-auto mb-20 grid max-w-3xl grid-cols-[repeat(auto-fit,minmax(180px,1fr))] place-items-center gap-x-5 gap-y-10"
      >
        <li v-for="(membership, index) in memberships">
          <component
            :is="membership.attributes.url ? NuxtLink : 'div'"
            :href="membership.attributes.url"
            target="_blank"
            :class="{
              'flex h-[140px] w-[180px] items-stretch bg-[radial-gradient(transparent_0px,_transparent_5px,_white_5px,_white)] bg-[length:20px_20px] bg-[position:-10px_-10px] p-3 drop-shadow-[1px_4px_0_#5d482d]': true,
              'transition-transform hover:scale-105': membership.attributes.url,
              'rotate-1': (index + 1) % 1 == 0,
              '-rotate-2': (index + 1) % 2 == 0,
              'rotate-3': (index + 1) % 3 == 0,
              '-rotate-4': (index + 1) % 4 == 0,
            }"
          >
            <div
              :class="{
                'flex grow place-items-center p-6': true,
                'bg-brown-400': (index + 1) % 1 == 0,
                'bg-sky-400': (index + 1) % 2 == 0,
                'bg-green-400': (index + 1) % 3 == 0,
                'bg-red-400': (index + 1) % 4 == 0,
              }"
            >
              <img
                v-if="membership.attributes.logo.data"
                :src="membership.attributes.logo.data.attributes.url"
                class="object-contain brightness-0 invert"
              />
              <h3 :class="membership.attributes.logo.data && 'sr-only'">
                {{ membership.attributes.name }}
              </h3>
              <!-- <h3 class="text-lg font-bold md:text-xl">
                {{ membership.attributes.logo }}
                {{ membership.attributes.url }}
                {{ membership.attributes.name }}
                {{ membership.attributes.membership_id }}
              </h3> -->
            </div>
          </component>
          <span class="mt-3 block text-center text-sm text-white">
            {{ membership.attributes.membership_id }}
          </span>
        </li>
      </ul>
    </div>
  </main>
</template>
