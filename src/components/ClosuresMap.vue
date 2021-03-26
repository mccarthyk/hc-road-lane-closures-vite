<template>
  <div class="embed-responsive embed-responsive-16by9">
    <div id="map" ref="mapRef" class="embed-responsive-item"></div>
  </div>
</template>

<script>
import { mapRef, initMap } from '../lib/map'

export default {
  setup() {
    initMap()

    return { mapRef }
  },
}
</script>
