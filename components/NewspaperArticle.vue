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
  'rotate-[0.5deg] @xl:rotate-1',
  '-rotate-[0.5deg] @xl:-rotate-1',
]
const rootClass = rootClasses[randomRotation]

const random = Math.floor(Math.random() * 3)
const titleClasses = [
  'order-0 col-span-2 @xl:col-span-3',
  'order-1 col-span-2',
  'order-0 col-span-3 @xl:order-1',
]
const titleClass = titleClasses[random]
const dateClasses = [
  'order-2 col-span-2 @xl:col-span-3 @xl:order-1',
  'order-2 col-span-2',
  'order-1 col-span-3 @xl:order-2',
]
const dateClass = dateClasses[random]
const imageClasses = [
  'order-1 row-span-2 @xl:row-span-0 @xl:order-2',
  'order-0 row-span-2 @xl:row-span-3',
  'order-2 col-span-3 @xl:col-span-1 @xl:order-4',
]
const imageClass = imageClasses[random]
const contentClasses = [
  'order-3 col-span-3 gap-12 @xl:col-span-2 @4xl:columns-2',
  'order-3 col-span-3 gap-12 @xl:col-span-2 @4xl:columns-2',
  'order-3 col-span-3 @xl:col-span-2 gap-12 @2xl:columns-2',
]
const { classes: classesTextStyling } = useContentStyles()
const contentClass = [contentClasses[random], ...classesTextStyling]

const { trimImgSrc } = useImgUtils()

const readableDate = computed(() => {
  return useDateFormat(props.date, 'D MMMM YYYY, HH:mm uur', {
    locales: 'nl-NL',
  }).value.replaceAll('"', '')
})

const isCollapsed = ref(true)
</script>

<template>
  <article :class="['relative @container', rootClass]">
    <div
      class="absolute bottom-0 left-0 right-0 z-10 mx-auto w-max translate-y-1/2 @4xl:hidden"
    >
      <Button
        @click="isCollapsed = !isCollapsed"
        color="brown-200"
        small
      >
        <Icon
          id="arrow-down"
          size="4"
          :class="['z-20 fill-black', !isCollapsed && 'rotate-180']"
        />
      </Button>
    </div>
    <div
      :class="[
        'grid grid-cols-3 gap-x-5 gap-y-3 overflow-hidden bg-gradient-to-br from-gray-50 to-brown-50 px-5 pb-10 pt-5 shadow-md drop-shadow-[1px_3px_2px_#5d482d] @xl:pb-5',
        isCollapsed && 'max-h-72 @4xl:max-h-[none]',
      ]"
    >
      <h2
        v-if="title"
        :class="[
          'w-full font-display text-3xl font-bold leading-none @xl:text-4xl @xl:leading-none',
          titleClass,
        ]"
        style="hyphens: auto"
        @click="isCollapsed = !isCollapsed"
      >
        {{ title }}
      </h2>
      <p
        v-if="readableDate"
        :class="[
          '-mt-1 w-full text-sm font-bold italic text-gray-400 @xl:-mt-2',
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
