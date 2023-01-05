<script setup lang="ts">
import type { ApiAnimalAnimal } from "~/types/schemas";

const { find } = useStrapi();
const route = useRoute();
const {
  data: [animal],
} = await find<ApiAnimalAnimal>("animals", {
  filters: {
    slug: {
      $eq: route.params.animal,
    },
  },
  populate: "*",
});

const goBack = function () {
  const router = useRouter();
  router.push("/ontdek");
};

const { $markdown } = useNuxtApp();
</script>

<template>
  <Modal
    :aria-label="`Meer over ${animal.attributes.name}`"
    id="animalModal"
    open
    @close="goBack"
  >
    <section>
      <h1
        class="mb-3 font-display text-3xl font-bold text-brown-300"
        v-if="animal.attributes.name"
      >
        {{ animal.attributes.name }}
      </h1>
      <p class="my-12 mx-3 italic">Todo: fotos van dier/dieren</p>
      <div
        v-if="animal.attributes.bio"
        :class="[
          '[&>h2]:mt-4 [&>h2]:font-display [&>h2]:text-xl [&>h2]:leading-tight',
          '[&>h3]:mt-4 [&>h3]:font-display [&>h3]:text-xl [&>h3]:leading-tight',
          '[&>h4]:mt-4 [&>h4]:font-display [&>h4]:text-xl [&>h4]:leading-tight',
          '[&>h5]:mt-4 [&>h5]:font-display [&>h5]:text-xl [&>h5]:leading-tight',
          '[&>h6]:mt-4 [&>h6]:font-display [&>h6]:text-xl [&>h6]:leading-tight',
        ]"
        v-html="$markdown.render(animal.attributes.bio)"
      />
      <p class="my-12 mx-3 italic">
        Todo: diensten/producten waarbij deze dieren worden ingezet
      </p>
      <p class="my-12 mx-3 italic">
        Todo: diensten/producten waarbij deze dieren worden ingezet
      </p>
    </section>
  </Modal>
</template>
