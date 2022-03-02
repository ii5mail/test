<template>
    <notifications />
</template>

<script>
    import Notifications from '../../components/notifications/Notifications.vue'

    export default {
        auth: true,
        components: {
            Notifications,
        },
        head() {
            return {
                title: "Notifications",
            }
        },
    }
</script>

<style scoped>
</style>
