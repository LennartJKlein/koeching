<template>
  <IconPack />
  <header
    class="fixed bottom-0 z-50 h-20 w-full bg-bottom-nav bg-[length:cover,auto_25px] bg-repeat-x pt-2"
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
  <main class="min-h-screen pb-14">
    <NuxtPage />
  </main>
</template>
