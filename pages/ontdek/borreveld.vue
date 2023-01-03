<script setup lang="ts">
const goBack = function () {
  const router = useRouter();
  router.push("/ontdek");
};
</script>

<template>
  <Modal
    aria-label="Meer over boerderij Borreveld"
    id="farmModal"
    open
    @close="goBack"
  >
    <section>
      <h1 class="mb-3 font-display text-3xl font-bold text-brown-300">
        Boerderij Borreveld
      </h1>
      <p class="mt-4">
        We heten je graag van harte welkom op boerderij Borreveld. Borreveld is
        gelegen aan de Lekdijk tussen Amerongen en Wijk bij Duurstede. Deze
        boerderij is gebouwd in het jaar 1842 en wordt sinds 1900 bewoond door
        de familie Lekkerkerker.
      </p>
      <p class="mt-4">
        Lang geleden was deze boerderij een gemengd bedrijf met melkvee,
        varkens, kippen, akkerbouw en fruitteelt. Nu is Borreveld een boerderij
        met zo'n 130 melkkoeien en ongeveer 70 stuks jongvee. Er zijn vooral
        stukken grasland te vinden op onze boerderij en een paar percelen maïs.
      </p>
      <p class="mt-4">
        Naast de melkkoeien is er nu ook de mogelijkheid van therapie op de
        boerderij. De omgeving van natuur, dieren en rust geven een positieve
        impuls aan het traject.
      </p>
    </section>
  </Modal>
</template>
