<template>
    <div class="d-flex fill-height flex-column">
        <div class="primary fill-height white--text relative pt-8 pb-16 px-12">
            <div class="top-container relative">
                <div class="d-none d-sm-block btn-cont text-center mb-16">
                    <v-btn
                        text
                        small
                        elevation="0"
                        class="btn-tab small-font white--text mr-2"
                        :class="{'active-tab': tab === 'General Contractors'}"
                        to="/info/general-contractor"
                    >
                        General Contractors
                    </v-btn>
                    <v-btn
                        text
                        small
                        elevation="0"
                        class="btn-tab small-font white--text mr-2"
                        :class="{'active-tab': tab === 'Trade Partners'}"
                        to="/info/trade-partner"
                    >
                        Trade Partners
                    </v-btn>
                    <v-btn
                        text
                        small
                        elevation="0"
                        class="btn-tab small-font white--text mr-2"
                        :class="{'active-tab': tab === 'Manufacturers'}"
                        to="/info/manufacturer"
                    >
                        Manufacturers
                    </v-btn>
                    <v-btn
                        text
                        small
                        disabled
                        elevation="0"
                        class="btn-tab small-font white--text mr-2"
                        :class="{'active-tab': tab === 'Owners'}"
                        @click="on_tab_select('Owners')"
                    >
                        Owners
                    </v-btn>
                    <v-btn
                        text
                        small
                        disabled
                        elevation="0"
                        class="btn-tab small-font white--text mr-2"
                        :class="{'active-tab': tab === 'Architects'}"
                        @click="on_tab_select('Architects')"
                    >
                        Architects
                    </v-btn>
                </div>
                <h1 class="xxl-header ml-16">{{ tab }}</h1>
                <h3 v-if="tab === 'General Contractors'" class="medium-font ml-16 mb-10">Designed for GCs to find specialties and verify capabilities and past performance</h3>
                <h3 v-else class="medium-font ml-16 mb-10">Designed for {{ tab }} to get new business</h3>
            </div>
            <img src="@/assets/images/stock/stock_crane_bg.png" class="top-stock"/>
        </div>
        <div
            class="fill-height primary-text--text pa-12"
            :class="tab === 'Manufacturers' ? 'white' : 'description'"
        >
            <v-container class="mx-16">
                <v-row v-if="tab==='General Contractors'">
                    <p class="font-18 my-5 medium-weight">
                        We help General Contractors find the best trades for their projects
                    </p>
                    <p class="font-18 light-weight mb-4">
                        ConstructionBevy helps general contractors work better by providing relationship intelligence, pre-qualification eficiency, and Environmental, Social, & Governance (ESG) implementation and oversight workflow tools.  GCs can verify their trade partner’s capabilities, avilability, past performance on projects, and relationships and align with manufacturer’s preferred trade partners.  Our platform helps them reduce project risk, cost, and time to completion.
                    </p>
                </v-row>
                <v-row v-if="tab==='Trade Partners'">
                    <p class="font-18 my-5 medium-weight">
                        We connect Trade Partners to General Contractors
                    </p>
                    <p class="font-18 light-weight mb-4">
                        ConstructionBevy enables trade partners to showcase their capabilities, availability, past performance on projects, and relationships.  Trade partners can generate leads that they are well positioned to win and reduce the overhead associated working with general contractors in pre-qualification.  The platform helps improve project financial transparency to manage risk and also includes a real-time messaging and communications platform to help win new business.
                    </p>
                </v-row>
                <v-row v-if="tab==='Manufacturers'">
                    <p class="font-18 my-5 medium-weight">
                        Designed specifically for Manufacturers to get new business
                    </p>
                    <p class="font-18 light-weight mb-4">
                        A social marketplace for manufacturers & suppliers to build brand loyalty and generate leads for their installers and trade partners.  We help them leverage technology to win new business and manage risk.
                    </p>
                </v-row>
            </v-container>
        </div>
        <!-- <div v-if="tab==='Manufacturers'" class="description fill-height primary--text py-12">
            <p class="manuf-paragraph font-18 medium-weight text-center mx-auto my-0">Find expert support you need. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</p>
        </div>
        <div v-if="tab==='Manufacturers'" class="white fill-height primary-text--text py-16">
            <h2 class="xl-font primary--text text-center mt-12 mb-4">Why use this site</h2>
            <v-container class="manuf-why">
                <v-row class="row-divider mt-6 py-4 px-12">
                    <v-col cols="2" class="d-flex justify-center align-center">
                        <v-icon size="50" color="primary" class="primary-fill">$vuetify.icons.general_contractor</v-icon>
                    </v-col>
                    <v-col cols="10">
                        <h5 class="medium-font mb-2">Trade materials Manufacturers can provide</h5>
                        <p class="font-18 light-weight">Lorem ipsum enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                    </v-col>
                </v-row>
                <v-row class="pt-6 px-12">
                    <v-col cols="2" class="d-flex justify-center align-center">
                        <v-icon size="50" class="primary-fill">$vuetify.icons.general_contractor</v-icon>
                    </v-col>
                    <v-col cols="10">
                        <h5 class="medium-font mb-2">Reach out to other trade partners and GCs</h5>
                        <p class="font-18 light-weight">Lorem ipsum enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                    </v-col>
                </v-row>
            </v-container>
        </div> -->
        <div class="features-1 white fill-height primary-text--text pt-16 pb-14 px-12">
            <p class="xs-font primary--text medium-weight my-4 text-center">Features</p>
            <h2 class="large-font mb-4 text-center">Generate More Business</h2>
            <h5 v-if="tab==='General Contractors'" class="small-font mb-16 text-center light-weight primary-text--text text--lighten-2">Win new business and manage risk with powerful collaboration tools</h5>
            <h5 v-else-if="tab==='Trade Partners'" class="small-font mb-16 text-center light-weight primary-text--text text--lighten-2">Showcase specialties and verify your business with open, SEO-friendly profiles</h5>
            <h5 v-else-if="tab==='Manufacturers'" class="small-font mb-16 text-center light-weight primary-text--text text--lighten-2">Ensure your products are being used more by building loyalty with trade partners</h5>
            <div class="d-flex flex-wrap align-center mb-12">
                <v-container class="features-tab mx-16">
                    <v-row class="mb-5">
                        <img :src="require(`@/assets/images/icons/${ features[tab].icon_1 }.png`)"/>
                    </v-row>
                    <v-row>
                        <h2 class="large-font mb-5">{{ features[tab].feature_1_title }}</h2>
                        <p class="small-font light-weight primary-text--text text--lighten-2 mb-5">{{ features[tab].summary_1 }}</p>
                    </v-row>
                    <v-row v-for="bullet in features[tab].bullets_1" :key="bullet" class="features-list ml-2 mb-3 align-start">
                        <v-col cols="1" class="pa-0">
                            <img src="@/assets/images/icons/Check_icon.png" class="checklist"/>
                        </v-col>
                        <v-col cols="11" class="pa-0">
                            <p class="small-font light-weight primary-text--text text--lighten-2 ml-3">{{ bullet }}</p>
                        </v-col>
                    </v-row>
                </v-container>
                <div class="features-img img-right">
                    <!-- <img :src="require(`@/assets/images/screenshots/${ tab === 'General Contractors' ? 'Bluth_screen_1' : 'Acme_Glass_screen_1'}.png`)" alt="areas served" class="fill-width"/> -->
                    <img :src="require(`@/assets/images/screenshots/${ features[tab].company_image }_1.png`)" alt="areas served" class="fill-width"/>
                </div>
            </div>
            <div class="d-flex flex-wrap align-center mb-12">
                <div class="left-object features-img img-left">
                    <img :src="require(`@/assets/images/screenshots/${ features[tab].company_image }_2.png`)" alt="areas served" class="fill-width"/>
                </div>
                <v-container class="right-object features-tab mx-16">
                    <v-row class="mb-5">
                        <img :src="require(`@/assets/images/icons/${ features[tab].icon_2 }.png`)"/>
                    </v-row>
                    <v-row>
                        <h2 class="large-font mb-5">{{ features[tab].feature_2_title }}</h2>
                        <p class="small-font light-weight primary-text--text text--lighten-2 mb-5">{{ features[tab].summary_2 }}</p>
                    </v-row>
                    <v-row v-for="bullet in features[tab].bullets_2" :key="bullet"  class="ml-2 mb-3 align-start">
                        <v-col cols="1" class="pa-0">
                            <img src="@/assets/images/icons/Check_icon.png" class="checklist"/>
                        </v-col>
                        <v-col cols="11" class="pa-0">
                            <p class="small-font light-weight primary-text--text text--lighten-2 ml-3">{{ bullet }}</p>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
            <div class="d-flex flex-wrap align-center mb-12">
                <v-container class="features-tab mx-16">
                    <v-row class="mb-5">
                        <img :src="require(`@/assets/images/icons/${ features[tab].icon_3 }.png`)"/>
                    </v-row>
                    <v-row>
                        <h2 class="large-font mb-5">{{ features[tab].feature_3_title }}</h2>
                        <p class="small-font light-weight primary-text--text text--lighten-2 mb-5">{{ features[tab].summary_3 }}</p>
                    </v-row>
                    <v-row v-for="bullet in features[tab].bullets_3" :key="bullet" class="ml-2 mb-3 align-start">
                        <v-col cols="1" class="pa-0">
                            <img src="@/assets/images/icons/Check_icon.png" class="checklist"/>
                        </v-col>
                        <v-col cols="11" class="pa-0">
                            <p class="small-font light-weight primary-text--text text--lighten-2 ml-3">{{ bullet }}</p>
                        </v-col>
                    </v-row>
                </v-container>
                <div class="features-img img-right">
                    <img :src="require(`@/assets/images/screenshots/${ features[tab].company_image }_3.png`)" alt="areas served" class="fill-width"/>
                </div>
            </div>
        </div>
        <waitlist-form
            v-if="tab==='General Contractors'"
            background="primary-text"
            @success="val=>success=val"
            :success="success"
        />
        <div v-if="tab==='General Contractors' || tab==='Trade Partners'" class="features-2 primary fill-height white--text py-16 px-12">
            <p class="xs-font medium-weight mt-12 mb-3 ml-16">Features</p>
            <h2 class="large-font mb-5 ml-16">Find the exact trades you need</h2>
            <div class="relative">
                <p class="paragraph small-font mb-16 ml-16 light-weight">Search includes both a basic, free search and a premium option which offers custom filters and alerts.  Companies can be found via valuable filters like EMR ratings, labor requirements, manufacturer or supplier, ownership type, project capacity, and market segments. </p>
                <img src="@/assets/images/misc/Arrow_pointing_curly.png" class="d-none d-sm-block arrow-pointing absolute">
            </div>
            <div class="features-container d-flex flex-wrap align-center mb-12">
                <v-container class="features-2-tab mx-16">
                    <v-row class="mb-4">
                        <v-col>
                            <img src="@/assets/images/icons/Feature_location_icon.png" class="d-block mb-3"/>
                            <h5 class="small-font mb-4">Location, location, location</h5>
                            <p class="xs-font">We understand that projects vary by location, so we use that at the heart of our searches. Find trades where you need the work.</p>
                        </v-col>
                        <v-col>
                            <img src="@/assets/images/icons/Feature_lightning_icon_blue.png" class="d-block mb-3"/>
                            <h5 class="small-font mb-4">Deliver instant results</h5>
                            <p class="xs-font">There’s no hoops to jump through, give us your paramaters and you can go directly to the businesses to request bids.</p>
                        </v-col>
                    </v-row>
                    <v-row class="">
                        <v-col>
                            <img src="@/assets/images/icons/Feature_settings_icon.png" class="d-block mb-3"/>
                            <h5 class="small-font mb-4">Filter to your exact spec</h5>
                            <p class="xs-font">Filter by Market Segment, Trade Type, Labor Requirements & more.</p>
                        </v-col>
                        <v-col>
                            <img src="@/assets/images/icons/Feature_time_icon.png" class="d-block mb-3"/>
                            <h5 class="small-font mb-4">More coming soon</h5>
                            <p class="xs-font">We’re going to be adding even more features to our search soon. Including being able to search by certifications & by ESG.</p>
                        </v-col>
                    </v-row>
                </v-container>
                <img :src="require('@/assets/images/screenshots/Market_search_screen_1.png')" alt="market search screen" class="d-none d-sm-block features-img img-2-right"/>
                <img :src="require('@/assets/images/screenshots/TP_market_search_macbook.png')" alt="market search screen" class="feature-macbook-img d-block d-sm-none"/>
            </div>
        </div>
        <div class="faq-section white fill-height primary-text--text pa-12">
            <h2 class="xl-font text-center my-10">Frequently asked questions</h2>
            <v-container class="faq-container">
                <v-row
                    v-for="(question, index) in faq_questions"
                    :key="index"
                    class="faq-border align-start mb-5"
                >
                    <v-col cols="11">
                        <h5
                            class="faq-question small-font"
                            @click="question.show=!question.show"
                        >{{ question.question }}</h5>
                        <transition name="slide">
                            <p v-if="question.show" class="xs-font primary-text--text text--lighten-2 mt-3">{{ question.answer }}</p>
                        </transition>
                    </v-col>
                    <v-col cols="1">
                        <img
                            v-if="question.show"
                            src="@/assets/images/icons/Minus_circled.png"
                            @click="question.show=!question.show"
                        />
                        <img
                            v-else
                            src="@/assets/images/icons/Plus_circled.png"
                            @click="question.show=!question.show"
                        />
                    </v-col>
                </v-row>
            </v-container>
            <div class="more-questions my-5 py-6 text-center mx-auto">
                <h5 class="small-font mb-2">Still have questions?</h5>
                <p class="xs-font primary-text--text text--lighten-2 mb-4">Can’t find the answer you’re looking for? Please chat with our friendly team.</p>
                <v-btn
                    class="primary align-self-center"
                    color="white"
                    depressed
                    text
                    large
                >
                    <a
                        href="mailto:hello@constructionbevy.com"
                        class="email-link"
                    >
                        Get in touch
                    </a>
                </v-btn>
            </div>
        </div>
        <div class="review-section primary-text--text fill-height py-16">
            <v-container class="review-container align-center justify-center mt-16">
                <v-row class="align-center">
                    <v-col class="d-flex justify-center">
                        <img :src="require(`@/assets/images/logos/${ reviews[tab].logo }.png`)" class="logo pa-16"/>
                    </v-col>
                    <v-col class="text-center relative">
                        <v-row class="quote-container justify-center mb-4">
                            <img src="@/assets/images/icons/quote-symbol.png" alt="quote symbol" class="quote-symbol"/>
                        </v-row>
                        <v-row>
                            <p class="quote medium-font primary-text--text text--lighten-1 px-16">{{ reviews[tab].quote }}</p>
                        </v-row>
                        <v-row class="quoter-container justify-center">
                            <img :src="require(`../../assets/images/profiles/${ reviews[tab].image }.png`)" alt="profile pic" class="text-start mr-4"/>
                            <div class="quoter">
                                <p class="xs-font medium-weight primary-text--text mb-0">{{ reviews[tab].quoter }}</p>
                                <p class="xs-font primary-text--text text--lighten-2 mb-0 mt-0">{{ reviews[tab].title }}</p>
                                <p class="xs-font primary-text--text text--lighten-2 mb-0 mt-0">{{ reviews[tab].title2 }}</p>
                            </div>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <waitlist-form
            background="primary"
            @success="val=>success=val"
            :success="success"
        />
        <home-footer/>
    </div>
