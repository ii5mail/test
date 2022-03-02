<template>
    <v-container
        class="d-flex fill-height mt-2 align-start"
    >

        <v-card class="pa-5 mr-10 base-containers" width="280px" min-height="100%">
            <!--     Left Hand Side Filter Bar -->
            <v-card class="small-font pa-3 border">
                <strong v-if="gc_or_mf">Want to generate more leads and referrals?</strong>
                <strong v-else>Want to see details on more sub contractors?</strong>
                <br/>
                <nuxt-link to="/upload" v-if="gc_or_mf">
                    Upload subs you don’t compete with and get credit for sending them leads!
                </nuxt-link>
                <nuxt-link to="/upload" v-else>
                    Upload your subs to start the prequal process!
                </nuxt-link>
            </v-card>
            <form @submit.prevent="search">
                <div class="small-font heavy-weight mt-5">Filter By</div>
                <v-select
                    v-model="params.type"
                    :items="search_types"
                    :menu-props="{ bottom: true, offsetY: true }"
                    outlined
                    dense
                    hide-details
                />

                <div class="small-font heavy-weight mt-5">Location</div>
                <city-autocomplete height="30px" hide_details v-model="location_label" near/>

                <div v-if="params.type === 'Project'">
                    <div class="small-font heavy-weight mt-5">Project Type</div>
                    <!--                        <v-select-->
                    <!--                            v-model="params.project_type"-->
                    <!--                            :items="project_types"-->
                    <!--                            :menu-props="{ bottom: true, offsetY: true }"-->
                    <!--                            outlined-->
                    <!--                            dense-->
                    <!--                            placeholder=""-->
                    <!--                            hide-details-->
                    <!--                        />-->
                    <!--                        <div class="small-font heavy-weight mt-5">Status</div>-->
                    <!--                        <v-select-->
                    <!--                            v-model="params.project_status"-->
                    <!--                            :items="project_statuses"-->
                    <!--                            :menu-props="{ bottom: true, offsetY: true }"-->
                    <!--                            outlined-->
                    <!--                            dense-->
                    <!--                            placeholder=""-->
                    <!--                            hide-details-->
                    <!--                        />-->
                </div>
                <div v-else>
                    <div class="small-font heavy-weight mt-5">
                        {{
                            gc_or_mf ? 'Trade Type' : 'Market Segments'
                        }}
                    </div>
                    <v-select
                        v-model="params.category"
                        :items="categories"
                        :menu-props="{ bottom: true, offsetY: true }"
                        outlined
                        dense
                        multiple
                        placeholder=""
                        hide-details
                    />
                </div>

                <div class="d-flex justify-end mt-8">
                    <cb-btn
                        color="primary-text"
                        outlined
                        type="submit"
                        height="40px"
                        width="120px"
                        :disabled="searching"
                    >
                        Search
                    </cb-btn>
                </div>
            </form>

            <div
                class="small-font heavy-weight mt-8 d-flex justify-space-between align-center text--lighten-1 primary-text--text"
            >
                Labor Requirements
                <v-btn icon @click="labor_expand = !labor_expand">
                    <v-icon>{{ labor_expand ? 'mdi-minus-box-outline' : 'mdi-plus-box-outline' }}</v-icon>
                </v-btn>
            </div>
            <div v-if="labor_expand">
                <div
                    class="xs-font"
                    v-for="req in labor_requirements"
                    :key="req.value"
                >
                    <Checkbox v-model="req.selected"/>
                    <div class="ml-7 pt-3px">{{ req.value }}</div>
                </div>
            </div>
            <div v-if="params.type">
                <div
                    class="small-font heavy-weight d-flex justify-space-between align-center text--lighten-1 primary-text--text"
                    :class="{'mt-8': labor_expand}"
                    v-if="params.type !== 'Project'"
                >
                    Ownership Type
                    <v-btn icon @click="ownership_expand = !ownership_expand">
                        <v-icon>{{ ownership_expand ? 'mdi-minus-box-outline' : 'mdi-plus-box-outline' }}</v-icon>
                    </v-btn>
                </div>
                <div v-if="ownership_expand && params.type !== 'Project'">
                    <div
                        class="xs-font"
                        v-for="type in ownership_types"
                        :key="type.value"
                    >
                        <Checkbox v-model="type.selected"/>
                        <div class="ml-7 pt-3px">{{ type.value }}</div>
                    </div>
                </div>
            </div>
        </v-card>
        <div class="flex-1">
            <div class="pa-3" v-if="ftue && organization">
                <div class="display-1">
                    Congratulations {{ $auth.user ? $auth.user.first_name : '' }}, you’re our newest member!
                </div>
                <div class="h6 mt-3">
                    Here are {{ gc_or_mf ? 'Trade Partners' : 'General Contractors' }} you might be interested in.
                </div>
            </div>
            <v-card class="px-10 py-5 base-containers flex-1" min-height="100%">
                <v-card-title class="large-font light-weight mb-5 pa-0" v-if="active_filters.length">Search Results
                    for:
                </v-card-title>
                <v-chip
                    label
                    v-for="filter in active_filters"
                    :key="filter.value"
                    class="mr-2 mt-2 c"
                    :class="{'pr-0': filter.type !== 'type'}"
                >
                    <span class="mr-1">{{ filter ? filter.value : 'NA' }}</span>
                    <v-btn text class="pa-0" width="30px" min-width="0" @click="remove_filter(filter)"
                           v-if="filter.type !== 'type'">
                        <!-- All filters can be removed except the 'type' filter (ie Sub/General Contractor) -->
                        <v-icon small color="black">mdi-close</v-icon>
                    </v-btn>
                </v-chip>
                <div v-if="searching" class="d-flex align-center justify-center py-16 my-16">
                    <v-progress-circular
                        class="my-16"
                        color="primary"
                        indeterminate
                    />
                </div>
                <div v-else-if="results.length && active_filters.length"  class="mt-5">
                    <div class="xs-font grey--text">{{ results.length }} result{{ results.length > 1 ? 's' : '' }}</div>
                    <v-data-table
                        :headers="table_headers"
                        :items="results"
                        :items-per-page="items_per_page"
                        hide-default-footer
                        @page-count="page_count = $event"
                        :page.sync="page"
                    >
                        <template v-slot:[`item.company`]="{ item }">
                            <div class="d-flex align-center py-2">
                                <img
                                    class="mr-4 rounded"
                                    v-if="item.logo"
                                    :src="item.logo"
                                    alt="item image"
                                    width="60px"
                                    height="60px"
                                >
                                <div v-else-if="item.name" class="placeholder-img mr-4">
                                    {{ item.name[0].toUpperCase() }}
                                </div>
                                <div>{{ item.name }}</div>
                            </div>
                        </template>
                        <template v-slot:[`item.categories`]="{ item }">
                            <div class="my-2">
                            <v-chip
                                v-for="category in item.categories"
                                :key="category"
                                small
                                class="market-segment-chips mr-1 mb-1 xxs-font light-blue-grey"
                                @click="add_market_segment_filter(category)"
                            >
                                {{category}}
                            </v-chip>
                            </div>
                        </template>
                        <template v-slot:[`item.action`]="{ item }">
                            <v-btn icon :to="`/profile/${item.id}`">
                                <v-icon
                                    large
                                    color="primary"
                                >
                                    mdi-chevron-right
                                </v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                    <div class="d-flex justify-end align-center mt-3" v-if="results.length > 10">
                        <div class="select-container">
                            <v-select
                                v-model="items_per_page"
                                :items="[10,30,50]"
                                hide-details
                                class="mr-2 mt-0 pt-0"
                            />
                        </div>
                        <v-pagination
                            v-model="page"
                            :length="page_count"
                            :total-visible=6
                            circle
                            color="primary"
                        />
                    </div>
                </div>
                <div v-else>
                    <div class="d-flex flex-column align-center justify-center mt-16">
                        <div v-if="active_filters.length" class="large-font heavy-weight mb-1 mt-6 text-center">
                            <p class="medium-font light-weight mb-0">
                                We'll have more results for this area soon!
                            </p>
                            <p class="medium-font light-weight">
                                Please check back at a later date.
                            </p>
                        </div>
                        <div v-else class="large-font heavy-weight mb-1 mt-6 text-center">
                            <p class="medium-font light-weight">
                                Please add search criteria!
                            </p>
                        </div>
                        <img src="@/assets/images/stock/stock_construction_sketch_bg.png" class="empty-search-img" alt="construction background"/>
                        <!-- <div class="xs-font my-6">
                            Try a different search, remove some parameter, or add new companies if you know one should
                            be showing up!
                        </div>
                        <cb-btn>
                            Add Companies
                        </cb-btn> -->
                    </div>
                </div>
            </v-card>
        </div>

    </v-container>
