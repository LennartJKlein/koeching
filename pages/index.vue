<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        koeching
      </h1>
      <a
        v-for="colleague in colleagues"
        :key="colleague.name"
        :href="colleague.website"
        style="display:block;"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ colleague.name }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $strapi: { $colleagues } }) {
    const colleagues = await $colleagues.find()

    return {
      colleagues,
    }
  },
  data () {
    return {
      colleagues: []
    }
  },
}
</script>
