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
      <div
        :class="[
          coach.attributes.photos.data.length > 1 &&
            '-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-scroll px-5 md:snap-proximity',
          'mb-4',
        ]"
        role="list"
      >
        <img
          v-for="photo in coach.attributes.photos.data"
          :class="[
            coach.attributes.photos.data.length > 1
              ? 'aspect-square w-10/12 flex-shrink-0 snap-start md:aspect-[4/3]'
              : 'aspect-[4/3] w-full',
            'rounded-xl object-cover',
          ]"
          role="listitem"
          :src="photo.attributes.url"
        />
      </div>
      <div
        v-if="coach.attributes.intro || coach.attributes.bio"
        :class="[
          '[&>h2]:mt-5 [&>h2]:mb-1 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:leading-none [&>h2]:text-brown-400',
          '[&>h3]:mt-5 [&>h3]:mb-1 [&>h3]:font-display [&>h3]:text-2xl [&>h3]:leading-none [&>h3]:text-brown-400',
          '[&>h4]:mt-5 [&>h4]:mb-1 [&>h4]:font-display [&>h4]:text-2xl [&>h4]:leading-none [&>h4]:text-brown-400',
          '[&>h5]:mt-5 [&>h5]:mb-1 [&>h5]:font-display [&>h5]:text-2xl [&>h5]:leading-none [&>h5]:text-brown-400',
          '[&>h6]:mt-5 [&>h6]:mb-1 [&>h6]:font-display [&>h6]:text-2xl [&>h6]:leading-none [&>h6]:text-brown-400',
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
