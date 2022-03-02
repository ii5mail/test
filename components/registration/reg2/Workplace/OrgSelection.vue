<template>
    <div>
        <v-row class="logo-container pa-4">
            <v-col
                class="pa-0"
                cols="2"
            >
                <div
                    class="photo-container d-flex align-center justify-center flex-column"
                    :class="{'no-click-events': selected_org}"
                >
                <!-- <div
                    class="photo-container d-flex align-center justify-center flex-column"
                    :class="{'no-click-events': !new_org && !selected_org}"
                > -->
                    <!-- Only the uploader of the image can edit it-->
                    <img
                        v-if="img_url || logo"
                        :src='img_url || logo'
                        alt="Company Logo"
                        width="100%"
                    />
                    <div v-else class="add_text d-flex align-center justify-center flex-column">
                        <div v-if="new_org || selected_org">Add</div>
                        <div>Logo</div>
                    </div>
                    <v-file-input @change="upload" accept="image/png, image/jpeg" v-if="!img_url"/>
                </div>
            </v-col>
            <v-col class="display-1 logo-title light-weight pl-4">
                <div v-if="new_org">
                    <v-text-field
                        v-model="new_org.name"
                        append-outer-icon="mdi-close"
                        @click:append-outer="new_org = {}, img_url = '', logo = '', $emit('set_new_logo_data', null)"
                        solo
                        flat
                        placeholder="New Company Name"
                    />
                </div>
                <div v-else-if="selected_org">
                    <v-text-field
                        v-model="selected_org.name"
                        solo
                        flat
                        readonly
                    />
                </div>
                <!-- <div v-else>
                    <v-text-field
                        v-model="search_text"
                        append-outer-icon="mdi-close"
                        @click:append-outer="search_text = '', img_url = '', logo = '', $emit('set_new_logo_data', null)"
                        placeholder="New Company Name"
                        solo
                        flat
                        @keypress.enter="create_new"
                    />
                </div> -->
                <!-- <v-autocomplete
                    v-else
                    v-model="selected_org"
                    placeholder="Company Name"
                    :search-input.sync="search_text"
                    solo
                    flat
                    :items="organization_list"
                    item-text="name"
                    item-value="id"
                    return-object
                    :menu-props="{maxHeight: 230}"
                    @keypress.enter="create_new"
                > -->
                <!-- <v-autocomplete
                    v-else
                    v-model="selected_org"
                    placeholder="Company Name"
                    :search-input.sync="search_text"
                    solo
                    flat
                    return-object
                    :menu-props="{maxHeight: 230}"
                    @keypress.enter="create_new"
                >
                    <template v-slot:no-data>
                        <v-btn
                            class="no-data-btn pa-4 light-weight"
                            @click="create_new"
                        >
                            Create New: {{ search_text }}
                        </v-btn> -->
                        <!-- <v-btn
                            class="no-data-btn pa-4 light-weight"
                            v-if="!searching && search_text"
                            @click="create_new"
                        >
                            Create New: {{ search_text }}
                        </v-btn> -->
                        <!-- <div v-else class="pa-2 d-flex justify-center">
                            <v-progress-circular
                                v-if="search_text"
                                color="primary"
                                indeterminate
                                size="23"
                            />
                            <div v-else>
                                No Organizations Found
                            </div>
                        </div> -->
                    <!-- </template>
                    <template v-slot:item="data">
                        <template>
                            <div class="avatar-img mr-2">
                                <img
                                    v-if="data.item.logo"
                                    :src="data.item.logo"
                                />
                            </div>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ data.item.name }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </template>
                    </template>
                </v-autocomplete> -->
            </v-col>
        </v-row>
        <v-expand-transition v-if="!selected_org">
        <!-- <v-expand-transition v-if="new_org"> -->
            <v-row>
                <div class="domain-container mt-7 px-4 py-3 pt-5 fade-in">
                    <span v-if="!$is_webmail(user.email)">
                        Is this the correct domain?
                    </span>
                    <span v-else>
                        What domain do you want associated with this company?
                    </span>
                    <!-- <cb-text-field
                        outlined
                        small
                        v-model="new_org.domain"
                    /> -->
                    <cb-text-field
                        outlined
                        small
                        v-model="user_domain"
                    />
                </div>
            </v-row>
        </v-expand-transition>
        <image-cropper
            :aspect_ratio="1"
            title="Add Logo"
            v-model="show_image_cropper"
            :file="file"
            @get_cropped_url="get_cropped_data"
        />
    </div>
