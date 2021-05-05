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
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ colleague.name }}
      </a>
    </div>
  </div>
</template>

<script>
import colleaguesQuery from '~/apollo/queries/colleague/colleagues'

export default {
  data () {
    return {
      colleagues: []
    }
  },
  apollo: {
    colleagues: {
      prefetch: true,
      query: colleaguesQuery
    }
  }
}
</script>
