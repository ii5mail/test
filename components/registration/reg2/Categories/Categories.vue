<template>
    <div class="fill-height">
        <account-sidebar/>
        <v-container
            class="d-flex align-center justify-center"
            :class="{
                'fill-height': loading || (organization.organization_type.id === 'other' && step ===2)
            }"
        >
            <v-card v-if="loading" class="justify-center transparent elevation-0 fade-in">
                <v-progress-circular
                    indeterminate
                    color="primary"
                />
            </v-card>
            <!-- <v-card
                class="transparent elevation-0"
                height="95%"
                width="100%"
                max-width="1100px"
                v-else-if="step === 1"
            >
                <v-card-title class="pb-0 pt-10">
                    <div class="display-1">Tell Us More About Your Business</div>
                </v-card-title>
                <v-card-text>
                    <p class="body-1 mb-10">
                        Customize your ConstructionBevy experience by selecting your business type.
                    </p>
                    <v-row>
                        <v-col cols="4" v-for="category in categories" class="pa-2" :key="category.id">
                            <div
                                class="photo-container" :class="{
                                'selected': selected.id === category.id,
                                'not_selected': Object.keys(selected).length && selected.id !== category.id
                            }"
                                @click="selected = category"
                            >
                                <img
                                    v-if="category.photo"
                                    :src="category.photo"
                                    rel="preload"
                                    :alt="category.name"
                                />

                            </div>
                            <div class="text-center mt-2">{{ category.name }}</div>
                        </v-col>
                        <v-col :cols="4" class="pa-2">
                            <div
                                class="photo-container" :class="{
                                'selected': selected.id === 'other',
                                'not_selected': Object.keys(selected).length && selected.id !== 'other'
                            }"
                                @click="selected = {id: 'other'}"
                            >
                                <img
                                    :src="other_img"
                                    rel="preload"
                                    alt="Other Category"
                                />

                            </div>
                            <div class="text-center mt-2">Other</div>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-btn @click="$router.push('/registration/workplace/')" text class="primary--text light-weight">
                        Go Back
                    </v-btn>
                    <v-spacer/>
                    <v-btn
                        class="mr-2"
                        color="primary"
                        width="135px"
                        large
                        depressed
                        :loading="loading"
                        :disabled="JSON.stringify(selected) === '{}'"
                        @click="submit_organization_type()"
                    >
                        Continue
                    </v-btn>
                </v-card-actions>
            </v-card> -->
            <market-segments
                @back="$router.push('/registration/workplace/')"
                @trade-type="step = 3"
                v-else-if="step === 2 && organization.organization_type.id !== 'other'"
                :parent_category="organization.organization_type"
                :org="organization"
                :office_location="curr_office_location"

            />
            <other-category @back="step = 1" v-else-if="step === 2 && organization.organization_type.id === 'other'" :org="organization"/>
            <trade-types
                @back="$router.push('/registration/workplace/')"
                v-else-if="step === 3"
                :parent_category="organization.organization_type"
                :org="organization"
                :office_location="curr_office_location"
            />
        </v-container>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import AccountSidebar from "../../../ui/AccountSidebar"
    import MarketSegments from "./MarketSegments"
    import TradeTypes from "./TradeTypes"
    import OtherCategory from "./OtherCategory"
    import other_img from '../../../../assets/images/category_images/other.png'

    export default {
        components: { OtherCategory, MarketSegments, TradeTypes, AccountSidebar },
        data() {
            return {
                loading: true,
                other_img,
                selected: {},
                step: 2,
                alert_errors: {},
                categories: [],

            }
        },
        computed: {
            ...mapState({
                organization: state => state.organizations.current
            }),
            curr_office_location() {
                return this.$auth.user.primary_office_location;
            },
            user() {
                return this.$auth.user
            },
        },
        watch: {
            async user() {
                await this.get_organization()
            }
        },
        async mounted() {
            this.loading = true
            await this.get_organization()
            const res = await this.$store.dispatch('categories/get_categories')
            this.categories = res.results
            if (this.organization.market_segments[0]?.supercategory?.name === 'Trade Partner') {
                this.selected = this.categories.filter((category) => {
                    return category.name === 'Trade Partner'
                })[0]
                this.step = 3
            }
            this.loading = false
        },
        methods: {
            async get_organization() {
                if (this.user) {
                    await this.$store.dispatch('organizations/get_current', this.$auth.user.primary_office_location.organization)
                }
            },
            back_from_tradetypes() {
                if (this.organization.office_locations.length > 1) {
                    this.$router.push('/registration/workplace/')
                } else {
                    this.step = 2
                }
            },
            async submit_organization_type() {
                if (this.selected.id) {
                    const payload_obj = { organization_type: this.selected.id }
                    /* End Setup of Payload */
                    await this.$store.dispatch('organizations/patch_organizations', {
                        id: this.organization.id,
                        payload: payload_obj
                    })
                    this.step = 2
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .v-container
        overflow-x: auto;

    .photo-container
        height 170px
        overflow hidden
        border 2px solid var(--v-light-purple-base) !important
        border-radius 5px
        transition .2s
        cursor pointer

        &:hover
            transform scale(1.03)

        img
            width 100%
            height 100%

    .selected
        border 4px solid var(--v-success-base) !important

    .not_selected
        opacity .6

</style>
