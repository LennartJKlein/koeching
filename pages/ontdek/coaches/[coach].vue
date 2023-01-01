<script setup lang="ts">
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

const { $markdown } = useNuxtApp();
</script>

<template>
  <Modal
    :aria-label="`Meer over ${coach.attributes.name}`"
    id="coachModal"
    open
    @close="goBack"
  >
    <section>
      <h1
        class="mb-3 font-display text-3xl font-bold text-brown-300"
        v-if="coach.attributes.name"
      >
        {{ coach.attributes.name }}
      </h1>
      <p class="my-12 mx-3 italic">Todo: fotos van coach</p>
      <div
        v-if="coach.attributes.intro || coach.attributes.bio"
        :class="[
          '[&>h2]:mt-4 [&>h2]:font-display [&>h2]:text-xl [&>h2]:leading-tight',
          '[&>h3]:mt-4 [&>h3]:font-display [&>h3]:text-xl [&>h3]:leading-tight',
          '[&>h4]:mt-4 [&>h4]:font-display [&>h4]:text-xl [&>h4]:leading-tight',
          '[&>h5]:mt-4 [&>h5]:font-display [&>h5]:text-xl [&>h5]:leading-tight',
          '[&>h6]:mt-4 [&>h6]:font-display [&>h6]:text-xl [&>h6]:leading-tight',
        ]"
        v-html="
          $markdown.render(`${coach.attributes.intro}\n${coach.attributes.bio}`)
        "
      />
      <p class="my-12 mx-3 italic">Todo: methodes die deze coach beheerst</p>
      <p class="my-12 mx-3 italic">
        Todo: diensten/producten die deze coach faciliteert
      </p>
    </section>
  </Modal>
</template>
