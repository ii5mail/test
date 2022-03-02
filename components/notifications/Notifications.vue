<template>
    <div class="grid">
        <v-card class="menu my-16 ml-16 px-4 pt-10 pb-16">
            <v-btn
                depressed
                block
                :ripple="false"
                class="menu-btn white small-font font-weight-regular fill-width mb-3"
                :class="{'active-tab': tab === 'All'}"
                @click="on_tab_select('All')"
            >
                All<span v-if="all_notifications_count" class="notification red ml-1">{{ all_notifications_count > 99 ? '99+' : all_notifications_count }}</span>
            </v-btn>
            <v-btn
                depressed
                block
                :ripple="false"
                class="menu-btn white small-font font-weight-regular fill-width mb-3"
                :class="{'active-tab': tab === 'Invitations to Bid'}"
                @click="on_tab_select('Invitations to Bid')"
            >
                Invitations to Bid<span v-if="bid_invitations.length" class="notification red ml-1">{{ bid_invitations.length > 99 ? '99+' : bid_invitations.length }}</span>
            </v-btn>
            <v-btn
                depressed
                block
                :ripple="false"
                class="menu-btn white small-font font-weight-regular fill-width mb-3"
                :class="{'active-tab': tab === 'Relationship Requests'}"
                @click="on_tab_select('Relationship Requests')"
            >
                Relationship Requests<span v-if="relationship_requests.length" class="notification red ml-1">{{ relationship_requests.length > 99 ? '99+' : relationship_requests.length }}</span>
            </v-btn>
            <v-btn
                depressed
                block
                :ripple="false"
                class="menu-btn white small-font font-weight-regular fill-width mb-3"
                :class="{'active-tab': tab === 'Employee Confirmation'}"
                @click="on_tab_select('Employee Confirmations')"
            >
                Employee Confirmation<span v-if="employee_confirmations.length" class="notification red ml-1">{{ employee_confirmations.length > 99 ? '99+' : employee_confirmations.length }}</span>
            </v-btn>
        </v-card>
        <v-card class="mr-16 ml-10 my-16 pt-12 pb-16 px-12">
            <notifications-list
                :tab="tab"
                :relationship_requests="relationship_requests"
                :bid_invitations="bid_invitations"
                :employee_confirmations="employee_confirmations"
            />
        </v-card>
    </div>
</template>

