<script setup lang="ts">
const props = defineProps({
  images: Array<string>,
})

const { trimImgSrc } = useImgUtils()

const { counter, reset, pause, resume } = useInterval(3000, {
  immediate: true,
  controls: true,
})
watch(counter, (iteration) => {
  if (!props.images || !props.images.length) {
    pause()
  } else if (iteration == props.images.length) {
    reset()
  }
})
</script>

<template>
  <div
    class="bg-blue-500 md: relative isolate flex min-h-[calc(100dvh-50px)] flex-col transition-all before:absolute before:bottom-0 before:z-10 before:block before:h-full before:w-full before:bg-gradient-to-t before:from-green-800/70 after:absolute after:-bottom-0.5 after:z-30 after:block after:h-2 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%] md:min-h-[calc(100dvh-80px)] md:before:via-transparent"
  >
    <Transition v-if="props.images && props.images.length">
      <figure
        :key="props.images[counter]"
        class="absolute inset-0 h-full w-full overflow-hidden"
      >
        <NuxtImg
          class="h-full w-full origin-top animate-zoom-in object-cover md:origin-left"
          :placeholder="[1920, 1920, 10]"
          :src="trimImgSrc(props.images[counter])"
          height="1920"
          provider="cloudinary"
          width="1920"
        />
      </figure>
    </Transition>
    <div
      class="relative z-20 flex h-full w-full grow flex-col justify-end md:justify-center"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 500ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
