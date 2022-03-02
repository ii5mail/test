<template>
    <company-info/>
</template>
<script>
    import CompanyInfo from "../../../components/registration/reg3/CompanyInfo"

    export default {
        auth: false,
        components: { CompanyInfo },
        head() {
            return {
                title: "Description",
            }
        },
    }
</script>
<style scoped lang="stylus">
</style>
