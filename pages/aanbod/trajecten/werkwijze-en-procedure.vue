<script setup lang="ts">
import type { ApiProcessProcess } from '@/types'

const { find } = useStrapi()
const { data } = (await find<ApiProcessProcess>('process', {
  populate: '*',
})) as any
const process: ApiProcessProcess = data

useHead({
  title: `${process.attributes.name} | Koeching, kinder- en jeugdtherapie op de boerderij`,
  meta: [
    {
      property: 'og:title',
      content: `${process.attributes.name} | Koeching, kinder- en jeugdtherapie op de boerderij`,
    },
    {
      name: 'description',
      content: process.attributes.intro,
    },
    {
      property: 'og:description',
      content: process.attributes.intro,
    },
  ],
})

const goBack = function () {
  const router = useRouter()
  router.push('/ontdek')
}

const { classes: contentClasses } = useContentStyles()
const { trimImgSrc } = useImgUtils()

const showContentAdults = ref(false)
const showContentMinors = ref(false)
</script>

<template>
  <Modal
    aria-label="Meer over onze werkwijze"
    id="processModal"
    open
    overflow-header
    @close="goBack"
  >
    <template v-slot:heading>
      <h1
        v-if="process.attributes.name"
        class="mb-3 font-display text-3xl font-bold leading-none text-sky-900 md:text-4xl"
      >
        {{ process.attributes.name }}
      </h1>
      <p
        v-if="process.attributes.intro"
        class="text-lg font-bold text-sky-500"
      >
        {{ process.attributes.intro }}
      </p>
    </template>
    <section>
      <div
        v-if="process.attributes.photos.data"
        :class="[
          'my-5',
          process.attributes.photos.data.length > 1 &&
            '-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-scroll px-5 md:snap-proximity',
        ]"
        role="list"
      >
        <NuxtImg
          v-for="photo in process.attributes.photos.data"
          :class="[
            process.attributes.photos.data.length > 1
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
        v-if="process.attributes.content_minors"
        class="border-pencil-sky-500 grid cursor-pointer grid-cols-[auto_110px] items-center justify-between gap-3 bg-white sm:grid-cols-[auto_145px]"
        @click="showContentMinors = !showContentMinors"
      >
        <span class="pl-2 font-bold leading-tight text-sky-500">
          Werkwijze bij kinderen / jongeren
        </span>
        <Button
          class="ml-auto mr-0"
          color="white"
          icon-only
          label="Toon informatie over deze groep"
          small
          outlined
          @click.stop="showContentMinors = !showContentMinors"
        >
          <Icon
            id="arrow-down"
            :class="[showContentMinors && 'rotate-180', 'transition-all']"
            size="4"
          />
        </Button>
        <Transition>
          <div
            v-show="showContentMinors"
            class="col-span-2 -mx-2 -mb-2 bg-gray-100 p-3"
          >
            <div
              :class="[...contentClasses, 'mb-10']"
              v-html="$sanitize(process.attributes.content_minors)"
            />
          </div>
        </Transition>
      </div>
      <div
        v-if="process.attributes.content_adults"
        class="border-pencil-sky-500 mt-5 grid cursor-pointer grid-cols-[auto_110px] items-center justify-between gap-3 bg-white sm:grid-cols-[auto_145px]"
        @click="showContentAdults = !showContentAdults"
      >
        <span class="pl-2 font-bold leading-tight text-sky-500">
          Werkwijze bij volwassenen
        </span>
        <Button
          class="ml-auto mr-0"
          color="white"
          icon-only
          label="Toon informatie over deze groep"
          small
          outlined
          @click.stop="showContentAdults = !showContentAdults"
        >
          <Icon
            id="arrow-down"
            :class="[showContentAdults && 'rotate-180', 'transition-all']"
            size="4"
          />
        </Button>
        <Transition>
          <div
            v-show="showContentAdults"
            class="col-span-2 -mx-2 -mb-2 bg-gray-100 p-3"
          >
            <div
              :class="[...contentClasses, 'mb-10']"
              v-html="$sanitize(process.attributes.content_adults)"
            />
          </div>
        </Transition>
      </div>
    </section>
  </Modal>
</template>
