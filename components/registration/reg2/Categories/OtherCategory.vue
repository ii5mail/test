<template>
    <div class="fill-height d-flex align-center">
        <v-card class="transparent elevation-0" width="550px">
            <v-card-title class="pb-0">
                <div class="display-1">Describe Your Business</div>
            </v-card-title>
            <v-form @submit.prevent="submit" novalidate>
                <v-card-text class="pb-0">
                    <div>
                        <p class="body-1">
                            Customize your ConstructionBevy experience by selecting your business
                            type.
                        </p>
                    </div>

                    <div>
                        <form-error :msg="errors"/>

                        <div>
                            <div class="caption primary-text--text">Other Category(ies)</div>
                            <cb-combobox
                                placeholder="i.e. Janitorial Services"
                                v-model="selected"
                                :menu-props="{ bottom: true, offsetY: true }"
                                :items="list_items"
                                item-text="name"
                                item-value="id"
                                :search-input.sync="search_text"
                                :return-object="true"
                                :height="null"
                                multiple
                            >
                                <template v-slot:selection="{ item }">
                                    <v-chip>
                                        {{ item.name || item }}
                                    </v-chip>
                                </template>
                            </cb-combobox>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions class="px-4">
                    <v-btn @click="$emit('back')" text class="primary--text light-weight">
                        Go Back
                    </v-btn>
                    <v-spacer/>
                    <v-btn
                        type="submit"
                        color="primary"
                        width="135px"
                        large
                        depressed
                        :loading="loading"
                        :disabled="!selected || (selected ? !selected.length : true)"
                    >
                        Continue
                    </v-btn>
                </v-card-actions>
            </v-form>

        </v-card>
    </div>

</template>

<script>
    import FormError from "~/components/ui/FormError"
    import CbCombobox from "~/components/ui/CbCombobox"

    export default {
        props: ['org'],
        components: { CbCombobox, FormError },
        data() {
            return {
                errors: {},
                loading: false,
                selected: null,
                search_text: null,
                list_items: [],
            }
        },
        watch: {
            search_text() {
                this.get_list()
            }
        },
        async mounted() {
            this.get_list()
            this.selected = this.org.categories
        },
        methods: {
            get_list: _.debounce(async function () {
                this.list_items = await this.$store.dispatch('categories/get_tertiary_categories', this.search_text)
            }, 250),
            async submit() {
                this.loading = true
                try {
                    const category_ids = []
                    const custom_categories = []
                    for (let category of this.selected) {
                        if (category === category.toString()) {
                            custom_categories.push({ name: category })
                        } else {
                            category_ids.push(category.id)
                        }
                    }
                    if (category_ids.length || custom_categories.length) {
                        await this.$store.dispatch('organizations/patch_organizations', {
                            id: this.org.id,
                            payload: { categories: category_ids, custom_categories }
                        })
                    }
                    await this.$router.push('/registration/description')
                } catch (e) {
                    console.error(e)
                } finally {
                    this.loading = false
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .v-form
        width 100%

    >>> .v-input__slot
        min-height 50px !important

    >>> .v-chip
        margin 4px 8px !important
</style>
