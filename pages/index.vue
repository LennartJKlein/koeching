<script setup lang="ts">
import type { ApiHomepageHomepage } from '~/types/schemas'

const { find } = useStrapi()
const { data } = (await find<ApiHomepageHomepage>('homepage', {
  populate: '*',
})) as any
const content: ApiHomepageHomepage = data

useHead({
  title: `Koeching | ${content.attributes.title}`,
  meta: [
    {
      property: 'og:title',
      content: `Koeching | ${content.attributes.title}`,
    },
  ],
})

const heroImages = content.attributes.photos.data
  .slice(0, -3)
  .map((photo: any) => photo.attributes.url)
const pageImages = content.attributes.photos.data
  .slice(-3)
  .map((photo: any) => photo.attributes.url)

const { trimImgSrc } = useImgUtils()

const activeVideo = ref(0)
const previousVideo = () => {
  if (activeVideo.value == 0) {
    activeVideo.value = content.attributes.videos.length - 1
  } else {
    activeVideo.value -= 1
  }
}
const nextVideo = () => {
  if (activeVideo.value == content.attributes.videos.length - 1) {
    activeVideo.value = 0
  } else {
    activeVideo.value += 1
  }
}
</script>

<template>
  <main class="min-h-screen bg-white">
    <PageTitle class="sr-only">{{ content.attributes.title }}</PageTitle>
    <HeroSlider
      :images="heroImages"
      class="bg-sky-300"
    >
      <div
        class="-ml-[5%] -mr-[10%] -mb-[6vh] flex overflow-hidden pt-12 transition-all md:mr-0 md:ml-0"
      >
        <img
          class="w-full max-w-[80vh] animate-fly-in"
          src="~/assets/svg/animals-inviting-hug.svg"
          alt="Dieren van Koeching"
        />
      </div>
      <figure class="relative z-10 mb-16 w-full max-w-[80vh] px-8 md:mb-12">
        <img
          class="w-full"
          src="~/assets/svg/logo.svg"
          alt="Logo van Koeching"
        />
      </figure>
    </HeroSlider>
    <section
      v-if="content.attributes.sales_text[0]"
      class="relative bg-brown-500 bg-[url(~/assets/svg/mud-steps.svg)] bg-[length:auto_100%] bg-left-bottom bg-no-repeat py-32 text-xl text-brown-50 after:absolute after:-bottom-0.5 after:left-0 after:block after:h-2 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%] sm:bg-[length:100%_auto] 2xl:text-2xl"
    >
      <div class="mx-auto flex max-w-4xl flex-col items-center gap-10 px-8 sm:flex-row">
        <img
          class="order-1 mr-10 w-1/2 max-w-xs object-contain sm:order-none sm:mr-0 sm:w-1/4"
          src="~/assets/svg/dog-idea.svg"
        />
        <p v-html="$sanitize(content.attributes.sales_text[0].body)" />
      </div>
    </section>
    <section
      v-if="pageImages[0]"
      class="relative aspect-[7/3] overflow-hidden bg-sky-300 after:absolute after:-bottom-0.5 after:left-0 after:block after:h-2 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%]"
    >
      <NuxtImg
        class="absolute inset-0 h-full w-full animate-zoom-in object-cover"
        :placeholder="[1920, 1080, 10]"
        :src="trimImgSrc(pageImages[0])"
        height="1080"
        provider="cloudinary"
        width="1920"
      />
    </section>
    <section
      v-if="content.attributes.sales_text[1]"
      class="relative bg-brown-100 bg-[url(~/assets/svg/mud-steps.svg)] bg-[length:auto_100%] bg-left-bottom bg-no-repeat py-32 text-xl text-brown-600 after:absolute after:-bottom-0.5 after:left-0 after:block after:h-2 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%] sm:bg-[length:100%_auto] 2xl:text-2xl"
    >
      <div class="mx-auto flex max-w-4xl flex-col items-center gap-10 px-8 sm:flex-row">
        <p v-html="$sanitize(content.attributes.sales_text[1].body)" />
        <img
          class="mr-10 w-1/2 max-w-xs object-contain sm:mr-0 sm:w-1/4"
          src="~/assets/svg/dog-build.svg"
        />
      </div>
    </section>
    <section
      v-if="pageImages[1]"
      class="relative aspect-[7/3] overflow-hidden bg-sky-300 after:absolute after:-bottom-0.5 after:left-0 after:block after:h-2 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%]"
    >
      <NuxtImg
        class="absolute inset-0 h-full w-full animate-zoom-in object-cover"
        :placeholder="[1920, 1080, 10]"
        :src="trimImgSrc(pageImages[1])"
        height="1080"
        provider="cloudinary"
        width="1920"
      />
    </section>
    <section
      v-if="content.attributes.sales_text[2]"
      class="relative bg-white bg-[url(~/assets/svg/mud-steps.svg)] bg-[length:auto_100%] bg-left-bottom bg-no-repeat py-32 text-xl text-brown-500 after:absolute after:-bottom-0.5 after:left-0 after:block after:h-2 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%] sm:bg-[length:100%_auto] 2xl:text-2xl"
    >
      <div class="mx-auto flex max-w-4xl flex-col items-center gap-10 px-8 sm:flex-row">
        <img
          class="order-1 mr-10 w-1/2 max-w-xs object-contain sm:order-none sm:mr-0 sm:w-1/4"
          src="~/assets/svg/dog-donkey-brick.svg"
        />
        <p v-html="$sanitize(content.attributes.sales_text[2].body)" />
      </div>
    </section>
    <section
      v-if="pageImages[2]"
      class="relative aspect-[7/3] overflow-hidden bg-sky-300 after:absolute after:-bottom-0.5 after:left-0 after:block after:h-2 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%]"
    >
      <NuxtImg
        class="absolute inset-0 h-full w-full animate-zoom-in object-cover"
        :placeholder="[1920, 1080, 10]"
        :src="trimImgSrc(pageImages[2])"
        height="1080"
        provider="cloudinary"
        width="1920"
      />
    </section>
    <section
      v-if="content.attributes.videos && content.attributes.videos.length"
      class="relative bg-[linear-gradient(#3f93b6_64%,#62aac6_64%)] px-5 pt-20 pb-32 after:absolute after:-bottom-0.5 after:left-0 after:block after:h-2 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%]"
    >
      <h2 class="mb-8 w-full text-center font-display text-4xl font-bold text-white">
        Een kijkje nemen bij Koeching
      </h2>
      <div class="flex flex-wrap items-center justify-around gap-10 sm:flex-nowrap">
        <Button
          class="order-1 sm:order-none"
          color="sky-400"
          label="Vorige video"
          squared
          @click="previousVideo()"
        >
          <Icon
            id="arrow-left"
            class="mr-2"
          />
          vorige
        </Button>
        <div class="relative w-full max-w-md overflow-hidden">
          <Transition name="static">
            <YouTube
              class="absolute top-[27%] left-[7%] right-[6%] aspect-video overflow-hidden [&>iframe]:aspect-video [&>iframe]:w-full"
              height="auto"
              :key="content.attributes.videos[activeVideo].url"
              :src="content.attributes.videos[activeVideo].url"
              width="auto"
              style="position: absolute"
            />
          </Transition>
          <img
            class="pointer-events-none relative w-full object-contain"
            src="~/assets/svg/tv.svg"
          />
        </div>
        <Button
          class="order-2 sm:order-none"
          color="sky-400"
          label="Volgende video"
          squared
          @click="nextVideo()"
        >
          volgende
          <Icon
            id="arrow-right"
            class="ml-2"
          />
        </Button>
      </div>
    </section>

    <div
      class="relative overflow-hidden bg-[linear-gradient(to_left,rgb(255_255_255/50%),transparent,transparent),url(~/assets/svg/farm-from-distance.svg),linear-gradient(#c8e1eb,#c8e1eb)] bg-[length:cover,auto_1140px,cover] bg-[position:center,center_1rem,center] bg-no-repeat pt-20 pb-24 md:bg-[length:cover,100%_auto,cover]"
    >
      <div class="mx-auto flex h-full max-w-4xl items-center justify-end px-5">
        <Button
          color="white"
          label="Maak kennis met de mensen en dieren"
          to="/ontdek"
        >
          Kennismaken
          <Icon
            id="arrow-right"
            class="ml-2"
          />
        </Button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.static-enter-active,
.static-leave-active {
  transition: opacity 500ms steps(1);
}
.static-enter-active:after,
.static-leave-active:after {
  animation: static 0.3s step-end infinite;
  background: url('~/assets/webp/noise.webp') center / 300px auto repeat;
  content: '';
  height: 100%;
  inset: 0;
  position: absolute;
  width: 100%;
}

.static-enter-from,
.static-leave-to {
  opacity: 0;
}

@keyframes static {
  16% {
    scale: -1 1;
  }
  32% {
    scale: 1 -1;
    filter: invert(1);
  }
  48% {
    scale: -1 -1;
    filter: invert(1);
  }
  64% {
    scale: -1 1;
  }
  80% {
    scale: 1 -1;
    filter: invert(1);
  }
  100% {
    scale: -1 -1;
  }
}
</style>