</template>

<script>
    import { mapState } from "vuex"
    import CityAutocomplete from "../registration/reg2/Workplace/CityAutocomplete"
    import CbBtn from "../ui/CbBtn"
    import Checkbox from "../ui/Checkbox"
    import { get_location_by_lat_lon, get_location_data } from "../registration/reg2/Workplace/utils";

    export default {
        components: { Checkbox, CbBtn, CityAutocomplete },
        data: () => ({
            page: 1,
            page_count: 0,
            items_per_page: 30,
            active_filter_btn: 'all',
            searching: true,
            ftue: false,
            gc_or_mf: false, // GC's and MF's get some label changes and shtuff
            location_label: '',
            params: {},
            categories: [],
            labor_requirements: [
                { value: "Union" },
                { value: "Non Union" },
                { value: "Prevailing Wages" },
            ],
            labor_expand: true,

            ownership_types: [],
            ownership_expand: true,
            search_types: [
                'Trade Partner',
                'General Contractor',
            ],
            // project_types: [
            //     'Commercial',
            //     'Data Center',
            //     'Education
            // ],
            //
            // project_status: null,
            // project_statuses: [
            //     'Active',
            //     'Closed
            // ],
            //

            active_filters: [],
            results: []
        }),
        computed: {
            ...mapState({
                organization: state => state.organizations.current
            }),
            filters_from_url() {
                return { ...this.$route.query }
            },

            table_headers() {
                if (this.gc_or_mf) {
                    return [
                        { text: "Company", value: "company", width: 250 },
                        { text: "Trades", value: "categories" },
                        // { text: "Preferred General Contractor", value: "contractor" }, // todo add this in once it exists in the backend
                        { text: '', value: 'action', sortable: false, width: 50 }
                    ]
                } else {
                    return [
                        { text: "Company", value: "company", width: 250 },
                        { text: "Market Segments", value: "categories" },
                        { text: '', value: 'action', sortable: false }
                    ]

                }
            }
        },
        watch: {
            filters_from_url() {
                this.set_active_filters()
                this.search()
            },
            location_label() {
                if (!this.location_label) {
                    delete this.params.locations__geo_distance
                }
            },
            labor_requirements: {
                deep: true,
                handler() {
                    const new_labor_reqs = []
                    this.labor_requirements.forEach((req) => {
                        if (req.selected) {
                            new_labor_reqs.push(req.value)
                        }
                    })
                    this.params.labor_requirements = new_labor_reqs
                }
            },
            ownership_types: {
                deep: true,
                handler() {
                    const new_labor_reqs = []
                    this.ownership_types.forEach((req) => {
                        if (req.selected) {
                            new_labor_reqs.push(req.value)
                        }
                    })
                    this.params.ownership_types = new_labor_reqs
                }
            }
        },
        async mounted() {
            if (this.filters_from_url.ftue) {
                this.ftue = true
                await this.$store.dispatch('organizations/get_current', this.$auth.user.primary_office_location?.organization)
            }

            this.gc_or_mf = this.$auth.user?.primary_office_location_type !== 'Trade Partner'

            try {
                // Temporary condition until auth required removed
                if (this.$auth.loggedIn) {
                    // Get categories
                    const resp = await this.$axios.get('/api/search/market_segments/')
                    this.categories = resp.data.segments

                    // Get ownership types
                    const ownership_types = []
                    const res = await this.$axios.options('/api/organizations/')
                    if (this.filters_from_url.ownership_types) {
                        res.data.actions.POST.ownership_type.choices.forEach((obj) => {
                            ownership_types.push({ ...obj, type: 'ownership_type', selected: this.filters_from_url.ownership_types.includes(obj.value) })
                        })
                    } else {
                        res.data.actions.POST.ownership_type.choices.forEach((obj) => {
                            ownership_types.push({ ...obj, type: 'ownership_type' })
                        })
                    }
                    this.ownership_types = ownership_types
                }
            } catch (e) {
                console.error(e)
            }

            await this.set_active_filters()
            await this.search()
        },
        methods: {
            remove_filter(filter) {
                const new_params = { ...this.params }
                if (Array.isArray(new_params[filter.type])) {
                    const new_array = []

                    new_params[filter.type].forEach(item => {
                        if (item !== filter.value) {
                            new_array.push(item)
                        }
                    })

                    if (new_array.length) {
                        new_params[filter.type] = new_array
                    } else {
                        delete new_params[filter.type]
                    }

                } else if (filter.type.includes('location')) {
                    this.location_label = null
                    delete new_params[filter.type]
                } else {
                    delete new_params[filter.type]
                }

                // Refreshes Search
                this.params = new_params
                this.set_active_filters(new_params)
                this.search()
            },
            async set_active_filters(base = this.filters_from_url) {
                const new_active_filters = []
                const filters = { ...base }
                for (const key of Object.keys(filters)) {
                    // loops through filters and handles cases such as location, and arrays
                    if (Array.isArray(filters[key])) {
                        filters[key].forEach((value) => {
                            const item = { type: key, value }
                            new_active_filters.push(item)
                        })
                    } else if (key.includes('location')) {
                        // Handles fetching of location
                        const res = await get_location_by_lat_lon(this.parse_lat_lng(filters[key]))
                        this.set_location_label(res)
                        new_active_filters.push({ type: 'locations__geo_distance', value: this.location_label.value })
                    } else {
                        if (key !== 'ftue') {
                            new_active_filters.push({ type: key, value: filters[key] })
                        }
                    }
                }

                this.active_filters = new_active_filters
                this.params = _.cloneDeep(filters)
                // this.params = {...filters}
            },
            add_market_segment_filter(query) {
                this.$router.replace({
                    path: '/',
                    query: {
                        category: query,
                    }
                })
            },
            async search() {
                this.searching = true
                // Organize active search criteria
                const new_params = {}
                for (const param_key of Object.keys(this.params)) {
                    // this grabs individual cases that need special handling
                    if (Array.isArray(this.params[param_key])) {
                        // handles arrays (categories, etc)
                        const to_replace_with = []
                        this.params[param_key].forEach((selection) => {
                            to_replace_with.push(selection.value || selection)
                        })
                        if (to_replace_with.length) {
                            new_params[param_key] = to_replace_with
                        }
                    } else {
                        // handles standard cases (type, etc.)
                        new_params[param_key] = this.params[param_key].value || this.params[param_key]
                    }
                }

                if (this.location_label?.id) {
                    // handles location
                    const { location } = await get_location_data(this.location_label.id)
                    new_params.locations__geo_distance = this.format_location_param(location)
                }

                // Handles zero state + sets general/sub search type
                if (!new_params.type) {
                    new_params.type = this.gc_or_mf ? 'Trade Partner' : 'General Contractor'
                }

                let existingRoute = this.$route.fullPath
                let destinationRoute = this.$router.resolve({ ...this.$route, query: {...new_params} }).route.fullPath
                if (existingRoute !== destinationRoute) {
                    try {
                        await this.$router.replace({ ...this.$route, query: new_params })
                    } catch (e) {
                        console.error(e)
                    }
                }
                // try {
                //     await this.$router.replace({ ...this.$route, query: new_params })
                // } catch (e) {
                //     console.error(e)
                // }

                // make the request to the api
                const res = await this.$store.dispatch('market_search/search', new_params)
                this.results = res.data.results
                this.searching = false
            },
            format_location_param(location) {
                return `10km__${ location?.latitude }__${ location?.longitude }`
            },
            parse_lat_lng(str) {
                const [_, latitude, longitude] = str.split('__')
                return { latitude, longitude }
            },
            set_location_label({ city, state, country }) {
                const loc_str = `${ city !== undefined ? city : 'N/A' }, ${ state }${ state ? ',' : '' } ${ country }`
                this.location_label = { value: loc_str }
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .select-container
        width: 60px;

    .placeholder-img
        color var(--v-grey-darken1)
        display flex
        align-items center
        justify-content center
        width 60px
        height 60px
        font-size 36px
        font-weight $heavy-weight
        background var(--v-light-blue-grey-base)
        border-radius 4px

    .no-data
        .img
            max-width 90%
            width 450px
            min-height 250px
            background var(--v-grey-lighten2)
            border-radius 10px

    .pt-3px
        padding-top 3px

    .base-containers
        border 1px solid var(--v-grey-lighten3)
        border-radius 14px

    .border
        border 1px solid var(--v-grey-lighten3)

    .v-btn, >>> fieldset
        border-color var(--v-grey-lighten3)

    .empty-search-img
        margin-top -36px
        max-width 516px

    .market-segment-chips
        color white
        background-color #93ACC9 !important
        cursor pointer

</style>
