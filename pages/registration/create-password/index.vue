<template>
    <password-entry/>
</template>
<script>
    import PasswordEntry from "@/components/registration/reg1/PasswordEntry"

    export default {
        auth: false,
        components: { PasswordEntry },
        head() {
            return {
                title: "Create Password",
            }
        },
    }
</script>
<style scoped lang="stylus">
</style>
