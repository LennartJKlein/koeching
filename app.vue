<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'nl',
  },
})

const footerLinks = [
  { path: '/contact', label: 'Contact' },
  { path: '/tarieven', label: 'Tarieven' },
  { path: '/vergoedingen', label: 'Vergoedingen' },
  { path: '/certificeringen', label: 'Certificeringen' },
]

const subfooterLinks = [
  { path: '/algemene-voorwaarden', label: 'Algemene voorwaarden' },
  { path: '/privacyreglement', label: 'Privacyregelement' },
  { path: '/privacy-policy-website', label: 'Privacy Policy website' },
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
  <main class="min-h-screen">
    <NuxtPage />
  </main>
  <footer
    class="relative z-10 mt-2 bg-brown-500 bg-[url(~/assets/svg/cow-spots.svg)] bg-cover pt-8 text-white before:absolute before:-top-4 before:left-0 before:-z-20 before:h-[5vw] before:w-full before:-rotate-1 before:bg-brown-500 before:content-[''] after:absolute after:left-0 after:-top-4 after:-z-10 after:h-2 after:w-full after:-translate-y-1/2 after:-rotate-1 after:bg-[url(~/assets/svg/line-black.svg)] after:bg-cover after:content-['']"
  >
    <img
      src="~/assets/svg/logo-full.svg"
      class="mx-auto w-40 opacity-60 brightness-75 drop-shadow-2xl sepia"
    />
    <nav class="pt-10 pb-16">
      <ul class="mx-auto max-w-3xl px-3 text-center">
        <li v-for="link in footerLinks">
          <NuxtLink
            class="my-1 inline-block w-fit rounded-xl bg-brown-300 bg-opacity-0 p-1 px-0 font-display text-xl transition-all duration-100 hover:bg-opacity-50 hover:px-4 focus-visible:bg-opacity-50 focus-visible:px-4 active:bg-opacity-100 active:px-5 md:text-2xl lg:text-3xl"
            :to="link.path"
            >{{ link.label }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
    <div class="bg-brown-700 pt-10 pb-40 text-center">
      <nav>
        <ul class="flex h-16 w-full items-center justify-center">
          <li
            v-for="link in subfooterLinks"
            class="text-brown-400 after:mx-2 after:content-['|'] last:after:content-['']"
          >
            <NuxtLink
              class="my-1 inline-block w-max rounded-xl bg-brown-600 bg-opacity-0 px-2 py-0 text-brown-200 transition-all duration-100 hover:bg-opacity-70 hover:py-2 focus-visible:bg-opacity-50 focus-visible:py-2 active:bg-opacity-100 active:py-3"
              :to="link.path"
              >{{ link.label }}</NuxtLink
            >
          </li>
        </ul>
      </nav>
      <p class="mx-auto mt-2 max-w-lg text-brown-300">
        Website en inhoud staan onder copyright van Annet Lekkerkerker<br />
        ©KOECHING
      </p>
    </div>
  </footer>
</template>
