<template>
    <email-validation/>
</template>
<script>
    import EmailValidation from "@/components/registration/reg1/EmailValidation"

    export default {
        auth: false,
        components: { EmailValidation },
        head() {
            return {
                title: "Validate Email",
            }
        },
    }
</script>
<style scoped lang="stylus">
</style>