<script>
    import NotificationsList from "./NotificationsList.vue"
    import { mapState } from "vuex"

    export default {
        components: {
            NotificationsList,
        },
        name: "Notifications",
        data() {
            return {
                tab: "All",
                relationship_requests: [
                    {
                        id: 2232,
                        notification_type: 'Relationship Requests',
                        logo: '',
                        portrait: '',
                        sender_name: 'Joseph Lio',
                        city_state: 'Los Angeles, CA',
                        domain: 'constructionbevy.com',
                        name: 'Kiewit',
                        office_location: ['3838 Green Industrial Way, Atlanta, GA 30341', '3333 S Hobart Blvd, Los Angeles, CA 900020'],
                        organization: 2,
                        all_locations: false,
                        created_by: 3,
                        replied_by: 1,
                        created_when: '',
                        status: 'Open',
                        message: 'We manufacture and distribute a diverse range of superior building materials and products, which are used extensively in construction projects of all sizes, all across the world.'
                    },
                    {
                        id: 2234,
                        notification_type: 'Relationship Requests',
                        logo: '',
                        portrait: '',
                        sender_name: 'Joseph Lio',
                        city_state: 'Los Angeles, CA',
                        domain: 'constructionbevy.com',
                        name: 'Turner',
                        office_location: ['3838 Green Industrial Way, Atlanta, GA 30341'],
                        organization: 2,
                        all_locations: false,
                        created_by: 3,
                        replied_by: 1,
                        created_when: '',
                        status: 'Open',
                        message: 'We manufacture and distribute a diverse range of superior building materials and products, which are used extensively in construction projects of all sizes, all across the world.'
                    },
                ],
                bid_invitations: [
                    {
                        id: 123,
                        notification_type: 'Invitations to Bid',
                        logo: '',
                        portrait: '',
                        sender_name: 'Joseph Lio',
                        city_state: 'Los Angeles, CA',
                        domain: 'constructionbevy.com',
                        name: 'Kiewit',
                        office_location: ['3838 Green Industrial Way, Atlanta, GA 30341', '3333 S Hobart Blvd, Los Angeles, CA 900020'],
                        organization: 2,
                        all_locations: false,
                        created_by: 3,
                        replied_by: 1,
                        created_when: '',
                        status: 'Open',
                        project_name: 'Benchmark West Alex',
                        project_address: '3444 Avocado Hill Way, Alexandria, VA 22302',
                        project_description: 'The Project consists of the new construction of a 9 story with penthouse assisted living / memory care facility (consisting of 115 units over approx. 119,803 sf).  The building will sit on an existing two-level garage.  Garage works consists of structural enhancements / lobby / support rooms.  Structure is concrete with brick, metal panel, glass and fiber cement.  Project also includes associated sitework / offsite work and infrastructure.  Taxes are to be included – payment and performance bond should be priced as an alternate.  No wage scale.  Start of Construction is March 2022',
                        subcontractor_due_date: '1/15/2022',
                    },
                ],
                employee_confirmations: [
                    {
                        id: 1,
                        notification_type: 'Employee Confirmations',
                        logo: '',
                        portrait: '',
                        sender_name: 'Joseph Lio',
                        city_state: 'Los Angeles, CA',
                        domain: 'constructionbevy.com',
                        name: 'ConstructionBevy',
                        office_location: ['3838 Green Industrial Way, Atlanta, GA 30341', '3333 S Hobart Blvd, Los Angeles, CA 900020'],
                        organization: 2,
                        all_locations: false,
                        created_by: 4,
                        replied_by: 1,
                        created_when: '',
                        status: 'Open',
                        message: 'We manufacture and distribute a diverse range of superior building materials and products, which are used extensively in construction projects of all sizes, all across the world.'
                    },
                    {
                        id: 2,
                        notification_type: 'Employee Confirmations',
                        logo: '',
                        portrait: '',
                        sender_name: 'Joseph Lio',
                        city_state: 'Los Angeles, CA',
                        domain: 'constructionbevy.com',
                        name: 'ConstructionBevy',
                        office_location: ['3838 Green Industrial Way, Atlanta, GA 30341', '3333 S Hobart Blvd, Los Angeles, CA 900020'],
                        organization: 2,
                        all_locations: false,
                        created_by: 5,
                        replied_by: 1,
                        created_when: '',
                        status: 'Open',
                        message: 'We manufacture and distribute a diverse range of superior building materials and products, which are used extensively in construction projects of all sizes, all across the world.'
                    },
                    {
                        id: 3,
                        notification_type: 'Employee Confirmations',
                        logo: '',
                        portrait: '',
                        sender_name: 'Joseph Lio',
                        city_state: 'Los Angeles, CA',
                        domain: 'constructionbevy.com',
                        name: 'ConstructionBevy',
                        office_location: ['3838 Green Industrial Way, Atlanta, GA 30341', '3333 S Hobart Blvd, Los Angeles, CA 900020'],
                        organization: 2,
                        all_locations: false,
                        created_by: 3,
                        replied_by: 1,
                        created_when: '',
                        status: 'Open',
                        message: 'We manufacture and distribute a diverse range of superior building materials and products, which are used extensively in construction projects of all sizes, all across the world.'
                    },
                ],
            }
        },
        computed: {
            ...mapState({
                all_notifications: state => state.account.all_notifications
            }),
            all_notifications_count() {
                return this.bid_invitations.length + this.relationship_requests.length + this.employee_confirmations.length
            }
        },
        async mounted() {
            const userNotifications = await this.$store.dispatch(
                "account/get_all_notifications"
            )
        },
        methods: {
            on_tab_select(tab) {
                this.tab = tab
            },
            to_profile() {
                this.tab = 'Your Profile'
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .grid
        display grid
        grid-template-columns 1fr minmax(600px, 75%)

    .menu
        max-height 280px

    .menu-btn
        justify-content start
        height 42px !important

    .active-tab
        background #2480EB !important
        color white

    .notification
        color white
        height 18px
        min-width 18px
        font-size 11px
        line-height 18px
        border-radius 9px
        padding-left 6px
        padding-right 6px

</style>
