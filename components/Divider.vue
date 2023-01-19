<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'black',
  },
})

const imageClass = computed(() => {
  switch (props.color) {
    case 'sky-100':
      return 'bg-[url(~/assets/svg/line-sky-100.svg)]'
    case 'sky-300':
      return 'bg-[url(~/assets/svg/line-sky-300.svg)]'
    case 'sky-500':
      return 'bg-[url(~/assets/svg/line-sky-500.svg)]'
    case 'black':
    default:
      return 'bg-[url(~/assets/svg/line-black.svg)]'
  }
})
</script>

<template>
  <hr :class="['h-1 w-full border-none bg-[length:100%_100%]', imageClass]" />
</template>
