import { reactive, ref, computed, watch } from 'vue'

import { featureLayer } from './esri'
import { mapViewExtent } from './map'

// state
export const appState = reactive({
  loading: false,
  error: '',
  data: [],
})

export const closures = computed(() =>
  appState.data.map(({ attributes }) => attributes)
)
export const activeClosure = ref(null)
export const activeFeature = computed(() =>
  appState.data.find((f) => f.attributes?.objectid == activeClosure.value)
)

// pagination
export const pagination = reactive({
  page: 1,
  limit: 10,
})
export const count = ref(0)
export const offset = computed(() => pagination.limit * (pagination.page - 1))
export const pages = computed(() => Math.ceil(count.value / pagination.limit))

// filters
export const filters = reactive({
  upcoming: false,
  search: '',
})

// watchers
watch([pagination, filters], () => {
  if (pagination.page > pages.value) return (pagination.page = 1)
  queryClosures()
})

// query

// query's where clause
export const where = computed(() =>
  [
    'DATE_OPENED >= CURRENT_TIMESTAMP+1',
    filters.search ? `STREET like '%${filters.search}%'` : null,
    filters.upcoming
      ? 'DATE_CLOSED > CURRENT_TIMESTAMP'
      : '(DATE_CLOSED <= CURRENT_TIMESTAMP)',
  ]
    .filter(Boolean)
    .join(' AND ')
)

// query options
export const query = computed(() => ({
  where: where.value,
  f: 'json',
  outFields: '*',
  orderByFields: ['DATE_CLOSED asc', 'DATE_OPENED asc', 'STREET asc'],
  returnGeometry: true,
  num: pagination.limit,
  start: offset.value,
  geometry: mapViewExtent.value,
}))

// query method
export async function queryClosures() {
  appState.error = ''
  appState.loading = true

  try {
    const fl = await featureLayer.value

    // set count
    count.value = await fl.queryFeatureCount({
      where: where.value,
      geometry: mapViewExtent.value,
    })

    // fetch features
    const { features } = await fl.queryFeatures(query.value)

    // set features
    appState.data = features.map((f) => ({
      ...f.toJSON(),
      popupTemplate: fl.popupInfo,
    }))

    //
    // console.log()
  } catch (err) {
    appState.error = err.message
  } finally {
    appState.loading = false
  }
}
