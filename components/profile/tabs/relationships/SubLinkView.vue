<template>
    <div  v-if="data.length" class="roboto scroll-container">
        <div class="d-flex mt-10">
            <div class="text-right xxs-font grey--text text--darken-1 d-flex justify-center flex-column mr-3">
                <div>GC</div>
                <div>Probability</div>
            </div>
            <div class="relative" v-for="(relationship, i) in data" :key="i">
                <div class="first-vert-line absolute" v-if="i === 0"/>
                <div class="left-horz-line absolute"/>
                <div class="right-horz-line absolute" v-if="i < data.length - 1"/>
                <link-organization
                    bottom_vertical
                    class="mr-8"
                    :organization="{...relationship.general_contractor, confirmed: relationship.confirmed}"
                />
            </div>
        </div>
        <div class="d-flex mt-10">
            <link-organization class="mr-8" main :organization="organization"/>
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
            data: Array
        },
    }
</script>

<style scoped lang="stylus">

    // Connecting Lines
    .first-vert-line
        border-right 4px dotted var(--v-grey-base)
        bottom: -39px
        left 4px
        height 18px

    .left-horz-line
        bottom: -25px
        border-top 4px dotted var(--v-grey-base)
        width: calc(50% - 20px);
        transform: translateX(4px);


    .right-horz-line
        bottom: -25px
        border-top 4px dotted var(--v-grey-base)
        width: calc(50% + 12px);
        transform translate(calc(100% - 24px))


</style>
