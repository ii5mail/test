<template>
    <div class="d-flex fill-height flex-column">
        <div class="primary fill-height white--text relative">
            <div class="top-container py-16 px-5 d-flex flex-column justify-center relative">
                <h1 class="xl-font mb-2 mt-5">Welcome to the Commercial Construction Community</h1>
                <h4 class="small-font mb-8 light-weight">Save time finding the right company or people for your project.</h4>
                <h4 v-if="!success" class="small-font mb-3 light-weight">Get Access To Our Beta Launch</h4>
                <h4 v-else class="small-font mb-3 light-weight">We look forward to working with you and we’ll be in touch soon!</h4>
                <v-form @submit.prevent="submit">
                    <v-alert dense outlined type="error" v-if="errors.non_field_errors || errors.detail">
                        <ul>
                            <li v-for="error in errors.non_field_errors" :key="error">{{ error }}</li>
                        </ul>
                        {{ errors.detail }}
                    </v-alert>
                    <v-row class="top-waitlist-container align-center">
                        <cb-text-field
                            v-model="email"
                            solo
                            :disabled="loading || success"
                            placeholder="Enter Your Email"
                            :error="!!errors.email"
                            :error-messages="errors.email"
                        >
                        </cb-text-field>
                        <v-btn
                            class="white primary--text align-self-center mb-6 ml-4"
                            depressed
                            outlined
                            text
                            large
                            :disabled="!email.length || success"
                            :loading="loading"
                            @click="submit"
                        >
                            {{ success ? 'Sent!' : 'Register' }}
                        </v-btn>
                    </v-row>
                </v-form>
                <!-- <v-row> -->
                    <!-- <div class="btn-container mx-3">
                        <v-btn
                            class="mt-6 white"
                            color="primary"
                            depressed
                            text
                            large
                            to="/market-search/?type=General%20Contractor"
                        >
                            Find General Contractors
                        </v-btn>
                        <p class="xxs-font mt-2">It's Free to Get Started</p>
                    </div>
                    <div class="btn-container">
                        <v-btn
                            class="trade-partner-btn mx-5 mt-6 white"
                            color="primary"
                            depressed
                            text
                            large
                            to="/market-search/?type=Trade%20Partner"
                        >
                            Find Trade Partners
                        </v-btn>
                        <p class="xxs-font mt-2">No Credit Card Required</p>
                    </div> -->
                <!-- </v-row> -->
            </div>
            <img src="@/assets/images/stock/stock_construction_workers.png" class="top-stock"/>
        </div>
        <div class="white fill-height primary-text--text py-4">
            <v-container class="text-center">
                <h3 class="medium-font my-4 light-weight">See why leaders in the industry choose ConstructionBevy</h3>
                <v-row class="company-icons align-center justify-center py-6">
                    <img src="@/assets/images/logos/Austin_construction_logo.png" class="company-logo"/>
                    <img src="@/assets/images/logos/Beck_construction_logo.png" class="company-logo"/>
                    <img src="@/assets/images/logos/BigD_construction_logo.png" class="company-logo"/>
                    <img src="@/assets/images/logos/CRH_construction_logo.png" class="company-logo"/>
                    <img src="@/assets/images/logos/Turner_construction_logo.png" class="company-logo"/>
                    <img src="@/assets/images/logos/VCC_construction_logo.png" class="company-logo vcc-logo"/>
                </v-row>
            </v-container>
        </div>
        <div class="video-container white fill-height primary-text--text">
            <v-container class="carousel-container">
                <!-- <h2 class="large-font my-4 primary--text mb-1">Chase Less - Win More</h2>
                <h3 class="medium-font mb-16 light-weight">Feature your capabilities and past work.</h3> -->
                <!-- <v-row>
                    <video width="320" height="240" controls>
                        <source src="/" type="video/mp4">
                        <source src="/" type="video/ogg">
                        Your browser does not support the video tag.
                    </video>
                </v-row> -->
                <!-- <v-row class="justify-center mb-12">
                    <img class="video" src="@/assets/images/screenshots/Acme_Glass_full_screen_overview.png" alt="Subcontractor overview screenshot"/>
                </v-row> -->
                <v-carousel v-model="slide_num" height="100%">
                    <v-carousel-item
                        v-for="slide in 6"
                        :key="slide"
                        class="fill-height"
                    >
                        <v-sheet
                            height="100%"
                            tile
                            class="fill-height"
                        >
                            <v-row
                            class="white fill-height"
                            align="center"
                            justify="center"
                            >
                                <img :src="require(`@/assets/images/screenshots/Home_Page_Slider_${slide}.png`)" alt="How it works slide"/>
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-container>
        </div>
        <hr class="divider" />
        <div class="learn-more-container white fill-height primary-text--text pt-6 pb-14">
            <v-container>
                <h2 class="large-font primary--text mb-4 text-center">Who is ConstructionBevy For</h2>
                <h5 class="small-font mb-16 text-center light-weight primary-text--text text--lighten-2">The ConstructionBevy marketplace helps navigate the fragmentation of the commercial construction industry by providing connections to and open communication between partners.</h5>
                <v-row class="mb-14 justify-center">
                    <v-col class="description d-flex flex-column align-center px-8">
                        <v-icon size="75" class="primary-text-fill mb-10">$vuetify.icons.general_contractor</v-icon>
                        <h4>General Contractors</h4>
                        <p class="small-font text-center">
                            Find high quality subs, including MBE/WOSB nationwide, with powerful searches & your custom pre qual form.
                        </p>
                        <v-btn
                            class="learn-more mt-6 white"
                            color="primary"
                            depressed
                            outlined
                            text
                            large
                            to="/info/general-contractor"
                        >
                            Learn More
                        </v-btn>
                    </v-col>
                    <v-col class="description d-flex flex-column align-center px-8">
                        <v-icon size="75" class="primary-text-fill mb-10" color="primary">$vuetify.icons.sub_contractor</v-icon>
                        <h4>Sub Contractors</h4>
                        <p class="small-font text-center">
                            Find new leads that are perfect for your business and get pre qualified without the typical
                            hassle.
                        </p>
                        <v-btn
                            class="learn-more mt-6 white"
                            color="primary"
                            depressed
                            outlined
                            text
                            large
                            to="/info/trade-partner"
                        >
                            Learn More
                        </v-btn>
                    </v-col>
                    <v-col class="description d-flex flex-column align-center px-8">
                        <v-icon size="75" class="primary-text-fill mb-10">$vuetify.icons.manufacturer</v-icon>
                        <h4>Manufacturers</h4>
                        <p class="small-font text-center">
                            Build brand loyalty by helping your preferred subs generate leads and align with the right
                            GCs.
                        </p>
                        <v-btn
                            class="learn-more mt-6 white"
                            color="primary"
                            depressed
                            outlined
                            text
                            large
                            to="/info/manufacturer"
                        >
                            Learn More
                        </v-btn>
                    </v-col>
                </v-row>
                <p class="d-none d-sm-block small-font text-center primary-text--text text--lighten-2">
                    Coming soon for <v-icon>$vuetify.icons.architect</v-icon>
                    <strong> Architects</strong> and <v-icon>$vuetify.icons.key_outline</v-icon>
                    <strong> Owners</strong>
                </p>
            </v-container>
        </div>
        <hr class="divider" />
        <div class="white fill-height primary-text--text relative">
            <div class="features-container py-16 relative">
                <p class="primary--text xs-font mb-3 medium-weight">Features</p>
                <h2 class="large-font primary-text--text mb-5">Customized profile for your business</h2>
                <p class="primary-text--text text--lighten-2 small-font light-weight mb-5">Every company has an open, Search Engine Optimization (SEO) friendly profile to share information about their business.</p>
                <div class="d-flex flex-wrap align-center">
                    <v-container class="features-tab mx-0">
                        <v-row
                            class="inactive-feature pt-4 px-6 align-baseline"
                            :class="{'active-feature': features_tab === 'Profile'}"
                            @click="on_feature_select('Profile')"
                        >
                            <h3 class="small-font mb-2 mr-2">Your Profile</h3>
                            <p class="xs-font light-weight">Companies can share information about their size, ownership type, certification, trades, and market segments.</p>
                        </v-row>
                        <v-row
                            class="inactive-feature pt-4 px-6 align-baseline"
                            :class="{'active-feature': features_tab === 'Locations'}"
                            @click="on_feature_select('Locations')"
                        >
                            <h3 class="small-font mb-2 mr-2">Locations & Areas Served</h3>
                            <p class="xs-font light-weight">Companies can specify their address and the areas they serve and are willing to travel to.</p>
                        </v-row>
                        <v-row
                            class="inactive-feature pt-4 px-6 align-baseline"
                            :class="{'active-feature': features_tab === 'Relationships'}"
                            @click="on_feature_select('Relationships')"
                        >
                            <h3 class="small-font mb-2 mr-2">Relationships</h3>
                            <p class="xs-font light-weight">Relationships between contractors and trade partners can be represnted both with visual and text views and can be verified by both parties.</p>
                        </v-row>
                        <v-row class="justify-center">
                            <img class="features-macbook mt-12" :src="require(`@/assets/images/screenshots/${features_img[features_tab]}`)" alt="macbook screenshot"/>
                        </v-row>
                        <v-row>
                            <h3 class="small-font mb-2 mt-16 mx-auto">Learn More</h3>
                        </v-row>
                        <v-row class="features-learn-more justify-center mb-8">
                            <v-btn
                                class="learn-more mt-4 mr-6 white"
                                color="primary"
                                depressed
                                outlined
                                text
                                large
                                to="/info/general-contractor"
                            >
                                <v-icon class="primary-fill mr-1">$vuetify.icons.general_contractor</v-icon>
                                For GCs
                            </v-btn>
                            <v-btn
                                class="learn-more mt-4 white"
                                color="primary"
                                depressed
                                outlined
                                text
                                large
                                to="/info/trade-partner"
                            >
                                <v-icon class="primary-fill mr-1">$vuetify.icons.sub_contractor</v-icon>
                                For Trades
                            </v-btn>

                        </v-row>

                    </v-container>
                    <img :src="require(`@/assets/images/screenshots/${features_img[features_tab]}`)" alt="areas served" class="features-img"/>
                </div>
            </div>
        </div>
        <waitlist-form @success="val=>success=val" :success="success" background="primary"/>
        <home-footer/>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import HomeFooter from '../footer/FooterHome'
    import CbTextField from "../ui/CbTextField"
    import WaitlistForm from './WaitlistForm'

    export default {
        components: { HomeFooter, CbTextField, WaitlistForm },
        data: () => ({
            email: '',
            search_term: '',
            loading: false,
            success: false,
            errors: {},
            slide_num: 0,
            features_img: {
                'Profile': 'Acme_Glass_full_screen_overview_1.png',
                'Locations': 'Acme_Glass_full_screen_overview_2.png',
                'Relationships': 'Acme_Glass_full_screen_overview_3.png',
            },
            features_tab: 'Profile',
            tab: 'profile',
        }),
        computed: {
            ...mapState({
                active_filter: state => state.general_search.active_category_filter,
            }),
        },
        watch: {
        },
        mounted() {
        },
        methods: {
            on_feature_select(feature) {
                this.features_tab = feature

            },
            on_tab_select(tab) {
                this.tab = tab
            },
            async submit() {
                this.loading = true
                try {
                    await this.$axios.post('api/waitlist/', { email: this.email })
                    console.log('waitlist success')
                    this.success = true
                    this.email = ''
                } catch (error) {
                    this.errors = typeof error.response.data === "string" ? { detail: "Error Occurred" } : error.response.data
                    console.error(this.errors)
                } finally {
                    this.loading = false
                }
            }
        },
    }
