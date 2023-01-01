<script setup lang="ts">
const props = defineProps({
  color: String,
  description: String,
  image: String,
  label: String,
  title: String,
  to: String,
  modal: String,
});
</script>

<template>
  <div class="relative flex flex-col items-start">
    <figure v-if="image" class="order-1 mr-5 -mb-8 w-full pr-5">
      <img
        :src="image"
        class="aspect-video w-full overflow-hidden rounded-3xl object-cover"
      />
    </figure>
    <h5
      v-if="title"
      class="order-3 ml-6 font-display text-2xl font-bold text-brown-500"
    >
      {{ title }}
    </h5>
    <p v-if="description" class="order-4 ml-6">{{ description }}</p>
    <Button
      v-if="to"
      :class="[image ? 'order-2' : 'order-4', 'self-end']"
      :color="color"
      :label="label"
      :to="to"
      :aria-controls="modal"
      icon-only
      ><Icon id="dots"
    /></Button>
    <slot />
  </div>
</template>
