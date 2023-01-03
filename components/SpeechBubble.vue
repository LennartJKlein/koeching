<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: "sky-500",
  },
});
</script>

<template>
  <div
    :class="[
      color == 'white'
        ? 'border-pencil-gray-300 bg-white'
        : `border-pencil-${color} bg-${color.replace(/[0-9]/g, '')}200`,
      'relative border-r-8 px-4 pt-3 pb-4',
      `before:absolute before:-top-3 before:left-1/4 before:h-0 before:w-0 before:-translate-y-full before:-translate-x-1/2 before:border-x-16 before:border-b-16 before:border-t-0 before:border-x-transparent before:content-['']`,
      `after:absolute after:-top-2 after:left-1/4 after:h-0 after:w-0 after:-translate-y-full after:-translate-x-1/2 after:border-x-16 after:border-b-18 after:border-t-0 after:border-x-transparent after:content-['']`,
      color === 'sky-500' && 'before:border-b-sky-500 after:border-b-sky-200',
      color === 'brown-300' &&
        'before:border-b-brown-300 after:border-b-brown-100',
      color === 'white' && 'before:border-b-gray-300 after:border-b-white',
    ]"
  >
    <slot />
  </div>
</template>
