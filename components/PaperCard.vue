<script setup lang="ts">
import { random } from 'lodash'

const props = defineProps({
  color: String,
  accentColor: {
    default: 'green',
    type: String,
  },
  description: String,
  image: String,
  placeholder: String,
  label: String,
  title: String,
  to: String,
  modal: String,
})

const random = Math.floor(Math.random() * 8)
const rotations = [
  'rotate-0',
  'rotate-1',
  'rotate-2',
  'rotate-3',
  '-rotate-0',
  '-rotate-1',
  '-rotate-2',
  '-rotate-3',
]
const rotationClass = rotations[random]

const shadows = [
  'before:left-[16px] before:-skew-y-6 before:-skew-x-6 before:-rotate-3',
  'before:left-[16px] before:-skew-y-6 before:-skew-x-6 before:-rotate-3',
  'before:left-[16px] before:-skew-y-6 before:-skew-x-6 before:-rotate-3',
  'before:left-[16px] before:-skew-y-6 before:-skew-x-6 before:-rotate-3',
  'before:right-[16px] before:skew-y-6 before:skew-x-6 before:rotate-3',
  'before:right-[16px] before:skew-y-6 before:skew-x-6 before:rotate-3',
  'before:right-[16px] before:skew-y-6 before:skew-x-6 before:rotate-3',
  'before:right-[16px] before:skew-y-6 before:skew-x-6 before:rotate-3',
]
const shadowClass = shadows[random]

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
  <div
    :class="[
      'relative, aspect-[7/10] max-w-[250px] rounded-xl bg-gradient-to-br from-[rgb(255_255_255/60%)] via-[rgb(255_255_255/35%)] to-[rgb(255_255_255/50%)] p-2 shadow-sm',
      rotationClass,
      'before:-z-1 before:absolute before:top-3/4 before:bottom-6 before:w-3/4 before:bg-black before:opacity-30 before:shadow-[0_0_15px_8px_#5a5041]',
      shadowClass,
    ]"
  >
    <div
      class="relative flex h-full flex-col items-center rounded-sm bg-gray-50 py-5 px-3 shadow-[inset_-1px_-2px_0_#ccc,inset_2px_2px_0_white]"
    >
      <h5
        v-if="title"
        :class="[
          'w-full text-center font-display text-3xl font-bold leading-none lg:text-2xl lg:leading-none',
          accentColorDark,
        ]"
        style="hyphens: auto"
      >
        {{ title }}
      </h5>
      <div class="absolute bottom-3 right-3">
        <Button
          v-if="to"
          :color="color"
          :label="label"
          :to="to"
          :aria-controls="modal"
          icon-only
        >
          <span
            :class="[
              'flex h-4 w-4 items-center justify-center font-display text-2xl font-bold',
              accentColor,
            ]"
            >?</span
          >
        </Button>
      </div>
      <figure
        :class="[
          'my-auto aspect-square w-4/5 overflow-hidden rounded-full bg-gray-800 bg-cover bg-center',
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
      <slot />
      <nuxt-link
        class="absolute left-0 top-0 right-0 bottom-0 rounded-full"
        :to="to"
        tabindex="-1"
        aria-hidden="true"
      />
    </div>
  </div>
</template>
