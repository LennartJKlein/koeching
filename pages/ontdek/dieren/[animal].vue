<script setup lang="ts">
import type { ApiAnimalAnimal } from '~/types/schemas'

const { find } = useStrapi()
const route = useRoute()
const {
  data: [animal],
} = await find<ApiAnimalAnimal>('animals', {
  filters: {
    slug: {
      $eq: route.params.animal,
    },
  },
  populate: '*',
})

const goBack = function () {
  const router = useRouter()
  router.push('/ontdek')
}

const { $markdown } = useNuxtApp()
const { classes: mdClasses } = useMdStyles()
</script>

<template>
  <Modal
    :aria-label="`Meer over ${animal.attributes.name}`"
    id="animalModal"
    open
    @close="goBack"
  >
    <template v-slot:heading>
      <h1
        v-if="animal.attributes.name"
        class="mb-3 font-display text-3xl font-bold leading-none text-sky-900 md:text-4xl"
      >
        {{ animal.attributes.name }}
      </h1>
    </template>
    <section>
      <div
        v-if="animal.attributes.photos.data"
        :class="[
          'my-5',
          animal.attributes.photos.data.length > 1 &&
            '-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-scroll px-5 md:snap-proximity',
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
        :class="mdClasses"
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
