<template>
    <v-app>

        <Header v-if="(logged_in && (!$route.fullPath.includes('registration') || !is_admin))"/>
        <header-logged-out v-else-if="(!logged_in && (!$route.fullPath.includes('registration') && !$route.fullPath.includes('login') && !is_admin))"/>
        <!-- Sizes your content based upon application components -->
        <v-main>
            <!-- Provides the application the proper gutter -->
            <v-container fluid class="fill-height align-start pa-0 main-background">
               <registration-header :is_registered="is_registered"/>
                <nuxt class="content"/>
            </v-container>
        </v-main>
        <snack-bar/>

    </v-app>
</template>

<script>
    import Header from "../components/header/Header"
    import SnackBar from "../components/ui/SnackBar"
    import RegistrationHeader from "@/components/header/RegistrationHeader"
    import HeaderLoggedOut from '../components/header/HeaderLoggedOut'

    export default {
        components: { RegistrationHeader, Header, SnackBar, HeaderLoggedOut },
        data() {
            return {
                is_registered: false
            }
        },
        computed: {
            logged_in() {
                return this.$auth.loggedIn
            },
            is_admin() {
                return this.$auth.user?.email
            }
        },
        watch: {
            logged_in() {
                this.check_if_registered()

            }
        },
        mounted() {
            this.check_if_registered()
        },
        methods: {
            async check_if_registered() {
                // this method allows users to continue where they left off in the registration process upon logging in.
                const user = this.$auth.user
                if (this.is_admin){
                    this.is_registered = true
                    return
                }
                if (!user) return
                if (!user.first_name || !user.last_name) {
                    if (!this.$route.fullPath.includes('registration')) {
                        // setTimeout allows us to "override" the auto-redirect that comes with nuxt auth login process
                        setTimeout(async () => {
                            await this.$router.push('/registration/add-name')
                        })
                    }
                    this.is_registered = false
                } else if (user.primary_office_location === null) {
                    if (!this.$route.fullPath.includes('registration')) {
                        setTimeout(async () => {
                            await this.$router.push('/registration/workplace')
                        })
                    }
                    this.is_registered = false
                } else if (user.primary_office_location) {
                    const res = await this.$store.dispatch('organizations/get_current', this.$auth.user.primary_office_location.organization)
                    if (!res.categories.length) {
                        if (!this.$route.fullPath.includes('registration')) {
                            setTimeout(async () => {
                                await this.$router.push('/registration/categories')
                            })
                        }
                        this.is_registered = false
                    } else {
                        this.is_registered = true
                    }
                } else {
                    this.is_registered = true
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '../assets/overrides.styl' // this applies our overrides AFTER vuetify styles

    .content
        width 100%


</style>