</template>

<script>
    import ImageCropper from "../../../ui/ImageCropper"
    import CbTextField from "../../../ui/CbTextField"
    import { mapState } from "vuex"

    export default {
        props: ['org_domain', 'organization'],
        components: { CbTextField, ImageCropper },
        data() {
            return {
                show_image_cropper: false,
                user_domain: '',
                file: {},
                search_text: '',
                selected_org: null,
                searching: false,
                new_org: null,
                img_url: '',
                logo: '',
                yourValue: ''
            }
        },

        computed: {
            ...mapState({
                organization_list: state => state.organizations.list
            }),
            user() {
                return this.$auth.user
            },
        },
        watch: {
            new_org: {
                handler() {
                    this.$emit('create_org', this.new_org)
                    if (this.new_org) {
                        if (!this.new_org.domain && !this.$is_webmail(this.user.domain)) {
                            this.new_org.domain = this.user.domain
                        }
                    }
                },
                deep: true
            },
            selected_org: {
                handler() {
                    this.logo = ''
                    this.img_url = ''
                    if (this.selected_org) {
                        if (this.selected_org.logo) {
                            this.logo = this.selected_org.logo
                        }
                    }
                    this.$emit('select_org', this.selected_org)
                },
                deep: true
            },

            user() {
                new_org.org_domain = this.user.domain
                if (!this.$is_webmail(this.user.domain)) {
                }
            },
            user_domain() {
                if (this.new_org) {
                    this.new_org.domain = this.user_domain
                }
            }
            // search_text() {
            //     this.searching = true

            //     if (!this.selected_org) {
            //         this.refresh_list()
            //         return
            //     }

            //     if (this.search_text !== this.selected_org.name) {
            //         this.refresh_list()
            //     }

            // }
        },
        async mounted() {
            if (this.organization) {
                this.selected_org = this.organization
            } else {
                this.create_new()
            }
            this.user_domain = this.user.domain
            await this.$store.dispatch('organizations/get_organizations', { limit: 5 })
        },
        methods: {
            create_new() {
                this.selected_org = null
                if (!this.new_org) this.new_org = {}
                if (this.search_text) {
                    this.new_org.name = this.search_text
                    // force rerender
                }
                this.new_org = { ...this.new_org }
            },
            refresh_list: _.debounce(async function () {
                this.searching = true
                await this.$store.dispatch('organizations/get_organizations', {
                    name: this.search_text,
                    limit: 5
                })
                this.searching = false
            }, 100),
            upload(file) {
                if (file) {
                    this.file = file
                    this.show_image_cropper = true
                }
            },
            async get_cropped_data({ url, form_data }) {
                this.img_url = ''
                this.logo = url
                if (form_data) {
                    this.$emit('set_new_logo_data', form_data)
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .no-click-events
        pointer-events none
        opacity: .4

    >>> .v-list-item
        padding 10px

    .avatar-img
        overflow hidden
        background var(--v-grey-base)
        border 1px solid var(--v-grey-base)
        width 35px
        height 35px
        border-radius 4px
        margin-right 8px

        img
            width 100%

    .no-data-btn
        width 100%
        height 100%
        font-weight $light-weight
        background transparent !important
        box-shadow none

    .domain-container
        background var(--v-primary-lighter-base)
        width 100%
        border 1px solid var(--v-primary-base)
        border-radius 4px

    .logo-title

        >>> .v-text-field
            font-size 32px

        >>> .v-input__slot
            box-shadow none !important
            margin 0
            padding 0 !important

        >>> .v-select__slot

            i
                display none

        >>> input
            padding 20px 0

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
