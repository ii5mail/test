<template>
  <v-dialog v-model="dialog" max-width="850px" >
    <template v-slot:activator="{ on, attrs }">
      <cb-btn
        v-bind="attrs"
        v-on="on"
        class="mr-8"
        color="primary"
        width="122px"
        height="33px"
        depressed
        :disabled="is_users_parent_org"
      >
        Invite to Bid
      </cb-btn>
    </template>
    <v-card class="rounded-xl py-12 px-16">
        <v-form @submit.prevent ref="form" id="top">
            <v-container class="pb-4 small-text primary-text--text">
                <v-row class="ma-0">
                    <div class="text-h6 mb-8">
                        <v-icon class="primary--text mr-1"> $vuetify.icons.envelope </v-icon>
                        Invite to Bid
                    </div>
                    <v-spacer/>
                    <v-btn icon @click="close_dialog">
                        <v-icon large color="primary-text">mdi-close</v-icon>
                    </v-btn>
                </v-row>
                <div>Select an Office for: {{ organization.name }}</div>
                <cb-select
                    v-model="form.office_location_address"
                    placeholder="Headquarters"
                    name="office_location_address"
                    type="select"
                    :items="locations_options"
                    :error="!!errors.office_location"
                    :menu-props="{ bottom: true, offsetY: true, closeOnClick: true, closeOnContentClick: true }"
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
                <v-checkbox
                    v-model="form.save_this_project_bid"
                    label="Save this project to my bid invite list"
                    hide-details
                    class="mb-6 mt-0"
                />
                <v-row>
                    <v-col cols="6">
                        Project Name
                    </v-col>
                    <v-col cols="6">
                        Project Address
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <project-autocomplete
                            v-model="project_name"
                            placeholder="Project Name"
                            @input="fill_project"
                            :error="!!errors.project_name"
                            :rules="rules.project_name"
                        />
                    </v-col>
                    <v-col cols="6">
                        <address-autocomplete
                            outlined
                            v-model="form.autocomplete_address"
                            placeholder="Project Address"
                            :rules="rules.address_1"
                            @input="set_address_from_user_location"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        Bid Due Date
                    </v-col>
                    <v-col cols="6">
                        Preferred Point of Contact
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <cb-text-field
                            v-model="form.bid_due_date"
                            outlined
                            placeholder="YYYY-MM-DD"
                            name="due_date"
                            type="text"
                            :error="!!errors.bid_due_date"
                            :rules="rules.bid_due_date"
                        />
                        <!-- Date picker component from Vuetify -->
                        <!-- <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <cb-text-field
                                    v-model="form.due_date"
                                    label="Date"
                                    hint="MM/DD/YYYY format"
                                    persistent-hint
                                    outlined
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    @blur="date = parseDate(form.due_date)"
                                    v-on="on"
                                />
                            </template>
                            <v-date-picker
                                v-model="date"
                                no-title
                                @input="menu1 = false"
                            />
                        </v-menu>
                        <p>Date in ISO format: <strong>{{ date }}</strong></p> -->
                    </v-col>
                    <v-col cols="6">
                        <cb-text-field
                            v-model="form.preferred_point_of_contact"
                            outlined
                            placeholder="name@domain.com"
                            name="email"
                            type="text"
                            :error="!!errors.preferred_point_of_contact"
                            :rules="rules.general_email"
                        />
                    </v-col>
                </v-row>
                <div class="mt-3">Link for Documents/Plans</div>
                <cb-text-field
                    v-model="form.link_for_documnets_or_plan"
                    outlined
                    placeholder="Link"
                    name="link_for_documnets_or_plan"
                    type="text"
                    :error="!!errors.link_for_documnets_or_plan"
                    :rules="rules.general"
                />
                <div>Project Description</div>
                <v-textarea
                    counter="2000"
                    maxlength="2000"
                    no-resize
                    v-model="form.project_description"
                    :error="!!errors.project_description"
                    outlined
                    type="text"
                    dense
                />
                <div class="d-flex flex-row-reverse mt-6">
                    <cb-btn
                        @click="save"
                        color="primary"
                        width="134px"
                        height="55px"
                        depressed
                        :loading="loading"
                    >
                    Continue
                    </cb-btn>
                </div>
            </v-container>
        </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
    import CbBtn from "../ui/CbBtn.vue"
    import CbSelect from "../ui/CbSelect.vue"
    import CbTextField from "../ui/CbTextField.vue"
    import AddressAutocomplete from "~/components/registration/reg2/Workplace/AddressAutocomplete"
    import { get_place_details } from "~/components/registration/reg2/Workplace/utils"
    import ProjectAutocomplete from "./ProjectAutocomplete.vue"
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'
    Vue.use(VueCookies)


    export default {
        props: ["organization", "is_users_parent_org"],
        components: {
            CbBtn,
            CbSelect,
            CbTextField,
            ProjectAutocomplete,
            AddressAutocomplete,
        },
        data() {
            return {
                dialog: false,
                loading: false,
                // place_id: null,
                form: {
                    project_name: '',
                    autocomplete_address: null,
                    address_1: '',
                    city: '',
                    state: '',
                    country: '',
                    zip_code: '',
                    link_for_documnets_or_plan: '',
                    preferred_point_of_contact: '',
                    bid_due_date: '',
                    save_this_project_bid: true,
                    office_location_address: null,
                    office_location: null,
                    project_description: '',
                },
                project_name: '',
                rules: {
                    general: [
                        value => !!value || 'Required.',
                        value => (value && value.length >= 2) || 'Min 2 characters.',
                    ],
                    project_name: [
                        value => !!value || 'Required.',
                        value => (value && (value.length >= 2 || value.project_name?.length >= 2)) || 'Min 2 characters.',
                    ],
                    bid_due_date: [
                        value => !!value || 'Required.',
                        value => {
                            if (value) {
                                return (value[4] === '-' && value[7] === '-') || 'Incorrect date format, use YYYY-MM-DD.'
                            } else {
                                return 'Required.'
                            }
                        },
                    ],
                    address_1: [
                        value => !!value || 'Select address from dropdown.',
                    ],
                    general_email: [
                        value => !!value || 'Required.',
                        value => {
                            if (value && value.includes('@')) {
                                let split_email = value.split('@')
                                let split_domain = split_email[1]?.split('.')
                                if (!split_email[1].includes('.') || split_email[0] === '' || split_domain[1] === '' || split_domain[0] === '') {
                                    return 'Not a valid email.'
                                }
                                return true
                            } else {
                                return 'Not a valid email.'
                            }
                        },
                    ],
                    not_empty: [
                        value => !!value || 'Required.',
                    ],

                },
                errors: {}
            };
        },
        watch: {
            office_location() {
                this.form.office_location = this.office_location?.id
            }
        },
        computed: {
            locations_options() {
                return this.organization.office_locations
            },
            office_location() {
                return this.form.office_location_address
            }
        },
        methods: {
            close_dialog() {
                this.dialog = false;
            },
            fill_project() {
                if (typeof this.project_name === 'object' && this.project_name !== null) {
                    this.form = {
                        ...this.project_name,
                        office_location_address: this.form.office_location_address
                    }
                    this.$refs.form.resetValidation()
                } else {
                    this.form.project_name = this.project_name
                }
            },
            async set_address_from_user_location() {
                if (this.place_id) {
                    const loc_data = await get_place_details(this.place_id)
                    this.form.autocomplete_address = {
                        id: this.place_id,
                        value: `${ loc_data.address_1 }, ${ loc_data.city }, ${ loc_data.state } ${ loc_data.zip_code }, ${ loc_data.country }`
                    }
                }
            },
            async save() {
                this.loading = true
                try {
                    if (this.form.autocomplete_address) {
                        const loc_data = await get_place_details(this.form.autocomplete_address.id)
                        this.form = {
                            ...this.form,
                            ...loc_data,
                        }
                    }
                    var res = await this.$axios.post(`/api/bid_invitation/`, this.form)
                    if (this.form.save_this_project_bid) {
                        let previous_projects = JSON.parse(this.$cookies.get('invite-to-bid-projects'))
                        let add_project
                        if (previous_projects) {
                            add_project = previous_projects.filter((project) => project.project_name !== this.form.project_name)
                            add_project.push({...this.form})
                        } else {
                            add_project = [{...this.form}]
                        }
                        this.$cookies.set('invite-to-bid-projects', JSON.stringify(add_project))
                    }
                    this.$refs.form.reset()
                    this.close_dialog()
                    this.$snackbar.show_message({ content: "Bid Invite Sent", type: 'success' })
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
                    this.$snackbar.show_message({ content: 'Please fix errors and try again', type: 'error' })
                    document.getElementById("top").scrollIntoView({behavior: "smooth"})
                } finally {
                    this.loading = false
                }
            },
        },
    };
</script>

<style lang="stylus" scoped>
    .v-textarea {
        >>> fieldset {
            border: 1px solid var(--v-primary-text-base);
        }
    }

    .col
        padding-bottom 0 !important
        padding-top 0 !important

</style>
