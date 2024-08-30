<script setup lang="ts">
import type { ApiMembershipMembership } from '@/types'

useHead({
  title: 'Lidmaatschappen en certificeringen | Koeching',
  meta: [
    {
      property: 'og:title',
      content: 'Lidmaatschappen en certificeringen | Koeching',
    },
    {
      name: 'description',
      content:
        'Om de kwaliteit van de coaching en bedrijfsvoering te garanderen heb ik verschillende certificaten behaald en is Koeching aangesloten bij verschillende verenigingen, organisaties en initiatievenen.',
    },
    {
      property: 'og:description',
      content:
        'Om de kwaliteit van de coaching en bedrijfsvoering te garanderen heb ik verschillende certificaten behaald en is Koeching aangesloten bij verschillende verenigingen, organisaties en initiatievenen.',
    },
  ],
})

const { find } = useStrapi()
const { data: memberships = [] } = await find<ApiMembershipMembership>('memberships', {
  populate: '*',
  sort: 'rank:asc',
})

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <main
    class="min-h-screen bg-brown-600 bg-[url(~/assets/svg/wood-pattern.svg)] bg-[length:450px_auto] pb-10 bg-blend-soft-light"
  >
    <div
      class="min-h-[19.5vw] bg-[url(~/assets/svg/desk-clutter-certifications.svg)] bg-[length:100%_auto] bg-left-top bg-no-repeat px-5 md:px-[16vw]"
    >
      <div class="mx-auto max-w-3xl px-[6vw] pb-[10vw] pt-[8vw] md:pb-[6vw]">
        <PageTitle class="px-[8vw] text-center text-white md:px-0">
          Lidmaatschappen en certificeringen
        </PageTitle>
        <p class="mt-4 text-white sm:text-center lg:text-lg xl:text-xl">
          Om de kwaliteit van de coaching en bedrijfsvoering te garanderen heb ik
          verschillende certificaten behaald en is Koeching aangesloten bij verschillende
          verenigingen, organisaties en initiatievenen.
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
                'flex grow items-center justify-center overflow-hidden break-words p-6': true,
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
              <h3
                :class="[
                  membership.attributes.logo.data && 'sr-only',
                  'text-center text-xl font-bold leading-tight text-white',
                ]"
              >
                {{ membership.attributes.name }}
              </h3>
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
