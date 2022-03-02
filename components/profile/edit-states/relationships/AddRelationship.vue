<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-row class="mx-12 mt-8 pr-6 flex-column">
            <v-row>
                <v-col class="d-flex align-center">
                    <v-icon class="mx-2">$vuetify.icons.linkage</v-icon>
                    <div class="medium-font">Add New Relationships</div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    Enter the information of the company you worked with so you can close more business.
                </v-col>
            </v-row>
            <v-form>
                <v-row>
                    <v-col>
                        <div class="medium-font my-5">Your Company</div>

                        <div class="small-font">Your Company Location*</div>
                        <cb-autocomplete
                            v-model="form[`${my_org_key}_office_location`]"
                            :items="organization.office_locations"
                            item-value="id"
                            placeholder="Company Name"
                            :menu-props="{ bottom: true, offsetY: true }"
                            :error="!!errors[`${ my_org_key }`] || !!errors[`${ my_org_key }_office_location`]"
                            :error-messages="errors[`${ my_org_key }`] || errors[`${ my_org_key }_office_location`]"
                        >
                            <template v-slot:item="{ item }">
                                <div class="d-flex flex-column">
                                    <div>{{ item.city }}, {{ item.state }}</div>
                                    <div class="xxs-font">{{ item.address_1 }}</div>
                                </div>
                            </template>
                            <template v-slot:selection="{ item }">
                                <div class="d-flex flex-column">
                                    <div>{{ item.city }}, {{ item.state }}</div>
                                    <div class="xxs-font">{{ item.address_1 }}</div>
                                </div>
                            </template>
                        </cb-autocomplete>

                        <div class="small-font">Trades Performed*</div>
                        <cb-select
                            v-model="form.trades_performed"
                            placeholder="Select Your Trades"
                            :height="form.trades_performed.length < 2 ? '50px' : 'auto'"
                            :items="trade_options"
                            :menu-props="{ bottom: true, offsetY: true }"
                            item-value="id"
                            item-text="name"
                            multiple
                            :disabled="!form[`${my_org_key}_office_location`]"
                            :error="!!errors.trades_performed"
                            :error-messages="errors.trades_performed"
                        >
                            <template v-slot:append-item>
                                <v-divider class="mt-2"></v-divider>
                                <v-btn text @click="show_dialog = true"
                                       class="fill-width light-weight xs-font justify-start">
                                    <v-icon class="mr-8">mdi-plus</v-icon>
                                    Add Another Trade
                                </v-btn>
                            </template>
                        </cb-select>
                        <v-checkbox
                            v-model="form.multiple_projects_completed"
                            label="We’ve completed multiple projects with this client"
                            color="grey"
                            :error="!!errors.multiple_projects_completed"
                            :error-messages="errors.multiple_projects_completed"
                        />

                    </v-col>
                    <v-col>
                        <div class="medium-font d-flex justify-space-between align-center my-5">
                            Company You Worked With
                            <a
                                @click="show_more = !show_more"
                                class="small-font"
                            >
                                {{ show_more ? "Show Less" : 'Show More' }}
                            </a>
                        </div>

                        <div class="small-font">Company Name*</div>
                        <cb-autocomplete
                            v-model="worked_with_org"
                            @keydown="refresh_list"
                            :items="organization_list"
                            item-text="name"
                            return-object
                            append-icon=""
                            placeholder="Company Name"
                            :menu-props="{ bottom: true, offsetY: true }"
                            :search-input.sync="search_text"
                            :error="!!errors[`${ request_org_key }`]"
                            :error-messages="errors[`${ request_org_key }`]"
                        />

                        <div class="small-font">Office Location*</div>
                        <cb-select
                            v-model="form[`${ this.request_org_key }_office_location`]"
                            item-value="id"
                            placeholder="Select Office"
                            :menu-props="{ bottom: true, offsetY: true }"
                            :items="office_locations"
                            :disabled="office_locations ? !office_locations.length : true"
                            :error="!!errors[`${ request_org_key }_office_location`]"
                            :error-messages="errors[`${ request_org_key }_office_location`]"
                        >
                            <template v-slot:item="{ item }">
                                <div class="d-flex flex-column">
                                    <div>{{ item.city }}, {{ item.state }}</div>
                                    <div class="xxs-font">{{ item.address_1 }}</div>
                                </div>
                            </template>
                            <template v-slot:selection="{ item }">
                                <div class="d-flex flex-column">
                                    <div>{{ item.city }}, {{ item.state }}</div>
                                    <div class="xxs-font">{{ item.address_1 }}</div>
                                </div>
                            </template>
                        </cb-select>

                        <div class="small-font d-flex fill-width justify-space-between">
                            <div>Company Contact</div>
                            <div class="light-text--text xs-font text-right">
                                Required for verification
                                <v-icon color="primary" size="14" class="ml-1">
                                    $vuetify.icons.checkmark_circled
                                </v-icon>
                            </div>
                        </div>
                        <cb-text-field
                            v-model="form.company_contact_email"
                            class="domain-input"
                            outlined
                            :placeholder="worked_with_org.domain_name ? 'john_smith' : 'sam@smith.com'"
                            :error="!!errors.company_contact_email"
                            :error-messages="errors.company_contact_email"
                        >
                            <template v-slot:append>
                                <div class="light-grey domain primary-text--text">
                                    @{{ worked_with_org.domain_name }}
                                </div>
                            </template>
                        </cb-text-field>
                        <div v-if="show_more" class="fade-in">
                            <v-row>
                                <v-col>
                                    <div class="small-font">Contact First Name</div>
                                    <cb-text-field
                                        v-model="form.company_contact_first_name"
                                        outlined
                                        placeholder="First Name"
                                    />
                                </v-col>
                                <v-col>
                                    <div class="small-font">Contact Last Name</div>
                                    <cb-text-field
                                        v-model="form.company_contact_last_name"
                                        outlined
                                        placeholder="Last Name"
                                    />
                                </v-col>
                            </v-row>
                            <v-checkbox
                                v-model="form.company_contact_is_project_manager"
                                label=" This was the Project Manager"
                                color="grey"
                                :error="!!errors.company_contact_is_project_manager"
                                :error-messages="errors.company_contact_is_project_manager"
                            />


                            <div class="small-font mt-6">Year Last Project Completed</div>
                            <cb-text-field
                                v-model="form.year_last_project_completed"
                                :rules="[year_validation]"
                                outlined
                                placeholder="i.e. 2018"
                                type="number"
                                :error="!!errors.year_last_project_completed"
                                :error-messages="errors.year_last_project_completed"
                            />
                        </div>

                        <div class="d-flex justify-end align-center">
                            <a class="mr-3" @click="save(true)">Save and Add Another</a>
                            <cb-btn
                                :large="false"
                                @click="save(false)"
                                :loading="saving"
                            >
                                Save
                            </cb-btn>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="pt-0 text-right caption error--text" v-if="Object.keys(errors).length">
                        {{
                            errors.non_field_errors ? errors.non_field_errors[0] : 'Error Occurred'
                        }}
                    </v-col>
                </v-row>
            </v-form>
        </v-row>
        <add-trade-dialog v-model="show_dialog" :location="selected_location" :organization="organization"/>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import CbBtn from "../../../ui/CbBtn"
    import CbSelect from "../../../ui/CbSelect"
    import CbTextField from "../../../ui/CbTextField"
    import CbAutocomplete from "../../../ui/CbAutocomplete"
    import AddTradeDialog from "./AddTradeDialog"

    export default {
        components: { CbTextField, CbAutocomplete, CbSelect, CbBtn, AddTradeDialog, },
        data: () => ({
            show_more: false,
            saving: false,
            show_dialog: false,
            office_locations: [],
            trades_performed_options: [],
            worked_with_org: '',
            search_text: '',
            my_org_key: '', // these will either be sub_contractor or general_contractor just for form references
            request_org_key: '', // these will either be sub_contractor or general_contractor just for form references
            form: {
                trades_performed: [] // defaulting this so we can read length
            },
            year_validation: val => (val?.length < 5 || 'Must be a valid year'),
            errors: {}
        }),
        computed: {
            ...mapState({
                organization_list: state => state.organizations.list,
                organization_type: state => state.organizations.organization_type,
                organization: state => state.organizations.current
            }),
            trade_options() {
                const options = this.organization.office_locations.find(({ id }) => this.form[`${ this.my_org_key }_office_location`])?.categories
                // if (options) {
                //     const copy = [...options]
                //     // removes n/a option
                //     const na_index = copy?.findIndex(({ name }) => name === 'N/A')
                //     copy?.splice(na_index, 1)

                //     return copy
                // }
                return options
            },
            selected_location() {
                return this.organization.office_locations.find(({ id }) => this.form[`${ this.my_org_key }_office_location`])
            }
        },
        watch: {
            worked_with_org() {
                if (this.worked_with_org) {
                    this.office_locations = this.worked_with_org.office_locations
                    this.form[`${ this.request_org_key }_office_location`] = null

                    if (this.worked_with_org.office_locations.length === 1) {
                        this.form[`${ this.request_org_key }_office_location`] = this.worked_with_org.office_locations[0].id
                    }

                    this.form[this.request_org_key] = this.worked_with_org.id
                }
            }
        },
        async mounted() {
            await this.$store.dispatch('organizations/get_organizations', { limit: 5 })

            this.my_org_key = this.organization_type === 'General Contractor' ? 'general_contractor' : 'sub_contractor'
            this.request_org_key = this.organization_type === 'General Contractor' ? 'sub_contractor' : 'general_contractor'

            // set up my org
            this.form[this.my_org_key] = this.organization.id
            if (this.organization.office_locations.length === 1) {
                this.form[`${ this.my_org_key }_office_location`] = this.organization.office_locations[0].id
            }

        },
        methods: {
            refresh_list: _.debounce(async function () {
                this.searching = true
                const type = this.organization_type !== 'General Contractor' ? 'General Contractor' : 'Trade Partner'
                await this.$store.dispatch('organizations/get_organizations', {
                    name: this.search_text,
                    limit: 5,
                    office_locations__categories__supercategory__supercategory__name: type
                    // todo - get this type to work
                })
                this.searching = false
            }, 100),
            async save(add_another) {
                this.saving = true
                this.errors = {}
                // simulate fetch to api
                const payload = { ...this.form }
                payload.company_contact_email = `${ this.form.company_contact_email }@${ this.worked_with_org.domain_name }`
                try {
                    await this.$store.dispatch('relationships/post_relationship', payload)
                    if (add_another) {
                        // reset/setup form values
                        this.form = {
                            trades_performed: [] // defaulting this so we can read length
                        }
                        this.worked_with_org = ''
                        this.form[this.my_org_key] = this.organization.id
                        if (this.organization.office_locations.length === 1) {
                            this.form[`${ this.my_org_key }_office_location`] = this.organization.office_locations[0].id
                        }
                    } else {
                        this.$emit('on_back')
                    }
                    this.$snackbar.show_message({ content: 'Relationship added!', type: 'success' })

                } catch (e) {
                    console.error(e)
                    this.errors = e.data
                } finally {
                    this.saving = false
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
    .domain-input
        >>> .v-input__append-inner
            margin-top: 0 !important;
            margin-right: -11px !important;

            .domain
                padding 17px

    .v-input--checkbox
        >>> .v-label
            font-size $small-font
</style>
