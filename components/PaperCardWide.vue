<script setup lang="ts">
const props = defineProps({
  accentColor: {
    default: 'green',
    type: String,
  },
  color: String,
  description: String,
  image: String,
  imageRounded: Boolean,
  label: String,
  modal: String,
  placeholder: String,
  title: String,
  to: String,
})

const random = Math.floor(Math.random() * 3)
const rotations = ['rotate-0', 'rotate-1', '-rotate-1']
const rotationClass = rotations[random]

const shadows = [
  'before:left-[16px] before:-skew-y-3 before:-skew-x-3 before:-rotate-1',
  'before:left-[16px] before:-skew-y-3 before:-skew-x-3 before:-rotate-1',
  'before:right-[16px] before:skew-y-3 before:skew-x-3 before:rotate-1',
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

const { trimImgSrc } = useImgUtils()
</script>

<template>
  <div
    :class="[
      'relative rounded-xl bg-gradient-to-br from-[rgb(255_255_255/60%)] via-[rgb(255_255_255/35%)] to-[rgb(255_255_255/50%)] p-2 shadow-sm',
      rotationClass,
      'before:-z-1 before:absolute before:top-3/4 before:bottom-6 before:w-3/4 before:bg-black before:opacity-30 before:shadow-[0_0_15px_8px_#5a5041]',
      shadowClass,
    ]"
  >
    <div
      class="relative flex h-full gap-3 rounded-sm bg-gray-50 py-5 px-3 shadow-[inset_-1px_-2px_0_#ccc,inset_2px_2px_0_white]"
    >
      <div class="flex flex-col gap-2">
        <h5
          v-if="title"
          :class="[
            'w-full font-display text-3xl font-bold leading-none lg:text-2xl lg:leading-none',
            accentColorDark,
          ]"
          style="hyphens: auto"
        >
          {{ title }}
        </h5>
        <p
          v-if="description"
          class="w-full text-sm"
        >
          {{ description }}
        </p>
        <slot />
      </div>
      <div class="flex w-4/5 max-w-[140px] flex-grow-0 flex-col items-end">
        <figure
          :class="[
            'mb-auto aspect-square overflow-hidden bg-gray-800 bg-cover bg-center',
            placeholder == 'animal' && 'bg-[url(~/assets/webp/animal-thumbnail.webp)]',
            placeholder == 'person' && 'bg-[url(~/assets/webp/person-thumbnail.webp)]',
            placeholder == 'method' && 'bg-[url(~/assets/webp/method-thumbnail.webp)]',
            imageRounded ? 'rounded-full' : 'mb-5 rounded-2xl',
          ]"
          tabindex="-1"
          aria-hidden="true"
        >
          <NuxtImg
            v-if="image"
            :placeholder="[300, 300, 10]"
            :src="trimImgSrc(image)"
            class="aspect-square w-full object-cover"
            height="300"
            provider="cloudinary"
            width="300"
          />
        </figure>
        <Button
          v-if="to"
          class="mt-auto"
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
      <nuxt-link
        class="absolute left-0 top-0 right-0 bottom-0 rounded-full"
        :to="to"
        tabindex="-1"
        aria-hidden="true"
      />
    </div>
  </div>
</template>
