<template>
  <div>
    <profile-toolbar @set_edit="on_edit_select" />
    <v-row class="mx-12 mt-6 mb-6 tab-row justify-space-between">
      <div class="d-flex align-center">
        <v-icon class="mx-2">$vuetify.icons.location</v-icon>
        <v-btn
          large
          elevation="0"
          class="btn-tab px-1 mx-3 pb-7 mt-7 medium-font fill-height"
          :class="{ 'active-tab': tab === 'locations' }"
          @click="on_tab_select('locations')"
        >
          Locations
        </v-btn>
        <v-btn
          large
          elevation="0"
          class="btn-tab px-1 mx-3 pb-7 mt-7 medium-font fill-height"
          :class="{ 'active-tab': tab === 'areas-served' }"
          @click="on_tab_select('areas-served')"
        >
          Areas Served
        </v-btn>
      </div>
      <div>
        <cb-select-small
          class="mt-3"
          v-model="filter"
          placeholder="All Locations"
          name="ownership_type"
          type="select"
          :menu-props="{ bottom: true, offsetY: true }"
          :items="location_choices"
        />
      </div>
    </v-row>
    <div v-if="tab === 'locations'">
      <v-row v-if="locations" class="mx-12 mt-8 pr-6 justify-space-between">
        <location-card
          v-for="location in filtered_locations"
          :key="location.id"
          :location="location"
          :organization="organization"
          :is_users_parent_org="is_users_parent_org"
          @set_edit="on_edit_select"
        />
      </v-row>
    </div>
    <div v-if="tab === 'areas-served'">
      <v-row v-if="locations" class="mx-12 mt-8">
        <v-col cols="3">
          <div class="medium-font bold-weight">Areas Served</div>
          <div v-for="location in filtered_locations" :key="location.id" class="location-border pb-6 pt-4">
            <v-row class="align-center">
              <v-col cols="10">
                <div class="small-font bold-weight">{{location.city}}, {{location.state}}</div>
                <div class="xxs-font">{{location.address_1}}</div>
              </v-col>
              <v-btn v-if="expanded_location.includes(location.id)" icon small outlined @click="expanded_location = []" >
                <v-icon small>mdi-minus</v-icon>
              </v-btn>
              <v-btn v-else icon small outlined @click="expanded_location = [location.id]" >
                <v-icon small>mdi-plus</v-icon>
              </v-btn>
            </v-row>
            <div v-if="expanded_location.includes(location.id)">
              <v-row v-for="contact in location.contacts" :key="contact.id">
                <v-col cols="11" >
                  <div class="xs-font bold-weight">{{contact.title}}</div>
                  <div class="xs-font">{{contact.first_name}} {{contact.last_name}}</div>
                  <div v-if="contact.mobile_phone_number" class="d-flex xxs-font align-center"><div class="mr-1">Mobile Phone:</div> {{format_phone_number(contact.mobile_phone_number)}}</div>
                  <div v-if="contact.office_phone_number" class="d-flex xxs-font align-center"><div class="mr-1">Office Phone:</div> {{format_phone_number(contact.office_phone_number)}}</div>
                  <div class="d-flex xxs-font align-center"><div class="mr-1">Email:</div>{{contact.email}}</div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
        <v-col cols="9" class="px-0">
          <div class="map-container">
              <div class="google-map" id="map">
                <MglMap
                  id="mgl-map2"
                  :accessToken="accessToken"
                  :mapStyle="mapStyle"
                  :center="mapConfig.center"
                  :zoom="mapConfig.zoom"
                  :minZoom="mapConfig.minZoom"
                  :maxZoom="mapConfig.maxZoom"
                  :doubleClickZoom="mapConfig.doubleClickZoom"
                  :scrollZoom="mapConfig.scrollZoom"
                  :boxZoom="mapConfig.boxZoom"
                  :touchZoomRotate="mapConfig.touchZoomRotate"
                  :dragPan="mapConfig.dragPan"
                  :dragRotate="mapConfig.dragRotate"
                >
                  <MglGeojsonLayer
                    sourceId="states"
                    :source="statesSource"
                    layerId="background-layer"
                    :layer="mapBackgroundLayerConfig"
                  />
                  <MglGeojsonLayer
                    sourceId="states"
                    :source="statesSource"
                    layerId="states-layer"
                    :layer="statesLayerConfig"
                    @mousemove="update_label"
                    @mouseleave="hide_label"
                  />
                  <MglGeojsonLayer
                    sourceId="counties"
                    :source="countiesSource"
                    layerId="counties-layer"
                    :layer="countiesLayerConfig"
                    @mousemove="update_label"
                    @mouseleave="hide_label"
                  />
                  <MglGeojsonLayer
                    sourceId="counties"
                    :source="countiesSource"
                    layerId="counties-border-layer"
                    :layer="countiesBorderLayerConfig"
                  />
                  <MglGeojsonLayer
                    sourceId="states"
                    :source="statesSource"
                    layerId="states-border-layer"
                    :layer="statesBorderLayerConfig"
                  />
                  <MglPopup
                    :coordinates="labelConfig.coordinates"
                    :showed="labelConfig.showed"
                    :closeButton="labelConfig.closeButton"
                    :closeOnClick="labelConfig.closeOnClick"
                  >
                    <div>{{labelConfig.content}}</div>
                  </MglPopup>
                
                </MglMap>
              </div>
            </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import states from "../edit-states/locations/states.json";
