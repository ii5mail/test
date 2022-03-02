<script>
    import { VAutocomplete } from 'vuetify/lib'
    import ArrowLineDown from "./icons/ArrowLineDown"

    export default {
        extends: VAutocomplete,
        props: ['small'],
        mixins: [{
            props: {
                // Override default props here
                height: { default: '50' },
                dense: { default: true },
                outlined: { default: true },
                'hide-no-data': { default: true },
                'return-object': { default: false, type: Boolean },
            }
        }],
        methods: {
            genIconSlot() {
                const child_nodes = []
                const icon_node = this.$createElement(ArrowLineDown)
                child_nodes.push(icon_node)
                return this.$createElement('div', {
                    staticClass: 'v-input__append-inner'
                }, child_nodes)
            }
        }
    }
</script>
<style scoped lang="stylus">
    >>> .v-input__append-inner
        margin-top 13px !important

    .v-input.v-input--is-focused:not(.error--text)
        fieldset
            border 2px solid var(--v-primary-base)
            transition .3s

    .v-input:not(.error--text):not(.v-input--is-disabled)
        &:hover
            .v-icon
                color var(--v-black-base)

        fieldset
            border 1px solid var(--v-black-base)
            transition .3s


    .v-input:not(.v-input--is-focused):not(.error--text):hover >>> fieldset
        border 1px solid var(--v-primary-base)

    .v-input.error--text
        fieldset
            border-width 1px
</style>
