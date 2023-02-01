<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  small: Boolean,
  blurImage: Boolean,
})

const images = import.meta.glob('./*.(webp)', { as: 'url', eager: true })
const imageUrl = computed(() => {
  return String(Object.values(images).find((path) => String(path).includes(props.image)))
})
</script>

<template>
  <div
    class="relative overflow-hidden after:absolute after:bottom-0 after:block after:h-1 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%]"
  >
    <figure class="bg-gray-700">
      <img
        :class="{
          'w-full object-cover': true,
          'h-30v max-h-[400px]': small,
          'h-55v max-h-[600px]': !small,
          'blur-[3px]': blurImage,
        }"
        :src="imageUrl"
      />
    </figure>
    <div class="absolute top-0 left-0 flex h-full w-full flex-col justify-start">
      <slot />
    </div>
  </div>
</template>
