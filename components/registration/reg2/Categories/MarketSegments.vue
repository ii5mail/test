<template>
    <v-card class="transparent elevation-0" height="95%" width="100%">
        <v-card-title class="pb-0 pt-10">
            <div class="display-1">{{ parent_category.name }} Market Segments</div>
        </v-card-title>
        <v-card-text class="pb-0">

            <p class="body-1 mb-10">
                Customize your ConstructionBevy experience by selecting your business type.
            </p>

            <div class="d-flex justify-space-between">
                <div class="images-container">
                    <div>

                        <v-row class="pa-0">
                            <div
                                v-for="category in duplicate_categories"
                                :key="category.id"
                                :class="{'selected': category.selected}"
                                class="img pa-0 elevation-1"
                                @click="category.selected = !category.selected"
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
                                <span class="circle"></span>
                                <div class="gradient"></div>
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
                            @click="submit"
                            :disabled="btn_is_disabled"
                        >
                            Continue
                        </v-btn>
                    </v-row>
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
                errors: {},
                duplicate_categories: [],
                btn_is_disabled: true
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
                        }
                    }
                    this.btn_is_disabled = categories === 0
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
                    const res = await this.$axios.get('api/market_segments/', {params: {super_id: this.parent_category.id}})
                    this.duplicate_categories = res.data.results.map((obj) => {
                        return { ...obj, selected: false }
                    })
                } catch(e) {
                    console.error(e);
                } finally {
                    this.loading = false;
                }
            },
            select(i) {
                // do real selection logic here
                this.selected = this.selected === i ? 0 : i
            },
            async submit() {
                this.loading = true
                const payload = []
                this.duplicate_categories.forEach((segment) => {
                    if (segment.selected) {
                        payload.push(segment.id)
                    }
                })

                const payload_obj = { market_segments: payload }
                /* End Setup of Payload */
                await this.$store.dispatch('organizations/patch_organizations', {
                    id: this.org.id,
                    payload: payload_obj
                })
                if (this.parent_category.name === 'General Contractor' && this.org.description) {
                    await this.$router.push('/')
                    this.$snackbar.show_message({ content: "Registration Complete!", type: 'success' })
                } else if (this.parent_category.name === 'Trade Partner') {
                    this.$emit('trade-type')
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
        height 80vh
        overflow auto

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


    .selected > .circle
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


</style>
