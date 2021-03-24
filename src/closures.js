import { ref, computed, watch } from 'vue'
import { loadModules } from 'esri-loader'

const featureUrl =
  'https://services.arcgis.com/apTfC6SUmnNfnxuF/ArcGIS/rest/services/survey123_78949a6b4ad44712aeff8ab2be079e2d_stakeholder/FeatureServer/1'

export const loading = ref(false)
export const error = ref(null)
export const closures = ref([])

// pagination
export const count = ref(0)
export const page = ref(1)
export const limit = ref(25)
export const offset = computed(() => limit.value * (page.value - 1))
export const pages = computed(() => Math.ceil(count.value / limit.value))

// current or upcoming
export const upcoming = ref(false)

// search
export const search = ref(null)

const where = computed(() =>
  [
    //
    'DATE_OPENED >= CURRENT_TIMESTAMP+1',
    search.value ? `STREET like '%${search.value}%'` : null,
    upcoming.value
      ? 'DATE_CLOSED > CURRENT_TIMESTAMP'
      : '(DATE_CLOSED <= CURRENT_TIMESTAMP)',
  ]
    .filter(Boolean)
    .join(' AND ')
)

export async function queryClosures() {
  const query = {
    where: where.value,
    f: 'json',
    outFields: '*',
    orderByFields: ['DATE_CLOSED asc', 'DATE_OPENED asc', 'STREET asc'],
    returnGeometry: true,
    num: limit.value,
    start: offset.value,
  }

  error.value = null
  loading.value = true

  try {
    const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer'])
    const featureLayer = new FeatureLayer({
      url: featureUrl,
    })

    // set count
    count.value = await featureLayer.queryFeatureCount({
      where: where.value,
    })

    // fetch closures
    const { features } = await featureLayer.queryFeatures(query)

    closures.value = features.map(({ attributes, geometry }) => ({
      ...attributes,
      geometry: JSON.parse(JSON.stringify(geometry)),
    }))
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

watch([page, pages, limit, search, upcoming], () => {
  if (page.value > pages.value) page.value = 1
  queryClosures()
})
