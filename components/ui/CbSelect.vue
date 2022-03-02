<script>
    import { VSelect } from 'vuetify/lib'
    import ArrowLineDown from "./icons/ArrowLineDown"

    export default {
        extends: VSelect,
        props: ['small'],
        mixins: [{
            props: {
                // Override default props here
                appendIcon: { default: 'mdi-chevron-down' },
                height: { default: '50' },
                dense: { default: true },
                outlined: { default: true },
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
        margin 0 !important
        align-self center

    .v-input--is-disabled
        >>> .v-input__slot
            cursor default
            background var(--v-light-grey-base) !important
            transition .3s

    .v-input.error--text
        fieldset
            border-width 1px

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

</style>
