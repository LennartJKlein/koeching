<script setup lang="ts">
import type { ApiHomepageHomepage } from '~/types/schemas'

const { find } = useStrapi()
const { data } = (await find<ApiHomepageHomepage>('homepage', {
  populate: '*',
})) as any
const content: ApiHomepageHomepage = data

const heroImages = content.attributes.photos.data
  .slice(0, -2)
  .map((photo: any) => photo.attributes.url)
const pageImages = content.attributes.photos.data
  .slice(-2)
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
  <main class="min-h-screen bg-white pb-10">
    <PageTitle class="sr-only">{{ content.attributes.title }}</PageTitle>
    <HeroSlider
      :images="heroImages"
      class="bg-sky-300"
    >
      <div
        class="-ml-[5%] -mr-[10%] -mb-10 flex overflow-hidden pt-12 transition-all md:mr-0 md:ml-0"
      >
        <img
          class="w-full max-w-2xl animate-fly-in"
          src="~/assets/svg/animals-inviting-hug.svg"
          alt="Dieren van Koeching"
        />
      </div>
      <figure class="relative z-10 mb-12 w-full max-w-xl px-8">
        <img
          class="w-full"
          src="~/assets/svg/logo.svg"
          alt="Logo van Koeching"
        />
      </figure>
    </HeroSlider>
    <section
      v-if="content.attributes.sales_text[0]"
      class="relative bg-brown-500 bg-[url(~/assets/svg/mud-steps.svg)] bg-[length:auto_100%] bg-left-bottom bg-no-repeat py-32 text-xl text-brown-50 after:absolute after:-bottom-0.5 after:left-0 after:block after:h-2 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%] sm:bg-[length:100%_auto]"
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
      class="relative bg-brown-100 bg-[url(~/assets/svg/mud-steps.svg)] bg-[length:auto_100%] bg-left-bottom bg-no-repeat py-32 text-xl text-brown-600 after:absolute after:-bottom-0.5 after:left-0 after:block after:h-2 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%] sm:bg-[length:100%_auto]"
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
      class="relative bg-white bg-[url(~/assets/svg/mud-steps.svg)] bg-[length:auto_100%] bg-left-bottom bg-no-repeat py-32 text-xl text-brown-500 after:absolute after:-bottom-0.5 after:left-0 after:block after:h-2 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%] sm:bg-[length:100%_auto]"
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
      v-if="content.attributes.videos && content.attributes.videos.length"
      class="relative bg-[linear-gradient(#62aac6_64%,#3f93b6_64%)] px-5 pt-12 pb-16 after:absolute after:-bottom-0.5 after:left-0 after:block after:h-2 after:w-full after:bg-[url(~/assets/svg/line-black.svg)] after:bg-[length:100%_100%]"
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
    <p class="my-12 mx-3 italic">Todo: verwijzing naar ontdek</p>
  </main>
</template>

<style scoped>
.static-enter-active,
.static-leave-active {
  transition: opacity 500ms steps(1);
}
.static-enter-active:after,
.static-leave-active:after {
  animation: static 0.2s infinite alternate;
  background-blend-mode: difference;
  background: repeating-radial-gradient(black 0 0.0001%, white 0 0.0002%) 50% 0/2500px
      2500px,
    repeating-conic-gradient(black 0 0.0001%, white 0 0.0002%) 60% 60%/2500px 2500px;
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
  100% {
    background-position: 50% 0, 60% 50%;
  }
}
</style>
