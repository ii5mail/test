<template>
    <div>
        <div class="medium-font mb-8">Reset Password</div>
        <v-form @submit.prevent="change_password" novalidate>
            <v-row class="input-row small-text primary-text--text mb-4">
                <v-col cols="6" class="pb-1 pt-0">
                    <div ref="top_of_form">Current Password</div>
                    <cb-text-field
                        v-model="current_password"
                        outlined
                        name="current_password"
                        type="password"
                        ref="password"
                    />
                </v-col>
            </v-row>
            <v-row class="input-row small-text primary-text--text mb-4">
                <v-col cols="6" class="pb-1 pt-0">
                    <div ref="top_of_form">New Password</div>
                    <cb-text-field
                        v-model="new_password"
                        outlined
                        name="new_password"
                        type="password"
                        :error="!!errors.password"
                        :error-messages="errors.password"
                    />
                </v-col>
                <v-col cols="6" class="pb-1 pt-0">
                    <div ref="top_of_form">Retype New Password</div>
                    <cb-text-field
                        v-model="retype_new_password"
                        outlined
                        name="retype_new_password"
                        type="password"
                    />
                </v-col>
            </v-row>
            <v-row class="input-row small-text primary-text--text mb-4">
                <form-error :msg="errors"/>
                <v-col class="pa-0 ml-3">
                    <password-meter :password="new_password" @onchange="validate_password"/>
                </v-col>
            </v-row>
            <v-divider class="grey my-8 fill-width"/>
            <v-row class="align-center mt-12 pt-0 fill-width">
                <v-col
                    cols="3"
                    class="back-btn small-font blue--text"
                    @click="to_profile"
                >
                    Back to Your profile
                </v-col>
                <v-col
                    cols="9"
                    align="right"
                    justify="center"
                >
                    <p class="d-inline small-font mr-4">If you forgot your password, logout and reset your password.</p>
                    <v-btn
                        type="submit"
                        color="primary"
                        large
                        :disabled="!password_is_valid"
                        depressed
                        :loading="loading"
                    >
                        Save
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
    import CbTextField from "../ui/CbTextField"
    import CbSelect from "../ui/CbSelect.vue"
    import FormError from "../ui/FormError.vue"
    import PasswordMeter from "../ui/PasswordMeter"
    import { mapState } from "vuex"

    export default {
        components: {
            CbTextField,
            CbSelect,
            FormError,
            PasswordMeter,
        },
        name: "ResetPassword",
        data() {
            return {
                tab: "Your Profile",
                loading: false,
                show_dialog: false,
                errors: {},
                current_password: '',
                new_password: '',
                retype_new_password: '',
                password_is_valid: false,
                email: '',
                password: '',
            }
        },
        computed: {
            ...mapState({
                set_password_key: state => state.account.set_password_key
            })
        },
        async mounted() {
            const userInfo = await this.$store.dispatch(
                "account/get_user"
            );
            this.email = userInfo.email;
        },
        methods: {
            to_profile() {
                this.$emit("on_profile_click")
            },
            validate_password(is_valid) {
                // this.password_is_valid = is_valid && this.new_password.length && this.retype_new_password.length
                this.password_is_valid = is_valid && this.new_password.length && this.retype_new_password.length && this.new_password === this.retype_new_password
            },
            async change_password() {
                this.loading = true
                try {
                    // const res = await this.$auth.login({ data: { email: this.email, password: this.password }})
                    const res = await this.$axios.post('api/users/change_password/', { new_password: this.new_password, old_password: this.current_password })
                    this.$snackbar.show_message({ content: 'Password Succesfully Reset!', type: 'success' })
                    this.current_password = ''
                    this.new_password = ''
                    this.retype_new_password = ''

                    // await this.$router.push(`/settings/${this.$route.params.uid}`);

                    // if (this.new_password === this.retype_new_password) {
                    // const res = await this.$axios.post('/api/users/set_password/', {
                    //     set_password_key: this.set_password_key,
                    //     password: this.new_password
                    // });
                    // await this.$auth.login({ data: { password: this.new_password, email: res.data.user.email } })
                    // await this.$router.push(`/settings/${this.$route.params.uid}`);
                    // }
                    // IMPORTANT! Do our initializing! (from our auth plugin)
                    // this.$auth.ctx.app.project_initialize()

                    this.errors = {}
                } catch (e) {
                    console.error(e)
                    this.errors = e.response?.data || {}

                    // focus on in the input to easily re-enter password
                    // this.$refs.password.focus()
                } finally {
                    this.loading = false
                }
            },
        },
    }
</script>

<style lang="stylus" scoped>
    .back-btn
        cursor pointer

</style>