</template>

<script>
    import HomeFooter from '../footer/FooterHome'
    import WaitlistForm from './WaitlistForm'

    export default {
        components: { HomeFooter, WaitlistForm },
        data: () => ({
            search_term: '',
            loading: false,
            success: false,
            tab: 'General Contractors',
            features: {
                'General Contractors': {
                    company_image: 'Bluth_screen',
                    icon_1: 'Feature_search_icon',
                    feature_1_title: 'Find Specialties You Need',
                    summary_1: 'General Contractors can browse a Search Engine Optimization (SEO) friendly marketplace of trade partners.  Powerful search and filter capabilities can find companies by trades, market segments, address, size, ownership type, and certification.  Qualify partners before inviting them to bid.',
                    bullets_1: [
                        'Search By Small Business/Disadvantaged Ownership Statuses',
                        'Search By Project Size, Location Type, Labor Type',
                        'Narrow results down by Market Segments',
                    ],
                    icon_2: 'Feature_check_icon',
                    feature_2_title: 'Verify Trade Partners',
                    summary_2: 'Verify trade partner’s capabilities, past performance on projects, availability, and relationships',
                    bullets_2: [
                        'Facilitate project transparency including real-time ESG data and finances',
                        'Find specialty and disadvantaged trade partners',
                        'Align with manufacturer’s preferred trade partners',
                    ],
                    icon_3: 'Feature_info_icon',
                    feature_3_title: 'Keep Better Records of Your Work',
                    summary_3: 'Profiles include both visual and text views of their linkages with trade parties.  Relationships that are verified by both parties are indicated.  The alignment tool is the start of predictive analytics as to who will get jobs.  Each company has full control of their privacy of the relationships via permissions settings.',
                    bullets_3: [
                        'Relationships can be sorted by market type, trades & locations',
                        'Share or hide your relationships based on your preference',
                    ],
                },
                'Trade Partners': {
                    company_image: 'Acme_Glass_screen',
                    icon_1: 'Feature_hammer_icon',
                    feature_1_title: 'Showcase Capabilities and Experience',
                    summary_1: 'Trade partners can share information about the company including address, size, ownership type, certification, trades, and market segments.  Past projects can be showcased and verified.  The more data trade partners share, the more qualified they will be for new projects.',
                    bullets_1: [
                        'Search By Small Business/Disadvantaged Ownership Statuses',
                        'Search By Project Size, Location Type, Labor Type',
                        'Narrow results down by Market Segments',
                    ],
                    icon_2: 'Feature_lightning_icon',
                    feature_2_title: 'Make Yourself Discoverable',
                    summary_2: 'Allow yourself to be found easily with SEO friendly profile that are customized to highlight your strengths as a business.',
                    bullets_2: [
                        'Get leads for your business with our “Invite to Bid” functionality ',
                        'Show off your work & references with Gallery and Relationships sections',
                        'Ownership types allows businesses to find you when looking to fill a certain role',
                    ],
                    icon_3: 'Feature_info_icon',
                    feature_3_title: 'Keep Better Records of Your Work',
                    summary_3: 'Profiles include both visual and text views of their linkages with trade parties.  Relationships that are verified by both parties are indicated.  The alignment tool is the start of predictive analytics as to who will get jobs.  Each company has full control of their privacy of the relationships via permissions settings.',
                    bullets_3: [
                        'Relationships can be sorted by market type, trades & locations',
                        'Share or hide your relationships based on your preference',
                    ],
                },
                'Manufacturers': {
                    company_image: 'Murdock_screen',
                    icon_1: 'Feature_hammer_icon',
                    feature_1_title: 'Gain Valuable Lead Data of Trade Partners Bidding',
                    summary_1: 'Manufacturers and suppliers rarely have visibility into all the  trade partners bidding a job.  By seeing which subcontractors are aligning with a winning general contractor, manufacturers can increase the chance their products will be used.',
                    bullets_1: [
                        'Greater chance for products to be used by building greater loyalty with installers and other trade partners preferred by a winning general contractor',
                        'Improved project financial transparency, including real- time ESG data for owners, means environmentally friendly manufacturers can lead',
                        'Gain valuable lead data of which trade partners bidding that they should build relationships with',
                    ],
                    icon_2: 'Feature_lightning_icon',
                    feature_2_title: 'Make Yourself Discoverable',
                    summary_2: 'Allow yourself to be found easily with a SEO friendly profile that are customized to highlight your strengths as a business.',
                    bullets_2: [
                        'Highlight your locations and what each one has to offer',
                        'Show off your products and provide references of past projects with Gallery and Relationships sections',
                        'CSI Codes allow trade partners to know exactly what you manufacture',
                    ],
                    icon_3: 'Feature_info_icon',
                    feature_3_title: 'Highlight Your Best Relationships',
                    summary_3: 'Profiles include both visual and text views of manufacturers’ experiences with trade partners.  Relationships can be verified by both parties, and each company has full control of the privacy of the relationships via customizable permissions settings.',
                    bullets_3: [
                        'Relationship linkages can be sorted by market type, trades & locations',
                        'Show off your products and provide references of past projects',
                        'Alignment allows understanding of relationships and also allows greater pricing anonymity',
                    ],
                },
            },
            faq_questions: [
                {
                    question: 'How does ConstructionBevy benefit General Contractors?',
                    answer: 'We help general contractors save time and money when juggling multiple trade partners and projects. GCs can easily search for specific needs, like ownership type (e.g., minority and women) and verify capabilities and certifications.',
                    show: false,
                },
                {
                    question: 'How does ConstructionBevy benefit Trade Partners?',
                    answer: 'We help companies save time and money when juggling multiple partners and projects.  Trade partners can answer pre-qual questions once and use multiple times as well as feature their business and generate leads.',
                    show: false,
                },
                {
                    question: 'How does ConstructionBevy benefit Manufacturers & Suppliers?',
                    answer: 'We help manufacturers get more visibility into the bid process.  They can better know the alignment of the trade partners preferred by the winning general contractor which provides them with greater chance to win the work, greater trade partner loyalty, and greater pricing anonymity.',
                    show: false,
                },
                {
                    question: 'How does ConstructionBevy differ than other products?',
                    answer: 'Our platform is built on an open shared database with SEO friendly profiles, helps with lead generation and pre-con workflows, and helps oversee and report on ESG and certifications.',
                    show: false,
                },
                {
                    question: 'How much does it cost to get started on ConstructionBevy?',
                    answer: 'ConstructionBevy is a freemium service with robust features at no cost.  Premium services like advanced search, benchmarking, and analytics will be available with a subscription.',
                    show: false,
                },
                {
                    question: 'What features are you adding in the future?',
                    answer: 'ConstructionBevy will be bringing pre-qualification efficiency, Environmental, Social, & Governance (ESG) implementation and oversight workflow tools later in 2022.  In addition, the marketplace will support owners, architects, and service companies soon.',
                    show: false,
                },
                {
                    question: 'What if I move to a new company?',
                    answer: 'You can keep your ConstructionBevy account and still access the open searchable marketplace if you assign it to your personal email but will lose access to private company features.',
                    show: false,
                },
            ],
            reviews: {
                'Trade Partners': {
                    logo: 'VCC_logo_circle',
                    image: 'Derek_Alley_circle',
                    quote: 'The construction industry is fundamentally driven by fostering quality relationships. We are very excited about the opportunities with ConstructionBevy in enhancing our connections, simplifying our pre-qualifications, and, ultimately, team building with our trade partners and clients.',
                    quoter: 'Derek Alley',
                    title: 'CEO of VCC'
                },
                'Manufacturers': {
                    logo: 'Concepts_logo_circle',
                    image: 'Sherri_Lindsey_circle',
                    quote: 'Like all other Specialty Contractors, we spend a large amount of time and money providing prequalification information to each of our individual customers/GC’s on many different platforms with the same questions asked in many different ways',
                    quoter: 'Sherri Lindsey',
                    title: 'VP, Sales and Marketing'
                },
                'General Contractors': {
                    logo: 'Austin_logo_circle',
                    image: 'Tom_Leppert_circle',
                    quote: 'ConstructionBevy helps navigate the fragmentation of the construction industry by providing connections to and transparency between partners.  This marketplace will save time and money for general contractors and trade partners as well as help manage risk and generate new business.',
                    quoter: 'Tom Leppert',
                    title: 'Chairman of The Board Austin Industries',
                    title2: 'Former CEO of Turner Industries'

                }
            }
        }),
        computed: {
        },
        watch: {
        },
        mounted() {
            if (this.$route.params.tab === 'trade-partner') {
                this.tab = 'Trade Partners'
            } else if (this.$route.params.tab === 'manufacturer') {
                this.tab = 'Manufacturers'
            }
        },
        methods: {
            on_feature_select(feature) {
                this.features_tab = feature
            },
            on_tab_select(tab) {
                this.tab = tab
            },
            on_question_select(question) {
                this.question = question
            }
        },
    }
