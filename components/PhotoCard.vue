<script setup lang="ts">
const props = defineProps({
  color: String,
  description: String,
  image: String,
  placeholder: String,
  label: String,
  title: String,
  titleSmall: Boolean,
  to: String,
  modal: String,
  wide: Boolean,
})

const { trimImgSrc } = useImgUtils()
</script>

<template>
  <div class="relative flex flex-col items-start">
    <div
      class="absolute bottom-0 left-0 right-0 flex min-h-[60%] flex-col justify-end rounded-b-3xl bg-gradient-to-t from-[rgba(0,0,0,0.6)] px-4 pb-5"
    >
      <h5
        v-if="title"
        :class="[
          'font-display font-bold leading-none text-white',
          titleSmall ? 'text-xl' : ' text-2xl',
        ]"
        style="hyphens: auto"
      >
        {{ title }}
      </h5>
      <slot />
    </div>
    <div class="absolute right-3 top-3">
      <Button
        v-if="to"
        :color="color"
        :label="label"
        :to="to"
        :aria-controls="modal"
        icon-only
      >
        <span
          class="flex h-4 w-4 items-center justify-center font-display text-2xl font-bold text-sky-500"
          >?</span
        >
      </Button>
    </div>
    <figure
      :class="[
        'w-full overflow-hidden rounded-3xl bg-gray-800 bg-cover bg-center',
        wide ? 'aspect-video' : 'aspect-[3/4]',
        placeholder == 'animal' && 'bg-[url(~/assets/webp/animal-thumbnail.webp)]',
        placeholder == 'person' && 'bg-[url(~/assets/webp/person-thumbnail.webp)]',
        placeholder == 'method' && 'bg-[url(~/assets/webp/method-thumbnail.webp)]',
      ]"
      tabindex="-1"
      aria-hidden="true"
    >
      <NuxtImg
        v-if="image"
        :class="['w-full object-cover', wide ? 'aspect-video' : 'aspect-[3/4]']"
        :height="wide ? 900 : 1200"
        :placeholder="[300, 600, 10]"
        :src="trimImgSrc(image)"
        :width="wide ? 1600 : 600"
        fit="cover"
        provider="cloudinary"
        quality="100"
      />
    </figure>
    <nuxt-link
      class="absolute bottom-0 left-0 right-0 top-0 rounded-3xl"
      :to="to"
      tabindex="-1"
      aria-hidden="true"
    />
  </div>
</template>
