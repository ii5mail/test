<template>
    <div class="fill-height">
        <account-sidebar/>
        <v-container fluid class="fill-height justify-center fade-in">
            <v-card class="transparent elevation-0" width="505px">
                <v-card-title class="pb-0">
                    <div class="display-1">
                        {{ error ? `“Okay, Houston, we've had a problem here.”` : "You've got mail!" }}
                    </div>
                </v-card-title>
                <v-form @submit.prevent="submit_code">

                    <v-card-text class="pt-2">
                        <div>
                            <p class="body-1" v-if="error && !clear_input">
                                It looks like there’s a problem with that code. Please check and make sure that everything is correct.
                            </p>
                            <p class="body-1" v-else-if="error">
                                Enter the activation code we sent to <i>{{ email || "your email" }}</i>.
                                (
                                <nuxt-link to="email-entry">edit</nuxt-link>
                                )
                            </p>
                            <p class="body-1" v-else>

                                We’ve sent a 6 character code to
                                <i>{{ email || "your email" }}</i>
                                (
                                <nuxt-link to="email-entry">edit</nuxt-link>
                                )
                                The code expires shortly,
                                so
                                please enter it quickly!
                            </p>
                        </div>
                        <pin-code-input @onchange="update_otp" autofocus :error="error" :clear_input="clear_input"/>
                    </v-card-text>
                    <v-card-actions class="px-4">
                        <v-container>
                            <v-row>
                                <v-col class="pa-0 align-center">
                                    <div class="caption primary-text--text">Didn’t receive it?</div>
                                    <div class="caption primary-text--text d-flex">Check your spam folder or 
                                        <v-btn small text @click="resend" color='primary' class="pa-1" height="20px"
                                               :loading="resending">
                                            Resend
                                        </v-btn>
                                    </div>
                                </v-col>
                                <v-col class="d-flex align-center justify-end pa-0" :cols="4">
                                    <v-btn
                                        type="submit"
                                        color="primary"
                                        width="135px"
                                        large
                                        :disabled="otp.length < 6 || otp.includes(null)"
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
    import PinCodeInput from "../../ui/PinCodeInput"
    import { mapState } from "vuex"

    export default {
        components: { AccountSidebar, PinCodeInput },
        data() {
            return {
                otp: '', // One Time Password
                loading: false,
                resending: false,
                error: false,
                clear_input: false,
            }
        },
        computed: {
            ...mapState({
                email: state => state.account.email
            })
        },
        methods: {
            update_otp(val) {
                this.otp = val
            },
            async resend() {
                this.resending = true
                try {
                    this.$axios.setToken(false)
                    await this.$axios.post(`/api/users/send_verification_code/`, { email: this.email })
                    await this.$store.dispatch('account/set_email', this.email)
                    this.$snackbar.show_message({ content: "Resent Email", type: 'success' })
                } catch (e) {
                    this.$snackbar.show_message({ content: "Error sending email", type: 'error' })
                    console.error(e)
                } finally {
                    this.clear_input = false
                    this.error = false
                    this.otp = ''
                    this.resending = false
                }
            },
            async submit_code() {
                this.loading = true
                try {
                    const res = await this.$axios.post('/api/users/exchange_one_time_password/', {
                        email: this.email,
                        otp: this.otp
                    })
                    await this.$store.dispatch('account/set_password_key', res.data.set_password_key)
                    await this.$router.push('/registration/create-password')
                    this.error = false
                } catch (e) {
                    let clear_input = true
                    if (e.response?.data?.non_field_errors?.length) {
                        e.response?.data?.non_field_errors.forEach((val) => {
                            if (val?.includes('Incorrect')) {
                                clear_input = false
                            }
                        })
                    }

                    this.clear_input = clear_input
                    this.error = true
                } finally {
                    this.loading = false
                }

            }
        }
    }
</script>


<style lang="stylus" scoped>
</style>
