<script setup lang="ts">
import type { ApiLegalLegal } from '@/types'

useHead({
  title: 'Privacyreglement | Koeching, therapie op de boerderij',
  meta: [
    {
      property: 'og:title',
      content: 'Privacyreglement | Koeching, therapie op de boerderij',
    },
    {
      name: 'description',
      content: 'Lees hier de meest recente privacyreglement.',
    },
    {
      property: 'og:description',
      content: 'Lees hier de meest recente privacyreglement.',
    },
  ],
})

const { find } = useStrapi()
const { data } = (await find<ApiLegalLegal>('legal', {
  populate: '*',
})) as any
const privacy_data: ApiLegalLegal = data.attributes.privacy_data

const { classes: contentClasses } = useContentStyles()
</script>

<template>
  <main
    class="min-h-screen bg-brown-600 bg-[url(~/assets/svg/wood-pattern.svg)] bg-[length:450px_auto] pb-20 bg-blend-soft-light"
  >
    <div class="mx-auto max-w-xl px-[6vw] pb-[6vw] pt-[6vw]">
      <PageTitle class="text-center text-white">Privacyreglement</PageTitle>
    </div>
    <div
      v-if="privacy_data"
      :class="`
        -mx-4 max-w-4xl
        bg-[url(~/assets/svg/paper-top.svg),url(~/assets/svg/paper-middle.svg),url(~/assets/svg/paper-bottom.svg)]
        bg-[length:100%_auto,100%_calc(100%-52vw),100%_auto]
        bg-[position:center_top,center_38vw,center_bottom]
        bg-no-repeat px-[10vw] pb-[8vw] pt-[9vw] drop-shadow-2xl
        md:mx-auto
        md:bg-[length:100%_auto,100%_calc(100%-380px),100%_auto]
        md:bg-[position:center_top,center_280px,center_bottom]
        lg:px-20 lg:pb-10 lg:pt-20
      `"
    >
      <div
        :class="contentClasses"
        v-html="$sanitize(privacy_data)"
      />
    </div>
  </main>
</template>
