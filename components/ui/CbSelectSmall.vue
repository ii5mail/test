<script>
    import { VSelect } from 'vuetify/lib'
    import ArrowLineDownSmall from "./icons/ArrowLineDownSmall"

    export default {
        extends: VSelect,
        props: ['small'],
        mixins: [{
            props: {
                // Override default props here
                appendIcon: { default: 'mdi-chevron-down' },
                height: { default: '40' },
                outlined: { default: true },
                dense: { default: true },
            }
        }],
        methods: {
            genIconSlot() {
                const child_nodes = []
                const icon_node = this.$createElement(ArrowLineDownSmall)
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

    .v-input.v-input--is-focused
        fieldset
            border 2px solid var(--v-primary-base)
            transition .3s

    .v-input

        &:hover
            .v-icon
                color var(--v-black-base)

        fieldset
            border 1px solid var(--v-grey-base)
            transition .3s


    .v-input:not(.v-input--is-focused):hover >>> fieldset
        border 1px solid var(--v-primary-base)

</style>
