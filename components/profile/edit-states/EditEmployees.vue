<template>
    <div>
        <back-button @on_back="on_back_select"/>
        <v-container class="pa-12 pt-12 d-flex align-center flex-column">

            <v-row class="d-flex justify-space-between align-end fill-width">
                <v-col>
                    <v-row>
                        <v-icon class="mx-2">$vuetify.icons.people</v-icon>
                        <div class="medium-font">Employees</div>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="mt-10 fill-width">
                <v-col cols="3"/>
                <v-col>
                    <v-form @submit.prevent="add_employee">
                        <v-row>
                            <v-col>
                                <v-alert dense outlined type="error" v-if="errors.non_field_errors || errors.detail">
                                    <ul>
                                        <li v-for="error in errors.non_field_errors" :key="error">{{ error }}</li>
                                    </ul>
                                    {{ errors.detail }}
                                </v-alert>
                                <div class="mb-10">To save you time, they'll be asked to fill out their own details.</div>
                                <div class="mb-1">Email*</div>
                                <div class="email-input">
                                    <cb-text-field
                                        v-model="email"
                                        ref="email"
                                        :disabled="adding"
                                        :error="!!errors.email"
                                        :error-messages="errors.email"
                                        outlined
                                        placeholder="Enter Username"
                                        type="text"
                                    />
                                    <p class="white--text text--darken-1 primary-text">@{{ domain }}</p>
                                </div>
                                <form-error :msg="alert_errors"/>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-spacer/>
                            <v-col class="d-flex justify-end">
                                <cb-btn
                                    :loading="adding"
                                    type="submit"
                                    :disabled="btn_is_disabled"
                                >
                                    Add
                                </cb-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
                <v-col cols="3"/>
            </v-row>
            <v-divider class="grey mt-10 fill-width"/>
            <div class="fill-width">
                <employee-list :editMode="editMode"/>
            </div>
        </v-container>
    </div>
</template>

<script>
    import BackButton from "../../ui/BackBtn.vue"
    import CbTextField from "../../ui/CbTextField"
    import CbBtn from "../../ui/CbBtn.vue"
    import CbSelectSmall from "../../ui/CbSelectSmall"
    import EmployeeList from '../tabs/employees/EmployeeList.vue'
    import FormError from "~/components/ui/FormError"


    export default {
        name: "EditEmployees",
        components: {
            CbSelectSmall,
            BackButton,
            CbTextField,
            CbBtn,
            EmployeeList,
            FormError,
        },
        props: {
            domain: String,
        },
        data() {
            return {
                email: '',
                adding: false,
                editMode: true,
                errors: {},
                alert_errors: {},
                show_username_error: false,
                filter: 'All Locations',
            }
        },
        watch: {
            email() {
                if (this.email.includes('@')) {
                    this.errors.email = 'Invalid username'
                } else {
                    this.errors.email = null
                }
            }
        },
        computed: {
            btn_is_disabled() {
                return !this.email;
            },

        },
        methods: {
            async add_employee() {
                const employeeEmail = this.email + '@' + this.domain;
                this.adding = true;
                try {
                    if (this.email.includes('@')) {
                        throw 'Email is invalid. Your domain is already included.'
                    }
                    // await this.$axios.post('api/<endpoint here>/', { email: employeeEmail })
                    this.$snackbar.show_message({ content: `${ employeeEmail } Invited!`, type: 'success' })
                    this.email = ''
                    this.errors = {}
                } catch (error) {
                    if (typeof error === 'string') {
                        this.alert_errors = error
                    } else {
                        this.errors = typeof error.response.data === "string" ? { detail: "Error Occurred" } : error.response.data
                        setTimeout(() => {
                            this.$refs.email.focus()
                        }, 0)
                    }

                    console.error(this.errors)
                } finally {
                    this.adding = false
                }
            },
            on_back_select() {
                this.$emit("set_edit", false)
            },
        },
    }
</script>

<style scoped lang="stylus">
    .email-input
        position relative
        p
            position absolute
            right 0
            top 0
            max-width 240px
            padding 12px
            border-top-right-radius 5px;
            border-bottom-right-radius 5px;
        cb-text-field
            position absolute
</style>
