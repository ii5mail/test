<template>
    <categories/>
</template>
<script>
    import Categories from "../../../components/registration/reg2/Categories/Categories"

    export default {
        auth: false,
        components: { Categories },
        head() {
            return {
                title: "Business Info",
            }
        },
    }
</script>
<style scoped lang="stylus">
</style>
