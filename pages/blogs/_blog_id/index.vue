<template>
    <blog/>
</template>

<script>
    import Blog from "../../../components/home/blogs/Blog.vue"
    export default {
        components: { Blog },
        auth: false,
        head() {
            return {
                title: 'Blog',
            }
        },
        data: () => ({})
    }
</script>

<style scoped lang="stylus">

</style>