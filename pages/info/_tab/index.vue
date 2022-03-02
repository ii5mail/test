<template>
    <info/>
</template>

<script>
    import Info from "../../../components/home/Info"
    export default {
        components: { Info },
        auth: false,
        head() {
            return {
                title: 'Info',
            }
        },
        data: () => ({})
    }
</script>

<style scoped lang="stylus">

</style>