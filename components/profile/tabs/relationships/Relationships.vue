<template>
    <div class="content">
        <profile-toolbar @set_edit="$emit('set_edit', true)"/>
        <v-row class="mx-12 mt-12 pr-6 flex-column" v-if="!access_granted && !is_users_parent_org && (data !== null && data.length)">
            <v-row>
                <v-col class="d-flex align-center">
                    <v-icon class="mx-2">$vuetify.icons.linkage</v-icon>
                    <div class="medium-font">Relationships</div>
                </v-col>
                <v-col class="d-flex justify-end">
                    <cb-btn :large="false" class="ml-3" @click="show_dialog = true" v-if="!checking_access && !access_granted">
                        Request Access
                    </cb-btn>
                </v-col>
            </v-row>
            <v-container>
                <v-row class="justify-center">
                    <img
                        src="~/assets/images/misc/relationships-blurry.png"
                        width="100%"
                        class="mt-10"
                        v-if="!checking_access"
                    />
                    <v-progress-circular
                        v-else
                        color="primary"
                        indeterminate
                        class="py-16 my-10"
                    />
                </v-row>
            </v-container>
        </v-row>

        <v-row class="mx-12 mt-12 pr-6 flex-column" v-else>
            <v-row class="justify-space-between d-flex height-64px">
                <v-col class="d-flex align-center">
                    <v-icon class="mx-2">$vuetify.icons.linkage</v-icon>
                    <div class="medium-font">Relationships</div>
                    <v-progress-circular
                        indeterminate
                        color="primary"
                        size="20"
                        width="3"
                        class="ml-2"
                        v-if="!loading && fetching"
                    />
                </v-col>
                <v-col cols="8" class="d-flex align-center">
                    <cb-select-small
                        v-model="active_location_filter"
                        :menu-props="{ bottom: true, offsetY: true }"
                        :items="location_options"
                        placeholder="All Locations"
                        hide-details
                        class="mr-4 filter-select full-width"
                        clearable
                        :disabled="fetching"
                        item-value="value"
                        item-text="name"
                    />
                    <cb-select-small
                        v-if="organization_type === 'General Contractor'"
                        v-model="active_filters.trades_performed"
                        :menu-props="{ bottom: true, offsetY: true }"
                        :items="trade_options"
                        placeholder="All Trades"
                        hide-details
                        class="mr-4 filter-select full-width"
                        clearable
                        :disabled="fetching"
                        item-value="id"
                        item-text="name"
                    />
                    <div class="d-flex align-center">
                        <v-btn
                            class="light-weight elevation-0 link_tab grey--text"
                            :class="{'active-tab' : active_tab === 'link'}"
                            @click="active_tab = 'link'"
                            :outlined="active_tab !== 'link'"
                        >
                            Link View
                        </v-btn>
                        <v-btn
                            class="light-weight elevation-0 detailed_tab grey--text"
                            :class="{'active-tab' : active_tab === 'detail'}"
                            @click="active_tab = 'detail'"
                            :outlined="active_tab !== 'detail'"
                        >
                            Detailed View
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row class="small-font light-weight light-text--text mt-0">
                <v-col class="d-flex align-center">
                    <v-icon class="mr-2">$vuetify.icons.checkmark_circled</v-icon>
                    Verified by both parties
                </v-col>
                <v-col class="d-flex align-center justify-end">
                    To view more details switch to the Detailed View
                    <span class="ml-1" v-if="active_tab === 'link' && !is_users_parent_org && !access_granted">
                        | <a class="ml-1" @click="show_dialog = true">Request Access</a>
                    </span>
                </v-col>
            </v-row>
            <v-container v-if="loading" class="d-flex align-center justify-center py-16">
                <v-progress-circular indeterminate color="primary"/>
            </v-container>
            <v-container v-else-if="active_tab === 'link'">
                <v-row v-if="organization_type === 'Trade Partner'">
                    <!--   Sub View  -->
                    <sub-link-view
                        :organization="organization"
                        :data="data"
                        @set_edit="add_relation"
                    />
                </v-row>
                <v-row v-else>
                    <!-- GC view  -->
                    <general-link-view
                        :organization="organization"
                        :data="data"
                        @set_edit="add_relation"
                    />
                </v-row>
            </v-container>
            <v-container v-else>
                <v-row>
                    <detail-view
                        :organization="organization" :organization_type="organization_type"
                        :incoming_data="data"
                        @set_edit="add_relation"
                    />
                </v-row>
            </v-container>
        </v-row>
        <request-access-dialog
            v-model="show_dialog"
            :organization="organization"
            @grant_access="access_granted = true"
        />
    </div>
</template>

