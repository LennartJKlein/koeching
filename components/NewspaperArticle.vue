<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

const props = defineProps({
  content: String,
  date: String,
  image: Object,
  title: String,
})

const randomRotation = Math.floor(Math.random() * 3)
const rootClasses = [
  'rotate-0',
  'rotate-[0.5deg] md:rotate-1',
  '-rotate-[0.5deg] md:-rotate-1',
]
const rootClass = rootClasses[randomRotation]

const random = Math.floor(Math.random() * 3)
const titleClasses = [
  'order-0 col-span-2 md:col-span-3',
  'order-1 col-span-2',
  'order-0 col-span-3 md:order-1',
]
const titleClass = titleClasses[random]
const dateClasses = [
  'order-2 col-span-2 md:col-span-3 md:order-1',
  'order-2 col-span-2',
  'order-1 col-span-3 md:order-2',
]
const dateClass = dateClasses[random]
const imageClasses = [
  'order-1 row-span-2 md:row-span-0 md:order-2',
  'order-0 row-span-2 md:row-span-3',
  'order-2 col-span-3 md:order-0',
]
const imageClass = imageClasses[random]
const contentClasses = [
  'order-3 col-span-3 md:col-span-2 sm:columns-2',
  'order-3 col-span-3 md:col-span-2 sm:columns-2',
  'order-3 col-span-3 sm:columns-2 lg:columns-3',
]
const { classes: classesTextStyling } = useContentStyles()
const contentClass = [contentClasses[random], ...classesTextStyling]

const { trimImgSrc } = useImgUtils()

const readableDate = computed(() => {
  return useDateFormat(props.date, 'D MMMM YYYY, HH:mm uur', {
    locales: 'nl-NL',
  }).value.replaceAll('"', '')
})

const isMobileCollapsed = ref(true)
</script>

<template>
  <article :class="['relative', rootClass]">
    <div
      class="absolute bottom-0 right-0 left-0 z-10 mx-auto w-max translate-y-1/2 md:hidden"
    >
      <Button
        @click="isMobileCollapsed = !isMobileCollapsed"
        color="brown-200"
        small
      >
        <Icon
          id="arrow-down"
          size="4"
          :class="['z-20 fill-black', !isMobileCollapsed && 'rotate-180']"
        />
      </Button>
    </div>
    <div
      :class="[
        'grid grid-cols-3 gap-x-5 gap-y-3 overflow-hidden bg-gradient-to-br from-gray-50 to-brown-50 px-5 pt-5 pb-10 shadow-md drop-shadow-[1px_3px_2px_#5d482d] md:pb-5',
        isMobileCollapsed && 'max-h-72 md:max-h-[none]',
      ]"
    >
      <h2
        v-if="title"
        :class="[
          'w-full font-display text-3xl font-bold leading-none lg:text-4xl lg:leading-none',
          titleClass,
        ]"
        style="hyphens: auto"
        @click="isMobileCollapsed = !isMobileCollapsed"
      >
        {{ title }}
      </h2>
      <p
        v-if="readableDate"
        :class="[
          '-mt-1 w-full text-sm font-bold italic text-gray-400 md:-mt-2',
          dateClass,
        ]"
      >
        {{ readableDate }}
      </p>
      <figure
        v-if="image"
        :class="['m-0 h-full max-h-[300px] w-full border-2 border-brown-300', imageClass]"
        role="list"
      >
        <NuxtImg
          class="h-full w-full overflow-hidden object-cover"
          :placeholder="[800, 600, 10]"
          :src="trimImgSrc(image.attributes.url)"
          height="600"
          provider="cloudinary"
          role="listitem"
          width="800"
        />
      </figure>
      <div
        v-if="content"
        :class="['text-lg', contentClass]"
        v-html="$sanitize(content)"
      />
    </div>
  </article>
</template>
