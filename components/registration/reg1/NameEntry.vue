`
<template>
    <div class="fill-height">
        <account-sidebar/>
        <v-container fluid class="fill-height justify-center fade-in">
            <v-card class="transparent elevation-0" width="600px">
                <v-card-title class="pb-0">
                    <div class="display-1">What do your colleagues call you?</div>
                </v-card-title>
                <v-form @submit.prevent="submit_name" ref="form" v-model="is_form_valid">
                    <v-card-text class="pb-0">
                        <div>
                            <p class="body-1">Not what your mom called you when she was mad at you!</p>
                            <p class="body-1">For: <i>{{ user.email }}</i></p>
                        </div>

                        <div>
                            <div>
                                <div class="d-flex align-start">
                                    <div class="portrait-container mr-4 mt-1">
                                        <div
                                            class="photo-container d-flex align-center justify-center flex-column"
                                        >
                                            <div v-if="!img_url" class="d-flex align-center justify-center flex-column">
                                                <div class="mb-1">Profile</div>
                                                <div>Photo</div>
                                            </div>

                                            <img
                                                :src='img_url'
                                                alt="Company Logo"
                                                width="100%"
                                                v-else
                                            >
                                            <v-file-input @change="upload" accept="image/png, image/jpeg"/>

                                        </div>
                                        <v-btn icon class="close-icon" outlined
                                               @click="img_url = null, photo_data = null" v-if="img_url">
                                            <v-icon size="15">mdi-close</v-icon>
                                        </v-btn>
                                    </div>
                                    <div class="d-flex flex-column flex-grow-1">
                                        <div class="caption primary-text--text">First Name</div>
                                        <cb-text-field
                                            autocomplete="off"
                                            v-model="form.first_name"
                                            outlined
                                            placeholder="First Name"
                                            name="first_name"
                                            :error="!!errors.first_name"
                                            :error-messages="errors.first_name"
                                            type="text"
                                            autofocus
                                            :rules="[rules.counter, rules.required]"
                                        />
                                        <div class="caption primary-text--text">Last Name</div>
                                        <cb-text-field
                                            v-model="form.last_name"
                                            outlined
                                            placeholder="Last Name"
                                            name="last_name"
                                            :error="!!errors.last_name"
                                            :error-messages="errors.last_name"
                                            type="text"
                                            :rules="[rules.counter, rules.required]"
                                        />

                                        <div class="caption primary-text--text">Title</div>
                                        <detail-combobox
                                            type='title'
                                            placeholder="Title"
                                            v-model="form.title"
                                        />

                                        <div v-if="show_business_unit">
                                            <div class="caption primary-text--text">Business Unit</div>
                                            <detail-combobox type='business-unit' placeholder="Business Unit"
                                                             v-model="form.business_unit"/>
                                        </div>
                                        <div v-else class="primary--text small-font business-unit-text mb-3"
                                             @click="show_business_unit = true">
                                            Want to add your business unit?
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <form-error :msg="errors"/>
                    </v-card-text>
                    <v-card-actions class="px-4">
                        <v-spacer/>
                        <v-btn
                            type="submit"
                            color="primary"
                            width="135px"
                            large
                            :disabled="!form.last_name || !form.first_name || !is_form_valid"
                            depressed
                            :loading="loading"
                        >
                            Continue
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>

            <image-cropper
                :aspect_ratio="1"
                title="Add Logo"
                v-model="show_image_cropper"
                :file="file"
                @get_cropped_url="get_cropped_url"
                form_key="portrait"
            />
        </v-container>

    </div>
</template>

<script>

    import AccountSidebar from "../../ui/AccountSidebar"
    import CbTextField from "../../ui/CbTextField"
    import FormError from "~/components/ui/FormError"
    import ImageCropper from "../../ui/ImageCropper"
    import DetailCombobox from "~/components/registration/reg1/DetailCombobox"
    import { mapState } from "vuex"


    export default {
        components: { DetailCombobox, ImageCropper, FormError, CbTextField, AccountSidebar },
        data() {
            return {
                loading: false,
                show_image_cropper: false,
                show_business_unit: false,
                is_form_valid: false,
                file: {},
                img_url: null,
                photo_data: null,
                errors: {},
                form: {
                    first_name: '',
                    last_name: '',
                    title: '',
                    business_unit: ''
                },
                rules: {
                    required: value => !!value || 'This field is required',
                    counter: value => {
                        if (!value) return
                        return value.length >= 2 || "Minimum 2 Character Count Required"
                    },
                },
            }
        },
        computed: {
            ...mapState({
                webmail_user: state => state.account.webmail_user,
            }),
            user() {
                return this.$auth.user
            },
        },
        watch: {
            user: {
                handler() {
                    this.sync_user_values()
                },
                deep: true
            }
        },
        async mounted() {
            await this.$store.dispatch('account/get_user')
            this.sync_user_values()
        },
        methods: {
            sync_user_values() {
                this.form.first_name = this.user.first_name || ''
                this.form.last_name = this.user.last_name || ''
                this.form.title = this.user.title || this.form.title
                this.form.business_unit = this.user.business_unit || this.form.business_unit
                this.img_url = this.user.portrait
                if (this.form.business_unit) this.show_business_unit = true
            },
            upload(file) {
                if (file){
                    this.file = file
                    this.show_image_cropper = true
                }
            },
            get_cropped_url({ url, form_data }) {
                this.img_url = url
                this.photo_data = form_data
            },
            async patch_photo() {
                const empty_data = new FormData()
                if (!this.photo_data) {
                    // handles removal of logo
                    await this.$store.dispatch('account/patch_user', { portrait: null })
                } else {
                    const res = await this.$axios.patch(
                        `/api/users/me/`,
                        this.photo_data,
                        { headers: { "Content-Type": `multipart/form-data` } }
                    )
                    this.$auth.setUser(res.data)
                }
            },
            capitalize_first_letters(input) {
                return input.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
            },
            submit_name() {
                setTimeout(async () => {
                    // this set timeout allows the form to update after onblur of detail fields
                    this.loading = true
                    try {
                        await this.$store.dispatch(
                            'account/patch_user',
                            {
                                first_name: this.capitalize_first_letters(this.form.first_name),
                                last_name: this.capitalize_first_letters(this.form.last_name),
                                title: this.capitalize_first_letters(this.form.title),
                            }
                        )
                        if (this.photo_data !== this.user.portrait) {
                            await this.patch_photo()
                        }
                        if (this.webmail_user) {
                            await this.$router.push('/')
                        } else {
                            await this.$router.push('/registration/workplace')
                        }
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
                })

            }
        }
    }
</script>

<style lang="stylus" scoped>
    .business-unit-text
        cursor pointer
        transition .1s

        &:hover
            opacity .8

    .v-form
        width 100%

    .close-icon
        position absolute
        left -5px
        top -5px
        width 20px
        height 20px
        background var(--v-white-base)
        z-index 1
        border 1px solid var(--v-light-purple-base)
        transition 0s !important

        &:hover
            background var(--v-primary-base)
            color white

    .portrait-container
        position relative

    .photo-container
        background var(--v-white-base)
        overflow hidden
        border 1px solid var(--v-light-purple-base)
        border-radius 4px
        line-height 16px
        position relative
        transition .1s
        cursor pointer
        width 70px
        height 70px

        &:hover
            background var(--v-light-grey-base)
            border-color var(--v-primary-light-base)


        &:active
            background var(--v-light-grey-darken1)


        .v-file-input
            position absolute
            width 100%
            height 100%
            padding 0
            margin 0

            >>> .v-input__prepend-outer
                width 100%
                height 100%
                margin 0

                .v-input__icon.v-input__icon--prepend
                    width 100%
                    height 100%

            >>> button
                opacity 0
                height 100%
                width 100%
                border-radius 0

            >>> .v-input__control
                display none

</style>
z
