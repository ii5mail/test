<template>
    <search-market v-if="logged_in || $route.query"/>
    <home v-else/>
</template>

<script>
    import SearchMarket from "@/components/search-market/SearchMarket"
    import Home from "@/components/home/Home"

    export default {
        auth: false,
        components: { SearchMarket, Home },
        head() {
            return {
                title: "Home",
            }
        },
        data() {
            return {}
        },
        computed: {
            logged_in() {
                return this.$auth.loggedIn
            },
        }
    }
</script>
