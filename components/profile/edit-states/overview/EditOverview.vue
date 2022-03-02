<template>
    <div class="pt-0 px-0">
        <back-button @on_back="on_back_select"/>
        <v-form @submit.prevent="save_edits" class="mt-14">

            <v-row>
                <v-col cols="3" class="pt-0 d-flex flex-column align-end">
                    <div class="d-flex justify-end mt-1 rounded-xl px-4 py-0">
                        <div class="image-sub-container rounded-xl relative pa-4">
                            <v-file-input @change="upload" accept="image/png, image/jpeg"/>
                            <div v-if="!img_url" class="d-flex align-center justify-center flex-column">
                                <div class="mb-1">Add</div>
                                <div>Logo</div>
                            </div>

                            <img
                                v-else
                                :src='img_url'
                                alt="Company Logo"
                                width="100%"
                                class="rounded-lg"
                            >
                        </div>
                    </div>
                    <div class="relative mr-4 mt-1">
                        <v-btn
                            width="150"
                            text
                            small
                            class="fill-width xs-font light-font text-decoration-underline primary-text--text x-light-weight"
                        >
                            Change Logo
                        </v-btn>
                        <v-file-input @change="upload" accept="image/png, image/jpeg"/>
                    </div>
                    <image-cropper
                        :aspect_ratio="1"
                        title="Add Logo"
                        v-model="show_image_cropper"
                        :file="file"
                        @get_cropped_url="get_cropped_url"
                    />
                </v-col>
                <v-col cols="8" class="fill-height">
                    <v-row class="mb-6">
                        <v-icon class="mx-2">$vuetify.icons.info</v-icon>
                        <div class="medium-font">Overview</div>
                    </v-row>
                    <v-row class="small-text primary-text--text">
                        <v-col class="pb-1 pt-0">
                            <div ref="top_of_form">Company Name</div>
                            <cb-text-field
                                v-model="form.name"
                                outlined
                                placeholder="Company Name"
                                name="name"
                                type="text"
                                :error="!!errors.headquarters.name"
                                :error-message="errors.headquarters.name"
                            />
                        </v-col>
                    </v-row>
                    <v-row class="small-text primary-text--text">
                        <v-col class="pb-1 pt-0">
                            <div>Address 1*</div>
                            <cb-text-field
                                v-model="form.headquarters.address_1"
                                outlined
                                placeholder="Address 1"
                                name="address_1"
                                type="text"
                                :error="!!errors.headquarters.address_1"
                                :error-message="errors.headquarters.address_1"
                            />
                        </v-col>
                        <v-col class="pb-1 pt-0">
                            <div>Address 2</div>
                            <cb-text-field
                                v-model="form.headquarters.address_2"
                                outlined
                                placeholder="Address 2"
                                name="address_2"
                                type="text"
                                :error="!!errors.headquarters.address_2"
                                :error-message="errors.headquarters.address_2"
                            />
                        </v-col>
                    </v-row>
                    <v-row class="small-text primary-text--text">
                        <v-col class="pb-1 pt-0">
                            <div>City, State*</div>
                            <city-autocomplete
                                v-model="autocomplete_city"
                                placeholder="Atlanta, GA"
                                city_state_only
                            />
                        </v-col>

                        <v-col cols="3" class="pb-1 pt-0">
                            <div>Zip/Postal Code*</div>
                            <cb-text-field
                                v-model="form.headquarters.zip_code"
                                outlined
                                placeholder="Zip/Postal Code"
                                name="zip_code"
                                type="text"
                                :error="!!errors.headquarters.zip_code"
                                :error-message="errors.headquarters.zip_code"
                            />
                        </v-col>
                        <v-col cols="3" class="pb-1 pt-0">
                            <div>Country*</div>
                            <cb-text-field
                                v-model="form.headquarters.country"
                                placeholder="Country"
                                name="country"
                                outlined
                                :error="!!errors.headquarters.country"
                                :error-message="errors.headquarters.country"
                            />
                        </v-col>
                    </v-row>
                    <v-row class="small-text primary-text--text">
                        <v-col cols="6" class="pb-1 pt-0">
                            <div>Website*</div>
                            <cb-text-field
                                v-model="form.website"
                                outlined
                                placeholder="Website"
                                name="website"
                                type="text"
                                disabled
                                :error="!!errors.website"
                                :error-message="errors.website"
                            />
                        </v-col>
                        <v-col cols="6" class="pb-1 pt-0">
                            <div>Phone</div>
                            <!-- <phone-input
                                v-model="form.headquarters.phone_number"
                                :error="!!errors.headquarters.phone_number"
                                :error_messages="errors.headquarters.phone_number"
                            /> -->
                            <cb-phone-input
                                v-model="phone_number"
                                @format_number="val=>form.headquarters.phone_number=val"
                            />
                        </v-col>
                    </v-row>
                    <v-row class="small-text primary-text--text">
                        <v-col cols="6" class="pb-1 pt-0">
                            <div>Company Size</div>
                            <cb-select
                                v-model="form.employee_quantity"
                                placeholder="Select Company Size"
                                name="employee_quantity"
                                type="select"
                                :items="employee_quantity_options"
                                :menu-props="{ bottom: true, offsetY: true }"
                                :error="!!errors.employee_quantity"
                                :error-messages="errors.employee_quantity"
                            />
                        </v-col>
                        <v-col cols="6" class="pb-1 pt-0">
                            <div>Ownership Type</div>
                            <cb-select
                                v-model="form.ownership_type"
                                placeholder="Select Ownership Type"
                                :items="ownership_type_options"
                                name="ownership_type"
                                type="select"
                                item-text="value"
                                :menu-props="{ bottom: true, offsetY: true }"
                                :error="!!errors.ownership_type_options"
                                :error-messages="errors.ownership_type_options"
                            />

                        </v-col>
                    </v-row>

                    <v-row class="small-text primary-text--text">
                        <v-col cols="12" class="pb-1 pt-0">
                            <div>Tell Us About Your Company</div>
                            <v-textarea
                                v-model="form.description"
                                outlined
                                placeholder="Company Description"
                                name="description"
                                type="text"
                                no-resize
                                counter="1500"
                                maxlength="1500"
                                :error="!!errors.description"
                                :error-messages="errors.description"
                            />
                        </v-col>
                    </v-row>
                    <v-row class="small-text primary-text--text">
                        <v-col cols="12" class="pb-1 pt-0">
                            <div class="d-flex justify-space-between">
                                <span>Who Receives Pre Qual Requests*</span>
                                <span class="xs-font">Separate By Commas</span>
                            </div>
                            <cb-text-field
                                v-model="prequal_emails"
                                outlined
                                placeholder="Emails"
                                name="prequal_emails"
                                type="text"
                                :error="!!errors.prequal_emails"
                                :error-messages="errors.prequal_emails ? errors.prequal_emails[0] : null"
                            />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-divider class="mx-16 my-10 light-purple"/>
            </v-row>
            <v-row>
                <v-col cols="3"/>
                <v-col>
                    <div class="d-flex justify-space-between">
                        <div class="d-flex">

                            <v-icon class="mr-3" size="40">$vuetify.icons.hammer</v-icon>
                            <div class="large-font">Trades</div>
                        </div>
                        <v-btn
                            text
                            small
                            class="small-font x-light-weight"
                            color="primary"
                            @click="show_confirm_dialog = true"
                        >
                            Edit in Locations
                        </v-btn>
                    </div>
                    <div>
                        <v-row class="ma-0 mt-5">
                            <v-chip
                                v-for="(segment, i) in form.categories"
                                :key="i"
                                class="mr-3 mb-3 px-3 py-2 xs-font light-blue-grey"
                            >
                                {{ segment.name }}
                            </v-chip>

                        </v-row>
                    </div>
                </v-col>
                <v-col cols="1"/>

            </v-row>
            <v-row>
                <v-divider class="mx-16 my-10 light-purple"/>
            </v-row>
            <v-row>
                <v-col cols="3"/>
                <v-col>
                    <div class="d-flex">
                        <v-icon class="mr-2" color="primary-text">mdi-crosshairs-gps</v-icon>
                        <div class="large-font">Market Segments</div>
                    </div>
                    <div>
                        <v-row class="mt-5">
                            <v-chip
                                v-for="(segment,i) in organization.categories"
                                :key="i"
                                class="mr-3 mb-3 px-3 py-2 xs-font light-blue-grey"
                                close-icon="mdi-close"
                                close
                                @click:close="remove_market_segment(segment)"
                            >
                                {{ segment.name }}
                            </v-chip>
                            <v-chip
                                outlined
                                color="grey"
                                class="mb-3 py-2 xs-font white"
                                text-color="primary-text"
                                @click="open_market_dialog"
                            >
                                Add
                                <v-icon right size="20" class="ml-0">
                                    mdi-plus
                                </v-icon>
                            </v-chip>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="1"/>

            </v-row>
            <v-row>
                <v-col class="d-flex align-center justify-end">
                    <v-fade-transition hide-on-leave>
                    <span class="error--text xs-font mr-4" v-if="!!errors_exist">
                        Error Occurred
                    </span>
                    </v-fade-transition>
                    <cb-btn
                        type="submit"
                        color="primary"
                        width="120px"
                        height="50px"
                        class="mr-16"
                        :loading="saving"
                        depressed
                    >
                        Save
                    </cb-btn>
                </v-col>
            </v-row>
        </v-form>
        <market-segment-dialog v-model="show_market_segment_dialog"/>
        <confirm-dialog
            v-model="show_confirm_dialog"
            @on_action="go_to_locations"
            title="Navigate Away?"
            msg="Are you sure? Any unsaved progress will be lost."
            action_btn_text="Confirm"
            cancel_btn_text="Cancel"
        />

    </div>
