<script setup lang="ts">
import type { ApiMessageMessage } from '@/typess'

useHead({
  title: 'Nieuws | Koeching, kinder- en jeugdtherapie op de boerderij',
  meta: [
    {
      property: 'og:title',
      content: 'Nieuws | Koeching, kinder- en jeugdtherapie op de boerderij',
    },
    {
      name: 'description',
      content:
        'Op de boerderij Borreveld is het nooit saai. Hier lees, kijk en luister je de laatste updates van Koeching!',
    },
    {
      property: 'og:description',
      content:
        'Op de boerderij Borreveld is het nooit saai. Hier lees, kijk en luister je de laatste updates van Koeching!',
    },
  ],
})

const { find } = useStrapi()
const { data: articles = [] } = await find<ApiMessageMessage>('messages', {
  populate: '*',
  sort: 'publishedAt:desc',
})
</script>

<template>
  <main
    class="min-h-screen bg-brown-600 bg-[url(~/assets/svg/wood-pattern.svg)] bg-[length:450px_auto] pb-20 bg-blend-soft-light"
  >
    <div
      class="min-h-[19.5vw] bg-[url(~/assets/svg/desk-clutter-knowledge.svg)] bg-[length:100%_auto] bg-left-top bg-no-repeat px-6 md:px-[5vw]"
    >
      <div class="mx-auto max-w-xl px-[6vw] pb-[10vw] pt-[8vw] md:pb-[6vw] lg:max-w-3xl">
        <PageTitle class="text-center text-white">Nieuws</PageTitle>
        <p class="mt-4 text-white sm:text-center lg:text-lg xl:text-xl">
          Op de boerderij Borreveld is het nooit saai. Hier lees, kijk en luister je de
          laatste updates van Koeching!
        </p>
      </div>
      <div
        class="grid gap-10 xl:grid-cols-[repeat(auto-fill,minmax(auto,1100px))] xl:items-center xl:justify-center"
      >
        <NewspaperArticle
          v-for="article in articles"
          class="grow"
          :content="article.attributes.content"
          :date="article.attributes.publishedAt"
          :image="article.attributes.media.data"
          :title="article.attributes.title"
        />
      </div>
    </div>
  </main>
</template>
