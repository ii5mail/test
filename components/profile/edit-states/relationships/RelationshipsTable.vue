<template>
    <div>
        <v-row class="mx-12 mt-8 pr-6 flex-column">
            <v-row>
                <v-col class="d-flex align-center">
                    <v-icon class="mx-2">$vuetify.icons.linkage</v-icon>
                    <div class="medium-font">Relationships</div>
                </v-col>
                <v-col v-if="formatted_requests.length" class="d-flex align-center justify-end">
                    <cb-btn
                        @click="$emit('next_step')"
                        :large="false"
                    >
                        Add New
                    </cb-btn>
                </v-col>
            </v-row>
            <v-container v-if="loading" class="d-flex justify-center align-center py-16">
                <v-progress-circular indeterminate color="primary"/>
            </v-container>
            <v-container v-else>
                <a @click="show_requests = !show_requests">
                    {{
                        show_requests ? 'Back to Relationship Listing' :
                            `View Requests (${ formatted_requests.length })`
                    }}
                </a>
                <div class="fill-width mt-10">
                    <detail-view
                        v-if="!show_requests"
                        :organization="organization"
                        :organization_type="organization_type"
                        :incoming_data="current_relationships"
                        @set_edit="$emit('next_step')"
                    />
                    <v-data-table
                        v-else-if="formatted_requests.length"
                        :headers="request_headers"
                        :items="formatted_requests"
                    >
                        <template v-slot:[`item.action`]="{ item }">
                            <div class="d-flex justify-center align-center">
                                <v-progress-circular
                                    v-if="loading_requests[item.id]"
                                    indeterminate
                                    size="15"
                                    width="2"
                                />
                                <span v-else>

                                <a
                                    v-if="item.status !== 'Approved'"
                                    @click="approve_or_reject_request(item.id, 'approve')"
                                    class="text-decoration-underline"
                                >
                                    Approve
                                </a>
                                <a
                                    v-else
                                    @click="approve_or_reject_request(item.id, 'reject')"
                                    class="error--text text-decoration-underline"
                                >
                                    Reject
                                </a>
                                </span>
                            </div>
                        </template>
                    </v-data-table>
                    <div v-else class="d-flex justify-center py-16">
                        No Requests Found
                    </div>
                </div>
            </v-container>
        </v-row>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import CbBtn from "../../../ui/CbBtn"
    import DetailView from "../../tabs/relationships/DetailView"

    export default {
        components: { DetailView, CbBtn },
        props: {
            organization: Object,
            current_relationships: Array,
            loading: Boolean
        },
        data: () => ({
            show_requests: false,
            loading_requests: {}
        }),
        computed: {
            ...mapState({
                relationship_requests: state => state.relationships.requests_list
            }),
            organization_type() {
                return this.organization.office_locations.find(({ office_type }) => office_type === "Headquarters")?.categories[0]
                    ?.supercategory?.supercategory.name
            },
            request_headers() {
                return [
                    { text: 'Company Type', value: 'organization_type' },
                    { text: 'Company Name', value: 'organization_name' },
                    { text: "Access Granted To", value: 'access_granted_to' },
                    { text: 'Date Requested', value: 'date_requested' },
                    { text: 'Status', value: 'status' },
                    { text: '', value: 'action', sortable: false, width: 100 },
                ]
            },
            formatted_requests() {
                const new_requests = []
                if (this.relationship_requests.length) {
                    this.relationship_requests.forEach((req) => {
                        new_requests.push({
                            id: req.id,
                            status: req.status,
                            organization_type: req.created_by?.primary_office_location_type,
                            name: '',
                            access_granted_to: `${ req.created_by?.first_name } ${ req.created_by?.last_name }`,
                            date_requested: this.$moment(req.created_when).format('MM/DD/YYYY'),
                            organization_name: req.created_by?.primary_organization.name
                        })
                    })
                }
                return new_requests
            },

        },
        methods: {
            async approve_or_reject_request(id, type) {
                this.$set(this.loading_requests, id, true)
                try {
                    await this.$store.dispatch('relationships/patch_request', {
                        id,
                        payload: { status: type === 'approve' ? "Approved" : "Rejected" }
                    })

                    await this.$store.dispatch('relationships/get_open_requests')
                } catch (e) {
                    this.$snackbar.show_message({ content: 'Error Occurred', type: 'error' })
                } finally {
                    this.$set(this.loading_requests, id, false)
                }
            }

        },
    }
</script>

<style scoped lang="stylus">
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

