<template>
    <div class="mt-12 pr-6" :class="{ 'mx-12': !editMode }">
        <v-row class="align-center justify-space-between d-flex mb-1" :class="{ 'pl-3': editMode }">
            <v-col cols="9">
                <v-row v-if="!editMode">
                    <v-icon class="mx-2">$vuetify.icons.people</v-icon>
                    <div class="medium-font">Employees</div>
                    <div class="ml-3" v-if="is_users_parent_org">
                        <v-btn
                            class="xs-font px-2 primary"
                            @click="on_edit_select"
                            text
                            medium
                        >
                            <v-icon size="20" class="ml-0">
                                mdi-plus
                            </v-icon>
                            Add New
                        </v-btn>
                    </div>
                </v-row>
                <v-row v-else>
                    <div class="font-18">Current Employees ({{ number_of_employees }})</div>
                </v-row>
            </v-col>
            <v-col cols="3">
                <cb-select-small
                    v-model="filter"
                    placeholder="Select"
                    :items="filter_options"
                    :menu-props="{ bottom: true, offsetY: true }"
                    hide-details
                />
            </v-col>
        </v-row>
        <v-container v-if="loading" class="d-flex align-center justify-center py-16">
            <v-progress-circular indeterminate color="primary"/>
        </v-container>
        <v-row v-else class="grid-offset">
            <v-card v-for="(employee, index) in filtered_employees" :key="index" class="employee d-flex align-center ma-3 pa-3 relative">
                <img
                    :src="employee_pic(employee)"
                    class="light-blue-grey mr-3"
                />
                <div class="d-flex flex-column">
                    <div class="font-18">{{ employee.first_name }} {{ employee.last_name }}</div>
                    <div class="xs-font grey--text text--darken-1 body-3">{{ employee.title }}</div>
                    <div class="xs-font grey--text text--darken-1 body-3">{{ employee.primary_office_location.city }}, {{ employee.primary_office_location.state }}</div>
                </div>
            </v-card>
        </v-row>
    </div>
</template>

<script>
    import ProfileToolbar from "../../../ui/ProfileToolbar.vue"
    import CbSelectSmall from "@/components/ui/CbSelectSmall"
    import defaultProfilePic from  "../../../../assets/images/stock_employee_photo.png"
    import { mapState } from "vuex"

    export default {
        components: { CbSelectSmall, ProfileToolbar },
        name: "EmployeeList",
        props: {
            organization: Object,
            editMode: Boolean,
        },
        data: () => ({
            employees: [],
            default_profile_pic: defaultProfilePic,
            filter: 'All Locations',
            loading: false,
        }),
        computed: {
            is_users_parent_org() {
                return this.$auth.user.primary_office_location?.organization === this.organization.id
            },
            filter_options() {
                return ['All Locations', ...this.employees.map(employee => employee.primary_office_location.city + ', ' + employee.primary_office_location.state)];
            },
            filtered_employees() {
                let filteredEmployees = [];
                if (this.filter === 'All Locations') {
                    filteredEmployees = this.employees;
                } else {
                    filteredEmployees = this.employees.filter(x => x.primary_office_location.city + ', ' + x.primary_office_location.state === this.filter);
                }
                return filteredEmployees;
            },
            number_of_employees() {
                return this.employees.length;
            }
        },
        async mounted(){
            this.loading = true;
            try {
                const res = await this.$axios.get('api/users/', {params: {org_id: this.$route.params.uid}})
                this.employees = res.data.results;
            } catch(e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
        methods: {
            on_edit_select() {
                this.$emit("set_edit", true);
            },
            employee_pic(employee) {
                return employee.portrait || this.default_profile_pic;
            },
            employee_pic(employee) {
                return employee.portrait || this.default_profile_pic;
            },
        },
    }
</script>

<style lang="stylus" scoped>

    .subtitle
        margin-top -6px

    .title
        margin-top -3px

    .employee
        border 1px solid var(--v-light-purple-base)
        flex: 1 30%;
        border-radius 4px

        img
            border-radius 4px
            height 60px
            width 60px

    .grid-offset
        display grid
        grid-template-columns repeat(auto-fill, minmax(300px, 1fr))
        grid-template-rows auto

</style>
