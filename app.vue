<script setup lang="ts">
function isPageActive(path: string) {
  const route = useRoute();
  return route.path.includes(path);
}
// import type { ApiMembershipMembership } from '~/types/schemas'
// const { find, findOne, create, update, delete: remove } = useStrapi()
// const response = await find<ApiMembershipMembership>('memberships')
</script>

<template>
  <IconPack />
  <header
    class="bg-bottom-nav fixed bottom-0 h-20 w-full bg-[length:cover,auto_25px] bg-repeat-x pt-2"
  >
    <nav class="h-full">
      <ul
        class="mx-auto flex h-full w-full max-w-md items-stretch justify-between"
      >
        <BottomNavItem label="Home" icon="barn" to="/" />
        <BottomNavItem label="Ontdek" icon="donkey" to="/ontdek" />
        <BottomNavItem label="Aanbod" icon="magnifier" to="/aanbod" />
        <BottomNavItem label="Kennis" icon="grad-cap" to="/kennisbank" />
        <BottomNavItem label="Contact" icon="question" to="/contact" />
      </ul>
    </nav>
  </header>
  <main class="min-h-screen pb-16">
    <NuxtPage />
  </main>
</template>

<!-- <style>
a.nuxt-link-active
</style> -->
