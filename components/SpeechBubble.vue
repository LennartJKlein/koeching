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
      'overflow-hidden border-r-8 px-4 pt-3 pb-4',
    ]"
  >
    <slot />
  </div>
</template>
