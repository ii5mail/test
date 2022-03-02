<template>
    <v-container class="primary-text--text mt-10 fade-in">
        <v-row class="text-center medium-font align-center justify-center">
            We’re processing your CSV now, we’ll send an email shortly.
        </v-row>
        <v-row class="text-center large-font align-center lh-36 justify-center mt-10">
            Want to get your sub contractors new leads? Invite them to ConstructionBevy and they’ll join the community.
        </v-row>
        <v-row class="justify-center align-center my-16">
            <img
                :src="UploadSuccess"
                alt="Upload Success Group"
            />

        </v-row>

        <v-row class="justify-center align-center">
            <cb-btn>
                Invite Them
            </cb-btn>
        </v-row>

        <v-row class="justify-center align-center mt-10">
            <cb-btn text small>
                Don’t Invite Them To ConstructionBevy
            </cb-btn>
        </v-row>
    </v-container>
</template>
<script>
    import UploadSuccess from "../../assets/images/misc/upload-success.png"
    import CbBtn from "../ui/CbBtn"

    export default {
        components: { CbBtn },
        data: ()=>({
            UploadSuccess
        })

    }
</script>
<style scoped lang="stylus">

</style>
