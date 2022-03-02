<template>
        <button
            class="main-container pa-2 d-flex align-center primary-text--text relative text-left"
            :class="{'light-green-background': main}"
            @click="$router.push(`/profile/${organization.id}`)"
        >
            <div class="connecting-line-top" v-if="top_vertical"/>
            <div class="connecting-line-bottom" v-if="bottom_vertical"/>
            <v-icon color="primary" class="absolute" size="14"
                    v-if="!main && organization.confirmed">
                $vuetify.icons.checkmark_circled
            </v-icon>
            <!--        <div class="grey-text&#45;&#45;text text&#45;&#45;darken-2 small-font bold-weight"  v-if="!main">-->
            <!--            34%-->
            <!--        </div>-->
            <img
                :src="organization.logo"
                alt="Organization Logo"
                height="30px"
                width="30px"
                class="mx-2 rounded-sm"
            />
            <div class="mr-2">
                <div class="small-font lh-18 org-title light-weight">
                    {{ organization.name }}
                    <!--                Kiewit Coorperation-->
                </div>
                <div class="xxs-font grey-text--text nowrap" v-if="!main">
                    {{ primary_location }}
                </div>
            </div>
            <!--        <div class="signal_bars"  v-if="!main">-->
            <!--            <div class="bar bar1"/>-->
            <!--            <div class="bar bar2"/>-->
            <!--            <div class="bar bar3"/>-->
            <!--            <div class="bar bar4"/>-->
            <!--            <div class="bar bar5"/>-->
            <!--        </div>-->
        </button>
</template>

<script>
    export default {
        props: {
            top_vertical: Boolean,
            bottom_vertical: Boolean,
            main: Boolean,
            organization: { type: Object, default: {} },
        },
        computed: {
            primary_location() {
                const headquarters = this.organization.office_locations?.find(({ office_type }) => office_type === 'Headquarters')
                return `${ headquarters?.city }, ${ headquarters?.state } ${ headquarters?.country }`
            }
        },
    }
</script>

<style scoped lang="stylus">


    .main-container
        font-family Roboto
        border 1px solid var(--v-success-base)
        background var(--v-white-base)
        border-radius: 4px;
        flex-shrink 0
        min-height 45px
        transition .2s
        text-decoration none

        &:hover
            background var(--v-light-green-base)
            border 1px solid var(--v-success-darker-base)

            cursor pointer

    .light-green-background
        background var(--v-light-green-base)

    .v-icon
        right -7px
        top -7px
        background var(--v-white-base)

    .org-title
        white-space nowrap

    .signal_bars
        display flex
        align-items flex-end

        .bar
            width 4px
            background var(--v-success-base)
            margin: 0 1px
            border-radius 1px 1px 0 0

        .bar1
            height 2px

        .bar2
            height 4px

        .bar3
            height 7px

        .bar4
            height 9px

        .bar5
            height 11px

    // Connecting Line styles
    .vertical-connecting-line
        position absolute
        height 18px
        border-right 4px dotted var(--v-grey-base)
        left calc(50% - 4px)

    .connecting-line-top
        @extends .vertical-connecting-line
        top -20px

    .connecting-line-bottom
        @extends .vertical-connecting-line
        bottom -20px

</style>
