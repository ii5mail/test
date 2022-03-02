<template>
    <div
        class="d-flex justify-end mt-5 mr-9 d-flex align-center text-decoration-underline"
    >
        <v-btn
            text
            small
            class="xs-font py-3 lh-20 primary-text--text text-decoration-underline light-weight"
            @click="on_back"
        >
            &#60; Go Back
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "BackButton",
        methods: {
            on_back() {
                this.$emit("on_back")
            },
        },
    }
</script>


<style lang="stylus" scoped></style>
