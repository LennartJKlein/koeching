<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: "sky-400",
  },
  iconOnly: Boolean,
  label: String,
  to: String,
  wide: Boolean,
});

const colorClasses: { [key: string]: string } = {
  "sky-400":
    "before:bg-sky-600 after:bg-sky-400 hover:after:bg-sky-300 focus:after:bg-sky-300",
  "brown-200":
    "before:bg-brown-300 after:bg-brown-200 hover:after:bg-brown-100 focus:after:bg-brown-100",
  white:
    "shadow-[0_0_0_2px_black] before:bg-gray-200 after:bg-white hover:after:bg-gray-100 focus:after:bg-gray-100",
};
</script>

<template>
  <NuxtLink
    class="border-t-none border-x-none group relative z-10 flex cursor-pointer select-none items-center justify-center border-b-transparent active:border-b-[5px]"
    :to="to"
    v-bind="$attrs"
    :aria-label="label"
  >
    <span
      :class="[
        'relative flex justify-center rounded-3xl border-b-[5px] border-b-transparent py-3 font-bold uppercase shadow-[0_0_0_2px_black] group-active:translate-y-[5px] group-active:border-b-0',
        iconOnly ? 'px-4' : 'px-6',
        wide && 'min-w-[150px]',
        `before:content[''] before:absolute before:left-0 before:top-[5px] before:-z-10 before:h-full before:w-full before:rounded-3xl group-active:before:invisible`,
        `after:content[''] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-3xl`,
        colorClasses[color],
      ]"
    >
      <slot />
    </span>
  </NuxtLink>
</template>
