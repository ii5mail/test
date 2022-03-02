<template>
    <v-container>
        <v-row>
            <v-col cols="5">
                <div class="d-flex">
                    <img
                        class="mr-4 rounded"
                        v-if="notification.logo"
                        :src="notification.logo"
                        alt="item image"
                        width="64px"
                        height="64px"
                    />
                    <div
                        v-else
                        class="empty-logo mr-4"
                    >
                        {{ notification.name[0] }}
                    </div>
                    <div>
                        <h5 class="xs-font medium-weight">{{ notification.name }}</h5>
                        <p class="xs-font light-weight mb-0">{{ notification.city_state }}</p>
                        <p class="xs-font light-weight mb-0">{{ notification.domain }}</p>
                    </div>
                </div>
            </v-col>
            <v-col cols="7">
                <div class="d-flex">
                    <v-avatar class="mr-4">
                        <img :src="notification.portrait || profile_photo" alt="User Profile"/>
                    </v-avatar>
                    <div>
                        <h5 class="xs-font medium-weight mb-0">Bid Invitation from</h5>
                        <h5 class="xs-font medium-weight">{{ notification.sender_name }} of {{ notification.name }}:</h5>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h5 class="xs-font medium-weight mb-2">For:</h5>
                <p v-for="(location, location_index) in notification.office_location" :key="location_index" class="xs-font light-weight mb-0">{{ location }}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="5">
                <h5 class="xs-font medium-weight">Project Name:</h5>
                <p class="xs-font light-weight mb-0">{{ notification.project_name }}</p>
            </v-col>
            <v-col cols="7">
                <h5 class="xs-font medium-weight">Project Address:</h5>
                <p class="xs-font light-weight mb-0">{{ notification.project_address }}</p>
            </v-col>
        </v-row>
        <v-row class="mb-4">
            <v-col>
                <h5 class="xs-font medium-weight">Project Description:</h5>
                <p class="xs-font light-weight mb-0">{{ notification.project_description }}</p>
            </v-col>
        </v-row>
        <v-row class="mb-0">
            <v-col cols="5" class="pb-0">
                <div class="d-flex">
                    <h5 class="xs-font medium-weight mr-2">Subcontractor Due Date:</h5>
                    <p class="xs-font light-weight">{{ notification.subcontractor_due_date }}</p>
                </div>
            </v-col>
            <v-col cols="7" class="pb-0">
                <h5 class="xs-font medium-weight">Project Documents:</h5>
                <router-link to="/" class="xs-font">View More Info</router-link>
            </v-col>
        </v-row>
        <v-row class="my-0">
            <v-col class="py-0">
                <h5 class="xs-font medium-weight">Primary Point of Contact:</h5>
                <router-link to="/" class="xs-font">View More Info</router-link>
            </v-col>
        </v-row>
        <v-row class="mb-3 mt-0 ml-2">
            <v-col cols="6" offset="5">
                <v-row>
                    <v-btn
                        color="primary"
                        :ripple="false"
                        depressed
                        height="30px"
                        class="xs-font medium-weight mr-3 mt-3"
                        @click="notification_action(notification.notification_type, notification.id, 'Approved')"
                    >
                        View More Info
                    </v-btn>
                    <v-btn
                        color="primary"
                        :ripple="false"
                        outlined
                        height="30px"
                        width="75px"
                        class="xs-font medium-weight mt-3"
                        @click="notification_action(notification.notification_type, notification.id, 'Approved')"
                    >
                        Ignore
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import profile_photo from "../../assets/images/stock-profile-img.png"
    import { mapState } from "vuex"
    import { webmails } from '../registration/reg1/utils'

    export default {
        components: {
        },
        name: "NotificationsList",
        props: {
            notification: Object,
        },
        data() {
            return {
                loading: false,
                filter: 'Most Recent',
                filter_options: ['Most Recent'],
                profile_photo,
                show_delete_dialog: false,
                company_name: '',
                form: {},
                office_location_options: [],
                selected_location: {},
                file: null,
                img_url: null,
                photo_data: null,
                show_image_cropper: false,
                errors: { headquarters: {} },
                first_name: '',
                last_name: '',
                title: '',
                webmail_user: false
            }
        },
        computed: {
            ...mapState({
                user: state => state.account.user
            }),
            all_notifications() {
                return [...this.relationship_requests, ...this.bid_invitations, ...this.employee_confirmations]
            },
            filtered_notifications() {
                return this.tab !== 'All' ? this.all_notifications.filter((notification) => notification.notification_type === this.tab) : this.all_notifications
            }
        },
        async mounted() {
            this.loading = true;
            //backend load notifications
            //     const userNotifications = await this.$store.dispatch(
            //         "account/get_user"
            //     );
            //     this.bid_invitations = userNotifications.bid_invitations;
            //     this.relationship_requests = userNotifications.relationship_requests;
            //     this.employee_confirmations = userNotifications.employee_confirmations;
            // this.check_for_webmail();
            this.loading = false;
        },
        methods: {
            scroll_to_form() {
                const el = this.$refs.top_of_form

                if (el) {
                    // Use el.scrollIntoView() to instantly scroll to the element
                    el.scrollIntoView({ behavior: 'smooth' })
                }
            },
            check_for_webmail() {
                webmails.forEach((domain) => {
                    if (this.user.email.includes(domain)) {
                        this.webmail_user = true;
                    }
                })
            },
            async notification_action(notification_type, id, status) {
                if (notification_type === 'Relationship Requests') {
                    await this.$store.dispatch("account/patch_relationship_notifications", { status, id })
                } else if (notification_type === 'Invitations to Bid') {
                    await this.$store.dispatch("account/patch_bid_invitations", { status, id })
                } else if (notification_type === 'Employee Confirmations') {
                    await this.$store.dispatch("account/patch_employee_confirmations", { status, id })
                }
            },
            async save_edits() {
                // this.saving = true;
                // if (this.selected_location.id) {
                //   this.form.primary_office_location = this.selected_location.id;
                // }
                // const payload = { ...this.form };
                // try {
                //     await this.patch_new_profile_pic()
                //     await this.$store.dispatch('account/patch_user', payload)
                //     this.$snackbar.show_message({ content: "User information updated!", type: 'success' })
                // } catch(e) {
                //     const errors = typeof e.data === "string" ? { detail: "Error Occurred" } : e.data
                //     this.scroll_to_form()
                //     this.errors = errors
                // }
                // this.saving = false;
            }
        },
    }
</script>

<style lang="stylus" scoped>

    .filter
        max-width 200px

    .empty-logo
        color var(--v-grey-darken1)
        display flex
        align-items center
        justify-content center
        width 60px
        height 60px
        font-size 36px
        font-weight $heavy-weight
        background var(--v-light-blue-grey-base)
        border-radius 4px

    // .image-sub-container
    //     position relative
    //     transition .1s
    //     height: 150px;
    //     width: 150px;
    //     box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
    //     cursor pointer

    //     &:hover
    //         opacity .7

    //     &:active
    //         opacity .5

</style>