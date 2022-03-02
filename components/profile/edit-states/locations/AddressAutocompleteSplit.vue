<template>
    <v-combobox
        v-model="selected"
        outlined
        :error="error"
        :error-messages="alert_errors.city"
        :placeholder="placeholder === null ? 'City' : placeholder"
        name="city"
        :items="found_list_items"
        :search-input.sync="city_search_text"
        :item-text="city_only ? 'city': city_state_only ? 'city_state' : 'value'"
        item-value="id"
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
            {{ data.item.value ? data.item.value.split(', ')[0] : data.item }}
        </template>
    </v-combobox>
</template>
<script>
    import { get_addresses } from "../../../registration/reg2/Workplace/utils"

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
                city_search_text: null,
                list_items: []
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
            city_search_text: _.debounce(async function (search_val = this.city_search_text) {
                this.list_items = await get_addresses(search_val)
            }, 300)
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

