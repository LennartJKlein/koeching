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
});

const random = Math.floor(Math.random() * 10)
const rotations = ['rotate-0', 'rotate-1', 'rotate-2', 'rotate-3', 'rotate-6', '-rotate-0', '-rotate-1', '-rotate-2', '-rotate-3', '-rotate-6']
const rotationClass = rotations[random]

</script>

<template>
  <div :class="['rounded-xl bg-white bg-opacity-50 p-2 aspect-[7/10] max-w-[250px] shadow-sm', rotationClass]">
    <div class="relative h-full flex flex-col items-center bg-white rounded-sm p-5 shadow-[1px_2px_0_rgb(0_0_0/10%)]">
      <h5
        v-if="title"
        :class="[
          'font-display font-bold leading-none text-center',
          titleSmall ? 'text-2xl' : ' text-3xl',
        ]"
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
            class="flex h-4 w-4 items-center justify-center font-display text-2xl font-bold text-sky-500"
            >?</span
          >
        </Button>
      </div>
      <figure
        :class="[
          'aspect-square w-4/5 overflow-hidden rounded-full bg-gray-800 bg-cover bg-center mt-4',
          placeholder == 'animal' &&
            'bg-[url(~/assets/webp/animal-thumbnail.webp)]',
          placeholder == 'person' &&
            'bg-[url(~/assets/webp/person-thumbnail.webp)]',
        ]"
        tabindex="-1"
        aria-hidden="true"
      >
        <img v-if="image" :src="image" class="aspect-square w-full object-cover" />
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
