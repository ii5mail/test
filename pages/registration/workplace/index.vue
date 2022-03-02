<template>
    <Workplace/>
</template>
<script>
    import Workplace from "../../../components/registration/reg2/Workplace"

    export default {
        auth: false,
        components: { Workplace },
        head() {
            return {
                title: "Workplace",
            }
        },
    }
</script>
<style scoped lang="stylus">
</style>
