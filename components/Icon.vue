<script setup lang="ts">
defineProps({
  id: String,
  size: {
    type: String,
    default: "4",
  },
});

const sizesClasses: { [key: string]: string } = {
  4: "w-4 h-4",
  6: "w-6 h-6",
  8: "w-8 h-8",
  10: "w-10 h-10",
};
</script>

<template>
  <svg
    aria-hidden="true"
    :class="['inline-block outline-none', sizesClasses[size]]"
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    tabindex="-1"
    viewBox="0 0 32 32"
  >
    <use :xlink:href="`#icon-${id}`"></use>
  </svg>
</template>
