import { ref, computed } from 'vue'
import { loadModules } from 'esri-loader'

// https://hillsborough.maps.arcgis.com/home/webmap/viewer.html?webmap=36ec601ba440417ead12dc49d612665d
const portalItemId = '36ec601ba440417ead12dc49d612665d'

const layer = ref(null)

export const featureLayer = computed(async () => {
  const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer'])
  return new FeatureLayer(layer.value)
})

export const webmap = computed(async () => {
  const [WebMap] = await loadModules(['esri/WebMap'])
  return new WebMap({
    portalItem: {
      id: portalItemId,
    },
  })
})

export async function initFeatureLayer() {
  const map = await webmap.value
  await map.load()
  layer.value = map.layers.items[0].toJSON()
}
