<template>
    <v-container
        class="d-flex align-start justify-center fill-height mt-2"
    >
        <v-card class="pa-10 elevation-3" width="100%" min-width="600px" min-height="100%" v-if="search_term">
            <v-card-title class="large-font light-weight mb-10">
                Search Results for: <span class="ml-2">{{ search_term }}</span>
            </v-card-title>
            <v-card-subtitle class="pb-1">
                <v-btn
                    v-for="section in filter_options"
                    depressed
                    :color="active_filter.text === section.text ? 'primary' : null"
                    text
                    small
                    @click="on_filter_change(section)"
                    :disabled="is_btn_disabled(section) && section.icon"
                >
                    <v-icon class="mr-2" v-if="section.icon">{{ `$vuetify.icons.${ section.icon }` }}</v-icon>
                    {{ section.text }}
                </v-btn>
            </v-card-subtitle>
            <v-divider width="100%" class="mx-4"/>
            <v-card-text class="pt-0">
                <div class="d-flex justify-space-between">
                    <div v-if="error" class="search-block  py-16 my-10 small-font medium-weight">
                        <div class="d-flex align-center justify-center">
                            <v-icon class="mr-2" color="warning">mdi-alert</v-icon>
                            Error Occurred
                        </div>
                    </div>
                    <div v-else-if="!active_filter.filter" class="search-block">
                        <!--          When 'All' Filter is selected              -->
                        <div class="d-flex flex-column" v-for="(section, i) in filter_options">
                            <section-result
                                v-if="!searching && get_preview_section(section).data.length"
                                @view_all="on_filter_change"
                                :section="get_preview_section(section)"
                                :key="i"
                            />
                        </div>
                        <v-row class="mt-15 align-center justify-center" v-if="searching">
                            <v-progress-circular
                                color="primary"
                                indeterminate
                                class="ml-4"
                            />
                        </v-row>
                    </div>
                    <div v-else class="search-block">
                        <!--          When any other filter is selected              -->
                        <section-result
                            :section="{...active_filter, data: search_data.data || {}, count: search_data.count}"
                            hide_all_button
                            v-if="!searching"
                        />
                    </div>

                </div>
                <div v-if="no_results_found && !searching" class="mt-16 d-flex justify-center medium-font">
                    No Results Found
                </div>
                <div class="text-center mt-10" v-if="get_section(active_filter).count > page_count">
                    <v-pagination
                        :value="page"
                        @input="change_page"
                        :length="Math.ceil(get_section(active_filter).count/page_count)"
                        circle
                    ></v-pagination>
                </div>
            </v-card-text>
        </v-card>

        <v-card v-else class="transparent align-self-center relative">
            <!--            Zero state, for when no search term exists       -->
            <search-bar/>
            <v-progress-circular
                color="light-purple"
                indeterminate
                class="absolute"
                size="17"
                width="2"
                v-if="searching"
            />
        </v-card>
    </v-container>
</template>

<script>
    import { mapState } from "vuex"
    import SearchBar from "../header/SearchBar"
    import SectionResult from './SectionResult'

    export default {
        components: { SearchBar, SectionResult },
        data: () => ({}),
        computed: {
            ...mapState({
                search_term: state => state.general_search.search_term,
                filter_options: state => state.general_search.filter_options,
                active_filter: state => state.general_search.active_category_filter,
                preview_data: state => state.general_search.preview_data,
                search_data: state => state.general_search.data,
                error: state => state.general_search.error,
                searching: state => state.general_search.searching,
                page: state => state.general_search.current_page,
                page_count: state => state.general_search.page_count,
            }),
            no_results_found() {
                let bool = true
                this.filter_options.forEach((section) => {
                    if (this.get_preview_section(section).data?.length) {
                        bool = false
                    }
                })
                return bool
            }
        },
        beforeDestroy() {
            this.$store.commit('general_search/set_active_category_filter', { text: 'All' })
        },
        methods: {
            is_btn_disabled(section) {
                return !this.get_preview_section(section).data?.length
            },
            change_page(new_page) {
                this.$store.dispatch('general_search/navigate_to_page', new_page)
            },
            get_section() {
                return this.search_data || { count: 0, data: [] }
            },
            get_preview_section(section) {
                return this.preview_data[section.text] ? { ...section, ...this.preview_data[section.text] } : {
                    count: 0,
                    data: []
                }
            },
            async on_filter_change(filter_type) {
                this.$store.commit('general_search/set_active_category_filter', filter_type)
                await this.$store.dispatch('general_search/search', this.search_term)
            },

        }
    }
</script>
<style lang="stylus" scoped>

    .relative > .v-progress-circular
        right 12px
        top 12px

    .search-block
        display flex
        flex-direction column
        width: 100%
        padding-right 100px

</style>
