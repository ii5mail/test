<template>
    <v-dialog :value="value" width="650px" persistent>
        <v-card class="pa-10 pb-4 relative primary-text--text">
            <v-btn
                icon
                class="absolute close-btn"
                @click="$emit('input')"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-card-title>
                Request Relationship Access For: {{ organization.name }}
            </v-card-title>
            <v-card-text>

                <p>
                    Include why you’re requesting access. They’ll recieve your request along with your contact
                    information in your profile.
                </p>

                <v-form @submit.prevent="send_request">
                    <div>
                        <v-checkbox v-model="request_all_locations" label="Request All Locations" hide-details
                                    class="mb-1"/>
                        <div class="primary-text--text">Office Location*</div>
                        <cb-select
                            v-model="selected_location"
                            :menu-props="{ bottom: true, offsetY: true, closeOnClick: true, closeOnContentClick: true }"
                            placeholder="Select Locations"
                            :items="locations_options"
                            :disabled="request_all_locations"
                            :error="!!errors.office_location"
                            :error-messages="errors.office_location ? errors.office_location[0] : null"
                        >
                            <template v-slot:item="{ item }">
                                <div class="d-flex flex-column">
                                    <div>{{ item.city }}, {{ item.state }}</div>
                                    <div class="xxs-font">{{ item.address_1 }}</div>
                                </div>
                            </template>
                            <template v-slot:selection="{ item, index}">
                                <div class="d-flex flex-column" v-if="index < 2">
                                    <div>{{ item.city }}, {{ item.state }}</div>
                                    <div class="xxs-font">{{ item.address_1 }}</div>
                                </div>
                            </template>
                        </cb-select>
                        {{ errors.office_location }}
                    </div>
                    <div>
                        <div class="primary-text--text">Include a Message*</div>
                        <v-textarea
                            v-model="message"
                            outlined
                            placeholder="Type in a Message"
                            counter="500"
                            maxlength="500"
                            no-resize
                            rows="4"
                            :error="!!errors.message"
                            :error-messages="errors.message"
                        />
                    </div>
                    <div class="d-flex justify-end align-center mt-4">
                        <div class="error--text mr-2" v-if="Object.keys(errors).length">
                            {{
                                errors.organization && Object.keys(errors).length === 1 ? errors.organization[0] : "Error Occurred"
                            }}
                        </div>
                        <cb-btn
                            :large="false"
                            :disabled="!message.length || (!selected_location && !request_all_locations)"
                            :loading="loading"
                            width="150px"
                            type="submit"
                        >
                            Send Request
                        </cb-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import CbSelect from "../../../ui/CbSelect"
    import CbBtn from "../../../ui/CbBtn"

    export default {
        components: { CbBtn, CbSelect },
        props: {
            value: Boolean,
            organization: Object
        },
        data: () => ({
            message: '',
            selected_location: null,
            request_all_locations: false,
            loading: false,
            errors: {}
        }),
        computed: {
            locations_options() {
                return this.organization.office_locations
            }
        },
        methods: {
            async send_request() {
                this.loading = true
                this.errors = {}
                const payload = {
                    message: this.message,
                    organization: this.organization.id
                }

                if (!this.request_all_locations) {
                    payload.office_location = this.selected_location.id
                } else {
                    payload.all_locations = true
                }

                try {
                    await this.$axios.post('/api/relationship_access_requests/', payload)
                    this.$emit('input')
                } catch (e) {
                    // this.$snackbar.show_message({ content: "An Error Occurred!", type: 'error' })
                    this.errors = e.response.data || {}

                    console.error(e)
                } finally {
                    this.loading = false
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
    .v-card__title
        word-break break-word

    .close-btn
        right 10px
        top 10px

    .v-textarea {
        >>> fieldset {
            border: 1px solid var(--v-primary-text-base);
        }
    }
</style>
