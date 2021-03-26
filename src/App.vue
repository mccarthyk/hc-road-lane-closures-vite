<template>
  <div v-if="appState.error" class="py-5">
    <div class="alert alert-warning" role="alert">
      {{ appState.error }}
    </div>
  </div>

  <div v-else>
    <ClosuresMap />

    <hr class="my-5" />

    <Filters class="bg-light p-2" />

    <hr class="my-5" />

    <div v-if="appState.loading" class="p-5 text-center">
      <div class="spinner-border text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <ClosuresTable v-else />

    <hr class="my-5" />

    <Pagination />
  </div>
</template>

<script>
import { appState } from './lib/closures'
import { initFeatureLayer } from './lib/esri'

import Filters from './components/Filters.vue'
import ClosuresTable from './components/ClosuresTable.vue'
import Pagination from './components/Pagination.vue'
import ClosuresMap from './components/ClosuresMap.vue'

export default {
  setup() {
    initFeatureLayer()

    return { appState }
  },

  components: { Filters, ClosuresTable, Pagination, ClosuresMap },
}
</script>
