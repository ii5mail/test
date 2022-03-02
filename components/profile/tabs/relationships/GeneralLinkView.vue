<template>
    <div v-if="data.length" class="roboto fill-width">
        <div class="d-flex flex-column mt-10 scroll-container fill-width">
            <div class="d-flex">
                <link-organization class="mr-8" main :organization="organization"/>
            </div>
            <div class="main-vertical-connecting-line row-title-container d-flex align-center px-2 mr-8"/>
            <div class="d-flex align-center row-container" v-for="(category,i) in orgs_by_category" :key="i">
                <div
                    class="main-vertical-connecting-line row-title-container d-flex align-center pr-2"
                    :class="{'no-border': i === orgs_by_category.length - 1}"
                >
                    <span class="xxs-font grey-text--text text-right fill-width text-capitalize">
                        {{ category.name }}
                    </span>
                </div>
                <div class="fill-width fill-height d-flex">
                    <div class="d-flex align-center">
                        <div v-for="(org, j) in category.orgs" :key="j" class="relative">
                            <div class="left-horz-line absolute"/>
                            <div class="right-horz-line absolute" v-if="j < category.orgs.length - 1"/>
                            <link-organization class="mr-8" top_vertical :organization="org"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="fill-width mt-16">
        <empty-relationship
            @set_edit="$emit('set_edit')"
        />
    </div>
</template>

<script>
    import LinkOrganization from "./LinkOrganization.vue"
    import EmptyRelationship from "./EmptyRelationship.vue"

    export default {
        components: { LinkOrganization, EmptyRelationship },
        props: {
            organization: Object,
            data: Array,
        },
        data: () => ({
            orgs_by_category: []
        }),
        watch: {
            data: {
                immediate: true,
                handler() {
                    this.format_data()
                }
            }
        },
        methods: {
            format_data() {
                const arr = []
                const organized_by_type = {}
                this.data.forEach(({ sub_contractor, trades_performed, confirmed } ) => {
                    trades_performed.forEach((category)=>{
                        let key = category?.name
                        if (key === 'N/A'){
                            key = category.supercategory?.supercategory?.name
                        }

                        if (!organized_by_type[key]) {
                            organized_by_type[key] = []
                        }

                        organized_by_type[key].push({ ...sub_contractor, confirmed })

                    })
                })
                Object.keys(organized_by_type).forEach((name) => {
                    arr.push({
                        name,
                        orgs: organized_by_type[name]
                    })
                })

                this.orgs_by_category = arr
            }
        },
    }
</script>

<style scoped lang="stylus">
    .row-container
        height 97px
        margin-top: 4px

    .row-title-container
        min-height 30px;
        min-width: 85px;
        max-width: 85px;
        flex-shrink 0
        margin-right: 26px

    // Connecting Lines
    .main-vertical-connecting-line
        height 100%
        border-right 4px dotted var(--v-grey-base)

    .no-border
        border-right-color transparent

    .last-container
        border-right-color transparent

    .left-horz-line
        top: -22px
        border-top 4px dotted var(--v-grey-base)
        width calc(50% + 10px)
        transform translateX(-30px)


    .right-horz-line
        top: -22px
        border-top 4px dotted var(--v-grey-base)
        width calc(50% - 18px)
        transform translate(102%)


</style>
