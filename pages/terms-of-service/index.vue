<template>
    <terms-of-service/>
</template>

<script>
    import TermsOfService from "../../components/home/TermsOfService"
    export default {
        components: { TermsOfService },
        auth: false,
        head() {
            return {
                title: 'Terms of Service',
            }
        },
        data: () => ({})
    }
</script>

<style scoped lang="stylus">

</style>