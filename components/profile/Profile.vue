<template>
    <v-card
        v-if="loading"
        class="transparent d-flex align-center justify-center py-16"
    >
        <v-progress-circular indeterminate color="primary" class="my-16"/>
    </v-card>
    <v-container class="pt-15" v-else-if="organization">
        <div class="tab-container d-flex relative">
            <img
                rel="preload"
                alt="Profile Picture"
                class="profile-img pa-4 rounded-xl fade-in"
                :src="organization.logo || organization_photo"
            />
            <div v-if="edit === false" class="d-flex justify-space-between">
                <div class="profile-header fade-in d-flex flex-column">
                    <div class="lh-32 large-font bold-weight">
                        {{ organization.name }} 
                    </div>
                    <div style="font-size: 21px" v-if="organization.office_locations.length">
                        {{ organization.office_locations[0].city }},
                        {{ organization.office_locations[0].state }}
                    </div>
                </div>
                <div class="d-flex align-center">
                    <claim-this-page-dialog :organization="organization" :is_users_parent_org="is_users_parent_org" @claimed="onClaimed"/>
                     <invite-to-bid-dialog v-if="claimed" :organization="organization" :is_users_parent_org="is_users_parent_org" />
                    <div class="profile-type d-flex pa-3 small-font rounded-lg fade-in">
                        <div class="mr-3">{{ organization.organization_type.name }}</div>
                        <v-icon
                            v-if="organization.organization_type.name == 'General Contractor'"
                            class="primary--text"
                        >
                            $vuetify.icons.general_contractor
                        </v-icon>
                        <v-icon
                            v-if="organization.organization_type.name == 'Trade Partner'"
                            class="primary--text"
                        >
                            $vuetify.icons.sub_contractor
                        </v-icon>
                    </div>
                </div>
            </div>
            <div v-else class="profile-header lh-32 xl-font fade-in">
                Edit Your Company Profile
            </div>
            <div class="btn-cont">
                <v-btn
                    small
                    elevation="0"
                    class="btn-tab small-font"
                    :class="{'active-tab': tab === 'overview'}"
                    @click="on_tab_select('overview')"
                >
                    Overview
                </v-btn>
                <v-btn
                    small
                    elevation="0"
                    class="btn-tab small-font"
                    :class="{'active-tab': tab === 'prequal'}"
                    @click="on_tab_select('prequal')"
                >
                    Prequal
                </v-btn>
                <v-btn
                    small
                    elevation="0"
                    class="btn-tab small-font"
                    :class="{'active-tab': tab === 'locations'}"
                    @click="on_tab_select('locations')"
                >
                    Locations & Areas Served
                </v-btn>
                <v-btn
                    small
                    elevation="0"
                    class="btn-tab small-font"
                    :class="{'active-tab': tab === 'employees'}"
                    @click="on_tab_select('employees')"
                >
                    Employees
                </v-btn>
                <v-btn
                    small
                    elevation="0"
                    class="btn-tab small-font"
                    :class="{'active-tab': tab === 'relationships'}"
                    @click="on_tab_select('relationships')"
                >
                    Relationships
                </v-btn>
                <!--      <v-btn-->
                <!--        small-->
                <!--        elevation="0"-->
                <!--                    class="btn-tab small-font"-->
                <!--                    :class="{'active-tab': tab === 'areas-served'}"-->
                <!--        @click="on_tab_select('areas-served')"-->
                <!--      >-->
                <!--        Areas Served-->
                <!--      </v-btn>-->
                <!-- <v-btn
                    small
                    elevation="0"
                    class="btn-tab small-font"
                    :class="{'active-tab': tab === 'projects'}"
                    @click="on_tab_select('projects')"
                >
                    Projects
                </v-btn> -->
                <v-btn
                    small
                    elevation="0"
                    class="btn-tab small-font"
                    :class="{'active-tab': tab === 'gallery'}"
                    @click="on_tab_select('gallery')"
                >
                    Gallery
                </v-btn>
                <v-btn
                    small
                    elevation="0"
                    class="btn-tab small-font"
                    :class="{'active-tab': tab === 'esg'}"
                    @click="on_tab_select('esg')"
                >
                    ESG
                </v-btn>
                <!--      <v-btn-->
                <!--        small-->
                <!--        elevation="0"-->
                <!--                    class="btn-tab small-font"-->
                <!--                    :class="{'active-tab': tab === 'manufacturers'}"-->
                <!--        @click="on_tab_select('manufacturers')"-->
                <!--      >-->
                <!--        Manufacturers-->
                <!--      </v-btn>-->
            </div>
        </div>

        <div v-if="tab === 'overview'" class="tab-content rounded-lg">
            <overview
                v-if="edit === false"
                :company="company"
                :organization="organization"
                :organization_type="organization_type"
                :trade_type_categories="trade_type_categories"
                @tab_change="on_tab_select"
                @set_edit="set_edit"
                class="fade-in"
            />
            <edit-overview
                v-else
                @set_edit="set_edit"
                @tab_change="on_tab_select"
                :company="company"
                :organization="organization"
                class="fade-in"
            />
        </div>
        <div v-if="tab === 'prequal'" class="tab-content rounded-lg">
            <prequal
                v-if="edit === false"
                :company="company"
                :organization="organization"
                @tab_change="on_tab_select"
                @set_edit="set_edit"
            />
            <edit-prequal v-else @set_edit="set_edit"/>
        </div>
        <div
            v-else-if="tab === 'locations'"
            id="locations"
            class="tab-content rounded-lg"
        >
            <locations
                v-if="edit === false"
                @set_edit="set_edit"
                @set_edit_location="set_edit_location"
                :locations="organization.office_locations"
                :organization="organization"
            />
            <edit-locations
                v-model="change_made"
                v-else
                @set_edit="set_edit"
                :locations="organization.office_locations"
                :selected_location="selected_location"
                :org_id="organization.id"
                :organization_type="organization.organization_type.name"
                ref="editLocation"
            />
        </div>
        <div
            v-else-if="tab === 'employees'"
            id="employees"
            :organization="organization"
            class="tab-content rounded-lg"
        >
            <employees @set_edit="set_edit" v-if="edit === false"/>
            <edit-employees
                v-else
                @set_edit="set_edit"
                :domain="organization.domain_name"
            />
        </div>
        <div
            v-else-if="tab === 'relationships'"
            id="relationships"
            class="tab-content rounded-lg"
        >
            <relationships
                v-if="edit === false"
                @set_edit="set_edit"
                @set_edit_add_relation="set_edit_add_relation"
                :organization="organization"
            />
            <edit-relationships
                v-else
                @set_edit="set_edit"
                :add_relation="add_relation"
                :organization="organization"
            />
        </div>
        <!--    <div-->
        <!--      v-else-if="tab === 'areas-served'"-->
        <!--      id="areas-served"-->
        <!--      class="tab-content rounded-lg"-->
        <!--    >-->
        <!--      <areas-served />-->
        <!--    </div>-->
        <!-- <div
            v-else-if="tab === 'projects'"
            id="projects"
            class="tab-content rounded-lg"
        >
            <projects/>
        </div> -->
        <div
            v-else-if="tab === 'gallery'"
            id="gallery"
            class="tab-content rounded-lg"
        >
            <gallery
              v-if="edit === false"
              @set_edit="set_edit"
              :organization="organization"
            />
            <edit-gallery
              v-else
              @set_edit="set_edit"
              :organization="organization"
            />
        </div>
        <!--    <div-->
        <!--      v-else-if="tab === 'manufacturers'"-->
        <!--      id="manufacturers"-->
        <!--      class="tab-content white rounded-lg"-->
        <!--    >-->
        <!--      <manufacturers />-->
        <!--    </div>-->
        <confirm-leave-page-dialog
            v-model="show_leave_dialog"
            @on_secondary_action="no_save_and_continue"
            @on_action="save_and_continue"
            title="There is Unsaved Data"
            msg="You have entered new information and haven't saved. Do you want to save or continue without saving?"
            action_btn_text="Save"
            cancel_btn_text="Continue, without Saving"
            :loading="saving"
        />
    </v-container>
