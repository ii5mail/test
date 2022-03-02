<template>
    <div class="fill-height d-flex mb-2">
        <v-text-field
            v-model="search_term"
            outlined
            dense
            solo
            flat
            class="align-self-center elevation-0"
            hide-details
            prepend-inner-icon="mdi-magnify"
            placeholder="General Search"
            @keypress.enter="search"
        />
    </div>
</template>

<script>

    import { mapState } from "vuex"

    export default {
        name: "SearchBar",
        data() {
            return {
                search_term: "",
                filters: {},
            }
        },
        computed: {
            ...mapState({
                active_term: state => state.general_search.search_term
            })
        },
        watch: {
            active_term() {
                if (this.search_term !== this.active_term) {
                    this.search_term = this.active_term
                }
            }
        },
        mounted() {
            if (this.active_term) {
                this.search_term = this.active_term
            }
        },
        methods: {
            search() {
                if (this.search_term) {
                    this.$store.dispatch('general_search/search', this.search_term)
                    if (!this.$route.fullPath.includes('general-search')) {
                        this.$router.push('/general-search')
                    }
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .v-input
        width: 285px;
        height: 32px;

        >>> input::placeholder
            font-size 14px
</style>
