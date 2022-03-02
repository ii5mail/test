<template>
    <div>
        <profile-toolbar @set_edit="on_edit_select"/>
        <v-row class="px-12 mt-12">
            <v-col cols="5">
                <v-row>
                    <v-icon class="mx-2">$vuetify.icons.info</v-icon>
                    <div class="medium-font">About</div>
                </v-row>
                <v-row class="xs-font ma-0 mt-5 mb-4">{{
                        organization.description
                    }}
                </v-row>
                <v-row class="xs-font ma-0">Size: {{ organization.employee_quantity }}</v-row>
                <!-- <v-row v-if="organization.size" class="xs-font ma-0">Size: {{ organization.size }} Employees</v-row> -->
                <v-row class="xs-font ma-0">
                    Ownership Status:
                </v-row>
                <v-row class="ma-0 mt-2">
                    <v-chip
                        v-for="type in [organization.ownership_type]"
                        :key="type"
                        class="mr-3 mb-3 px-3 xxs-font"
                        @click="go_to_market_search(type, 'Ownership Type')"
                    >
                        {{ type }}
                    </v-chip>
                </v-row>
                <!-- <v-row v-if="headquarters.address_1" class="xs-font ma-0">
                  {{ headquarters.address_1 }}
                </v-row> -->
                <!-- <v-row v-if="headquarters.address_2" class="xs-font ma-0">
                  {{ headquarters.address_2 }}
                </v-row> -->
                <!-- <v-row v-if="headquarters.city && headquarters.state && headquarters.zip_code" class="xs-font ma-0">
                  {{ headquarters.city }}, {{ headquarters.state }} {{ headquarters.zip_code }}
                </v-row> -->
                <v-row class="xs-font ma-0">{{ headquarters.address_1 }}</v-row>
                <v-row class="xs-font ma-0">
                    {{ headquarters.city }}, {{ headquarters.state }} {{ headquarters.zip_code }}
                </v-row>
                <!-- <v-row class="xs-font ma-0">Phone: {{ phone_display }}</v-row> -->
                <!-- <v-row v-if="organization.domain" class="xs-font ma-0 mb-4"
                  >Website: {{ organization.domain.name }}
                </v-row> -->
                <v-row class="xs-font ma-0">Website: {{ organization.domain_name }}</v-row>
                <!--                                <v-row class="xs-font ma-0">-->
                <!--                                    <v-icon class="mx-2">$vuetify.icons.flag</v-icon>-->
                <!--                                    <a href="#">-->
                <!--                                        <div class="xs-font">Claim this business</div>-->
                <!--                                    </a>-->
                <!--                                </v-row>-->
            </v-col>
            <v-col cols="7" class="">
                <v-row v-if="organization_type !== 'General Contractor'">
                    <v-icon class="mr-2">$vuetify.icons.hammer</v-icon>
                    <div class="medium-font">Trades</div>
                </v-row>
                <div v-if="organization_type !== 'General Contractor'">
                    <div v-for="(val, category) in trade_type_categories" :key="category">
                        <v-row class="xs-font bold-weight mt-5">{{ category }}</v-row>
                        <v-row class="mt-5">
                            <v-chip
                                v-for="(item, segment) in val"
                                :key="segment"
                                class="mr-3 mb-3 px-3 xxs-font"
                                @click="go_to_market_search(segment, 'Trade Type')"
                            >
                                {{ segment }}
                            </v-chip>
                        </v-row>
                    </div>
                </div>
                <v-row class="mt-6">
                    <v-icon class="mr-2">mdi-crosshairs-gps</v-icon>
                    <div class="medium-font">Market Segments</div>
                </v-row>
                <v-row class="mt-5">
                    <v-chip
                        v-for="market_segment in organization.market_segments"
                        :key="market_segment.name"
                        class="mr-3 mb-3 px-3 xxs-font"
                        @click="go_to_market_search(market_segment.name, 'Market Segment')"
                    >
                        {{ market_segment.name }}
                    </v-chip>
                </v-row>
            </v-col>
        </v-row>
        <v-row v-if="organization.gallery_photos[0]" class="px-12 mt-12">
            <v-col>
                <v-row>
                    <v-icon class="mx-2">$vuetify.icons.mountains</v-icon>
                    <div class="medium-font">Gallery</div>
                    <v-btn
                        text
                        class="lh-20 mt-1 ml-3 text-decoration-underline bold-weight xs-font"
                        @click="on_tab_change('gallery')"
                    >
                        View All
                    </v-btn>
                </v-row>
                <v-row class="my-7">
                    <gallery-item v-if="organization.gallery_photos[0]" :key="organization.gallery_photos[0].id" :photo="organization.gallery_photos[0]" class="mr-4"/>
                    <gallery-item v-if="organization.gallery_photos[1]" :key="organization.gallery_photos[1].id" :photo="organization.gallery_photos[1]" class="mr-4"/>
                    <gallery-item v-if="organization.gallery_photos[2]" :key="organization.gallery_photos[2].id" :photo="organization.gallery_photos[2]"/>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import ProfileToolbar from "../../ui/ProfileToolbar.vue"
    import GalleryItem from "../../ui/GalleryItem.vue"

    export default {
        components: { ProfileToolbar, GalleryItem },
        name: "Overview",
        props: {
            company: Object,
            organization: Object,
            organization_type: String,
            trade_type_categories: Object,
        },
        data() {
            return {
                trial_obj: {},
                category_obj: {},
                table_headers: [
                    {
                        text: "Project Name",
                        value: "name",
                        align: "start",
                        divider: true,
                    },
                    { text: "Type", value: "type", divider: true },
                    { text: "Location", value: "location" },
                ],
            }
        },
        methods: {
            on_tab_change(tab) {
                this.$emit("tab_change", tab)
            },
            on_edit_select() {
                this.$emit("set_edit", true)
            },
            async go_to_market_search(query, query_type) {
                if (query_type === 'Trade Type') {
                    await this.$router.push({
                        path: '/',
                        query: {
                            category: query,
                            type: 'Trade Partner'
                        }
                    })
                } else if (query_type === 'Market Segment') {
                    await this.$router.push({
                        path: '/',
                        query: {
                            category: query,
                        }
                    })
                } else if (query_type === 'Ownership Type') {
                    await this.$router.push({
                        path: '/',
                        query: {
                            ownership_types: query,
                        }
                    })
                }
            },
        },
        computed: {
            // headquarters() {
            //   for (var i = 0; i < this.organization.office_locations; i++) {
            //     if (this.organization.office_locations[i].is_headquarters)
            //       return this.organization.office_locations[i];
            //   }
            //   return null
            // },
            headquarters() {
                return this.organization.office_locations.find(({ office_type }) => office_type === "Headquarters") || undefined
            },
            phone_display() {
                if (this.headquarters.phone_number.slice(0, 2) === '+1') {
                    return '(' + this.headquarters.phone_number.slice(2, 5)
                        + ')-' + this.headquarters.phone_number.slice(5, 8)
                        + '-' + this.headquarters.phone_number.slice(8)
                } else {
                    return this.headquarters.phone_number
                }
            },
        },
    }
</script>

<style lang="stylus" scoped>
    .coming-soon {
        border: 4px solid var(--v-light-purple-base);
        min-width: 260px;
        min-height: 250px;
    }

    .v-chip
        height 20px
        color white
        background-color #93ACC9 !important
</style>