</script>

<style scoped lang="stylus">

    .top-container
        width 100%
        z-index 1

    .top-stock
        object-fit cover
        width 100%
        height 100%
        position absolute
        left 0
        top 0
        z-index 0

    .xxl-header
        font-size 52px

    .btn-cont
        height 34px

    .active-tab
        background white !important
        color #313D4F !important

    .theme--light.v-btn--active:hover::before, .theme--light.v-btn--active::before
        opacity 0

    .description
        background-color #E9EFFC

    .manuf-paragraph
        max-width 70%

    .manuf-why
        width 80%

    .row-divider
        border-bottom 1px solid #2480EB

    .features-tab
        flex 1 1 45%

    .features-2-tab
        flex 1 1 375px

    // .features-img
    //     height 475px

    .img-left
        margin-left -48px
        flex 1 1 45%

    .img-right
        margin-right -48px
        flex 1 1 45%

    .img-2-right
        margin-right -48px
        flex 1 1 475px

    // .right-object
    //     flex 1 1 475px

    .checklist
        object-fit contain

    .divider
        background linear-gradient(#F7F6F6, #FFFFFF)
        min-height 83px
        border none

    .paragraph
        max-width 55%

    .arrow-pointing
        top 0
        left 59%

    .faq-container
        width 55%

    .faq-border
        border-bottom 1px solid lightgray

    .faq-question
        cursor pointer

    .slide-enter-active
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;

    .slide-leave-active
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);

    .slide-enter-to, .slide-leave
        max-height: 100px;
        overflow: hidden;

    .slide-enter, .slide-leave-to
        overflow: hidden;
        max-height: 0;

    .more-questions
        background-color #F9FAFB
        width 90%
        border-radius 10px

    .email-link
        color white
        text-decoration none

    .review-section
        background-color #F5F6FA

    .review-container
        max-width 75%

    .quoter-container
        img
            height fit-content

    .quoter
        text-align initial


    @media only screen and (max-width: 600px)
        .top-container
            margin-top 28px
            text-align center

            h1, h3
                margin-left 0 !important

            h1
                margin-bottom 12px

            h3
                margin-bottom 0 !important

        h1
            font-size 28px !important

        h2
            font-size 24px !important

        h3
            font-size 18px !important
            font-weight 400

        h5
            font-size 16px !important

        .description
            padding 16px !important

            .container
                margin-left 0 !important
                margin-right 0 !important
                font-size 16px !important

        .features-1
            background-color #F9FAFB !important
            padding 48px 16px !important

            .features-tab
                padding-left 16px !important
                padding-right 16px !important
                max-width 100%
                margin 0 !important
                flex revert

                .features-list
                    margin-left 4px !important

            .features-img
                margin 0 !important
                width 100%
                height revert

                img
                    object-fit contain
                    max-width 100%

            .left-object
                order 2

            .right-object
                order 1

        .features-2

            padding-left 16px !important
            padding-right 16px !important
            padding-bottom 44px !important

            >p, h2
                margin 0 0 12px 0 !important

            .paragraph
                margin-left 0 !important
                max-width 100%
                margin-bottom 44px !important

            .feature-macbook-img
                width 100vw
                margin-left -16px
                margin-right -16px
                margin-top 24px

            .features-2-tab
                margin-left 0 !important
                margin-right 0 !important
                padding 0 !important
                max-width 100%

                .col
                    flex 1 1 auto

        .faq-section

            background-color #F9FAFB !important
            padding 16px !important

            .faq-container
                width 100%

            .more-questions
                background-color white
                padding-left 16px
                padding-right 16px
                width 100%

                .v-btn
                    height 44px

        .review-section

            padding-top 0 !important

            .review-container
                margin-top 0 !important
                max-width 90%

                .logo
                    padding 48px 48px 16px !important

                .quote-container
                    justify-content center

                .quote
                    font-size 18px !important
                    padding-left 0 !important
                    padding-right 0 !important

                .quoter-container
                    display block
                    margin 16px 0 0 !important

                    img
                        margin 0 !important

                    .quoter
                        text-align center


</style>
