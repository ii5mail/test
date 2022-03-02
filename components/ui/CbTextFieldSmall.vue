<script>
    import { VTextField } from 'vuetify/lib'

    export default {
        extends: VTextField,
        mixins: [{
            props: {
                height: { default: '40' },
                dense: { default: true }
            }
        }],
    }
</script>
<style scoped lang="stylus">

    >>> .v-input__slot
        // allows us to adjust height in mounted function
        min-height 10px !important

    .v-input.v-input--is-focused
        fieldset
            border 2px solid var(--v-primary-base)
            transition .3s

    .v-input

        fieldset
            border 1px solid var(--v-black-base)
            transition .3s


    .v-input:not(.v-input--is-focused):hover >>> fieldset
        border 1px solid var(--v-primary-base)


</style>
