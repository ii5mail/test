<template>
  <div>
    <back-button @on_back="on_back_select"/>
      <v-row class="px-9 mt-9 mb-1">
        <v-col>
            <v-row>
                <v-icon class="mx-2">$vuetify.icons.map</v-icon>
                <div class="medium-font">Add Gallery Image</div>
            </v-row>
        </v-col>
      </v-row>
      <v-row class="px-9 mt-8">
          <v-col>
            <div class="image-sub-container relative pa-4 mb-16">
                <v-file-input
                    v-model="file"
                    @change="upload"
                    accept="image/png, image/jpeg"
                    ref="file_input"
                />
                <div v-if="!img_url" class="d-flex align-center justify-center flex-column">
                    <img
                        src="~/assets/images/misc/photo_upload.png"
                        alt="Company Logo"
                        width="30%"
                        class="rounded-lg mt-16"
                    />
                    <div class="mt-10">Click Here To Upload An Image (JPG or PNG, Max 20MB)</div>
                </div>
                <img
                    v-else
                    :src='img_url'
                    alt="Company Logo"
                    width="100%"
                />
            </div>
            <image-cropper
                :aspect_ratio="371/243"
                title="Add Photo"
                v-model="show_image_cropper"
                :file="file"
                @get_cropped_url="get_cropped_url"
                form_key="photo"
            />
          </v-col>
          <v-col>
            <div class="mb-1">Photo Name</div>
            <cb-text-field
              v-model="image_name"
              outlined
              name="image_name"
              type="text"
            />
            <div class="mb-1">Photo Location (City, ST)</div>
            <city-autocomplete outlined v-model="autocomplete_city"/>
            <v-row class="mt-1 mr-0 flex-row-reverse">
                <cb-btn
                    :disabled="!img_url || !image_name || !autocomplete_city"
                    @click="submit_one"
                    :loading="saving"
                >
                Save
                </cb-btn>
                <!-- <div
                    class="xs-font bold-weight primary--text text-decoration-underline mr-5"
                    @click="add_another"
                >
                    Save and Add Another
                </div> -->
                <v-btn
                    text
                    plain
                    class="light-weight primary--text text-decoration-underline small-font py-7 mr-4"
                    @click="add_another"
                    :disabled="!img_url || !image_name || !autocomplete_city"
                >
                    Save and Add Another
                </v-btn>
                <!-- <cb-btn
                    @click="log_helper(organization)"
                >
                Log
                </cb-btn> -->
            </v-row>
          </v-col>
      </v-row>
      <v-row class="pl-12 pr-6">
            <gallery-item v-for="photo in organization.gallery_photos" :key="photo.id" :photo="photo" class="mr-3"/>
      </v-row>
  </div>
</template>

<script>
import BackButton from "../../ui/BackBtn.vue"
import GalleryItem from "../../ui/GalleryItem.vue";
import CbSelectSmall from "../../ui/CbSelectSmall.vue"
import CbBtn from "../../ui/CbBtn.vue"
import CbTextField from "../../ui/CbTextField.vue"
import ImageCropper from "../../ui/ImageCropper.vue"
import CityAutocomplete from "~/components/registration/reg2/Workplace/CityAutocomplete"

export default {
  components: { BackButton, GalleryItem, CbSelectSmall, CbBtn, CbTextField, ImageCropper, CityAutocomplete },
  name: "EditGallery",
  props: {
    organization: Object,
  },
  data() {
      return {
          image_name: null,
          show_image_cropper: false,
          file: null,
          image_url: null,
          photo_data: null,
          autocomplete_city: null,
          saving: false,

      }
  },
  methods: {
    on_back_select() {
        this.$emit("set_edit", false)
    },
    get_cropped_url({ url, form_data }) {
        this.img_url = url
        this.photo_data = form_data
    },
    upload(file) {
        if (file) {
            this.file = file
            this.show_image_cropper = true
        }
    },
    add_another() {
        this.submit('add')
    },
    submit_one() {
        this.submit('save_one')
    },
    async submit(action) {
        this.saving = true
        const payload = {
            organization: this.organization.id,
            name: this.image_name,
            city: this.autocomplete_city.city,
            state: this.autocomplete_city.city_state.slice(-2),
            photo: this.image_url
        }
        try {
            const response = await this.$axios.post(
                `/api/gallery_photos/`,
                payload
            )
            await this.$axios.patch(
                `/api/gallery_photos/${response.data.id}/`,
                this.photo_data,
                { headers: { "Content-Type": `multipart/form-data` } }
            )
            await this.$store.dispatch(
                "organizations/get_current",
                this.$route.params.uid
            )
        } catch (e) {
            console.error(e)
        }  finally {
            this.image_name = null
            this.autocomplete_city = null
            this.image_url = null
            this.img_url = null
            this.photo_data = null
            this.file = null
            this.saving = false

            if (action === 'add') {
                this.$snackbar.show_message({ content: 'Image Added!', type: 'success' })
                setTimeout(() => {
                    this.show_image_cropper = false
                    this.$refs.file_input.$refs.input.click()
                }, 0)
            } else {
                this.$emit("set_edit", false)
                this.$snackbar.show_message({ content: 'Image Added!', type: 'success' })
            }
        }

}
  }
};
</script>

<style lang="stylus" scoped>
>>> .gallery-item {
  margin-bottom: 20px
}

.image-sub-container
    position relative
    transition .1s
    height: 430px;
    width: 630px;
    background-color var(--v-white-dark-base) !important
    box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
    cursor pointer
    border 1px solid var(--v-border-grey-base)

    &:hover
        opacity .7

    &:active
        opacity .5

.v-file-input
    position absolute
    width 100%
    height 100%
    padding 0
    top 0
    left 0
    margin 0
    z-index: 1;

    >>> .v-input__prepend-outer
        width 100%
        height 100%
        margin 0

        .v-input__icon.v-input__icon--prepend
            width 100%
            height 100%

    >>> button
        opacity 0
        height 100%
        width 100%
        border-radius 0

    >>> .v-input__control
        display none
</style>