<template>
    <v-form @submit.prevent="submit">
        <v-card-text>
            <div class="my-6">
                <p class="body-1 subheading">
                    Go ahead and choose an office. If your office isn't in the list, feel free to create a new one!
                </p>
            </div>
            <v-container class="pa-0">
                <div>
                    <div class="primary-text--text">Known {{ org.name }} Offices: {{
                            office_locations.length - 1
                        }}
                    </div>
                    <cb-select
                        placeholder="Choose a location"
                        :menu-props="{ bottom: true, offsetY: true }"
                        return-object
                        :items="office_locations"
                        item-text="city"
                        item-value="id"
                        v-model="selected_location"
                    >
                        <template slot="selection" slot-scope="data">
                            <!-- HTML that describe how select should render selected items -->
                            <div v-if="data.item.id !== 'other'">
                                {{ data.item.city }},
                                {{ data.item.state }},
                                {{ data.item.country }}
                                <span class="ml-1 font-italic grey-text--text xs-font">{{ data.item.address_1 }}</span>
                            </div>
                            <div v-else>
                                Other Location
                            </div>
                        </template>
                        s
                        <template v-slot:item="data">
                            <template>
                                <v-list-item-content>
                                    <v-list-item-title v-if="data.item.id !== 'other'">
                                        {{ data.item.city }},
                                        {{ data.item.state }},
                                        {{ data.item.country }}
                                        <span class="ml-1 font-italic grey-text--text xs-font">{{ data.item.address_1 }}</span>
                                    </v-list-item-title>
                                    <v-list-item-title v-else>
                                        Other Location
                                    </v-list-item-title>
                                </v-list-item-content>
                            </template>
                        </template>
                    </cb-select>
                </div>
                <div class="mt-5" v-if="selected_location.id === 'other'">
                    <div class="primary-text--text mt-5">Office Location Type</div>
                    <cb-select
                        v-model="office_type"
                        name="office_type"
                        type="select"
                        :menu-props="{ bottom: true, offsetY: true }"
                        :items="office_type_options"
                    />
                    <div class="primary-text--text mt-5">Add New Address*</div>
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
                    <form-error :msg="errors"/>
                </div>
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
                :disabled="
                    (isNaN(this.selected_location.id) && !this.autocomplete_address)
                "
            >
                Continue
            </v-btn>
        </v-card-actions>
    </v-form>
</template>
<script>
    import CbSelect from "../../../ui/CbSelect"
    import CbTextField from "../../../ui/CbTextField"
    import FormError from "~/components/ui/FormError"
    import AddressAutocomplete from "~/components/registration/reg2/Workplace/AddressAutocomplete"
    import { get_place_details } from "~/components/registration/reg2/Workplace/utils"
    import CbPhoneInput from '../../../ui/CbPhoneInput.vue'

    export default {
        components: { AddressAutocomplete, CbSelect, FormError, CbPhoneInput, CbTextField },
        props:
            ['org', 'place_id'],
        data() {
            return {
                loading: false,
                errors: {},
                alert_errors: {},
                autocomplete_address: null,
                office_locations: [],
                selected_location: {},
                bid_invitation_emails: '',
                bid_invitation_emails_list: [],
                office_type_options: ['Satellite', 'Area', 'Regional'],
                office_type: 'Satellite',
                phone_number: '',
                formatted_phone_number: '',
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
            this.office_locations = this.org.office_locations
            const location_copy = [...this.office_locations]
            location_copy.push({ id: 'other' })
            this.office_locations = location_copy
        },
        methods: {
            // async set_address_from_user_location() {
            //     if (this.place_id) {
            //         const loc_data = await get_place_details(this.autocomplete_address ? this.autocomplete_address.id : this.place_id)
            //         this.autocomplete_address = {
            //             id: this.autocomplete_address ? this.autocomplete_address.id : this.place_id,
            //             ...loc_data,
            //             value: `${ loc_data.address_1 }, ${ loc_data.city }, ${ loc_data.state }, ${ loc_data.country }`
            //         }
            //         this.zip_code = loc_data.zip_code
            //     }
            // },
            async set_address_from_user_location() {
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
                    if (this.autocomplete_address && this.selected_location.id === 'other') {
                        // Gets city/state/country from autocomplete_city
                        const loc_data = await get_place_details(this.autocomplete_address.id)
                        const payload = {
                            ...loc_data,
                            organization: this.org.id,
                            phone_number: this.formatted_phone_number,
                            office_type: this.office_type,
                        }
                        // const payload = {
                        //     ...this.autocomplete_address,
                        //     organization: this.org.id,
                        //     phone_number: this.formatted_phone_number,
                        //     office_type: this.office_type,
                        // }
                        var res = await this.$axios.post(`/api/office_locations/`, payload)
                    }
                    const id = this.selected_location.id === 'other' ? res.data.id : this.selected_location.id
                    await this.$store.dispatch('account/patch_user', { primary_office_location: id })

                    if (this.selected_location.id === 'other') {
                        // if category is GC, go to home
                        // if category is sub or manufacturer, go to trade types

                        if (this.org.market_segments[0]?.supercategory?.name !== 'General Contractor') {
                            await this.$router.push('/registration/categories')
                        } else {
                            await this.$router.push({
                                path: '/',
                                query: {
                                    ftue: true,
                                }
                            })
                            this.$snackbar.show_message({ content: "Registration Complete!", type: 'success' })
                        }
                    } else {
                        await this.$router.push({
                            path: '/',
                            query: {
                                ftue: true,
                            }
                        })
                        this.$snackbar.show_message({ content: "Registration Complete!", type: 'success' })
                    }
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
                }
                this.loading = false

            }
        }
    }
</script>
