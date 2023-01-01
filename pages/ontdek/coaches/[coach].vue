<script setup lang="ts">
import { onMounted, ref, watchEffect, useAttrs } from "vue";
import type { ApiCoachCoach } from "~/types/schemas";
const { find } = useStrapi();
const route = useRoute();
const {
  data: [coach],
} = await find<ApiCoachCoach>("coaches", {
  filters: {
    slug: {
      $eq: route.params.coach,
    },
  },
  populate: "*",
});
// const coach = { attributes: { name: "Annet" } };

const goBack = function () {
  const router = useRouter();
  router.push("/ontdek");
};
</script>

<template>
  <Modal
    :aria-label="`Meer over ${coach.attributes.name}`"
    id="coachModal"
    open
    @close="goBack"
  >
    <section>
      <h1 class="font-display text-xl" v-if="coach.attributes.name">
        {{ coach.attributes.name }}
      </h1>
      <p>{{ coach.attributes.intro }}</p>
      <p>{{ coach.attributes.bio }}</p>
    </section>
  </Modal>
</template>
