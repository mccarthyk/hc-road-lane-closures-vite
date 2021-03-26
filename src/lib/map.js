import { ref, watch, onMounted } from 'vue'
import { loadModules, loadCss } from 'esri-loader'

import { webmap } from './esri'
import { activeFeature, activeClosure, where, queryClosures } from './closures'

export const mapRef = ref(null)
export const mapViewExtent = ref(undefined)

watch([mapViewExtent], () => queryClosures())

//
export function initMap() {
  loadCss()
  onMounted(async () => {
    const [
      //
      MapView,
      Home,
      Legend,
      Graphic,
      Expand,
    ] = await loadModules([
      'esri/views/MapView',
      'esri/widgets/Home',
      'esri/widgets/Legend',
      'esri/Graphic',
      'esri/widgets/Expand',
    ])

    const map = await webmap.value

    let view = new MapView({
      map,
      container: mapRef.value,
    })

    await view.when()

    // view ready

    view.popup.dockEnabled = true
    view.popup.dockOptions.buttonEnabled = false

    view.on('click', () => {
      view.popup.close()
      activeClosure.value = null
    })

    const layer = map.layers.getItemAt(0)
    const layerView = await view.whenLayerView(layer)

    // watchers
    layerView.watch('updating', (value) => {
      if (value) return
      mapViewExtent.value = { type: 'extent', ...view.extent.toJSON() }
    })

    // filter map features
    watch(
      () => where.value,
      () => {
        layerView.filter = {
          where: where.value,
        }
      }
    )

    // open popup
    watch(
      () => activeFeature.value,
      async () => {
        view.popup.close()
        const feature = Graphic.fromJSON(activeFeature.value)
        if (feature) {
          view.popup.open({
            features: [feature],
          })
        }
      }
    )

    // map widgets

    // adds the home widget to the top left corner of the MapView
    const homeWidget = new Home({ view })
    view.ui.add(homeWidget, 'top-left')

    // add legend
    const legend = new Legend({
      view,
      layerInfos: [
        {
          layer,
          title: 'Legend',
        },
      ],
      container: document.createElement('div'),
    })

    const legendExpand = new Expand({
      expandIconClass: 'esri-icon-layer-list',
      expandTooltip: 'Expand Legend',
      view: view,
      content: legend.domNode,
    })

    view.ui.add(legend, 'bottom-left')
    view.ui.add(legendExpand, 'top-left')

    //
  })
}
