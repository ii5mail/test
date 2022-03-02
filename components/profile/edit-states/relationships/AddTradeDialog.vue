<template>
    <div>
        <v-dialog
            persistent
            width="630px"
            :value="value"
        >
            <v-card class="pa-10 relative">
                <v-btn icon class="absolute right top" @click="$emit('input', !value)">
                    <v-icon color="black">mdi-close</v-icon>
                </v-btn>
                <v-card-title class="large-font light-weight primary-text--text">
                    Add Additional Trades
                </v-card-title>
                <v-card-text class="pt-2">
                    <div class="small-font primary-text--text">
                        Here are all the trades listed in your profile. Customize where you offer these trades in the
                        Locations & Areas Served tab.
                    </div>
                    <v-chip
                        class="mr-2 px-3 py-2 my-1 xs-font light-blue-grey"
                        v-for="trade in location.categories"
                    >
                        {{ trade.name === 'N/A' ? trade.supercategory.supercategory.name : trade.name }}
                    </v-chip>
                    <div class="mt-2 primary-text--text">Add a Trade to Your Profile</div>
                    <cb-autocomplete
                        v-model="selected_category"
                        placeholder="Start typing a trade"
                        type="select"
                        :menu-props="{ bottom: true, offsetY: true }"
                        :items="all_categories"
                        item-value="id"
                        item-text="name"
                        :error="!!errors.categories"
                        :error-messages="errors.categories"
                    />
                    <div class="small-font">Where do you offer this trade?</div>
                    <cb-autocomplete
                        v-model="selected_location"
                        :items="organization.office_locations"
                        item-value="id"
                        placeholder="Select Locations"
                        :menu-props="{ bottom: true, offsetY: true }"
                    >
                        <template v-slot:item="{ item }">
                            <div class="d-flex flex-column">
                                <div>{{ item.city }}, {{ item.state }}</div>
                                <div class="xxs-font">{{ item.address_1 }}</div>
                            </div>
                        </template>
                        <template v-slot:selection="{ item }">
                            <div class="d-flex flex-column">
                                <div>{{ item.city }}, {{ item.state }}</div>
                                <div class="xxs-font">{{ item.address_1 }}</div>
                            </div>
                        </template>
                    </cb-autocomplete>
                </v-card-text>
                <v-card-actions class="d-flex flex-column align-end">
                    <div class="d-flex justify-end align-center">
                        <a class="mr-3" @click="add_category(true)">Save and Add Another</a>
                        <cb-btn
                            :large="false"
                            @click="add_category(false)"
                            :loading="saving"
                        >
                            Save
                        </cb-btn>
                    </div>
                    <div class="pt-0 text-right caption error--text" v-if="Object.keys(errors).length">
                        Error Occurred
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import CbAutocomplete from "../../../ui/CbAutocomplete"
    import CbBtn from "../../../ui/CbBtn"

    export default {
        components: { CbAutocomplete, CbBtn },
        props: {
            value: Boolean,
            location: { type: Object, default: {} },
            organization: { type: Object, default: {} }
        },
        data: () => ({
            all_categories: [],
            selected_location: null,
            selected_category: null,
            errors: {},
            saving: false
        }),
        computed: {
            ...mapState({
                organization_type: state => state.organizations.organization_type,
            }),
        },
        watch: {
            organization: {
                immediate: true,
                async handler() {
                    if (this.organization.office_locations?.length === 1) {
                        this.selected_location = this.organization.office_locations[0].id
                    }
                    // set up categories based on org type
                    const res = await this.$store.dispatch('categories/get_categories')
                    const secondaries = res.results.find(({ name }) => name === this.organization_type)?.subcategories
                    const all_categories = []
                    secondaries?.forEach(({ subcategories }) => {
                        subcategories.forEach(obj => {
                            all_categories.push(obj)
                        })
                    })
                    const na_index = all_categories?.findIndex(({ name }) => name === 'N/A')
                    all_categories?.splice(na_index, 1)

                    this.all_categories = all_categories
                }
            },
        },
        methods: {
            async add_category(add_another) {
                this.errors = {}
                const payload = {
                    categories: [
                        ...this.location.categories.map(({ id }) => id),
                        this.selected_category
                    ]
                }

                try {
                    this.saving = true
                    await this.$axios.patch(`/api/office_locations/${ this.selected_location }/`, payload)
                    await this.$store.dispatch('organizations/get_current', this.organization.id)

                    if (!add_another) {
                        this.$emit('input', false)
                    } else {
                        this.selected_category = null
                        this.selected_location = null
                        if (this.organization.office_locations?.length === 1) {
                            this.selected_location = this.organization.office_locations[0].id
                        }
                    }
                } catch (e) {
                    this.errors = e.response.data
                } finally {
                    this.saving = false
                }
            }
        },
    }
</script>

<style scoped lang="stylus">

</style>
