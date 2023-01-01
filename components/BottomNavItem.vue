<script setup lang="ts">
defineProps({
  label: String,
  icon: String,
  to: String,
});
</script>

<template>
  <li class="flex-auto">
    <NuxtLink
      class="duration-400 group flex h-full flex-col items-center justify-center bg-[url(~/assets/svg/grass-dark.svg)] bg-[length:100%_0] bg-bottom bg-no-repeat text-xs font-bold transition-bg-size [&.router-link-active]:bg-[length:100%_100%]"
      :to="to"
    >
      {{ label }}
      <div
        class="relative order-first h-9 w-9 group-[&.router-link-active]:animate-gelatine"
      >
        <svg
          aria-hidden="true"
          class="absolute w-full outline-none"
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          tabindex="-1"
          viewBox="0 0 32 32"
        >
          <use :xlink:href="`#icon-${icon}-line`"></use>
        </svg>
        <svg
          aria-hidden="true"
          class="clip-dot group-[&.router-link-active]:clip-circle group-hover:clip-circle group-active:clip-circle group-focus:clip-circle absolute w-full outline-none transition-clip duration-200"
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          tabindex="-1"
          viewBox="0 0 32 32"
        >
          <use :xlink:href="`#icon-${icon}`"></use>
        </svg>
      </div>
    </NuxtLink>
  </li>
</template>
