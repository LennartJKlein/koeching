<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    default: "",
  },
});

const images = import.meta.glob("./*.(webp)", { as: "url", eager: true });
const imageUrl = computed(() => {
  return String(
    Object.values(images).find((path) => String(path).includes(props.image))
  );
});
</script>

<template>
  <figure
    class="relative -z-10 after:absolute after:bottom-0 after:block after:h-1 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%]"
  >
    <img class="h-60v max-h-[600px] w-full object-cover" :src="imageUrl" />
  </figure>
</template>
