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
      <div
        v-if="animal.attributes.photos.data"
        :class="[
          animal.attributes.photos.data.length > 1 &&
            '-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-scroll px-5 md:snap-proximity',
          'mb-4',
        ]"
        role="list"
      >
        <img
          v-for="photo in animal.attributes.photos.data"
          :class="[
            animal.attributes.photos.data.length > 1
              ? 'aspect-square w-10/12 flex-shrink-0 snap-start sm:aspect-[4/3]'
              : 'aspect-[4/3] w-full',
            'rounded-xl object-cover',
          ]"
          role="listitem"
          :src="photo.attributes.url"
        />
      </div>
      <div
        v-if="animal.attributes.bio"
        :class="[
          '[&>h2]:mt-4 [&>h2]:font-display [&>h2]:text-xl [&>h2]:leading-tight',
          '[&>h3]:mt-4 [&>h3]:font-display [&>h3]:text-xl [&>h3]:leading-tight',
          '[&>h4]:mt-4 [&>h4]:font-display [&>h4]:text-xl [&>h4]:leading-tight',
          '[&>h5]:mt-4 [&>h5]:font-display [&>h5]:text-xl [&>h5]:leading-tight',
          '[&>h6]:mt-4 [&>h6]:font-display [&>h6]:text-xl [&>h6]:leading-tight',
          '[&>p]:mt-4',
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
