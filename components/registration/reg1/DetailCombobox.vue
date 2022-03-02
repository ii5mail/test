<template>
    <v-combobox
        v-model="selected"
        outlined
        :placeholder="placeholder"
        :items="list_items"
        item-text="value"
        hide-no-data
        return-object
        height="50"
        autocomplete="off"
        dense
        append-icon=""
    />

</template>

<script>
    export default {
        props: ['placeholder', 'value', 'type'],
        data() {
            return {
                list_items: [],
            }
        },
        computed: {
            selected: {
                get() {
                    return this.value
                },
                async set(val) {
                    this.$emit('input', val)
                }
            }
        },
        async mounted() {
            try {
                const endpoint = this.type === 'title' ? '/api/users/existing_titles/' : '/api/users/existing_business_units/'
                const res = await this.$axios.get(endpoint)
                this.list_items = res.data
            } catch(e){
                console.error(e)
            }
        },
        methods: {}
    }
</script>
<style scoped lang="stylus">
    .v-input.v-input--is-focused
     >>> .v-input__slot
        fieldset
            border 2px solid var(--v-primary-base)
            transition .3s

    >>> .v-input__slot
        fieldset
            border 1px solid var(--v-black-base)
            transition .3s


    .v-input:not(.v-input--is-focused):hover >>> fieldset
        border 1px solid var(--v-primary-base)
</style>
