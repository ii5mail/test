<template>
    <name-entry/>
</template>
<script>
    import NameEntry from "@/components/registration/reg1/NameEntry"

    export default {
        auth: false,
        components: { NameEntry },
        head() {
            return {
                title: "Add Name",
            }
        },
    }
</script>
<style scoped lang="stylus">
</style>
