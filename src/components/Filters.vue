<template>
  <div class="d-flex justify-content-between align-items-center flex-wrap">
    <div class="flex-grow-1">
      <input
        v-model="filters.search"
        type="text"
        class="form-control"
        placeholder="Filter by street name"
      />
    </div>

    <div class="p-2">
      <div class="form-check form-check-inline radio-inline">
        <input
          v-model="filters.upcoming"
          class="form-check-input"
          type="radio"
          name="currentOrUpcomingRadioGroup"
          id="inlineRadio1"
          :value="false"
        />
        <label class="form-check-label" for="inlineRadio1">
          Current Closures
        </label>
      </div>
      <div class="form-check form-check-inline radio-inline">
        <input
          v-model="filters.upcoming"
          class="form-check-input"
          type="radio"
          name="currentOrUpcomingRadioGroup"
          id="inlineRadio2"
          :value="true"
        />
        <label class="form-check-label" for="inlineRadio2">
          Upcoming Closures
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { filters } from '../lib/closures'

export default {
  setup() {
    return { filters }
  },
}
</script>
