<template>
    <email-entry/>
</template>
<script>
    import EmailEntry from "@/components/registration/reg1/EmailEntry.vue"

    export default {
        auth: false,
        components: { EmailEntry },
        head() {
            return {
                title: "Enter Email",
            }
        },
    }
</script>
<style scoped lang="stylus">
</style>
