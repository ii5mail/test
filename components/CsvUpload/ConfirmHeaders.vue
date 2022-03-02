<template>
    <v-container class="primary-text--text xs-font fade-in">
        <v-row class="justify-space-between pa-0">
            <v-col class="d-flex flex-column align-center justify-center text-center ">
                <span>n</span>
                new companies
            </v-col>
            <v-divider vertical/>
            <v-col class="d-flex flex-column align-center justify-center text-center xs-font">
                <span>n</span>
                columns from csv
            </v-col>
            <v-divider vertical/>
            <v-col class="d-flex flex-column align-center justify-center text-center xs-font">
                <span>n</span>
                columns matched
            </v-col>
            <v-divider vertical/>
            <v-col class="d-flex flex-column align-center justify-center text-center xs-font">
                <span>n</span>
                required columns
            </v-col>
            <v-divider vertical/>
            <v-col class="d-flex flex-column align-center justify-center text-center xs-font">
                <span>n</span>
                unmatched columns
            </v-col>
        </v-row>
        <v-row class="my-7 mt-11 pl-1 small-font">
            Let us know what to call each columns. If you leave a field blank, we won't import data for it.
        </v-row>

        <v-row class="white-dark rounded mb-4">
            <!-- Header Row -->
            <v-col class="px-2">
                Imported Field
            </v-col>
            <v-col class="px-2">
                ConstructionBevy Field
            </v-col>
            <v-col cols="1" class="pa-2 icon-col"/>
        </v-row>
        <v-row class="border-top">
            <v-col class="d-flex justify-space-between align-center py-1 px-2">
                <span>Company name*</span>
                <span class="mr-4">...Some Company Name</span>
            </v-col>
            <v-col class="py-1 px-2">
                <v-select
                    outlined
                    placeholder="Select a field link"
                    dense
                    hide-details
                    :menu-props="{offsetY: true, bottom: true}"
                />
            </v-col>
            <v-col cols="1" class="icon-col pa-0 d-flex align-center justify-center">
                <v-icon color="success">mdi-checkbox-marked-circle</v-icon>
            </v-col>
        </v-row>
        <v-row class="border-top">
            <v-col class="d-flex justify-space-between align-center py-1 px-2">
                <span>Company URL*</span>
                <span class="mr-4">domain.com</span>
            </v-col>
            <v-col class="py-1 px-2">
                <v-select
                    outlined
                    placeholder="Select a field link"
                    dense
                    hide-details
                    :menu-props="{offsetY: true, bottom: true}"
                />
            </v-col>
            <v-col cols="1" class="icon-col pa-0 d-flex align-center justify-center">
                <v-icon color="warning-light">mdi-alert</v-icon>
            </v-col>
        </v-row>
        <v-row class="border-top">
            <v-col class="d-flex justify-space-between align-center py-1 px-2">
                <span>Parent URL*</span>
                <span class="mr-4">domain.com</span>
            </v-col>
            <v-col class="py-1 px-2">
                <v-select
                    error
                    outlined
                    placeholder="Select a field link"
                    dense
                    hide-details
                    :menu-props="{offsetY: true, bottom: true}"
                />
            </v-col>
            <v-col cols="1" class="icon-col pa-0 d-flex align-center justify-center">
                <v-icon color="error">mdi-close-circle</v-icon>
            </v-col>
        </v-row>
        <v-row class="align-center justify-end mt-10">
            <p class="error--text ma-0 mr-2">Complete Required Fields</p>
            <cb-btn @click="submit" width="100px" :loading="loading">
                Next
            </cb-btn>
        </v-row>
    </v-container>
</template>

<script>
    import CbBtn from "../ui/CbBtn"

    export default {
        components: { CbBtn },
        data: ()=>({
            loading: false
        }),
        methods: {
            submit() {
                this.loading = true
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.loading = false
                        this.$emit('step')
                        resolve()
                    }, 500)
                })
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .border-top
        border-top 1px solid var(--v-grey-lighten2)

    .icon-col
        max-width: 35px;
</style>
