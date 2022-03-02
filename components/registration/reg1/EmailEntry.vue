<template>
    <div class="fill-height">
        <account-sidebar/>
        <v-container fluid class="fill-height justify-center fade-in">
            <v-card class="transparent elevation-0" width="550px">
                <v-card-title class="pb-0">
                    <div class="display-1">Let's get started</div>
                </v-card-title>
                <v-form @submit.prevent="register_email" novalidate>
                    <v-card-text class="pb-0">
                        <div>
                            <p class="body-1">Please enter a valid work email address to sign up.
                                
                            </p>
                        </div>

                        <div>
                            <div>
                                <div class="caption primary-text--text">Email Address</div>
                                <cb-text-field
                                    v-model="email"
                                    autofocus
                                    outlined
                                    placeholder="Email Address"
                                    name="email"
                                    :error="!!errors.email"
                                    :error-messages="errors.email"
                                    type="text"
                                />
                            </div>
                            <form-error :msg="alert_errors"/>
                        </div>
                        <div v-if="show_existing_alert" class="warning-box pa-3 lh-18">
                            This email address is already in use.
                            <nuxt-link to="/login">Login here.</nuxt-link>
                        </div>
                        <div v-else-if="show_warning" class="warning-box pa-3 lh-18">
                            Webmail is ok, but you’ll not be associated with any business or collaborate with your
                            colleagues.
                        </div>
                    </v-card-text>
                    <v-card-actions class="px-4">
                        <v-container>

                            <v-row>
                                <v-col class="pa-0 d-flex justify-center flex-column">

                                    <div class="body-1 lh-18">
                                        By continuing to register, you agree to our
                                        <nuxt-link to="#">Terms of Service and Privacy Policy</nuxt-link>
                                    </div>
                                </v-col>
                                <v-col class="align-center justify-end d-flex pa-0" :cols="4">
                                    <v-btn
                                        type="submit"
                                        color="primary"
                                        width="135px"
                                        large
                                        :disabled="!email"
                                        depressed
                                        :loading="loading"
                                    >

                                        Continue
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-row class="mt-10">
                                Are you already registered?
                                <nuxt-link class="ml-2 heavy-weight" to="/login">Sign in Here</nuxt-link>
                            </v-row>
                        </v-container>
                    </v-card-actions>
                </v-form>

            </v-card>

        </v-container>

    </div>
</template>

<script>
    import AccountSidebar from "../../ui/AccountSidebar"
    import CbTextField from "../../ui/CbTextField"
    import FormError from "~/components/ui/FormError"
    import { webmails } from './utils'
    import { mapState } from "vuex"

    export default {
        components: { FormError, CbTextField, AccountSidebar },
        data() {
            return {
                errors: {},
                alert_errors: {},
                loading: false,
                show_warning: false,
                show_existing_alert: false,
                email: '',

            }
        },
        computed: {
            ...mapState({
                user_email: state => state.account.email
            })
        },
        watch: {
            email() {
                this.check_for_webmail()
            }
        },
        mounted() {
            if (this.$auth.user) {
                this.email = this.$auth.user.email
            } else if (this.user_email){
                this.email = this.user_email

            }
        },
        methods: {
            check_for_webmail() {
                let show_warning = false
                webmails.forEach((domain) => {
                    if (this.email.includes(domain)) {
                        show_warning = true
                    }
                })
                this.show_warning = show_warning
            },
            async register_email() {
                this.loading = true
                try {
                    this.$axios.setToken(false)

                    await this.$axios.post(`/api/users/send_verification_code/`, { email: this.email })
                    await this.$store.dispatch('account/set_email', this.email)
                    await this.$store.dispatch('account/set_webmail_user', this.show_warning);
                    await this.$router.push('/registration/validate-email')
                } catch (e) {
                    if (e.response) {
                        if (e.response.status === 500){
                            this.alert_errors = { detail: "Error Occurred" }
                        } else if (e.response.data.email) {
                            if (e.response.data.email.length) {
                                if (e.response.data.email[0].includes('already exists')) {
                                    this.show_existing_alert = true
                                    return
                                }

                            }
                        }
                        this.errors = e.response.data
                        const alert_errors = { ...e.response.data }
                        delete alert_errors.email
                        this.alert_errors = alert_errors
                    } else {
                        console.error(e)
                        this.alert_errors = { detail: "Error Occurred" }
                    }
                } finally {
                    this.loading = false
                }

            }
        }
    }
</script>

<style lang="stylus" scoped>
    .warning-box
        background var(--v-light-yellow-base)
        border 1px solid var(--v-yellow-base)
        border-radius 4px

    .v-form
        width 100%

</style>
