<template>
    <div class="fill-width mt-10">
        <v-data-table
            v-if="table_data.length"
            :headers="headers"
            :items="table_data"
        >
            <template v-slot:[`item.name`]="{item}">
                <div class="d-flex align-center">
                    {{ item.name }}
                    <v-icon class="ml-1" size="15" v-if="item.confirmed">$vuetify.icons.checkmark_circled</v-icon>
                </div>
            </template>
            <template v-slot:[`item.company_contact`]="{item}">
                <a :href="item.company_contact.email ? `mailto:${item.company_contact.email}` : ''">
                    {{ item.company_contact.name }}
                </a>
            </template>
            <template v-slot:[`item.categories`]="{item}">
                <v-chip
                    class="xxs-font my-1 text-capitalize"
                    v-for="(trade, index) in item.categories"
                    :key="index"
                    @click="go_to_market_search(trade)"
                >
                    {{ trade }}
                </v-chip>
            </template>

        </v-data-table>
        <div v-else class="mt-6">
            <empty-relationship
                @set_edit="$emit('set_edit')"
            />
        </div>
    </div>
</template>

<script>
    import EmptyRelationship from "./EmptyRelationship.vue"

    export default {
        components: {
            EmptyRelationship,
        },
        props: {
            organization: Object,
            incoming_data: Array,
            organization_type: String
        },
        data: () => ({
            table_data: [],
            items: [],
            relationship_data: [],
        }),
        computed: {
            headers() {
                const is_sub = this.organization_type === 'Trade Partner'
                if (is_sub) {
                    return [
                        { text: 'Office Location', value: 'location' },
                        { text: 'GC', value: 'name' },
                        { text: "GC Office Location", value: 'office_location' },
                        { text: 'Project Manager', value: 'company_contact' },
                        { text: 'Trades Completed', value: 'categories' },
                        { text: 'Last Completed Work', value: 'last_project_completed', width: '100px' },
                    ]
                } else {
                    return [
                        { text: 'Office Location', value: 'location' },
                        { text: 'Subs', value: 'name' },
                        { text: "Sub Office Location", value: 'office_location' },
                        { text: 'Lead Estimator', value: 'company_contact' },
                        { text: "Trades Completed", value: 'categories' },
                        { text: 'Last Completed Work', value: 'last_project_completed' },
                    ]
                }
            }

        },
        watch: {
            incoming_data: {
                immediate: true,
                handler() {
                    if (this.incoming_data) {
                        this.relationship_data = this.incoming_data
                        this.set_up_table_data()
                    }
                }
            },
            relationship_data: {
                deep: true,
                handler() {
                    this.set_up_table_data()
                }

            }
        },
        mounted() {

            if (!this.incoming_data) {
                this.get_relationships()
            }
        },
        methods: {
            async go_to_market_search(trade) {
                await this.$router.push({
                    path: '/',
                    query: {
                        category: trade,
                    }
                })
            },
            set_up_table_data() {
                const is_sub = this.organization_type === 'Trade Partner'
                const org_type = is_sub ? 'general_contractor' : 'sub_contractor'
                const table_data = []

                this.relationship_data.forEach((obj) => {
                    const org = obj[org_type]
                    const own_org_headquarters = this.organization.office_locations?.find(({ office_type }) => office_type === 'Headquarters')
                    const other_org_headquarters = this.organization.office_locations?.find(({ office_type }) => office_type === 'Headquarters')
                    table_data.push({
                        location: own_org_headquarters ? own_org_headquarters.city + ', ' + own_org_headquarters.state : 'No Headquarters found',
                        name: org.name,
                        office_location: other_org_headquarters ? other_org_headquarters.city + ', ' + other_org_headquarters.state : 'No Headquarters found',
                        company_contact: {
                            name: obj.company_contact_first_name ? `${ obj.company_contact_first_name } ${ obj.company_contact_last_name } ` : 'No Name Provided',
                            email: obj.company_contact_email
                        },
                        confirmed: obj.confirmed,
                        categories: obj.trades_performed.map(({ name, supercategory }) => {
                            let key = name
                            if (key === 'N/A') {
                                key = supercategory?.supercategory?.name
                            }
                            return key
                        }),
                        last_project_completed: obj.year_last_project_completed ? obj.year_last_project_completed : 'N/A'
                    })
                })
                this.table_data = table_data
            },
            async get_relationships() {
                try {
                    const res = await this.$axios.get('/api/relationships/')
                    this.relationship_data = res.data.results
                } catch (e) {
                    console.error(e)
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
    .v-data-table
        >>> .v-chip
            height 25px
            margin-left: 2px
            margin-right: 2px
            color white
            background-color #93ACC9 !important

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
            th
                padding-right 10px !important

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

    .empty-relation-img
        margin-top -36px

</style>