</script>

<style scoped lang="stylus">

    .description
        flex 1 1 375px

    .divider
        background linear-gradient(#F7F6F6, #FFFFFF)
        min-height 83px
        border none

    .top-container
        max-width 630px
        width 100%
        margin-left 90px
        z-index 2

        .top-waitlist-container
            margin-left 0

            .v-text-field
                min-width 300px

    .top-stock
        position absolute
        right 0
        top 0
        z-index 1
        max-height 100%

    .btn-container
        text-align center

    .company-logo
        filter grayscale(100%)
        margin-right 50px

    .vcc-logo
        margin-left -10px
        opacity 50%

    .video
        max-width 100%

    .carousel-container
        min-width 100%

    .features-container
        margin-left 90px
        width 100%

    .features-tab
        flex 1 1 30%

    .inactive-feature
        border-left 5px solid gray
        opacity 0.6

    .features-img
        height 600px

    .features-macbook
        display none

    .active-feature
        border-left 5px solid #2480EB
        opacity 1.0


    >>> .v-input__append-inner > .v-btn
        margin-top -5px
        margin-right -9px

    .primary-fill >>> path
        stroke #2480EB
        fill transparent

    .white-fill >>> path
        stroke white
        fill transparent

    .learn-more.v-btn--outlined
        border-color #2480EB !important
        height 40px !important

    .filter-bar
        margin 0 auto
        max-width fit-content

    .btn-cont
        height 29px
        font-size 0

    .btn-tab
        margin 0
        border-radius 0
        border-right thin solid
        border-top thin solid
        border-bottom thin solid
        color: #2480EB
        background transparent !important
        height 100% !important
        font-weight 100
        &:first-child
            border-left thin solid
            border-radius 14px 0 0 14px
        &:last-child
            border-radius 0 14px 14px 0

    .active-tab
        background #2480EB !important
        font-weight 600 !important
        color white
        border-color #2480EB

    .v-text-field
        border-radius 4px
        max-width 35%
        >>>input
            padding-left 8px !important

    @media only screen and (max-width: 600px)
        .top-container
            margin 0
            padding-top 36px !important
            padding-bottom 36px !important
            text-align center

        h1, h2
            font-size 24px !important

        .large-heading
            font-size 36px !important

        h3
            font-size 16px !important

        .btn-container
            .v-btn
                height 47px

        .trade-partner-btn
            margin-left 12px !important
            margin-top 0 !important

        .top-stock
            height 80%
            bottom 0
            top revert

        .company-icons
            padding-bottom 0

        .company-logo
            margin 0 25px 20px

        .video-container
            background-color #F9FAFB !important
            padding-top 0 !important
            padding-bottom 0 !important

            .carousel-container
                padding 0 !important

            .v-carousel
                img
                    width 100%

            h3
                margin-bottom 24px !important

            .row
                margin-bottom 0 !important

        hr
            display none

        .learn-more-container
            background-color #F9FAFB !important
            padding-bottom 0 !important

            .row
                margin-bottom 16px !important

            .description
                h4
                    font-size 16px !important
                    margin-bottom 16px
                p
                    font-size 14px !important
                    margin-bottom 0

                .learn-more
                    margin-top 15px !important
                    margin-bottom 24px !important

        .v-icon
            margin-bottom 10px !important

        .features-container
            margin-left 0
            padding-left 16px
            padding-right 16px

            .features-tab
                max-width 100%

            .features-img
                display none

            .features-learn-more
                margin-bottom 0 !important

            .features-macbook
                display inline
                max-width 100%

        .waitlist-container, .top-waitlist-container
            flex-direction column

            .v-text-field
                min-width revert
                max-width 85% !important
                width 100%

            .v-btn
                margin-left 0

        .top-waitlist-container
            justify-content center
            margin-left -12px !important

</style>