</template>

<script>
    import { get_location_data } from "../../../registration/reg2/Workplace/utils"
    import BackButton from "../../../ui/BackBtn.vue"
    import CbTextField from "../../../ui/CbTextField"
    import CbSelect from "../../../ui/CbSelect.vue"
    import CbBtn from "../../../ui/CbBtn.vue"
    import ImageCropper from "../../../ui/ImageCropper"
    import MarketSegmentDialog from "./MarketSegmentDialog"
    import CityAutocomplete from "../../../registration/reg2/Workplace/CityAutocomplete"
    import CbPhoneInput from "../../../ui/CbPhoneInput"
    import ConfirmDialog from "../../../ui/ConfirmDialog"

    export default {
        components: {
            ConfirmDialog,
            CbPhoneInput,
            CityAutocomplete,
            MarketSegmentDialog,
            ImageCropper,
            BackButton,
            CbTextField,
            CbSelect,
            CbBtn,
        },
        name: "EditOverview",
        props: {
            company: Object,
            organization: Object,
        },
        data() {
            return {
                show_market_segment_dialog: false,
                show_confirm_dialog: false,
                saving: false,
                show_image_cropper: false,
                ownership_type_options: [],
                autocomplete_city: null,
                phone_number: '',
                form: { headquarters: {} }, //HQ initialized for zero state
                errors: { headquarters: {} }, //HQ initialized for zero state
                file: null,
                img_url: null,
                photo_data: null,
                prequal_emails: '',
                employee_quantity_options: [
                    '0-9', '10-99', '100-999'
                ]
            }
        },
        computed: {
            errors_exist() {
                return Object.keys(this.errors).length > 1 || Object.keys(this.errors.headquarters).length
            }
        },
        watch: {
            form: {
                deep: true,
                handler() {
                    if (!this.prequal_emails && this.form.prequal_emails?.length) {
                        this.prequal_emails = this.form.prequal_emails.join(", ")
                    }
                }
            },
            prequal_emails() {
                this.form.prequal_emails = this.prequal_emails.split(',')
            },
            async autocomplete_city() {
                if (this.autocomplete_city) {
                    const [city, state, country] = this.autocomplete_city.value.split(',')
                    if ('id' in this.autocomplete_city) {
                        const { location: { latitude, longitude } } = await get_location_data(this.autocomplete_city.id)
                        this.form.headquarters.location = {
                            latitude,
                            longitude
                        }
                    }
                    this.form.headquarters.city = city.trim()
                    this.form.headquarters.state = state.trim()
                    this.form.headquarters.country = country.trim()
                } else {
                    this.form.headquarters.city = null
                    this.form.headquarters.state = null
                    this.form.headquarters.country = null
                }
                this.form = { ...this.form }
            }
        },
        async mounted() {
            this.form = _.cloneDeep(this.organization)
            this.img_url = this.organization.logo

            // Find the office location that is the headquarter and assign to form
            const headquarter_location = this.organization.office_locations.find(({ office_type }) => office_type === "Headquarters") || {}
            this.form.headquarters = _.cloneDeep(headquarter_location)
            this.phone_number = headquarter_location.phone_number
            if (headquarter_location.city) {
                this.autocomplete_city = {
                    city: headquarter_location.city,
                    city_state: `${ headquarter_location.city }, ${ headquarter_location.state }`,
                    value: `${ headquarter_location.city }, ${ headquarter_location.state }, ${ headquarter_location.country }`,
                }
            }

            // This will always be "Headquarters" in this component
            this.form.headquarters.office_type = 'Headquarters'

            try {
                const res = await this.$axios.options('/api/organizations/')
                this.ownership_type_options = res.data.actions.POST.ownership_type.choices
            } catch (e) {
                console.error(e)
            }
        },
        methods: {
            scroll_to_form() {
                const el = this.$refs.top_of_form

                if (el) {
                    // Use el.scrollIntoView() to instantly scroll to the element
                    el.scrollIntoView({ behavior: 'smooth' })
                }
            },
            go_to_locations() {
                this.$emit('tab_change', 'locations')
                window.scrollTo({ top: 0, behavior: 'smooth' })
            },
            on_back_select() {
                this.$emit("set_edit", false)
            },
            upload(file) {
                if (file) {
                    this.file = file
                    this.show_image_cropper = true
                }
            },
            get_cropped_url({ url, form_data }) {
                this.img_url = url
                this.photo_data = form_data
            },
            open_market_dialog() {
                this.show_market_segment_dialog = true
            },
            remove_market_segment(segment) {
                // const new_market_segments = []
                // this.form.categories.forEach(({id})=>{
                //     if (id !== segment.id){
                //         new_market_segments.push(segment)
                //     }
                // })
                // this.form.categories = new_market_segments
            },
            async patch_new_logo() {
                if (this.photo_data) {
                    await this.$store.dispatch('organizations/patch_organizations', {
                        id: this.organization.id,
                        payload: this.photo_data
                    })
                }
            },
            async save_edits() {
                this.saving = true
                // set up payload
                const payload = { ...this.form }
                delete payload.logo
                delete payload.categories
                try {
                    this.errors = { headquarters: {} } // HQ initialized for zero state
                    await this.patch_new_logo()
                    await this.$store.dispatch('organizations/patch_organizations', {
                        id: this.organization.id,
                        payload
                    })
                    this.$snackbar.show_message({ content: "Organization updated!", type: 'success' })
                } catch (e) {
                    const errors = typeof e.data === "string" ? { detail: "Error Occurred" } : e.data
                    if (!('headquarters' in errors)) {
                        errors.headquarters = {}
                    }
                    this.scroll_to_form() // scrolls to form if error occurs
                    this.errors = errors
                }
                this.saving = false
            }
        },
    }
</script>

<style lang="stylus" scoped>

    .v-divider
        height 2px !important
        max-height 100px !important

    .v-textarea {
        >>> fieldset {
            border: 1px solid var(--v-primary-text-base);
        }
    }


    .image-sub-container
        position relative
        transition .1s
        height: 150px;
        width: 150px;
        box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
        cursor pointer

        &:hover
            opacity .7

        &:active
            opacity .5

    .change-logo-container
        width 150px

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

    //  For CityAutocomplete field borders
    >>> .v-input.error--text
        fieldset
            border-width 1px

    >>> .v-input.v-input--is-focused:not(.error--text)
        fieldset
            border 2px solid var(--v-primary-base)
            transition .3s

    .v-input:not(.error--text):not(.v-input--is-disabled)
        fieldset
            border 1px solid var(--v-black-base)
            transition .3s

    >>> .v-input:not(.v-input--is-focused):not(.error--text):hover >>> fieldset
        border 1px solid var(--v-primary-base)
</style>