import counties from "../edit-states/locations/counties.json";
import CbSelectSmall from "../../ui/CbSelectSmall.vue";
import LocationCard from "../../ui/LocationCard.vue";
import ProfileToolbar from "../../ui/ProfileToolbar.vue";

export default {
  components: { ProfileToolbar, CbSelectSmall, LocationCard },
  name: "Locations",
  props: {
    locations: Array,
    organization: Object,
  },
  data() {
    return {
      filter: "All Locations",
      tab: "locations",
      expanded_location: [],
      // map related
      accessToken: "pk.eyJ1IjoiZGF2aWR0ZXJyYWwiLCJhIjoiY2tyZDJvYXR6MW5xYzJvbHFndWs5eHU2ZSJ9.WjbhNg0OGN6EBnJCzN517Q",
      mapStyle: "mapbox://styles/mapbox/light-v10",
      statesSource: {
        type: "geojson",
        data: states      
      },
      countiesSource: {
        type: "geojson",
        data: counties      
      },
      mapConfig: {
        center: [-96.04, 34.907],
        zoom: 3.15,
        maxZoom: 10,
        minZoom: 3.15,
        doubleClickZoom: false,
        scrollZoom: true,
        boxZoom: false,
        touchZoomRotate: false,
        dragPan: true,
        dragRotate: false,
      },
      statesBorderLayerConfig: {
        id: "states-borders",
        type: "line",
        paint: {
            "line-color": "white",
            "line-width": 2,
        },
      },
      mapBackgroundLayerConfig: {
        id: "map-background",
        type: "background",
        paint: {
            "background-color": "#ECECEE",
        },
      },
      labelConfig: {
        id: "map-label",
        coordinates: [0,0],
        showed: false,
        closeButton: false,
        closeOnClick: false,
        content: "",
      },
    };
  },
  computed: {
    is_users_parent_org() {
        return this.$auth.user.primary_office_location?.organization === this.organization.id
    },
    location_choices() {
      const location_choices = [];
      location_choices.push("All Locations");
      this.locations.forEach((location) => {
        location_choices.push(this.format_location_text(location));
      });
      return location_choices;
    },
    filtered_locations() {
      const filtered_locations = [];
      this.locations.forEach((location) => {
        if (
          this.filter === "All Locations" ||
          this.filter === this.format_location_text(location)
        ) {
          filtered_locations.push({...location, show_info: false});
        }
      });
      return filtered_locations;
    },
    curr_areas_selected() {
      if(this.expanded_location){
        const selected_location = this.locations.find(loc => loc.id == this.expanded_location[0])
        if(selected_location && selected_location.areas_served && selected_location.areas_served_precision){
          return selected_location.areas_served.map(area => area.full_name)
        }
      }
      return []
    },
    total_areas_selected() {
      if(this.locations){
        let areas = []
        this.locations.map( loc => {
          var hash = {};
          var i;
          
          for (i = 0; i < areas.length; i++) {
            hash[areas[i]] = true;
          }
          for (i = 0; i < loc.areas_served.length; i++) {
            hash[loc.areas_served[i].full_name] = true;
          }
          areas = Object.keys(hash)
        })
        return areas
      }
      return []
    },
    statesLayerConfig() {
      return {
        id: "states-layer",
        type: "fill",
        paint: {
            "fill-color": [
              "case",
              [
                  "in",
                  ["get", "NAME"],
                  ["literal", this.curr_areas_selected],
              ],
              "#313D4F",
              [
                "case",
                [
                    "in",
                    ["get", "NAME"],
                    ["literal", this.total_areas_selected],
                ],
                "#91ABFF",
                "#4495D1",
              ]
            ],
        },
      }
    },
    show_counties() {
      return this.locations.filter(loc => loc.areas_served_precision === "Countywide").length
    },
    countiesLayerConfig() {
      return {
        id: "counties-layer",
        type: "fill",
        layout: {
          visibility: this.show_counties ? "visible" : "none"
        },
        paint: {
            "fill-color": [
              "case",
              [
                  "in",
                  ["get", "FULL_NAME"],
                  ["literal", this.curr_areas_selected],
              ],
              "#313D4F",
              [
                "case",
                [
                    "in",
                    ["get", "STATE"],
                    ["literal", this.curr_areas_selected],
                ],
                "#313D4F",
                [
                  "case",
                  [
                      "in",
                      ["get", "FULL_NAME"],
                      ["literal", this.total_areas_selected],
                  ],
                  "#91ABFF",
                  [
                    "case",
                    [
                        "in",
                        ["get", "STATE"],
                        ["literal", this.total_areas_selected],
                    ],
                    "#91ABFF",
                    "#4495D1",
                  ],
                ],
              ]
            ],
        },
      }
    },
    countiesBorderLayerConfig() {
      return {
        id: "county-border-layer",
        type: "line",
        layout: {
          visibility: this.show_counties ? "visible" : "none"
        },
        paint: {
            "line-color": "#d1d1d1",
            "line-width": 1,
        },
      }
    },
  },
  methods: {
    format_location_text(location) {
      return location.city + ", " + location.state;
    },
    format_phone_number(phone_number){
        return `(${phone_number.slice(2, 5)}) ${phone_number.slice(5, 8)}-${phone_number.slice(8)}`
    },
    on_edit_select() {
      this.$emit("set_edit", true);
    },
    on_tab_select(tab) {
      this.tab = tab;
    },
    update_label(event) {
      if(event.mapboxEvent.features){
        this.labelConfig.coordinates = [event.mapboxEvent.lngLat.lng, event.mapboxEvent.lngLat.lat]
        this.labelConfig.content = event.mapboxEvent.features[0].properties.FULL_NAME || event.mapboxEvent.features[0].properties.NAME
        this.labelConfig.showed = true
      }
    },
    hide_label(event) {
      this.labelConfig.showed = false
    },
  },
};
</script>

<style lang="stylus" scoped>
.tab-row {
  height: 100%;
  border-bottom: 1px solid var(--v-inactive-base);
}

.location-border {
  border-bottom: 1px solid var(--v-inactive-base);
}

.active-tab {
  height: 100%;
  border-bottom: 5px solid var(--v-primary-base);
  color: var(--v-primary-text-base) !important;
  padding-bottom: 24px !important;
}

.btn-tab {
  height: 100%;
  color: var(--v-grey-base);
  background: transparent !important;
  border-radius: 0;
  font-weight: 500 !important;
}

.map-container {
  min-width: 100%;
  height: 545px;
}

.google-map {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
</style>
