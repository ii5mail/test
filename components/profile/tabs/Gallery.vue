<template>
  <div class="content">
    <profile-toolbar @set_edit="on_edit_select" />
    <v-row class="pl-12 pr-6 mt-12">
      <v-col>
      <v-row class="justify-space-between d-flex mb-1 pr-6">
        <v-col>
            <v-row>
                <v-icon class="mx-2">$vuetify.icons.mountains</v-icon>
                <div class="medium-font">Gallery</div>
                <cb-btn
                  v-if="is_user_organization"
                  class="ml-4"
                  @click="on_edit_select()"
                  :large="false"
                >
                    + Add New
                </cb-btn>
            </v-row>
        </v-col>
        <v-col cols="3">
          <v-row class="justify-space-between">
            <!-- <cb-select-small
                placeholder="All Project Types"
                :items="filter_options"
                :menu-props="{ bottom: true, offsetY: true }"
                hide-details
            /> -->
            <!-- <cb-select-small
                placeholder="All Trades"
                :items="filter_options"
                :menu-props="{ bottom: true, offsetY: true }"
                hide-details
            /> -->
            <cb-select-small
            v-model="selected_location"
                placeholder="All Locations"
                :items="photo_locations"
                :menu-props="{ bottom: true, offsetY: true }"
                hide-details
            />
          </v-row>
        </v-col>
      </v-row>
      <v-row width="100%">
        <div v-if="!filtered_photos.length" class="fill-width d-flex flex-column align-center mt-16">
            <p v-if="is_user_organization" class="mb-4">You have not added any images yet. Show off your work!</p>
            <p v-else class="mb-4">Looks like they haven't uploaded any photos yet.</p>
            <v-btn
                v-if="is_user_organization"
                class="primary"
                color="white"
                depressed
                text
                @click="$emit('set_edit')"
            >
                + Add New Images
            </v-btn>
            <img
                src="@/assets/images/stock/stock_construction_sketch_bg.png"
                class="empty-relation-img"
                alt="construction sketch background"
            />
        </div>
        <gallery-item v-else v-for="photo in filtered_photos" :key="photo.id" :photo="photo" class="mr-3"/>
      </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    import ProfileToolbar from "../../ui/ProfileToolbar.vue";
    import GalleryItem from "../../ui/GalleryItem.vue";
    import CbSelectSmall from "../../ui/CbSelectSmall.vue"
    import CbBtn from "../../ui/CbBtn.vue"

    export default {
        components: { ProfileToolbar, GalleryItem, CbSelectSmall, CbBtn },
        name: "Gallery",
        props: {
            organization: Object,
        },
        data(){
            return {
                selected_location: "All Locations"
            }
        },
        computed: {
            photo_locations() {
                const options = ["All Locations"]
                for(var i=0; i<this.organization.gallery_photos.length; i++){
                    options.push(`${this.organization.gallery_photos[i].city}, ${this.organization.gallery_photos[i].state}`)
                }
                return options
            },
            filtered_photos() {
                if (this.selected_location == "All Locations") {
                    return this.organization.gallery_photos
                } else {
                    const location = this.selected_location.split(", ")
                    return this.organization.gallery_photos.filter(photo => (photo.city == location[0]) && (photo.state == location[1]))
                }
            },
            user() {
                return this.$auth.user || {}
            },
            organization_id() {
                return this.user.primary_office_location?.organization
            },
            uid() {
                return this.$route.params?.uid
            },
            is_user_organization() {
                return this.organization_id == Number(this.uid)
            },
        },
        methods: {
            on_edit_select() {
                this.$emit("set_edit", true)
            },
        }
    };
</script>

<style lang="stylus" scoped>

    >>> .gallery-item {
      margin-bottom: 20px
    }

    .empty-relation-img
        margin-top -36px

</style>