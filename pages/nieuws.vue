<script setup lang="ts">
import type { ApiMessageMessage } from '~/types/schemas'

const { find } = useStrapi()
const { data: articles = [] } = await find<ApiMessageMessage>('messages', {
  populate: '*',
  sort: 'rank:asc',
})
</script>

<template>
  <main
    class="min-h-screen bg-brown-600 bg-[url(~/assets/svg/wood-pattern.svg)] bg-[length:450px_auto] pb-20 bg-blend-soft-light"
  >
    <div
      class="min-h-[19.5vw] bg-[url(~/assets/svg/desk-clutter-knowledge.svg)] bg-[length:100%_auto] bg-left-top bg-no-repeat px-6 md:px-[5vw]"
    >
      <div class="mx-auto max-w-xl px-[6vw] pt-[8vw] pb-[10vw] md:pb-[6vw]">
        <PageTitle class="text-center text-white">Nieuws</PageTitle>
        <p class="mt-4 text-white sm:text-center">
          Op de boerderij Borreveld is het nooit saai. Hier lees, kijk en luister je de
          laatste updates van Koeching!
        </p>
      </div>
      <div class="grid gap-10 2xl:grid-cols-2">
        <NewspaperArticle
          v-for="article in articles"
          :content="article.attributes.content"
          :date="article.attributes.publishedAt"
          :image="article.attributes.media.data"
          :title="article.attributes.title"
        />
      </div>
    </div>
  </main>
</template>
