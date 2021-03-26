<template>
  <div v-if="closures.length" class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>Street</th>
          <th>Type</th>
          <th>Closed</th>
          <th>Opened</th>
          <th>TTC#</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="closure in closures" :key="closure.objectid">
          <tr>
            <td>
              <strong>
                <a href="#map" @click="activeClosure = closure.objectid">
                  {{ closure['STREET'] }}
                </a>
              </strong>

              <br />
              <small>
                from <strong>{{ closure['FROM_STREET'] }}</strong> to
                <strong>{{ closure['TO_STREET'] }}</strong>
              </small>
            </td>
            <td>
              {{ closure['CLOSURE_TYPE'].split('_').join(' ') }}
            </td>
            <td>
              {{ formatDate(closure['DATE_CLOSED']) }}
            </td>
            <td>
              {{ formatDate(closure['DATE_OPENED']) }}
            </td>
            <td>
              {{ closure['TTC_NBR'] }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <div v-else class="text-center py-5">
    <p class="h4">No Closures</p>
    <p>Try zooming out of the map or refining your search.</p>
  </div>
</template>

<script>
import { closures, activeClosure } from '../lib/closures'

export default {
  setup() {
    return { closures, activeClosure }
  },

  methods: {
    formatDate(stamp) {
      return new Date(stamp).toLocaleString()
    },
  },
}
</script>
