<template>
    <!--        @input="input"-->
    <cb-text-field
        :value="value"
        @input="input"
        outlined
        placeholder="+1 (208) 555-8828"
        name="phone_number"
        :error="!!error"
        :error-messages="error_messages"
        type="text"
    />
</template>

<script>
    import CbTextField from "./CbTextField"

    export default {
        components: { CbTextField },
        props: {
            value: String,
            error_messages: Array,
            error: Boolean
        },
        methods: {
            input(e) {
                this.$emit('input', e)
            },

        },
    }
</script>

<style scoped lang="stylus">

</style>


