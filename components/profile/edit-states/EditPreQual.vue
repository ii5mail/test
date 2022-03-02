<template>
    <div>
        <back-button @on_back="on_back_select"/>
        <v-container class="pa-16 pt-12 d-flex align-center flex-column">
            <v-card
                width="650px"
                class="transparent elevation-0"
            >
                <v-card-title class="light-weight">
                    <v-icon class="mr-2" size="35">$vuetify.icons.a_plus_circled</v-icon>
                    <div class="large-font light-weight">Pre Qual</div>
                </v-card-title>
                <v-card-text class="primary-text--text">
                    <div class="mt-5 mb-8">Need some sort of text here.</div>
                    <v-row>
                        <v-col>
                            EMR Score
                            <cb-text-field
                                outlined
                            />
                        </v-col>
                        <v-col>
                            Single Project Capacity
                            <cb-select/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <checkbox v-model="checked"/>
                            <div class="ml-7 pt-3px">Only show this to users I have approved.</div>
                        </v-col>
                        <v-col class="d-flex justify-end" cols="2">
                            <cb-btn>
                                Save
                            </cb-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-divider width="100%" class="my-10"/>
            <v-card class="transparent" width="100%">
                <v-data-table
                    :headers="table_headers"
                    :items="results"
                    v-if="results.length"
                    :hide-default-footer="results.length < 10"
                >
                    <template v-slot:[`item.action`]>
                        <v-btn text small class="text-decoration-underline blue--text">
                            Show
                        </v-btn>
                    </template>
                </v-data-table>
                <div class="text-center" v-else>
                    Once a ConstructionBevy user has requested access to your Pre Qual data, it will show here with the
                    ability to allow access or revoke access for those you have previously accepted.
                </div>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import BackButton from "../../ui/BackBtn"
    import CbTextField from "../../ui/CbTextField"
    import CbSelect from "../../ui/CbSelect"
    import CbBtn from "../../ui/CbBtn"
    import Checkbox from "../../ui/Checkbox"

    export default {
        components: { CbBtn, CbSelect, CbTextField, BackButton, Checkbox },
        data: () => ({
            checked: false,
            results: [
                {organization_type: 'General', name: "MG Glass", granted_to: "Tabby Moore", date: "02/07/21"}
            ],
            table_headers: [
                { text: 'Company Type', value: 'organization_type' },
                { text: 'Company Name', value: 'name' },
                { text: 'Access Granted To', value: 'granted_to' },
                { text: 'Date Granted', value: 'date' },
                { text: '', value: 'action', sortable: false, width: 50 }

            ]
        }),
        methods: {
            on_back_select() {
                this.$emit("set_edit", false)
            },
        },
    }
</script>

<style scoped lang="stylus">
    >>> .wrapper
        margin 0 !important

    .v-divider
        border-width 1px
        border-color var(--v-grey-base) !important

    .v-data-table

        >>> table
            border 1px solid var(--v-light-purple-base)
            border-bottom: none
            border-right: none
            border-radius 4px

        >>> thead
            .text-start
                font-size 12px !important
                color var(--v-primary-text-base) !important
                border-bottom 1px solid var(--v-primary-text-base) !important
                border-right 1px solid var(--v-light-purple-base) !important

        >>> tbody
            .text-start
                font-size 14px !important
                border-bottom 1px solid var(--v-light-purple-base) !important
                border-right 1px solid var(--v-light-purple-base) !important

        >>> .v-data-table__wrapper::-webkit-scrollbar {
            height: 5px !important;
        }

        >>> .v-data-table__wrapper
            /* Track */
            &::-webkit-scrollbar-track
                background: #f1f1f1;
                transition .2s

        >>> .v-data-table__wrapper
            /* Handle */

            &::-webkit-scrollbar-thumb
                background: #888;
                transition .2s

        >>> .v-data-table__wrapper
            /* Handle on hover */

            &::-webkit-scrollbar-thumb:hover
                background: #555;
                transition .2s
</style>