<script>
    import ProfileToolbar from "../../../ui/ProfileToolbar.vue"
    import SubLinkView from "./SubLinkView"
    import CbSelectSmall from "../../../ui/CbSelectSmall"
    import CbBtn from "../../../ui/CbBtn"
    import GeneralLinkView from "./GeneralLinkView"
    import DetailView from "./DetailView"
    import RequestAccessDialog from "./RequestAccessDialog"

    export default {
        components: {
            RequestAccessDialog,
            DetailView,
            GeneralLinkView,
            CbBtn,
            CbSelectSmall,
            SubLinkView,
            ProfileToolbar
        },
        name: "Relationships",
        props: {
            organization: Object,
            main: Boolean
        },
        data: () => ({
            active_tab: 'link',
            access_granted: false,
            show_dialog: false,
            data: null,
            whole_data_set: null, // only is updated once and gives us all relationships whether or not filters are active
            loading: true,
            fetching: false,
            checking_access: false,
            active_filters: {},
            active_location_filter: {}
        }),
        computed: {
            is_users_parent_org() {
                return this.$auth.user.primary_office_location?.organization === this.organization.id
            },
            organization_type() {
                return this.organization.office_locations.find(({ office_type }) => office_type === "Headquarters")?.categories[0]
                    ?.supercategory?.supercategory.name
            },
            trade_options() {
                const trades = []
                this.data?.forEach((relationship) => {
                    relationship.trades_performed.forEach(({ name, id, supercategory }) => {
                        if (!trades.find((obj) => name === obj.name)) {
                            let key = name
                            if (key === 'N/A') {
                                key = supercategory?.supercategory?.name
                            }
                            trades.push({ name: key, id })
                        }
                    })
                })
                return trades
            },
            location_options() {
                const locations = []
                const keeping_track_of_duplicates = []
                const type = this.organization_type === 'General Contractor' ? "sub_contractor" : "general_contractor"
                this.whole_data_set?.forEach((relationship) => {
                    const headquarters = relationship[type].office_locations?.find(({ office_type }) => office_type === 'Headquarters')
                    const full_name = `${ headquarters?.city }, ${ headquarters?.state } ${ headquarters?.country }`
                    if (!keeping_track_of_duplicates.includes(full_name)) {
                        locations.push({
                            name: full_name,
                            value: {
                                state: headquarters?.state,
                                city: headquarters?.city,
                                country: headquarters?.country
                            }
                        })
                    }
                    keeping_track_of_duplicates.push(full_name)
                })
                return locations
            }
        },
        watch: {
            active_location_filter: {
                deep: true,
                handler() {
                    const type = this.organization_type === 'Trade Partner' ? 'general_contractor_office_location' : 'sub_contractor_office_location'
                    if (this.active_location_filter) {
                        this.active_filters[`${ type }__city`] = this.active_location_filter.city
                        this.active_filters[`${ type }__state`] = this.active_location_filter.state
                    } else {
                        this.active_filters[`${ type }__city`] = null
                        this.active_filters[`${ type }__state`] = null
                    }
                    this.active_filters = { ...this.active_filters }
                }
            },
            active_filters: {
                deep: true,
                handler() {
                    this.get_relationships()
                }
            }
        },
        async mounted() {
            try {
                if (this.$route.query.add) {
                    this.add_relation()
                } else {
                    this.checking_access = true
                    const approved_requests = await this.$store.dispatch('relationships/get_requests', {
                        organization: this.organization.id,
                        status: "Approved",
                        mine: true
                    })
                    this.access_granted = !!approved_requests.length
                }
            } catch (e) {
                console.error(e)
            } finally {
                this.checking_access = false

            }
            await this.get_relationships()
            this.whole_data_set = this.data // initialized whole data set
        },
        methods: {
            add_relation() {
                this.$emit('set_edit_add_relation', true)
            },
            async get_relationships() {
                this.fetching = true
                const type = this.organization_type === 'General Contractor' ? 'general_contractor' : 'sub_contractor'

                try {
                    const res = await this.$store.dispatch('relationships/get_relationships', {
                        params: {
                            ...this.active_filters,
                            [type]: this.organization.id // hardcoding this because it will be a constant and we don't want to override it accidentally.
                        }
                    })

                    this.data = res
                } catch (e) {
                    console.error(e)
                } finally {
                    this.loading = false
                    this.fetching = false
                }
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .height-64px
        height: 64px;

    .filter-select
        width 100px

    .active-tab
        background-color var(--v-primary-text-base) !important
        color var(--v-white-base) !important

    .link_tab
        border-radius 4px 0 0 4px !important

    .detailed_tab
        border-radius 0 4px 4px 0 !important

    >>> .scroll-container
        max-width: 100%;
        overflow scroll
        padding-bottom: 10px

    >>> .scroll-container::-webkit-scrollbar {
        height: 5px;
        width 50px
    }

    /* Track */
    >>> .scroll-container::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    >>> .scroll-container::-webkit-scrollbar-thumb {
        background: var(--v-primary-text-base)
        border-radius 5px
    }

</style>
