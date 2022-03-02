<script>
    import { VTextField } from 'vuetify/lib'

    export default {
        extends: VTextField,
        mixins: [{
            props: {
                height: { default: '50' },
                dense: { default: true },
            }
        }]
    }
</script>
<style scoped lang="stylus">

    >>> .v-input__slot
        // allows us to adjust height in mounted function
        min-height 10px !important

    .v-input.v-input--is-focused:not(.error--text)
        fieldset
            border 2px solid var(--v-primary-base)
            transition .3s

    .v-input.error--text
        fieldset
            border-width 1px

    .v-input:not(.error--text):not(.v-input--is-disabled)
        fieldset
            border 1px solid var(--v-black-base)
            transition .3s


    .v-input:not(.v-input--is-focused):not(.error--text):hover >>> fieldset
        border 1px solid var(--v-primary-base)


</style>
