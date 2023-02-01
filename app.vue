<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'nl',
  },
})

const footerLinks = [
  { path: '/contact', label: 'Contact' },
  { path: '/tarieven', label: 'Tarieven en vergoedingen' },
  { path: '/ontdek/certificeringen', label: 'Certificeringen' },
]

const subfooterLinks = [
  { path: '/algemene-voorwaarden', label: 'Algemene voorwaarden' },
  { path: '/privacyreglement', label: 'Privacyregelement' },
  { path: '/privacyverklaring', label: 'Privacyverklaring website' },
]
</script>

<template>
  <IconPack />
  <header
    class="fixed bottom-0 z-50 h-20 w-full bg-bottom-nav bg-[length:cover,auto_25px] bg-repeat-x pt-2 sm:h-24 md:h-28"
  >
    <nav class="h-full">
      <ul class="mx-auto flex h-full w-full max-w-md items-stretch justify-between">
        <BottomNavItem
          label="Home"
          icon="barn"
          to="/"
        />
        <BottomNavItem
          label="Ontdek"
          icon="donkey"
          to="/ontdek"
        />
        <BottomNavItem
          label="Aanbod"
          icon="magnifier"
          to="/aanbod"
        />
        <BottomNavItem
          label="Kennis"
          icon="grad-cap"
          to="/kennis"
        />
        <BottomNavItem
          label="Contact"
          icon="question"
          to="/contact"
        />
      </ul>
    </nav>
  </header>
  <NuxtPage class="pb-10" />
  <footer
    class="relative z-10 mt-1 bg-brown-500 pt-8 text-white before:absolute before:-top-4 before:left-0 before:-z-20 before:h-8 before:w-full before:-rotate-1 before:bg-brown-500 before:content-[''] after:absolute after:left-0 after:-top-4 after:-z-10 after:h-2 after:w-full after:-translate-y-1/2 after:-rotate-1 after:bg-[url(~/assets/svg/line-black.svg)] after:bg-cover after:content-['']"
  >
    <div class="relative z-10 bg-[url(~/assets/svg/cow-spots.svg)] bg-cover">
      <img
        src="~/assets/svg/logo-full.svg"
        class="mx-auto w-40 opacity-60 brightness-75 drop-shadow-2xl sepia"
      />
      <nav class="pt-10 pb-16">
        <ul class="mx-auto max-w-3xl px-3 text-center">
          <li v-for="link in footerLinks">
            <NuxtLink
              class="my-1 inline-block w-fit rounded-xl bg-brown-300 bg-opacity-0 p-1 px-0 font-display text-2xl transition-all duration-100 hover:bg-opacity-50 hover:px-4 focus-visible:bg-opacity-50 focus-visible:px-4 active:bg-opacity-100 active:px-5 lg:text-3xl"
              :to="link.path"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="bg-brown-700 pt-10 pb-28 text-center sm:pb-32 md:pb-40">
      <nav>
        <ul class="flex w-full flex-wrap items-center justify-center">
          <li
            v-for="link in subfooterLinks"
            class="text-brown-400 after:mx-2 sm:after:content-['|'] sm:last:after:content-['']"
          >
            <NuxtLink
              class="relative inline-block w-max p-2 text-brown-200 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:scale-y-0 before:rounded-xl before:bg-brown-600 before:bg-opacity-0 before:transition-all before:duration-100 before:content-[''] hover:before:scale-y-75 hover:before:bg-opacity-70 focus-visible:before:scale-y-75 focus-visible:before:bg-opacity-50 active:before:scale-y-100 active:before:bg-opacity-100"
              :to="link.path"
            >
              <span class="relative">{{ link.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <p class="mx-auto mt-6 max-w-xs text-sm text-brown-300 sm:max-w-md md:mt-2">
        Website en inhoud staan onder copyright van Annet Lekkerkerker<br />
        ©KOECHING
      </p>
    </div>
  </footer>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 300ms ease-in;
  clip-path: circle(71% at 50% 50vh);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(5px);
  clip-path: circle(0% at 50% 50vh);
}
</style>
