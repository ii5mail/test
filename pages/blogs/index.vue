<template>
    <blogs/>
</template>

<script>
    import Blogs from "../../components/home/blogs/Blogs.vue"
    export default {
        components: { Blogs },
        auth: false,
        head() {
            return {
                title: 'Blogs',
            }
        },
        data: () => ({})
    }
</script>

<style scoped lang="stylus">

</style>