<template>
  <div class="table-responsive">
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
                {{ closure['STREET'] }}
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
</template>

<script>
import { closures } from '../closures'

export default {
  setup() {
    return { closures }
  },

  methods: {
    formatDate(stamp) {
      return new Date(stamp).toLocaleString()
    },
  },
}
</script>
