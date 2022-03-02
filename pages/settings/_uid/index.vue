<template>
    <settings />
</template>

<script>
    import Settings from '../../../components/settings/Settings.vue'

    export default {
        auth: true,
        components: {
            Settings,
        },
        head() {
            return {
                title: "Settings",
            }
        },
    }
</script>

<style scoped>
</style>
