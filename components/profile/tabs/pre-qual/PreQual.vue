<template>
    <div>
        <profile-toolbar @set_edit="on_edit_select"/>
        <v-row class="px-12 mt-12 flex-column">
            <v-col>
                <v-row>
                    <v-col class="pa-0 ma-0 d-flex align-center">
                        <v-icon class="mx-2">$vuetify.icons.a_plus_circled</v-icon>
                        <div class="medium-font">Pre Qual</div>
                    </v-col>
                    <v-col class="pa-0 ma-0 d-flex justify-end">
                        <cb-btn
                            :large="false"
                            @click="show_dialog = true"
                            :disabled="access_granted"
                        >
                            {{ access_granted ? "Access Granted" : 'Request Access' }}
                        </cb-btn>
                    </v-col>
                </v-row>
                <v-row class="mt-15">
                    <v-col class="d-flex justify-end">
                        <div
                            class="display-box d-flex align-center justify-center elevation-1 pa-5 text-center rounded-lg">
                            <span class="value">
                                <img
                                    v-if="!access_granted"
                                    src="~/assets/images/misc/question-mark.png"
                                    alt="question mark"
                                    width="18px"
                                />
                                <span v-else>1.3</span>
                            </span>
                            EMR Score
                        </div>
                    </v-col>
                    <v-col class="d-flex justify-start">
                        <div
                            class="display-box d-flex align-center justify-center elevation-1 pa-5 text-center rounded-lg">
                            <span class="value">
                                <img
                                    v-if="!access_granted"
                                    src="~/assets/images/misc/question-mark.png"
                                    alt="question mark"
                                    width="18px"
                                />
                                <span v-else>1M+</span>

                            </span>
                            Single Project Capacity
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <v-divider class="my-10"/>
            <v-col>
                <div class="large-font text-center light-weight">
                    Fully customizable Pre Qual coming soon!
                </div>
                <div class="medium-font light-weight text-center mt-2 mb-10">
                    Unique workflow to to significantly reduce admin time for GCs and Subs.
                </div>
            </v-col>
            <img
                src="~/assets/images/misc/prequal.png"
                alt="Pre Qual Preview"
                width="100%"
            />
        </v-row>
        <grant-access-dialog
            v-model="show_dialog"
            :organization="organization"
            @grant_access="access_granted = true"
        />
    </div>
</template>

<script>
    import ProfileToolbar from "../../../ui/ProfileToolbar.vue"
    import CbBtn from "../../../ui/CbBtn"
    import GrantAccessDialog from "./GrantAccessDialog"

    export default {
        components: { GrantAccessDialog, CbBtn, ProfileToolbar },
        name: "Prequal",
        props: {
            company: Object,
            organization: Object,
        },
        data: () => ({
            show_dialog: false,
            access_granted: false
        }),
        methods: {
            on_tab_change(tab) {
                this.$emit("tab_change", tab)
            },
            on_edit_select() {
                this.$emit("set_edit", true)
            },

        },
    }
</script>

<style lang="stylus" scoped>
    .display-box
        width 340px
        border 1px solid var(--v-primary-light-base)
        font-size 20px

        .value
            font-weight $heavy-weight
            margin-right 10px
            color var(--v-primary-base)
</style>
