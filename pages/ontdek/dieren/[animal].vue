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

const { classes: mdClasses } = useMdStyles()
const { trimImgSrc } = useImgUtils()
</script>

<template>
  <Modal
    :aria-label="`Meer over ${animal.attributes.name}`"
    id="animalModal"
    open
    :overflow-header="
      animal.attributes.photos.data && animal.attributes.photos.data.length > 0
    "
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
        <NuxtImg
          v-for="photo in animal.attributes.photos.data"
          :class="[
            animal.attributes.photos.data.length > 1
              ? 'aspect-square w-10/12 flex-shrink-0 snap-start sm:aspect-[4/3]'
              : 'aspect-[4/3] w-full',
            'overflow-hidden rounded-xl object-cover',
          ]"
          :placeholder="[800, 600, 10]"
          :src="trimImgSrc(photo.attributes.url)"
          height="600"
          provider="cloudinary"
          role="listitem"
          width="800"
        />
      </div>
      <div
        v-if="animal.attributes.bio"
        :class="mdClasses"
        v-html="$sanitize(animal.attributes.bio)"
      />
    </section>
  </Modal>
</template>
