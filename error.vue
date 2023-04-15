<template>
  <div
    class="flex h-screen min-h-[500px] flex-col items-center justify-center bg-sky-400 bg-[url(~/assets/svg/horse-disconnect.svg)] bg-[length:auto_40dvh] bg-bottom bg-no-repeat pb-[40vw] pt-24 text-center text-xl text-white sm:bg-[length:100%_auto] lg:min-h-[56.25vw] lg:pt-[15vw] 2xl:text-2xl"
  >
    <h1 class="mb-6 font-display text-4xl font-bold md:text-5xl lg:mb-10 lg:text-6xl">
      404: pagina niet gevonden
    </h1>
    <div
      class="mx-auto max-w-4xl px-8 text-xl/normal md:text-2xl/normal lg:text-3xl/normal"
    >
      <p>
        Deze pagina is foetsie! Wellicht vind je op de rest van de website de informatie
        die je zoekt. En anders kun je altijd contact opnemen!
      </p>
      <Button
        class="mx-auto mt-10"
        label="Ga naar de homepage"
        color="white"
        to="/"
      >
        naar homepage
      </Button>
    </div>
  </div>
</template>
