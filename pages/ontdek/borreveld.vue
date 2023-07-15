<script setup lang="ts">
import type { ApiFarmFarm } from '@/types'

const { find } = useStrapi()
const { data } = (await find<ApiFarmFarm>('farm', {
  populate: '*',
})) as any
const farm: ApiFarmFarm = data

useHead({
  title: `${farm.attributes.name} | Koeching, kinder- en jeugdtherapie op de boerderij`,
  meta: [
    {
      property: 'og:title',
      content: `${farm.attributes.name} | Koeching, kinder- en jeugdtherapie op de boerderij`,
    },
    {
      name: 'description',
      content: farm.attributes.intro,
    },
    {
      property: 'og:description',
      content: farm.attributes.intro,
    },
  ],
})

const goBack = function () {
  const router = useRouter()
  router.push('/ontdek')
}

const { classes: contentClasses } = useContentStyles()
const { trimImgSrc } = useImgUtils()
</script>

<template>
  <Modal
    aria-label="Meer over boerderij Borreveld"
    id="farmModal"
    open
    overflow-header
    @close="goBack"
  >
    <template v-slot:heading>
      <h1
        v-if="farm.attributes.name"
        class="mb-3 font-display text-3xl font-bold leading-none text-sky-900 md:text-4xl"
      >
        {{ farm.attributes.name }}
      </h1>
      <p
        v-if="farm.attributes.intro"
        class="text-lg font-bold text-sky-500"
      >
        {{ farm.attributes.intro }}
      </p>
    </template>
    <section>
      <div
        v-if="farm.attributes.photos.data"
        :class="[
          'my-5',
          farm.attributes.photos.data.length > 1 &&
            '-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-scroll px-5 md:snap-proximity',
        ]"
        role="list"
      >
        <NuxtImg
          v-for="photo in farm.attributes.photos.data"
          :class="[
            farm.attributes.photos.data.length > 1
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
        v-if="farm.attributes.content"
        :class="[...contentClasses, 'mb-10']"
        v-html="$sanitize(farm.attributes.content)"
      />
    </section>
  </Modal>
</template>
