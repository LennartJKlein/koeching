<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: "sky",
  },
});
</script>

<template>
  <div
    :class="[
      color == 'white'
        ? 'border-pencil-gray-300 bg-white'
        : `border-pencil-${color}-600 bg-${color}-200`,
      'overflow-hidden border-r-8 px-4 pt-3 pb-4',
    ]"
  >
    <slot />
  </div>
</template>
