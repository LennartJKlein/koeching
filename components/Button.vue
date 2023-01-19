<script setup lang="ts">
const NuxtLink = resolveComponent('NuxtLink')

const props = defineProps({
  color: {
    type: String,
    default: 'sky-400',
  },
  iconOnly: Boolean,
  label: String,
  squared: Boolean,
  outlined: Boolean,
  to: String,
  small: Boolean,
  wide: Boolean,
})

const colorClasses: { [key: string]: string } = {
  'sky-400': props.outlined
    ? 'shadow-[0_0_0_2px_#3f93b6] text-sky-700 before:bg-sky-600 after:bg-white group-hover:after:bg-gray-100 group-focus-visible:after:bg-gray-100'
    : 'shadow-[0_0_0_2px_#18181b] text-white before:bg-sky-600 after:bg-sky-400 group-hover:after:bg-sky-300 group-focus-visible:after:bg-sky-300',
  'brown-200': props.outlined
    ? 'shadow-[0_0_0_2px_#866841] text-brown-300 before:bg-brown-200 after:bg-white group-hover:after:bg-gray-100 group-focus-visible:after:bg-gray-100'
    : 'shadow-[0_0_0_2px_#18181b] text-white before:bg-brown-300 after:bg-brown-200 group-hover:after:bg-brown-100 group-focus-visible:after:bg-brown-100',
  white: props.outlined
    ? 'shadow-[0_0_0_2px_#d4d4d8] text-gray-500 before:bg-gray-300 after:bg-white group-hover:after:bg-gray-100 group-focus-visible:after:bg-gray-100'
    : 'shadow-[0_0_0_2px_#18181b] text-gray-600 before:bg-gray-300 after:bg-white group-hover:after:bg-gray-100 group-focus-visible:after:bg-gray-100',
  black: props.outlined
    ? 'shadow-[0_0_0_2px_#18181b] text-gray-900 before:bg-gray-900 after:bg-white group-hover:after:bg-gray-100 group-focus-visible:after:bg-gray-100'
    : 'shadow-[0_0_0_2px_#18181b] text-black before:bg-gray-300 after:bg-white group-hover:after:bg-gray-100 group-focus-visible:after:bg-gray-100',
  transparent: props.outlined
    ? 'shadow-[0_0_0_2px_transparent] text-gray-700 before:bg-transparent after:bg-transparent group-hover:after:bg-transparent group-focus-visible:after:bg-transparent'
    : 'shadow-[0_0_0_2px_transparent] text-gray-700 before:bg-transparent after:bg-transparent group-hover:after:bg-transparent group-focus-visible:after:bg-transparent',
}
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :class="[
      'border-x-none border-t-none group relative z-10 flex cursor-pointer select-none items-center justify-center border-b-transparent outline-none focus-visible:outline-dotted focus-visible:outline-black active:border-b-[4px]',
      squared ? 'rounded-lg' : 'rounded-3xl',
    ]"
    :to="to"
    v-bind="$attrs"
    :aria-label="label"
    :tabindex="$attrs.tabindex || 0"
  >
    <span
      :class="[
        'relative flex items-center justify-center border-b-[4px] border-b-transparent font-bold group-active:translate-y-[4px] group-active:border-b-0',
        small ? 'py-2' : 'py-3',
        small ? (iconOnly ? 'px-2' : 'px-4') : iconOnly ? 'px-3' : 'px-6',
        small ? 'text-sm' : 'text-lg',
        squared ? 'rounded-lg' : 'rounded-3xl',
        wide && 'min-w-[150px]',
        `before:content[''] before:absolute before:left-0 before:top-[5px] before:-z-10 before:h-full before:w-full group-active:before:invisible`,
        `after:content[''] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full`,
        squared
          ? 'before:rounded-lg after:rounded-lg'
          : 'before:rounded-3xl after:rounded-3xl',
        colorClasses[color],
      ]"
    >
      <slot />
    </span>
  </component>
</template>
