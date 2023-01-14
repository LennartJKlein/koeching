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
})
</script>

<template>
  <div class="relative flex flex-col items-start">
    <div
      class="absolute bottom-0 left-0 right-0 flex min-h-[60%] flex-col justify-end rounded-b-3xl bg-gradient-to-t from-[rgba(0,0,0,0.6)] px-4 pb-5"
    >
      <h5
        v-if="title"
        :class="[
          'font-display font-bold leading-none text-white ',
          titleSmall ? 'text-2xl' : ' text-3xl',
        ]"
        style="hyphens: auto"
      >
        {{ title }}
      </h5>
      <slot />
    </div>
    <div class="absolute top-3 right-3">
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
        'aspect-[3/4] w-full overflow-hidden rounded-3xl bg-gray-800 bg-cover bg-center',
        placeholder == 'animal' && 'bg-[url(~/assets/webp/animal-thumbnail.webp)]',
        placeholder == 'person' && 'bg-[url(~/assets/webp/person-thumbnail.webp)]',
      ]"
      tabindex="-1"
      aria-hidden="true"
    >
      <img
        v-if="image"
        :src="image"
        class="aspect-[3/4] w-full object-cover"
      />
    </figure>
    <nuxt-link
      class="absolute left-0 top-0 right-0 bottom-0 rounded-3xl"
      :to="to"
      tabindex="-1"
      aria-hidden="true"
    />
  </div>
</template>
