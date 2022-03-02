<template>
    <div>
        <v-card
            v-if="loading"
            class="transparent d-flex align-center justify-center py-16"
        >
            <v-progress-circular indeterminate color="primary" class="my-16"/>
        </v-card>
        <v-form @submit.prevent="save_edits" v-else-if="user">
            <div
                ref="top_of_form"
                class="medium-font mb-8"
            >
                Your Profile
            </div>
            <div v-if="!webmail_user">
                <div class="subheader grey lighten-2 mb-8 py-1 px-4 fill-width">Associated Companies</div>
                <v-row class="input-row small-text primary-text--text mb-4">
                    <v-col cols="6" class="pb-1 pt-0" relative>
                        <div>Company Associated Email*</div>
                            <div class="email-input">
                                <cb-text-field
                                    disabled
                                    v-model="company_name"
                                    outlined
                                    :placeholder="user.email"
                                    name="name"
                                    type="text"
                                />
                                <v-icon class="verify-email-icon mx-2">$vuetify.icons.checkmark_circled</v-icon>
                            </div>
                    </v-col>
                    <v-col cols="6" class="pb-1 pt-0">
                        <div>Select Office</div>
                        <!-- <cb-select
                            v-model="office_location"
                            placeholder="Select Office Location"
                            :items="office_location_options"
                            name="office_location"
                            type="select"
                            item-text="value"
                            :menu-props="{ bottom: true, offsetY: true }"
                        /> -->
                        <cb-select
                            :menu-props="{ bottom: true, offsetY: true }"
                            return-object
                            :items="office_location_options"
                            item-text="city"
                            item-value="id"
                            v-model="selected_location"
                        >
                            <template slot="selection" slot-scope="data">
                                <!-- HTML that describe how select should render selected items -->
                                <div v-if="data.item.id !== 'other'">
                                    {{ data.item.city }},
                                    {{ data.item.state }},
                                    {{ data.item.country }}
                                </div>
                                <div v-else>
                                    Other Location
                                </div>
                            </template>
                            s
                            <template v-slot:item="data">
                                <template>
                                    <v-list-item-content>
                                        <v-list-item-title v-if="data.item.id !== 'other'">
                                            {{ data.item.city }},
                                            {{ data.item.state }},
                                            {{ data.item.country }}
                                        </v-list-item-title>
                                        <v-list-item-title v-else>
                                            Other Location
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </template>
                            </template>
                        </cb-select>
                    </v-col>
                </v-row>
                <v-row class="small-text primary-text--text">
                    <v-col class="small-text primary-text--text mt-0 pt-0">Once validated, you may access your company's account.</v-col>
                </v-row>
            </div>
            <div v-else>
                <v-row class="input-row small-text primary-text--text mb-4">
                    <v-col cols="6" class="pb-1 pt-0" relative>
                        <div>Email*</div>
                            <div class="email-input">
                                <cb-text-field
                                    disabled
                                    v-model="company_name"
                                    outlined
                                    :placeholder="user.email"
                                    name="name"
                                    type="text"
                                />
                                <v-icon class="verify-email-icon mx-2">$vuetify.icons.checkmark_circled</v-icon>
                            </div>
                    </v-col>
                </v-row>
            </div>
            <v-divider class="grey my-8 fill-width"/>
            <div>
                <div class="subheader grey lighten-2 mb-8 py-1 px-4 fill-width">Personal Information</div>
                <v-row class="mb-4 align-center">
                    <div class="py-0 d-flex flex-column align-start mr-4">
                        <div class="d-flex justify-start mt-1 rounded-xl px-4 py-0">
                            <div class="image-sub-container d-flex justify-center rounded-xl relative pa-4">
                                <v-file-input @change="upload" accept="image/png, image/jpeg"/>
                                <div v-if="!img_url" class="d-flex align-center justify-center flex-column blue--text">
                                    <div class="mb-1">Profile</div>
                                    <div>Photo</div>
                                </div>

                                <img
                                    v-else
                                    :src='img_url'
                                    alt="User Profile Photo"
                                    width="100%"
                                    class="rounded-lg"
                                >
                            </div>
                        </div>
                    </div>
                    <div class="pt-0 d-flex flex-column align-start">
                        <div class="upload-input relative mr-4 mt-4">
                            <div class="upload-caption">
                                <div><span class="blue--text">Upload</span> a profile photo</div>
                                <div class="xxs-font light-font">jpg, gif, or png 20MB Max</div>
                            </div>
                            <v-file-input @change="upload" accept="image/png, image/jpeg"/>
                        </div>
                        <image-cropper
                            v-model="show_image_cropper"
                            :file="file"
                            @get_cropped_url="get_cropped_url"
                            form_key="portrait"
                        />
                    </div>
                </v-row>
                <v-row class="input-row small-text primary-text--text mb-4">
                    <v-col cols="6" class="pb-1 pt-0">
                        <div>First Name*</div>
                        <cb-text-field
                            v-model="form.first_name"
                            outlined
                            name="first_name"
                            type="text"
                        />
                    </v-col>
                    <v-col cols="6" class="pb-1 pt-0">
                        <div>Last Name*</div>
                        <cb-text-field
                            v-model="form.last_name"
                            outlined
                            name="last_name"
                            type="text"
                        />
                    </v-col>
                </v-row>
                <v-row class="input-row small-text primary-text--text mb-4">
                    <v-col cols="6" class="pb-1 pt-0">
                        <div>Title</div>
                        <cb-text-field
                            v-model="form.title"
                            outlined
                            name="title"
                            type="text"
                        />
                    </v-col>
                </v-row>
                <v-row class="align-center primary-text--text mt-12 pt-0">
                    <v-col
                        cols="6"
                        class="delete small-font red--text"
                        @click="open_delete_dialog"
                    >
                        Delete Your Account
                    </v-col>
                    <v-col cols="6" align="right">
                        <cb-btn
                            type="submit"
                            color="primary"
                            width="120px"
                            height="50px"
                            :loading="saving"
                            depressed
                        >
                            Save
                        </cb-btn>
                    </v-col>
                </v-row>
            </div>
        </v-form>
        <confirm-delete-dialog v-model="show_delete_dialog"/>
    </div>
