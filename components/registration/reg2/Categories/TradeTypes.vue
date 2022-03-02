<template>
    <v-card class="transparent elevation-0" height="95%" width="100%">
        <v-card-title v-if="step === 1" class="pb-0">
            <div class="display-1">{{ parent_category.name }} CSI Categories</div>
        </v-card-title>
        <v-card-title v-else-if="step === 2" class="d-flex justify-space-between pb-0">
            <div class="display-1">Confirm Selected Categories</div>
            <div>

                <v-btn @click="step = 1" text class="primary--text light-weight">
                    Go Back
                </v-btn>
                <v-btn
                    class=""
                    color="primary"
                    width="135px"
                    large
                    depressed
                    :loading="loading"
                    @click="submit"
                    :disabled="btn_is_disabled"
                >
                    Continue
                </v-btn>
            </div>
        </v-card-title>
        <v-card-text class="pb-0">

            <p class="body-1 mb-10">
                Customize your ConstructionBevy experience by selecting your business type.
            </p>

            <div v-if="step === 1" class="d-flex justify-space-between">
                <div class="images-container">
                    <div>
                        <v-row class="pa-0">
                            <div
                                v-for="category in duplicate_categories"
                                :key="category.id"
                                :class="{'selected': category.selected}"
                                class="img pa-0 elevation-1"
                                @click="select_category(category)"
                            >
                                <img
                                    v-if="category.photo"
                                    width="100%"
                                    height="100%"
                                    :src="category.photo"
                                    rel="preload"
                                    :alt="category.name"
                                />
                                <span class="img-title small-font lh-18 px-1">
                                    {{ category.name }}
                                </span>
                                <span class="circle text-center"><div v-if="category.selected" class="counter white--text small-font bold-weight">{{category.subcategories.filter(s => s.selected === true).length}}</div></span>
                                <div class="gradient" :class="{'curr_selected': check_selection(category)}"></div>
                            </div>
                        </v-row>
                    </div>
                    <v-row class="justify-space-between pa-0 align-center btn-container pr-5 my-10">
                        <v-btn @click="$emit('back')" text class="primary--text light-weight">
                            Go Back
                        </v-btn>

                        <v-btn
                            color="primary"
                            width="135px"
                            large
                            depressed
                            :loading="loading"
                            @click="to_confirmation"
                            :disabled="is_btn_disabled"
                        >
                            Continue
                        </v-btn>
                    </v-row>
                </div>

                <div class="d-flex flex-column sub-categories">
                    <div class="pl-1 my-1" v-if="current_selected">
                        <span
                            text
                            class="heavy-weight primary-text--text small-font"
                        >
                            {{ current_selected.name }} ({{current_selected.subcategories.filter(s => s.selected === true).length}})
                        </span>
                    </div>
                    <span class="heavy-weight primary-text--text small-font mb-2 mt-4"
                          v-if="current_selected">Sub Categories</span>
                    <div class="pl-6" v-if="current_selected">
                        <span
                            class="heavy-weight primary-text--text xs-font"
                        >
                            {{ current_selected.name }}
                        </span>
                        <div class="d-flex flex-column">
                            <div
                                class="d-flex align-center sub-category xs-font"
                                v-for="sub in current_selected.subcategories"
                                :key="sub.id"
                                :class="{'selected': sub.selected}"
                                @click="
                                    duplicate_categories = [...duplicate_categories],
                                    sub.selected = !sub.selected
                                "
                            >
                                <span class="circle sub-circle mr-2"></span>
                                {{ sub.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="step === 2">
                <div class="pa-4 d-flex">
                    <div v-for="column in columns" :key="column[0] ? column[0].id : -1" class="category-col">
                        <div class="pl-6 mt-4" v-for="category in column" v-if="category.selected" :key="category.id">
                            <span
                                class="heavy-weight primary-text--text medium-font"
                            >
                                {{ category.name }} ({{category.subcategories.filter(s => s.selected === true).length}})
                            </span>
                            <div class="my-2 xs-font bold-weight primary-text--text">Sub Categories</div>
                            <div class="d-flex flex-column">
                                <div
                                    class="d-flex align-center sub-category xxs-font primary-text--text"
                                    v-for="sub in category.subcategories"
                                    :key="sub.id"
                                    :class="{'selected': sub.selected}"
                                    @click="
                                        duplicate_categories = [...duplicate_categories],
                                        sub.selected = !sub.selected
                                    "
                                >
                                    <span class="circle sub-circle mr-2"></span>
                                    {{ sub.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-space-between">
                    <v-btn @click="step = 1" text class="primary--text light-weight">
                        Go Back
                    </v-btn>
                    <v-btn
                        class=""
                        color="primary"
                        width="135px"
                        large
                        depressed
                        :loading="loading"
                        @click="submit"
                        :disabled="btn_is_disabled"
                    >
                        Continue
                    </v-btn>
            </div>
            </div>
        </v-card-text>
    </v-card>

</template>

<script>

    export default {
        props: ['parent_category', 'org', 'office_location'],
        data() {
            return {
                loading: false,
                step: 1,
                errors: {},
                duplicate_categories: [],
                btn_is_disabled: true,
                current_selected: null,
            }
        },
        computed: {
            show_sub_column() {
                for (let category of this.duplicate_categories) {
                    if (category.selected) return true
                }
                return false
            },
            columns() {
                let columns = []
                let selected = this.duplicate_categories.filter(category => category.selected === true)
                let mid = Math.ceil(selected.length / 2)
                columns.push(selected.slice(0, mid))
                columns.push(selected.slice(mid, mid + mid))
                return columns
            },
            is_btn_disabled() {
                if (this.duplicate_categories.filter(c => c.selected === true).length > 1)
                    return false
                if (this.current_selected && this.current_selected.subcategories.filter(c => c.selected === true).length > 0)
                    return false
                return true
            }
        },
        watch: {
            duplicate_categories: {
                handler() {
                    let categories = 0
                    const subs_parents = []
                    for (let category of this.duplicate_categories) {
                        if (category.selected) {
                            categories++
                            // for (let sub of category.subcategories) {
                            //     if (sub.selected) {
                            if (!subs_parents.includes(category.id)) {
                                subs_parents.push(category.id)
                            }
                            //     }
                            // }
                        }
                    }
                    this.btn_is_disabled = categories !== subs_parents.length || categories === 0
                },
                deep: true
            },
        },
        mounted() {
            this.set_up_categories()
        },
        methods: {
            async set_up_categories() {
                this.loading = true;
                try {
                    const res = await this.$axios.get(`api/organization_categories/${this.parent_category.id}`)
                    this.duplicate_categories = res.data.subcategories.map((obj) => {
                        return { ...obj, selected: false }
                    })
                } catch(e) {
                    console.error(e);
                } finally {
                    this.loading = false;
                }
            },
            select_category(category) {
                if(this.current_selected && !this.current_selected.subcategories.filter(s => s.selected === true).length){
                    this.current_selected.selected = false
                }
                this.current_selected = category
                category.selected = true
            },
            select(i) {
                // do real selection logic here
                this.selected = this.selected === i ? 0 : i
            },
            to_confirmation(){
                if(this.current_selected && !this.current_selected.subcategories.filter(s => s.selected === true).length){
                    this.current_selected.selected = false
                }
                this.step = 2
                
            },
            check_selection(category){
                if(this.current_selected)
                    return category.id === this.current_selected.id
                return false
            },
            async submit() {
                this.loading = true
                const payload = []
                this.duplicate_categories.forEach(({ subcategories, selected }) => {
                    if (selected) {
                        subcategories.forEach(({ selected, id }) => {
                            // push selected subs to new list
                            if (selected) {
                                payload.push(id)
                            }
                        })
                    }
                })
                const payload_obj = { categories: payload }
                /* End Setup of Payload */
                await this.$store.dispatch('office_locations/patch_office_locations', {
                    id: this.office_location.id,
                    payload: payload_obj
                })
                if (this.org.description) {
                    await this.$router.push('/')
                    this.$snackbar.show_message({ content: "Registration Complete!", type: 'success' })
                } else {
                    await this.$router.push('/registration/description')
                }
                this.loading = false

            },
        }
    }
</script>

<style lang="stylus" scoped>
    .v-form
        width 100%

    .sub-categories
        min-width 350px

    .btn-container
        max-height 100px

    .images-container
        display flex
        flex-direction column
        justify-content space-between
        min-width 580px


    .img
        position relative
        width 170px
        height 170px
        margin 10px
        cursor pointer
        transition .2s

        &:hover
            transform scale(1.03)


        .gradient
            position absolute
            top 0
            left 0
            background linear-gradient(transparent 60%, var(--v-black-base))
            border-radius 4px
            height 170px
            width 170px
            z-index 1

        .img-title
            position absolute
            width 170px
            z-index 2
            display flex
            justify-content center
            left 0
            bottom 20px
            color white
            user-select none
            text-align center


        .circle
            position absolute
            left 135px
            top 10px
            background rgba(255, 255, 255, 0.6)
            border 1px solid var(--v-white-base)

    .circle
        width 28px
        height 28px
        border-radius 100%
        background var(--v-white-base)
        border 1px solid var(--v-inactive-base)


    .selected > .sub-circle
        overflow hidden

        &::after
            position absolute
            display block
            content ''
            -webkit-transform rotate(45deg)
            -ms-transform rotate(45deg)
            transform rotate(45deg)


    .sub-category
        cursor pointer
        transition .1s
        position relative
        margin 3px 0

        &:hover
            color var(--v-primary-base)

    .sub-category.selected > .circle
        background var(--v-white-base)

        &::after
            left 10px
            bottom 7px
            width 8px
            height 18px
            border solid var(--v-primary-text-base)
            border-width 0 3px 3px 0


    .img.selected > .circle
        background var(--v-success-base)
        border none

        &::after
            left 14px
            bottom 4px
            width: 10px;
            height: 30px;
            border solid var(--v-white-base)
            border-width 0 4px 4px 0

    .category-col
        width 45%

    .curr_selected
        border 4px solid var(--v-success-base) !important

    .counter
        margin-top: 2px
</style>
