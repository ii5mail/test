<template>
  <div class="content">
    <profile-toolbar />
    <v-container>
      <v-row class="my-4">
        <v-col class="d-flex align-center">
          <v-icon class="mr-3">$vuetify.icons.map</v-icon>
          <div class="section-title primary-text--text">Areas Served</div>
        </v-col>
        <v-col cols="3" class="d-flex align-center">
          <!--  This select holds locations from location tab -->
          <cb-select-small
            aria-placeholder="Select from all locations"
            placeholder="All Locations"
            hide-details
            :menu-props="{ bottom: true, offsetY: true }"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <div class="small-font heavy-weight">Primary Location</div>
          <div class="small-font">Atlanta</div>

          <div class="small-font heavy-weight mt-5">Also Works In</div>
          <div class="small-font">Cobb</div>
          <div class="small-font">Douglas</div>
          <div class="small-font">Fatette</div>
        </v-col>
        <v-col>
          <div class="google-map" ref="map"></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProfileToolbar from "../../ui/ProfileToolbar.vue";
import CbSelectSmall from "../../ui/CbSelectSmall";

export default {
  components: { CbSelectSmall, ProfileToolbar },
  name: "AreasServed",
  data() {
    return {
      map: null,
      mapOptions: {
        center: {
          lat: 33.749,
          lng: -84.388,
        },
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        zoom: 10,
        mapTypeId: "roadmap",
      },
    };
  },
  async mounted() {
    this.map = new google.maps.Map(this.$refs.map, this.mapOptions);

    // Constructs the area served shape
    const initialCoords = [
      // hard coded right now but won't be in future
      { lat: 33.9, lng: -84.54 },
      { lat: 34, lng: -84.3 },
      { lat: 33.808, lng: -84.1702 },
      { lat: 33.547, lng: -84.233 },
      { lat: 33.56, lng: -84.581 },
    ];
    const map = this.map;
    new google.maps.Polygon({
      map,
      paths: initialCoords,
      strokeColor: "#2480EB",
      strokeOpacity: 0.6,
      strokeWeight: 3,
      fillColor: "#2480EB",
      fillOpacity: 0.3,
      // draggable: true, // not sure if it should be draggable
      geodesic: true, // this adjusts shape as user drags it around the globe
      editable: true,
    });
  },
};
</script>

<style lang="stylus" scoped>
.google-map {
  width: 100%;
  height: 600px;
  border-radius: 4px;
}

.section-title {
  font-size: 21px;
}
</style>