</template>

<script>
    import ConfirmDeleteDialog from "./ConfirmDeleteDialog.vue"
    import CbTextField from "../ui/CbTextField"
    import CbSelect from "../ui/CbSelect.vue"
    import CbBtn from '../ui/CbBtn.vue'
    import ImageCropper from "../ui/ImageCropper"
    import { mapState } from "vuex"
    import { webmails } from '../registration/reg1/utils'

    export default {
        components: {
            ConfirmDeleteDialog,
            CbTextField,
            CbSelect,
            CbBtn,
            ImageCropper,
        },
        name: "YourProfile",
        data() {
            return {
                loading: false,
                saving: false,
                show_delete_dialog: false,
                company_name: '',
                form: {},
                office_location_options: [],
                selected_location: {},
                file: null,
                img_url: null,
                photo_data: null,
                show_image_cropper: false,
                errors: { headquarters: {} },
                first_name: '',
                last_name: '',
                title: '',
                webmail_user: false
            }
        },
        computed: {
            ...mapState({
                user: state => state.account.user
            }),
        },
        async mounted() {
            this.loading = true;
            if (this.$route.params.uid) {
                const userInfo = await this.$store.dispatch(
                    "account/get_user"
                );
                this.form.first_name = userInfo.first_name;
                this.form.last_name = userInfo.last_name;
                this.form.title = userInfo.title;
                this.img_url = userInfo.portrait;
                this.office_location_options = userInfo.primary_organization?.office_locations;
                this.selected_location = userInfo.primary_office_location;
            }
            this.check_for_webmail();
            this.loading = false;
        },
        methods: {
            upload(file) {
                if (file) {
                    this.file = file
                    this.show_image_cropper = true
                }
            },
            get_cropped_url({ url, form_data }) {
                this.img_url = url
                this.photo_data = form_data
            },
            scroll_to_form() {
                const el = this.$refs.top_of_form

                if (el) {
                    // Use el.scrollIntoView() to instantly scroll to the element
                    el.scrollIntoView({ behavior: 'smooth' })
                }
            },
            open_delete_dialog() {
                this.show_delete_dialog = true;
            },
            check_for_webmail() {
                webmails.forEach((domain) => {
                    if (this.user.email.includes(domain)) {
                        this.webmail_user = true;
                    }
                })
            },
            async patch_new_profile_pic() {
                if (this.photo_data) {
                    const res = await this.$axios.patch(
                        `/api/users/me/`,
                        this.photo_data,
                        { headers: { "Content-Type": `multipart/form-data` } }
                    )
                    this.$auth.setUser(res.data)
                }
            },
            async save_edits() {
                this.saving = true;
                if (this.selected_location.id) {
                  this.form.primary_office_location = this.selected_location.id;
                }
                const payload = { ...this.form };
                try {
                    await this.patch_new_profile_pic()
                    await this.$store.dispatch('account/patch_user', payload)
                    this.$snackbar.show_message({ content: "User information updated!", type: 'success' })
                } catch(e) {
                    const errors = typeof e.data === "string" ? { detail: "Error Occurred" } : e.data
                    this.scroll_to_form()
                    this.errors = errors
                }
                this.saving = false;
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .input-row
        margin-bottom 0 !important

    .image-sub-container
        position relative
        transition .1s
        height: 150px;
        width: 150px;
        box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
        cursor pointer

        &:hover
            opacity .7

        &:active
            opacity .5

    .profile-img {
        position: absolute;
        background: white;
        left: 50px;
        top: 0;
        height: 150px;
        width: 150px;
        box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
    }

    .profile-header {
        font-family: Lato;
        min-height: 83px;
    }

    .profile-type {
        height: 48px;
        min-width: 175px;
        border: 1px solid var(--v-border-grey-base);
        background: white;
        justify-content: space-between;
    }

    .v-file-input
        position absolute
        width 100%
        height 100%
        padding 0
        top 0
        left 0
        margin 0
        z-index: 100;

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

    .upload-input
        width 180px
        height 50px

    .upload-caption
        position absolute
        top 0
        width 200px

    .delete
        cursor pointer

    .email-input
        position relative

    .verify-email-icon
        position absolute
        top 14px
        right 4px



</style>