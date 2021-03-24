<template>
  <div v-if="error" class="py-5">
    <div class="alert alert-warning" role="alert">
      {{ error.message }}
    </div>
  </div>

  <div v-else class="">
    <Filters class="bg-light p-2" />

    <div v-if="loading" class="p-5 text-center">
      <div class="spinner-border text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <ClosuresTable v-else />

    <Pagination v-if="!error" />
  </div>
</template>

<script>
import { queryClosures, error, loading } from './closures'

import Filters from './components/Filters.vue'
import ClosuresTable from './components/ClosuresTable.vue'
import Pagination from './components/Pagination.vue'

export default {
  setup() {
    queryClosures()
    return { error, loading }
  },

  components: { Filters, ClosuresTable, Pagination },
}
</script>
