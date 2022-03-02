<template>
    <!-- <v-app-bar class="elevation-0 white" app :height="bar_height"> -->
    <v-app-bar class="elevation-0 white" app height="78">
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
        <div class="nav-profile">
            <v-btn
                text
                large
                class="d-none d-sm-flex light-weight primary-text--text xs-font px-8 mr-4"
            >
                Beta Release Notes
            </v-btn>
            <v-btn
                text
                large
                class="d-none d-sm-flex light-weight primary-text--text xs-font px-8 mr-4"
            >
                How It Works
            </v-btn>
            <v-btn
                text
                large
                class="d-none d-sm-flex light-weight primary-text--text xs-font px-8 mr-4"
                to="/login"
            >
                Sign In
            </v-btn>
            <v-btn
                text
                outlined
                large
                class="d-none d-sm-flex primary-text white--text px-8 mr-4"
                to="/registration/email-entry"
            >
                Sign Up
            </v-btn>
            <v-menu
                right
                auto
                offset-y
                dense
                min-width="120px"
                class="d-flex d-sm-none mr-12"
            >
                <template v-slot:activator="{ on }">
                    <!-- <v-btn
                        v-on="on"
                    > -->
                        <v-app-bar-nav-icon
                            v-on="on"
                            class="d-flex d-sm-none"
                        >
                        </v-app-bar-nav-icon>
                    <!-- </v-btn> -->
                </template>
                <v-list>
                    <v-list-item-group>
                        <v-list-item class="">
                            <v-list-item-title class="text-center small-font">
                                Beta Release Notes
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item to="/info/general-contractor">
                            <v-list-item-title class="text-center small-font">
                                How It Works
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item to="/login">
                            <v-list-item-title class="text-center small-font">
                                Sign In
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item to="/registration/email-entry">
                            <v-list-item-title class="text-center small-font">
                                Sign Up
                            </v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-menu>
        </div>
    </v-app-bar>
</template>

<script>

    export default {
        name: "Navbar",
        components: {
        },
        props: {
            not_logged_in: Boolean
        },
        data: () => ({
        }),
        computed: {
            user() {
                return this.$auth.user || {}
            },
            organization_id() {
                return this.user.primary_office_location?.organization
            },
            // bar_height() {
            //     return screen.width < '600px' ? '58px' : '78px'
            // }
        },
        async mounted() {
            await this.$store.dispatch("account/get_user")
        },
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

    .v-list-item {
        min-height: 38px;
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

    @media only screen and (max-width: 600px)
        .cb-logo
            max-width 70%
            margin-left 0 !important


</style>
