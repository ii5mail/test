<template>
    <v-app-bar class="elevation-0 white" app height="78px">
        <nuxt-link to="/" class="d-flex">
            <img
                rel="preload"
                alt="Construction Bevy Logo"
                class="cb-logo mx-10"
                width="200px"
                height="40px"
                src="~/assets/images/logos/blue-logo.png"
            />
        </nuxt-link>
        <v-btn
            color="#838B95"
            outlined
            class="d-none d-md-flex light-weight small-font px-4 ml-4"
            to="/?type=General%20Contractor"
        >
            Find a GC
        </v-btn>
        <v-btn
            color="#838B95"
            outlined
            class="d-none d-md-flex light-weight small-font px-4 ml-4"
            to="/?type=Trade%20Partner"
        >
            Find a Trade Partner
        </v-btn>

        <div class="nav-profile">
            <!--            <v-btn class="profile-status mr-2 xxs-font light-weight px-2" depressed color="primary">Profile 80%-->
            <!--                complete-->
            <!--            </v-btn>-->
            <v-btn
                text
                class="light-weight primary-text--text xs-font px-8 py-3 mr-4"
            >
                Beta Release Notes 
            </v-btn>
            <v-btn
                text
                class="light-weight primary-text--text xs-font px-8 py-3 mr-4"
                to="/notifications"
            >
                Notifications<span v-if="notification_count_stub" class="notification red ml-1">{{ notification_count_stub > 99 ? '99+' : notification_count_stub }}</span>
            </v-btn>
            <div class="mr-3 medium-weight xs-font" v-if="!not_logged_in">{{ user.first_name }}</div>
            <v-btn
                v-else
                text
                class="xs-font mr-2"
                small
                to="/"
            >
                Login
            </v-btn>
            <v-avatar class="mr-4">
                <img :src="user.portrait || profile_photo" alt="User Profile"/>
            </v-avatar>
            <v-menu right auto offset-y dense min-width="120px" v-if="!not_logged_in">
                <template v-slot:activator="{ on }">
                    <v-btn icon outlined x-small v-on="on" class="drop-down mr-10">
                        <v-icon x-small>$vuetify.icons.chevron_down</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item-group>
                        <v-list-item class="d-md-none" :to="`/`">
                            <v-list-item-title class="text-center">
                                <v-icon>$vuetify.icons.house</v-icon>
                                Home
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item :to="`/profile/${organization_id}`">
                            <v-list-item-title class="text-center">
                                <v-icon>mdi-circle-edit-outline</v-icon>
                                Manage My Company
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item :to="`/settings/${user.id}`">
                            <v-list-item-title class="text-center">
                                <v-icon>$vuetify.icons.settings</v-icon>
                                My Account
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="logout">
                            <v-list-item-title class="text-center">
                                <v-icon color="black">mdi-logout</v-icon>
                                Sign Out
                            </v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-menu>
        </div>
    </v-app-bar>
</template>

<script>
    import profile_photo from "../../assets/images/stock-profile-img.png"
    import { mapState } from "vuex"

    export default {
        name: "Navbar",
        components: {
        },
        props: {
            not_logged_in: Boolean
        },
        data: () => ({
            profile_photo,
            notification_count_stub: 6,
        }),
        computed: {
            ...mapState({
                notification_count: state => state.account.notification_count
            }),
            user() {
                return this.$auth.user || {}
            },
            organization_id() {
                return this.user.primary_office_location?.organization
            }
        },
        async mounted() {
            await this.$store.dispatch("account/get_user")
            this.$store.commit("account/reset_notification_count")
            await this.$store.dispatch("account/get_relationship_notifications")
            // await this.$store.dispatch("account/get_bid_invitations")
            // await this.$store.dispatch("account/get_employee_confirmations")
        },
        methods: {
            async logout() {
                await this.$auth.logout()
                await this.$router.push('/login')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    >>> .v-toolbar__content
        overflow-x auto
        overflow-y hidden

    .v-app-bar {
        border-bottom: 1px solid var(--v-grey-lighten3) !important;
    }

    .v-avatar {
        border: 1px solid var(--v-primary-base);
        width: 44px !important;
        height: 44px !important;
        min-width: 44px !important;
    }

    .v-list-item__title {
        text-align: left !important;
    }

    .nav-profile {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        flex: 1;
    }

    .profile-status {
        height: 22px !important;
        border-radius: 5px;
    }

    .theme--light.v-btn--active::before
        opacity 0

    .notification
        color white
        height 18px
        min-width 18px
        font-size 11px
        line-height 18px
        border-radius 9px
        padding-left 6px
        padding-right 6px

    @media only screen and (max-width: 600px)
        .cb-logo
            max-width 70%
            margin-left 0 !important

        .drop-down
            margin-right 0 !important
</style>
