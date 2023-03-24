<script setup lang="ts">
import type { ApiHomepageHomepage } from '~/types/schemas'

const { find } = useStrapi()
const { data } = (await find<ApiHomepageHomepage>('homepage', {
  populate: '*',
})) as any
const content: ApiHomepageHomepage = data
const { classes: contentClasses } = useContentStyles()
const { trimImgSrc } = useImgUtils()
</script>

<template>
  <main class="min-h-screen bg-white pb-10">
    <PageTitle class="sr-only">{{ content.attributes.title }}</PageTitle>
    <HeroSlider
      :images="content.attributes.photos && content.attributes.photos.data.map((photo: any) => photo.attributes.url)"
    >
      <div
        class="-ml-[5%] -mr-[10%] -mb-10 flex overflow-hidden pt-12 transition-all md:mr-0 md:ml-0"
      >
        <img
          class="w-full max-w-2xl animate-fly-in"
          src="~/assets/svg/animals-inviting-hug.svg"
          alt="Dieren van Koeching"
        />
      </div>
      <figure class="relative z-10 mb-12 w-full max-w-xl px-8">
        <img
          class="w-full"
          src="~/assets/svg/logo.svg"
          alt="Logo van Koeching"
        />
      </figure>
    </HeroSlider>
    <div
      class="bg-brown-500 bg-[url(~/assets/svg/mud-steps.svg)] bg-[length:100%_auto] bg-bottom bg-no-repeat px-8 py-16 text-xl text-brown-50"
    >
      <div class="mx-auto flex max-w-4xl items-center">
        <img
          class="max-w-xs object-contain"
          src="~/assets/svg/dog-idea.svg"
        />
        <p
          v-if="content.attributes.sales_text[0]"
          v-html="content.attributes.sales_text[0].body"
        />
      </div>
    </div>
    <p class="my-12 mx-3 italic">Todo: introductievideos</p>
    <p class="my-12 mx-3 italic">Todo: agenda / kalender</p>
  </main>
</template>
