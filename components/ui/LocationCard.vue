<template>
  <v-card class="location-card mb-6 pa-4 ml-2 mr-0" outlined>
    <div class="d-flex">
      <div class="mr-6 map-container">
        <div class="google-map" :id="`card-map-${location.id}`"></div>
      </div>
      <v-row>
        <v-col cols="4">
          <div class="xs-font grey--text bold-weight">{{`${location.office_type}${location.office_type == 'Headquarters' ? '' : ' Office'}`}}</div>
          <div v-if="location.address_1" class="xs-font primary-text--text lh-18">
            {{location.address_1}}
          </div>
          <div v-if="location.address_2" class="xs-font primary-text--text lh-18">
            {{location.address_2}}
          </div>
          <div class="xs-font primary-text--text lh-18">
            {{ location.city ? `${location.city}, ` : ''}}{{ location.state ? `${location.state} ` : ''}}{{ location.zip_code ? `${location.zip_code}` : ''}}
          </div>
          <div v-if="location.phone_number" class="xs-font primary-text--text lh-18">
            Phone: {{formatted_phone_number}}
          </div>
          <div class="xs-font primary-text--text lh-18 mb-1">
            <a :href="'https://'+organization.domain_name" target="_blank">{{organization.domain_name}}</a>
          </div>
        </v-col>
        <v-col :cols="is_users_parent_org ? 7 : 8">
          <div class="xs-font grey--text bold-weight mb-1">Trades:</div>
          <div>
            <v-chip v-for="category in location.categories" :key="`${location.id}-${category.id}`" small class="mr-1 mb-1 px-3 py-2 xxs-font light-blue-grey">
              {{ category.name }}
            </v-chip>
          </div>
        </v-col>
        <v-col v-if="is_users_parent_org" cols="1" class="pa-0">
          <v-btn
            class="xs-font lh-20 primary-text--text text-decoration-underline light-weight"
            @click="on_edit_select"
            text
            x-small
          >
            <v-icon small class="primary-text--text mr-2">
              $vuetify.icons.pencil_underlined
            </v-icon>
            Edit
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
    import mapboxgl from "mapbox-gl";

    export default {
        props: {
            location: Object,
            organization: Object,
            is_users_parent_org: Boolean,
        },
        data() {
            return {
                map: null,
                mapOptions: {
                    center: {
                        lat: this.location?.location?.latitude || 30.2672,
                        lng: this.location?.location?.longitude || -97.7431,
                    },
                    fullscreenControl: true,
                    mapTypeControl: false,
                    zoomControl: false,
                    streetViewControl: false,
                    zoom: 13,
                    mapTypeId: "roadmap",
                    accessToken: process.env.VUE_APP_MAP_ACCESS_TOKEN,
                },
            };
        },
        computed: {
            formatted_phone_number(){
                if(this.location.phone_number){
                    return `(${this.location.phone_number.slice(2, 5)}) ${this.location.phone_number.slice(5, 8)}-${this.location.phone_number.slice(8)}`
                }
                return ''

            }
        },
        mounted() {
            this.createMap();
        },
        methods: {
            async createMap() {
                try {
                    // need to change this access token to an environment variable
                    mapboxgl.accessToken =
                        "pk.eyJ1IjoiZGF2aWR0ZXJyYWwiLCJhIjoiY2tyZDJvYXR6MW5xYzJvbHFndWs5eHU2ZSJ9.WjbhNg0OGN6EBnJCzN517Q";
                    this.map = new mapboxgl.Map({
                        container: `card-map-${this.location.id}`,
                        style: "mapbox://styles/mapbox/streets-v11",
                        center: [this.mapOptions.center.lng, this.mapOptions.center.lat],
                        zoom: 9,
                    });
                    const marker = new mapboxgl.Marker({
                        draggable: true,
                        color: "#D80739",
                    })
                        .setLngLat([this.mapOptions.center.lng, this.mapOptions.center.lat])
                        .addTo(this.map);
                } catch (err) {
                    console.log("map error", err);
                }
            },
            on_edit_select() {
                this.$emit("set_edit", this.location.id)
            },
        },
    };
</script>

<style lang="stylus" scoped>
.location-card {
  width: 100%;
}

.map-container {
  min-width: 212px;
  height: 175px;
}

.google-map {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
</style>