</template>

<script>
    import organization_photo from "../../assets/images/category_images/subcontractor/Glazing.png"
    // import Manufacturers from "./tabs/Manufacturers.vue";
    // import AreasServed from "./tabs/AreasServed.vue";
    import Relationships from "./tabs/relationships/Relationships.vue"
    import Employees from "./tabs/employees/Employees.vue"
    import Gallery from "./tabs/Gallery.vue"
    import Locations from "./tabs/Locations.vue"
    import Overview from "./tabs/Overview.vue"
    import Prequal from "./tabs/pre-qual/PreQual"
    import Projects from "./tabs/Projects.vue"
    import EditOverview from "./edit-states/overview/EditOverview.vue"
    import EditLocations from "./edit-states/locations/EditLocations.vue"
    import EditEmployees from "./edit-states/EditEmployees.vue"
    import EditGallery from "./edit-states/EditGallery.vue"
    import EditPrequal from "./edit-states/EditPreQual"
    import EditRelationships from "./edit-states/relationships/EditRelationships.vue"
    import InviteToBidDialog from "./InviteToBidDialog.vue"
    import ClaimThisPageDialog from "./ClaimThisPageDialog"
    import ConfirmLeavePageDialog from "../ui/ConfirmLeavePageDialog.vue"
    import { mapState } from "vuex"

    export default {
        components: {
            Prequal,
            Overview,
            Locations,
            Employees,
            // AreasServed,
            Relationships,
            // Manufacturers,
            Gallery,
            // Projects,
            // Edit states
            EditOverview,
            EditPrequal,
            EditLocations,
            EditEmployees,
            EditGallery,
            EditRelationships,
            InviteToBidDialog,
            ClaimThisPageDialog,
            ConfirmLeavePageDialog,
        },
        name: "Profile",
        props: {
            company: Object,
        },
        data() {
            return {
                tab: "overview",
                edit: false,
                loading: false,
                saving: false,
                organization_photo: organization_photo,
                show_dialog: false,
                change_made: false,
                tab_queue: '',
                show_leave_dialog: false,
                add_relation: false,
                selected_location: -1,
                claimed: false,
            }
        },
        watch: {
            change_made() {
                this.$emit('input', this.change_made)
            }
        },
        computed: {
            ...mapState({
                organization: state => state.organizations.current
            }),
            is_users_parent_org() {
                if (this.$auth.user){
                    return this.$auth.user.primary_office_location?.organization === this.organization.id
                }
                else{
                    return false
                }
            },
            organization_type() {
                return this.organization?.office_locations.find(({ office_type }) => office_type === "Headquarters")?.categories[0]
                    ?.supercategory?.supercategory.name
            },
            trade_type_categories() {
                let category_obj = {}
                this.organization.office_locations.forEach((location) =>
                    location.categories.forEach((category) => {
                        if (!category_obj[category.supercategory.name]) {
                            category_obj[category.supercategory.name] = {}
                        }
                        category_obj[category.supercategory.name][category.name] = 1
                        // } else {
                        //     category_obj[category.supercategory.name] = {}
                        // }
                    })
                )
                return category_obj
            },

        },
        async mounted() {
            this.loading = true
            if (this.$route.params.uid) {
                await this.$store.dispatch(
                    "organizations/get_current",
                    this.$route.params.uid
                )
            }
            if (this.$route.query.edit) {
                this.on_tab_select(this.$route.query.edit)
            }
            this.loading = false
        },
        methods: {
             onClaimed (value) {
                        this.claimed = value
                },
            on_tab_select(tab) {
                if (!this.change_made) {
                    this.tab = tab
                } else {
                    this.tab_queue = tab
                    this.show_leave_dialog = true
                }
            },
            set_edit(edit) {
                this.edit = edit
                if (!edit) {
                    this.add_relation = edit
                }
            },
            set_edit_location(id) {
                this.selected_location = id
            },
            set_edit_add_relation(edit) {
                this.add_relation = true
                this.set_edit(edit)
            },
            no_save_and_continue() {
                this.show_leave_dialog = false
                this.change_made = false
                this.on_tab_select(this.tab_queue)
                this.tab_queue = null
            },
            async save_and_continue(header_change=false) {
                this.change_made = false
                try {
                    this.saving = true
                    let res = await this.$refs.editLocation.save_office_location()
                    this.saving = false
                    this.show_leave_dialog = false
                    if (res) {
                        if (!header_change) {
                            this.on_tab_select(this.tab_queue)
                            this.tab_queue = null
                        } else {
                            return res
                        }
                    } else {
                        throw ('Error Occured')
                    }
                } catch(error) {
                    console.log(error)
                }
            },

        },
    }
</script>
<style lang="stylus" scoped>
    .btn-cont
        height 29px
    .btn-tab
        margin-right 4px
        border-radius 5px 5px 0 0
        background transparent !important
        height 100% !important
        font-weight 100
    .active-tab
        background white !important
        font-weight 600 !important
    .profile-img {
        position: absolute;
        background: white;
        left: 50px;
        top: 0;
        height: 150px;
        width: 150px;
        box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
    }
    .profile-header {
        font-family: Lato;
        min-height: 83px;
    }
    .profile-type {
        height: 48px;
        min-width: 175px;
        border: 1px solid var(--v-border-grey-base);
        background: white;
        justify-content: space-between;
    }
    .tab-container {
        display: flex;
        flex-direction: column;
        padding-left: 235px;
    }
    .tab-content {
        border: 1px solid var(--v-border-grey-base);
        background: white;
        margin-bottom: 60px;
        padding-bottom: 60px;
        box-shadow: 6px 6px 54px rgba(0, 0, 0, 0.1);
    }
</style>
