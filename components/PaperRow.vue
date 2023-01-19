<script setup lang="ts">
const props = defineProps({
  accentColor: {
    default: 'green',
    type: String,
  },
  color: String,
  description: String,
  image: String,
  label: String,
  modal: String,
  placeholder: String,
  title: String,
  to: String,
})

let accentColor: string, accentColorDark: string
switch (props.accentColor) {
  case 'sky':
    accentColor = 'text-sky-400'
    accentColorDark = 'text-sky-500'
    break
  case 'brown':
    accentColor = 'text-brown-400'
    accentColorDark = 'text-brown-600'
    break
  case 'green':
  default:
    accentColor = 'text-green-400'
    accentColorDark = 'text-green-600'
}
</script>

<template>
  <li
    class="border-b-divider relative flex flex-wrap items-center gap-3 py-2 last:border-b-0 lg:gap-5"
  >
    <figure
      :class="[
        'my-auto aspect-square w-12 overflow-hidden rounded-full bg-gray-800 bg-cover bg-center md:w-20',
        placeholder == 'animal' && 'bg-[url(~/assets/webp/animal-thumbnail.webp)]',
        placeholder == 'person' && 'bg-[url(~/assets/webp/person-thumbnail.webp)]',
        placeholder == 'method' && 'bg-[url(~/assets/webp/method-thumbnail.webp)]',
      ]"
      tabindex="-1"
      aria-hidden="true"
    >
      <img
        v-if="image"
        :src="image"
        class="aspect-square w-full object-cover"
      />
    </figure>
    <h5
      v-if="title"
      :class="[
        `font-display text-xl font-bold leading-none md:text-2xl`,
        accentColorDark,
      ]"
      style="hyphens: auto"
    >
      {{ title }}
    </h5>
    <Button
      v-if="to"
      :aria-controls="modal"
      class="ml-auto"
      :color="color"
      icon-only
      :label="label"
      small
      :to="to"
    >
      <span
        :class="[
          'flex h-4 w-4 items-center justify-center font-display text-2xl font-bold',
          accentColor,
        ]"
        >?</span
      >
    </Button>
    <slot />
    <nuxt-link
      class="absolute left-0 top-0 right-0 bottom-0"
      :to="to"
      tabindex="-1"
      aria-hidden="true"
    />
  </li>
</template>
