<template>
    <v-combobox
        v-model="selected"
        outlined
        :error="error"
        :error-messages="alert_errors.city"
        :placeholder="placeholder === null ? 'City' : placeholder"
        name="project_name"
        :items="found_list_items"
        :search-input.sync="project_search_text"
        @focus="update_items"
        :item-text="city_only ? 'city': city_state_only ? 'city_state' : 'project_name'"
        hide-no-data
        return-object
        :height="height || '50'"
        dense
        append-icon=""
        :prepend-inner-icon="near ? '$vuetify.near_label' : null"
        :class="near && 'near_label_active'"
        :hide-details="hide_details"
        :clearable="!!clearable"
        :rules="rules"
    >
        <!-- <template slot="selection" slot-scope="data">
            {{ data.item }}
        </template> -->
        <template slot="selection" slot-scope="data">
            {{ data.item.project_name ? data.item.project_name : data.item }}
        </template>
    </v-combobox>
</template>
<script>
    import VueCookies from 'vue-cookies'

    export default {
        props: {
            near: Boolean,
            hide_details: Boolean,
            value: [String, Object],
            placeholder: String,
            height: String,
            city_only: Boolean,
            city_state_only: Boolean,
            clearable: Boolean,
            error: Boolean,
            rules: Array,
        },
        data() {
            return {
                alert_errors: {},
                project_search_text: null,
                list_items: [],
                // selected: '',
            }
        },
        computed: {
            selected: {
                get() {
                    return this.value
                },
                async set(val) {
                    this.$emit('input', val || null)
                }
            },
            found_list_items() {
                return this.list_items
            }
        },
        watch: {
            // project_search_text: _.debounce(async function (search_val = this.project_search_text) {
            //     this.list_items = this.$cookies.get('invite-to-bid-projects')
            // }, 300)
        },
        mounted() {

        },
        methods: {
            update_items() {
                this.list_items = JSON.parse(this.$cookies.get('invite-to-bid-projects')) ? JSON.parse(this.$cookies.get('invite-to-bid-projects')) : []
            }
        }
    }
</script>

<style scoped lang="stylus">
    >>> .v-input__append-inner
        margin-top 0px !important
        display: flex;
        align-self: center;
        //margin-top: 0 !important;
        //height: 100%;
        //display: flex;
        //align-items: center;

    >>> .v-input__prepend-inner
        height: 100%;
        display: flex;
        align-items: center;
        margin-top: 0 !important;

    .near_label_active
        >>> .v-select__slot
            padding-left: 6px;

    >>> .v-input:not(.error--text):not(.v-input--is-disabled)
        fieldset
            border 1px solid var(--v-black-base) !important
            transition .3s

    >>> .v-input:not(.v-input--is-focused):not(.error--text):hover >>> fieldset
            border 1px solid var(--v-primary-base)
</style>

