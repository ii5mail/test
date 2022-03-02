<template>
    <div>
        <profile-toolbar />
        <div class="mx-12 mt-12 pr-6">
            <v-row class="justify-space-between d-flex mb-1">
                <v-col class="d-flex align-center">
                    <v-icon class="mx-2">$vuetify.icons.people</v-icon>
                    <div class="medium-font">Projects</div>
                </v-col>
                <v-col cols="2">
                    <cb-select-small
                        placeholder="Status"
                        :menu-props="{ bottom: true, offsetY: true }"
                        hide-details
                    />
                </v-col>
                <v-col cols="2">
                    <cb-select-small
                        placeholder="All Project Types"
                        :menu-props="{ bottom: true, offsetY: true }"
                        hide-details
                    />
                </v-col>
                <v-col cols="2">
                    <cb-select-small
                        placeholder="All Locations"
                        :menu-props="{ bottom: true, offsetY: true }"
                        hide-details
                    />
                </v-col>
                <v-col cols="2">
                    <cb-select-small
                        placeholder="All Projects"
                        :menu-props="{ bottom: true, offsetY: true }"
                        hide-details
                    />
                </v-col>
            </v-row>
            <div class="px-3 mt-14 table-container">
                <v-data-table
                    :headers="project_table_header"
                    :items="project_data"
                    disable-pagination
                    hide-default-footer
                    dense
                >
                    <template v-slot:item.icon="{item}">
                        <v-btn icon>
                            <v-icon color="primary-light">$vuetify.icons.upload</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </div>
        </div>
    </div>
</template>

<script>
    import ProfileToolbar from "../../ui/ProfileToolbar.vue"
    import CbSelectSmall from "../../ui/CbSelectSmall"
    import { project_table_header, project_data } from './temp_utils'

    export default {
        components: { CbSelectSmall, ProfileToolbar },
        name: "Projects",
        data: () => ({
            project_data,
            project_table_header
        })
    }
</script>

<style lang="stylus" scoped>
    .table-container
        max-width: 85vw;

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
                border-bottom 1px solid var(--v-light-purple-base) !important
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
