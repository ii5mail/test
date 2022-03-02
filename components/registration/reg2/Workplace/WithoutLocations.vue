<template>
    <v-form @submit.prevent="submit">
        <v-card-text>
            <div class="my-6">
                <p class="body-1 subheading">
                    If we got this right, hit continue! If not, start typing your address.
                </p>
            </div>
            <v-container class="pa-0">
                <div>
                    <div class="primary-text--text mt-5">Office Location Type</div>
                    <cb-select
                        placeholder="Headquarters"
                        name="office_type"
                        type="select"
                        :menu-props="{ bottom: true, offsetY: true }"
                        disabled
                    />
                    <div class="caption primary-text--text mt-5">Confirm or Modify Your Address</div>
                    <address-autocomplete
                        outlined
                        v-model="autocomplete_address"
                        @input="set_address_from_user_location"
                    />
                    <!-- <div class="primary-text--text mt-5">Zip Code*</div>
                    <cb-text-field
                        v-model="zip_code"
                        outlined
                        disabled
                        placeholder="12345"
                        name="zip_code"
                        type="text"
                        :rules="[rules.required]"
                    /> -->
                    <div class="primary-text--text mt-5">Office Phone Number*</div>
                    <!-- <phone-input
                        v-model="phone_number"
                        :error="!!alert_errors.phone_number"
                        :error_messages="alert_errors.phone_number"
                    /> -->
                    <cb-phone-input
                        v-model="phone_number"
                        @format_number="val=>formatted_phone_number=val"
                    />
                    <div class="d-flex justify-space-between mt-8">
                        <span>Send Bid Invitations To*</span>
                        <span class="xs-font">Separate By Commas</span>
                    </div>
                    <cb-text-field
                        v-model="bid_invitation_emails"
                        outlined
                        placeholder="name@domain.com"
                        name="bid_invitation_emails"
                        type="text"
                        :rules="[rules.required]"
                    />
                </div>
                <form-error :msg="alert_errors"/>

            </v-container>
        </v-card-text>
        <v-card-actions class="px-4">
            <v-btn @click="$emit('back')" text class="primary--text light-weight">
                Go Back
            </v-btn>
            <v-spacer/>
            <v-btn
                color="primary"
                width="135px"
                large
                depressed
                type="submit"
                :loading="loading"
                :disabled="!this.autocomplete_address"
            >
                Continue
            </v-btn>
        </v-card-actions>
    </v-form>
</template>
<script>
    import { get_location_data } from "./utils"
    import FormError from "../../../ui/FormError"
    import { get_place_details } from "~/components/registration/reg2/Workplace/utils"
    import AddressAutocomplete from "~/components/registration/reg2/Workplace/AddressAutocomplete"
    import CbPhoneInput from '../../../ui/CbPhoneInput.vue'
    import CbTextField from "../../../ui/CbTextField"
    import CbSelect from "../../../ui/CbSelect"


    export default {
        components: { AddressAutocomplete, FormError, CbPhoneInput, CbTextField, CbSelect },
        props: ['org', 'place_id'],
        data() {
            return {
                loading: false,
                alert_errors: {},
                autocomplete_address: null,
                phone_number: '',
                formatted_phone_number: '',
                bid_invitation_emails: '',
                bid_invitation_emails_list: [],
                rules: {
                    required: value => !!value || 'This field is required',
                },
            }
        },
        watch: {
            async place_id() {
                await this.set_address_from_user_location()
            },
            bid_invitation_emails_list() {
                if (!this.bid_invitation_emails && this.bid_invitation_emails_list.length) {
                    this.bid_invitation_emails = this.bid_invitation_emails_list.join(", ")
                }
            },
            bid_invitation_emails() {
                this.bid_invitation_emails_list = this.bid_invitation_emails.split(', ')
            },
        },
        async mounted() {
            await this.set_address_from_user_location()
        },
        methods: {
            async set_address_from_user_location() {
                // for user IP location
                if (this.place_id) {
                    const loc_data = await get_place_details(this.place_id)
                    this.autocomplete_address = {
                        id: this.place_id,
                        value: `${ loc_data.address_1 }, ${ loc_data.city }, ${ loc_data.state } ${ loc_data.zip_code }, ${ loc_data.country }`
                    }
                }
            },
            async submit() {
                this.loading = true
                try {
                    // Gets city/state/country from autocomplete_city
                    const loc_data = await get_place_details(this.autocomplete_address.id)

                    const payload = {
                        ...loc_data,
                        organization: this.org.id,
                        phone_number: this.formatted_phone_number,
                        office_type: 'Headquarters',
                    }
                    const res = await this.$axios.post(`/api/office_locations/`, payload)
                    await this.$store.dispatch('account/patch_user', { primary_office_location: res.data.id })
                    await this.$router.push('/registration/categories')
                } catch (e) {
                    if (e.response) {
                        if (e.response.status === 500) {
                            this.alert_errors = { detail: "Error Occurred" }
                        } else {
                            this.errors = e.response.data
                            const alert_errors = { ...e.response.data }
                            delete alert_errors.email
                            this.alert_errors = alert_errors
                        }
                    } else {
                        console.error(e)
                        this.alert_errors = { detail: "Error Occurred" }
                    }
                }
                this.loading = false

            }
        }
    }
</script>
