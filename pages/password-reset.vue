<template>
    <div class="fill-height">
        <account-sidebar/>
        <v-container fluid class="fill-height justify-center fade-in">
            <v-card class="transparent elevation-0" min-width="500px">
                <v-card-title class="pb-0">
                    <div class="display-1">Forgot Your Password?</div>
                </v-card-title>
                <v-form @submit.prevent="submit" novalidate>
                    <v-card-text>
                        <div>
                            <p class="body-1">Please enter the email address you created an account with.</p>
                        </div>

                        <div>
                            <div>
                                <div class="caption primary-text--text">Email Address</div>
                                <cb-text-field
                                    v-model="email"
                                    outlined
                                    placeholder="Email Address"
                                    name="email"
                                    :error="!!errors.email"
                                    :error-messages="errors.email"
                                    type="text"
                                    ref="email"
                                />
                            </div>
                            <v-alert dense outlined type="error" v-if="errors.non_field_errors || errors.detail">
                                <ul>
                                    <li v-for="error in errors.non_field_errors" :key="error">{{ error }}</li>
                                </ul>
                                {{ errors.detail }}
                            </v-alert>
                        </div>
                    </v-card-text>
                    <v-card-actions class="px-4">
                        <v-spacer></v-spacer>
                        <v-btn
                            type="submit"
                            color="primary"
                            :disabled="!email"
                            depressed
                            :loading="loading"
                        >
                            Reset Password
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

    export default {
        auth: 'guest',
        components: { CbTextField, AccountSidebar },
        data() {
            return {
                email: '',
                successful: false,
                loading: false,
                errors: {},
            }
        },
        mounted(){
            if (this.$route.hash){
                this.email = this.$route.hash.replace('#','')
            }
        },
        methods: {
            async submit() {
                this.loading = true

                await this.$axios.post('/api/auth/users/reset_password/', { email: this.email })
                    .then(res => {
                        this.successful = true
                        this.errors = {}
                    })
                    .catch(error => {
                        this.errors = typeof error.response.data === "string" ? { detail: "Error Occurred" } : error.response.data
                        console.error(this.errors)
                        // focus on in the input to easily re-enter email
                        this.$refs.email.focus()
                    }).finally(() => {
                        this.loading = false
                    })

            }
        }
    }
</script>

<style lang="stylus" scoped>
    a
        text-decoration none

    .v-form
        width 100%

</style>

