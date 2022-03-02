<template>
    <div class="fill-height">
        <account-sidebar/>
        <v-container fluid class="fill-height justify-center fade-in">
            <v-card class="transparent elevation-0" width="550px">
                <v-card-title class="pb-0">
                    <div class="display-1">Create Password</div>
                </v-card-title>
                <v-form @submit.prevent="create_password">
                    <v-card-text class="pb-0 pt-2">
                        <div>
                            <p class="body-1">We’re confident you know the “drill” here. Pun intended!</p>
                        </div>

                        <div>

                            <div>
                                <div class="caption primary-text--text">Password</div>
                                <cb-text-field
                                    v-model="form.password"
                                    outlined
                                    placeholder="Minimum 6 characters"
                                    name="password"
                                    :error="!!errors.password"
                                    :error-messages="errors.password"
                                    type="password"
                                    autofocus
                                />
                            </div>
                            <form-error :msg="errors"/>

                        </div>
                    </v-card-text>
                    <v-card-actions class="px-4">
                        <v-container>
                            <v-row>
                                <v-col class="pa-0">
                                    <password-meter :password="form.password" @onchange="validate_password"/>
                                </v-col>
                                <v-col class="align-start justify-end d-flex pa-0" :cols="4">
                                    <v-btn
                                        type="submit"
                                        color="primary"
                                        width="135px"
                                        large
                                        :disabled="!password_is_valid"
                                        depressed
                                        :loading="loading"
                                    >
                                        Continue
                                    </v-btn>
                                </v-col>
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
    import PasswordMeter from "../../ui/PasswordMeter"
    import CbTextField from "../../ui/CbTextField"
    import FormError from "~/components/ui/FormError"

    import { mapState } from "vuex"

    export default {
        components: { FormError, CbTextField, PasswordMeter, AccountSidebar },
        data() {
            return {
                password_is_valid: false,
                loading: false,
                errors: {},
                form: {
                    password: '',
                },
            }
        },
        computed: {
            ...mapState({
                set_password_key: state => state.account.set_password_key,
                webmail_user: state => state.account.webmail_user,
            })
        },
        methods: {
            validate_password(is_valid) {
                this.password_is_valid = is_valid && this.form.password.length
            },
            async create_password() {
                this.loading = true
                try {
                    const res = await this.$axios.post('/api/users/set_password/', {
                        set_password_key: this.set_password_key,
                        password: this.form.password
                    })

                    await this.$auth.login({ data: { password: this.form.password, email: res.data.user.email } })
                    await this.$router.push('/registration/add-name')

                } catch (e) {
                    if (e.response) {
                        if (e.response.status === 500) {
                            this.errors = { detail: "Error Occurred" }
                        } else {

                            this.errors = e.response.data
                        }
                    } else {
                        this.errors = { 'detail': "Error Occurred" }
                    }
                } finally {
                    this.loading = false
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .v-form
        width 100%
</style>
