<template>
    <v-app-bar app class="pa-0 elevation-0" v-if="route_matches()" hide-on-scroll>
        <confirm-dialog
            v-model="show_back_dialog"
            @on_action="back_to_login"
            title="Go to login?"
            msg="Are you sure you want to abandon this registration session?"
            action_btn_text="Yes"
            cancel_btn_text="Cancel"
        />
        <v-btn
            v-if="!is_registered && route_matches() && !$route.fullPath.includes('login')"
            text
            class="grey--text small-font pa-0 pr-2"
            small
            @click="$route.fullPath.includes('registration') ? show_back_dialog = true : back_to_login()"
        >
            <v-icon class="ma-0">chevron_left</v-icon>
            Back to login
        </v-btn>
        <v-spacer/>
        <div v-if="!is_registered && route_matches()"
             class="primary-text--text help-msg  small-font">
            Having Trouble? <a href="#" class="ml-2 heavy-weight primary-text--text">Get Help Here</a>
        </div>
    </v-app-bar>
</template>

<script>
    import ConfirmDialog from "@/components/ui/ConfirmDialog"

    export default {
        components: { ConfirmDialog },
        props: ['is_registered'],
        data: () => ({
            show_back_dialog: false
        }),
        methods: {
            route_matches(){
                // add routes that you want to show this header
                return this.$route.fullPath.includes('registration') ||
                    this.$route.fullPath.includes('password-reset') ||
                    (this.$route.fullPath.includes('login') && !this.$auth.loggedIn)
            },
            async back_to_login() {
                await this.$auth.logout()
                await this.$router.push('/login')
            },
        }
    }
</script>
<style lang="stylus" scoped>
    .help-msg
        opacity .4
        display flex
        justify-content flex-end
        width 100%
        a
            text-decoration none
</style>
