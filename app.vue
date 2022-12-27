<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
  </div>
</template>

<script setup lang="ts">
import type { ApiMembershipMembership } from '~/types/schemas'
const { find, findOne, create, update, delete: remove } = useStrapi()
const response = await find<ApiMembershipMembership>('memberships')
</script>
