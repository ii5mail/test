<template>
    <div class="fill-height">
        <account-sidebar/>
        <v-container
            :fluid="step !== 2"
            class="fill-height justify-center"
            :class="{
                'd-flex align-center': step === 2
            }"
        >

            <v-card v-if="loading" class="justify-center transparent elevation-0 fade-in">
                <v-progress-circular
                    indeterminate
                    color="primary"
                />
            </v-card>
            <v-card class="transparent elevation-0 fade-in" width="550px" v-else-if="step === 1 || step === 3">
                <v-form @submit.prevent="confirm_organization">
                    <v-card-title class="py-0">
                        <div class="display-1">
                            <span v-if="step === 1">
                                <span v-if="existing_organization && is_match">
                                    Welcome {{ user ? user.first_name : null }}! It looks like this is where you work.
                                </span>
                                <span v-else>
                                    Welcome {{ user ? user.first_name : null }}! What's your company’s name?
                                </span>
                            </span>
                            <span v-else-if="step === 3">
                                Real estate is all about location, location, location!
                            </span>
                        </div>
                    </v-card-title>
                    <v-card-text v-if="step === 1">
                        <div class="my-6">
                            <p class="body-1 subheading">
                                <span v-if="is_match && existing_organization && !selected_new_org">
                                    According to our records, <i>{{
                                        user ? user.domain :
                                            existing_organization ?
                                                existing_organization.domain
                                                : 'your email'
                                    }}</i> is associated with:
                                </span>
                                <span v-else>
                                    Join the right organization to collaborate with your colleagues.
                                    Basics for now and add the nitty gritty details in your Profile.
                                </span>
                            </p>
                        </div>
                        <v-container>
                            <v-row class="body-1 justify-end mb-3" v-if="!existing_organization && user">
                                You registered with: {{ user.email }}
                            </v-row>
                            <OrgSelection
                                :organization="existing_organization"
                                @select_org="select_org"
                                @create_org="create_org"
                                @set_new_logo_data="set_new_logo_data"
                            />
                        </v-container>
                        <form-error :msg="alert_errors"/>

                    </v-card-text>
                    <div
                        v-else-if="step === 3 && (existing_organization || new_organization)"
                        :set="org = existing_organization || new_organization"
                    >
                        <without-locations
                            @back="step = 2"
                            :org="org"
                            v-if="!org.office_locations.length"
                            :place_id="place_id"
                        />
                        <with-locations
                            @back="step = 2"
                            :org="org"
                            v-else
                            :place_id="place_id"
                        />
                    </div>
                    <v-card-actions class="px-4" v-if="step === 1">
                        <v-btn @click="$router.push('/registration/add-name')" text class="primary--text light-weight">
                            Go Back
                        </v-btn>
                        <v-spacer/>
                        <v-btn
                            type="submit"
                            color="primary"
                            width="135px"
                            large
                            depressed
                            :loading="submitting"
                            :disabled="btn_is_disabled"
                        >
                            Continue
                        </v-btn>
                    </v-card-actions>
                    <v-container v-if="step === 1 && existing_organization">
                        <v-row>
                            <v-col cols="4"/>
                            <v-col class="xs-font lh-16 text-right primary-text--text">
                                If your company name is different than your URL, you can modify it after completing
                                registration.
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card>
            <organization-type v-else-if="step === 2" :organization="new_organization" @update_step="update_step"/>


        </v-container>
    </div>
</template>

