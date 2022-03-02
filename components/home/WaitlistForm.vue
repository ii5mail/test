<template>
    <div
        class="fill-height white--text relative"
        :class="background ? background : ''"
    >
        <v-container class="py-10 px-5 d-flex flex-column justify-center">
            <h2 class="large-heading large-font mb-6 mt-5 text-center">Get Our Beta Launch Waitlist</h2>
            <h5 v-if="success" class="font-18 mb-6 light-weight text-center">We look forward to working with you and we’ll be in touch soon!</h5>
            <v-form @submit.prevent="submit" v-if="!success">
                <v-alert dense outlined type="error" v-if="errors.non_field_errors || errors.detail">
                    <ul>
                        <li v-for="error in errors.non_field_errors" :key="error">{{ error }}</li>
                    </ul>
                    {{ errors.detail }}
                </v-alert>
                <v-row class="waitlist-container justify-center align-center">
                    <v-text-field
                        v-model="email"
                        solo
                        :disabled="loading"
                        placeholder="Enter Your Email"
                        :error="!!errors.email"
                        :error-messages="errors.email"
                    >
                    </v-text-field>
                    <v-btn
                        class="white primary--text align-self-center mb-12 ml-4"
                        depressed
                        outlined
                        text
                        large
                        height="50px"
                        :disabled="!email.length"
                        :loading="loading"
                        type="submit"
                    >
                        Register
                    </v-btn>
                </v-row>
            </v-form>
        </v-container>
    </div>
</template>

<script>
    import CbTextField from "../ui/CbTextField"

    export default {
        components: { CbTextField },
        props: {
            success: Boolean,
            background: String,
        },
        data: () => ({
            email: '',
            loading: false,
            errors: {},
        }),
        computed: {
        },
        watch: {
        },
        mounted() {
        },
        methods: {
            async submit() {
                this.loading = true
                try {
                    await this.$axios.post('api/waitlist/', { email: this.email })
                    this.$emit('success', true)
                    this.email = ''
                } catch (error) {
                    this.errors = typeof error.response.data === "string" ? { detail: "Error Occurred" } : error.response.data
                    console.error(this.errors)
                } finally {
                    this.loading = false
                }
            }
        },
    }
</script>

<style scoped lang="stylus">

    .v-text-field
        border-radius 4px
        max-width 35%
        >>>input
            padding-left 8px !important

    @media only screen and (max-width: 600px)
        .waitlist-container, .top-waitlist-container
            flex-direction column

            .v-text-field
                min-width revert
                max-width 85% !important
                width 100%

            .v-btn
                margin-left 0

</style>

