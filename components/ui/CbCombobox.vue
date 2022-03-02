<script>
    import { VCombobox } from 'vuetify/lib'

    export default {
        extends: VCombobox,
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
        }]

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
