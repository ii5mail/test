<template>
    <div class="grid">
        <v-card class="menu my-16 ml-16 px-4 pt-10 pb-16">
            <v-btn
                depressed
                block
                :ripple="false"
                class="menu-btn white small-font font-weight-regular fill-width mb-3"
                :class="{'active-tab': tab === 'Your Profile'}"
                @click="on_tab_select('Your Profile')"
            >
                Your Profile
            </v-btn>
            <v-btn
                depressed
                block
                :ripple="false"
                class="menu-btn white small-font font-weight-regular fill-width"
                :class="{'active-tab': tab === 'Reset Password'}"
                @click="on_tab_select('Reset Password')"
            >
                Reset Password
            </v-btn>

        </v-card>
        <v-card v-if="tab === 'Your Profile'" class="mr-16 ml-10 my-16 pt-12 pb-16 px-12">
            <your-profile />
        </v-card>
        <v-card v-if="tab === 'Reset Password'" class="mr-16 ml-10 my-16 pt-12 pb-16 px-12">
            <reset-password @on_profile_click="to_profile" />
        </v-card>


    </div>
</template>

<script>
    import ResetPassword from "./ResetPassword.vue"
    import YourProfile from "./YourProfile.vue"

    export default {
        components: {
            ResetPassword,
            YourProfile,
        },
        name: "Settings",
        data() {
            return {
                tab: "Your Profile",
            }
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
        max-height 200px

    .menu-btn
        justify-content start
        height 32px !important

    .active-tab
        background #2480EB !important
        color white

</style>