<script>
    import AccountSidebar from "../../../ui/AccountSidebar"
    import WithoutLocations from "./WithoutLocations"
    import WithLocations from "./WithLocations"
    import FormError from "../../../ui/FormError"
    import OrgSelection from "./OrgSelection"
    import OrganizationType from "./OrganizationType.vue"

    export default {
        components: { OrgSelection, FormError, WithoutLocations, AccountSidebar, WithLocations, OrganizationType },
        data() {
            return {
                step: 1,
                submitting: false,
                loading: true,
                is_match: false,
                new_org: null,
                new_logo_data: null,
                file: {},
                alert_errors: {},
                new_organization: null,
                existing_organization: null,
                place_id: null,
                selected_new_org: false
            }
        },
        computed: {
            user() {
                return this.$auth.user
            },

            btn_is_disabled() {
                if (this.new_organization) {
                    return !(this.new_organization.name && this.new_organization.domain)
                } else if (this.existing_organization) {
                    return false
                } else {
                    return true
                }
            }
        },
        watch: {
            async existing_organization() {
                if (this.existing_organization) {
                    await this.$store.dispatch('organizations/get_current', this.existing_organization.id)
                }
            }
        },
        async mounted() {
            this.loading = true
            await this.get_user_location()
            const match = await this.$store.dispatch('organizations/user_domain_match')

            if (match) {
                this.is_match = true
                this.existing_organization = match
            }

            this.loading = false
        },
        methods: {
            async get_user_location() {
                navigator.geolocation.getCurrentPosition(({ coords }) => {
                    const geocoder = new google.maps.Geocoder()
                    const latlng = {
                        lat: parseFloat(coords.latitude),
                        lng: parseFloat(coords.longitude),
                    }
                    geocoder.geocode({ location: latlng }, (results, status) => {
                        if (status === "OK") {
                            if (results[0]) {
                                this.place_id = results[0].place_id
                            } else {
                                console.error('No Results Found')
                            }
                        } else {
                            console.error("Geocoder failed due to: " + status)
                        }
                    })
                }, () => {
                    throw new Error("Couldn't access location")
                })
            },
            set_new_logo_data(logo_data) {
                this.new_logo_data = logo_data
            },
            update_step(step){
                this.step = step
            },
            select_org(org) {
                this.selected_new_org = false
                this.existing_organization = org
                this.new_organization = null
            },
            create_org(org) {
                this.new_organization = org
                this.existing_organization = null
                this.newly_created_org = true
            },
            upload(file) {
                this.file = file
                this.show_image_cropper = true
            },
            async patch_new_logo() {
                await this.$axios.patch(
                    `/api/organizations/${ this.existing_organization.id }/`,
                    this.new_logo_data,
                    { headers: { "Content-Type": `multipart/form-data` } }
                )
            },
            async confirm_organization() {
                this.submitting = true
                // For the route of creating a new organization
                try {
                    this.alert_errors = {}
                    const body = {
                        ...this.new_organization,
                        logo: null,
                        categories: []
                    }
                    body.domain_name = body.domain
                    delete body.domain

                    let next_step = 3
                    if (this.new_organization) {
                        const res = await this.$axios.post('/api/organizations/', body)
                        this.new_organization = res.data
                        this.existing_organization = res.data
                        next_step = 2
                    }

                    if (this.new_logo_data) {
                        await this.patch_new_logo()
                    }

                    this.step = next_step
                } catch (e) {
                    if (e.response) {
                        if (e.response.status === 500) {
                            this.alert_errors = { detail: "Error Occurred" }
                        } else {

                            const alert_errors = { ...e.response.data }
                            delete alert_errors.email
                            this.alert_errors = alert_errors
                        }
                        this.errors = e.response.data
                    } else {
                        console.error(e)
                        this.alert_errors = { detail: "Error Occurred" }
                    }
                } finally {
                    this.submitting = false
                }


            }
        }
    }
</script>

<style lang="stylus" scoped>

    >>> .close-icon
        position absolute
        left 9px
        top 9px
        width 20px
        height 20px
        background var(--v-white-base)
        z-index 1
        border 1px solid var(--v-light-purple-base)
        transition 0s !important

        &:hover
            background var(--v-primary-base)
            color white

    >>> .photo-container
        overflow hidden
        border 1px solid var(--v-light-purple-base)
        border-radius 4px
        line-height 16px
        position relative
        transition .1s
        cursor pointer
        width 70px
        height 70px

        &:hover
            background var(--v-light-grey-base)

        &:active
            background var(--v-light-grey-darken1)


    >>> .logo-container
        position relative
        background-color var(--v-white-base)
        border 1px solid var(--v-light-purple-base)
        border-radius 4px

    >>> .subheading
        line-height 20px

    >>> .menu__content
        div
            border 1px solid var(--v-light-purple-base) !important
            border-radius 4px !important
            box-shadow none !important


    >>> .v-text-field__details
        display none

</style>
