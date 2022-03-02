<template>
    <privacy-policy/>
</template>

<script>
    import PrivacyPolicy from "../../components/home/PrivacyPolicy"
    export default {
        components: { PrivacyPolicy },
        auth: false,
        head() {
            return {
                title: 'Privacy Policy',
            }
        },
        data: () => ({})
    }
</script>

<style scoped lang="stylus">

</style>