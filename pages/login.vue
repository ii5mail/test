<template>
    <div class="fill-height">
        <account-sidebar />
        <v-container fluid class="fill-height justify-center fade-in">
            <v-card class="transparent elevation-0" min-width="500px">
                <v-card-title class="pb-0">
                    <div class="display-1">Login to Account</div>
                </v-card-title>
                <v-form @submit.prevent="login" novalidate>
                    <v-card-text>
                        <div>
                            <p class="body-1">Please enter your email and password to continue.


                            </p>
                        </div>

                        <div>
                            <v-alert dense outlined type="error" v-if="errors.non_field_errors || errors.detail">
                                <ul>
                                    <li v-for="error in errors.non_field_errors" :key="error">{{ error }}</li>
                                </ul>
                                {{ errors.detail }}
                            </v-alert>
                            <div>
                                <div class="caption primary-text--text">Email Address</div>
                                <cb-text-field
                                    v-model="form.email"
                                    outlined
                                    placeholder="Email Address"
                                    name="email"
                                    :error="!!errors.email"
                                    :error-messages="errors.email"
                                    type="text"
                                />
                            </div>
                            <div class="relative">
                                <div class="caption primary-text--text d-flex justify-space-between">
                                    Password
                                </div>
                                <cb-text-field
                                    v-model="form.password"
                                    outlined
                                    name="password"
                                    placeholder="Password"
                                    :error="!!errors.password"
                                    :error-messages="errors.password"
                                    ref="password"
                                    type="password"
                                />
                                <nuxt-link
                                    :to="form.email ? `password-reset/#${form.email}` : 'password-reset/'"
                                    class="absolute top right caption"
                                >
                                    Forgot Password?
                                </nuxt-link>
                            </div>
                        </div>
                    </v-card-text>
                    <v-card-actions class="px-4">
                        Don't have a login?
                        <nuxt-link class="ml-2" to="/registration/email-entry">Create an Account</nuxt-link>
                        <v-spacer></v-spacer>
                        <v-btn
                            type="submit"
                            color="primary"
                            width="110px"
                            :disabled="!form.email || !form.password"
                            depressed
                            :loading="loading"
                        >
                            Sign In
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>

        </v-container>

    </div>
</template>

<script>
    import AccountSidebar from "@/components/ui/AccountSidebar"
    import CbTextField from "../components/ui/CbTextField"
    import CbBtn from "../components/ui/CbBtn"

    export default {
        auth: false,

        components: { CbTextField, AccountSidebar, CbBtn },
        head() {
            return {
                title: "Login",
            }
        },
        data() {
            return {
                errors: {},
                form: {
                    email: '',
                    password: ''
                },
                remember_me: true,
                loading: false,
            }
        },
        async mounted(){
            if (this.$auth.loggedIn){
                await this.$router.push('/')
            }
            else {
                await this.$store.dispatch('account/set_email', null)
            }
        },
        methods: {
            async login() {
                this.loading = true
                try {
                    await this.$auth.login({ data: this.form })

                    this.$nuxt.$router.push('/')

                    // IMPORTANT! Do our initializing! (from our auth plugin)
                    this.$auth.ctx.app.project_initialize()

                    this.errors = {}
                } catch (e) {
                    console.error(e)
                    this.errors = e.response?.data || {}

                    // focus on in the input to easily re-enter password
                    this.$refs.password.focus()
                } finally {
                    this.loading = false
                }
            },

        }
    }
</script>

<style lang="stylus" scoped>
    a
        text-decoration none

    .v-form
        width 100%

</style>
