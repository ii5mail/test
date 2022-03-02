<template>
    <div class="about-container d-flex fill-height flex-column">
        <div class="white fill-height primary-text--text relative py-12 px-12">
            <div class="top-container relative text-center my-8">
                <p class="xs-font primary--text medium-weight mb-4">About Us</p>
                <h1 class="xxl-header mb-4">About the Company</h1>
                <p class="about-paragraph font-18 primary-text--text text--lighten-2 mx-auto">ConstructionBevy is a company that focuses on ways to bring the commerical building industry together in new and efficient ways. Cutting through the complicated bid process,and  leveraging a companies past to get new work.</p>
            </div>
            <img src="@/assets/images/stock/stock_crane_bg.png" class="top-stock"/>
        </div>
        <div class="white fill-height primary-text--text pt-16 px-12">
            <div class="text-center">
                <p class="xs-font primary--text medium-weight mb-4">We're also hiring!</p>
                <h2 class="xxl-header mb-4">Meet Our Team</h2>
                <p class="about-paragraph font-18 primary-text--text text--lighten-2 mx-auto">Our philosophy is simple — hire a team of diverse, passionate people and foster a culture that empowers you to do you best work.</p>
            </div>
            <h2 class="xl-font primary-text--text text-center my-12">Board of Directors</h2>
            <div class="d-flex flex-wrap justify-center mb-8">
                <v-card
                    v-for="(i, index) in board_members"
                    :key="index"
                    class="board-member ma-2"
                >
                    <img :src="require(`@/assets/images/profiles/${i.image}.png`)" class="board-member-img"/>
                    <v-card-title class="px-3">
                        {{ i.name }}
                    </v-card-title>
                    <v-card-text>
                        {{ i.description }}
                    </v-card-text>
                </v-card>
            </div>
        </div>
        <div class="employees-container white fill-height primary-text--text relative py-16 px-12">
            <div class="d-flex flex-wrap justify-center mb-16">
                <v-card
                    v-for="(i, index) in team_members"
                    :key="index"
                    class="team-member ma-4"
                    :class="{'flip-mobile': team_members[index].flip_card && mobile_mode, 'mobile-mode': mobile_mode}"
                    @click="team_members[index].flip_card=!team_members[index].flip_card"
                >
                    <div class="flip-card-inner">
                        <div class="flip-card-front grey lighten-4 pa-4">
                            <img
                                :src="require(`@/assets/images/profiles/Avatar-${ index }.png`)"
                                class="team-profile"
                                justify="center"
                            />
                            <v-card-title class="justify-center">
                                {{ i.name }}
                            </v-card-title>
                            <v-card-subtitle class="purple--text text-center">
                                {{ i.title }}
                            </v-card-subtitle>
                            <v-card-text class="text-center">
                                {{ i.description }}
                            </v-card-text>
                        </div>
                        <div class="flip-card-back relative">
                            <img :src="require(`@/assets/images/profiles/Avatar-${ index }-back.png`)" class="back-profile"/>
                            <div class="absolute">
                                <a
                                    v-for="link in i.social_media"
                                    :key="link.link"
                                    :href="link.link"
                                    class="social-link"
                                >
                                    <img v-if="link.icon!==''" :src="require(`@/assets/images/logos/${link.icon}.png`)"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>
        </div>
        <!-- <div class="white fill-height primary-text--text relative">
            <div class="d-flex">
                <img src="@/assets/images/stock/stock_construction_ceiling.png" class="bot-stock d-none d-sm-block"/>
                <div class="inquiry-form">
                    <h1 class="xxl-header pa-6">Let's build something, together</h1>
                    <p class="font-18 light-weight px-6 mb-8">Reach us anytime via <span><a href="mailto: info@constructionbevy.com">info@constructionbevy.com</a></span></p>
                    <v-form @submit.prevent="submit_inquiry">
                        <v-container class="pa-6">
                            <div>
                                <div class="small-font primary-text--text mt-1">Name</div>
                                <cb-text-field
                                    v-model="form.name"
                                    outlined
                                    placeholder="Your name"
                                    name="name"
                                    type="text"
                                    :error="!!errors.name"
                                    :disabled="form_sent"
                                    :rules="[rules.required]"
                                />
                                <div class="small-font primary-text--text mt-1">Email</div>
                                <cb-text-field
                                    v-model="form.email"
                                    outlined
                                    placeholder="you@company.com"
                                    name="email"
                                    type="text"
                                    :error="!!errors.email"
                                    :disabled="form_sent"
                                    :rules="rules.general_email"
                                />
                                <div class="small-font primary-text--text mt-1">Phone Number</div>
                                <cb-phone-input
                                    v-model="phone_number"
                                    :error="!!errors.phone_number"
                                    :disabled="form_sent"
                                    @format_number="val=>form.phone_number=val ? val : ''"
                                />
                                <div class="small-font primary-text--text mt-10">How can we help?</div>
                                <v-textarea
                                    v-model="form.inquiry"
                                    outlined
                                    placeholder="Tell us how we can help you..."
                                    name="inquiry"
                                    type="text"
                                    :error="!!errors.inquiry"
                                    :disabled="form_sent"
                                    :rules="[rules.required]"
                                />
                            </div>
                            <div class="checkbox-container mb-6">
                                <input type="checkbox" id="privacy-policy" name="privacy-policy" v-model="form.is_privacy_accepted">
                                <label class="small-font" for="privacy-policy">You agree to our friendly <span><router-link to="/privacy-policy">privacy policy</router-link></span></label>
                            </div>
                            <v-btn
                                class="reach-out-btn"
                                color="primary"
                                large
                                depressed
                                type="submit"
                                :loading="loading"
                                :disabled="!form.inquiry || form_sent || !form.is_privacy_accepted"
                            >
                                {{ form_sent ? 'Sent!' : 'Reach Out' }}
                            </v-btn>
                        </v-container>
                    </v-form>
                </div>
            </div>
        </div> -->
        <home-footer/>
    </div>
</template>

<script>
    import HomeFooter from '../footer/FooterHome'
    import CbTextField from '../ui/CbTextField.vue'
    import CbPhoneInput from '../ui/CbPhoneInput.vue'

    export default {
        components: { HomeFooter, CbTextField, CbPhoneInput },
        data: () => ({
            errors: {},
            loading: false,
            form: {
                name: '',
                phone_number: null,
                email: '',
                inquiry: '',
                is_privacy_accepted: false
            },
            form_sent: false,
            phone_number: '',
            mobile_mode: false,
            board_members: [
                {
                    image: 'Lee_Blaylock_pf',
                    name: 'Lee Blaylock',
                    description: 'Founder or co-founder of ConstructionBevy, NiceLeads, Find A Game, Annandale Capital, and ServiceLane.'
                },
                {
                    image: 'Tom_Nolan_pf',
                    name: 'Tom Nolan',
                    description: 'Former CEO Spirit Realty Capital (NYSE:SRC), WashREIT Board Member (NYSE:WRE), GGP, AEW Capital Management, UMass Amherst'
                },
                {
                    image: 'Derek_Alley_pf',
                    name: 'Derek Alley',
                    description: 'Derek is Chief Executive Officer for VCC. Prior to VCC, Derek worked in San Francisco with Blackrock in their Real Estate Private Equity Division.'
                },
                {
                    image: 'Tom_Leppert_pf',
                    name: 'Tom Leppert',
                    description: 'Chairman of Austin Industries, former CEO Turner Construction, and Castle & Cooke, Fluor Director, McKinsey alum, MBA Harvard'
                },
                {
                    image: 'Allison_Ball_pf',
                    name: 'Allison Ball - Advisor',
                    description: 'Partner Hanover Technology Investment Management, Product Lead Facebook, Goldman Sachs alum, A.B. Princeton'
                }
            ],
            team_members: [
                {
                    name: 'Lee Blaylock',
                    title: 'Co-Founder and CEO',
                    description: 'Dell, Oracle, ServiceLane, Founder NiceLeads, Find A Game and Annandale Capital, $800mm AUM RIA, B.A. UT Austin 1990',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Twitter',
                            link: 'https://twitter.com/leeblaylock'
                        },
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/leeblaylock/'
                        },
                        {
                            icon: 'Medium',
                            link: 'https://medium.com/@leeblaylock_99622/about'
                        },
                    ]
                },
                {
                    name: 'Tom Nolan',
                    title: 'Co-Founder',
                    description: 'Dell, Oracle, ServiceLane (VC Backed sold NYSE:OC), Founder NiceLeads, Find A Game and Annandale Capital, $800mm AUM RIA, B.A. UT Austin 1990',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/tom-nolan-32269784/'
                        }
                    ]
                },
                {
                    name: 'David Terral',
                    title: 'Co-Founder and CTO',
                    description: 'Find A Game, UT Austin, BS Computer Engineering 2020',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/david-terral-a8b308170/'
                        }
                    ]
                },
                {
                    name: 'Larry Chao',
                    title: 'VP of Marketing & Partnerships',
                    description: 'Intel, NASA, Kno (acquired by Intel), Cinarra (acquired by Softbank), MIT BS and Stanford MS/PhD, Mechanical Engineering',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/lpchao/'
                        },
                        {
                            icon: 'Twitter',
                            link: 'https://twitter.com/lpchao'
                        },
                    ]
                },
                {
                    name: 'Josh Perkins',
                    title: 'Product Manager',
                    description: 'Blue Lion Capital, NiceLeads, SMU BBA Scholars Program 2018',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/joshua-h-perkins/'
                        }
                    ]
                },
                {
                    name: 'Scott Shell',
                    title: 'Senior Designer',
                    description: 'NiceLeads, Briggs Freeman Sotheby’s, Pixeldust Interactive, Texas State University',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/scottdshell/'
                        }
                    ]
                },
                {
                    name: 'Ayesha Khan',
                    title: 'Senior Engineer',
                    description: 'Apple, Cisco, Merrill Lynch, Univ Virginia, Texas State University, BS CS & Mathematics 2017',
                    flip_card: false,
                    social_media: [
                        {
                            icon: '',
                            link: ''
                        }
                    ]
                },
                {
                    name: 'Jim Frank',
                    title: 'Content Creator',
                    description: 'Sports Illustrated, Men’s Journal, Robb Report, Hemispheres, The Met Golfer, Golf International, Senior Editor for LINKS Magazine,',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/jim-frank-1994b44/'
                        },
                        {
                            icon: 'Medium',
                            link: 'https://medium.com/@findagame'
                        }
                    ]
                },
                {
                    name: 'Joe Lio',
                    title: 'Senior Engineer',
                    description: 'KPFF Lead Project Engineer, UCLA BS Civil Engineering, Cal Berkeley MS Structural Engineering 2016',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/joseph-lio/'
                        }
                    ]
                },
                {
                    name: 'Joseph Goodglass',
                    title: 'Senior Project Manager',
                    description: 'Cognizant, BS Civil Engineering, US Coast Guard, MBA Georgetown, MS Civil Engineering Princeton 2020',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/joseph-goodglass/'
                        }
                    ]
                },
                {
                    name: 'Joe Bass',
                    title: 'Engineer',
                    description: 'Senior Developer / Project Manager Info Power International, QA Analyst Coremetrics',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/joe-bass-7218a777/'
                        }
                    ]
                },
                {
                    name: 'Bilal Hjiouaj',
                    title: 'Staff Engineer',
                    description: 'Full Stack Developer Digital Cheetah Solutions, Web Application Developer Inlo, Texas State Univeristy BS Computer Science 2021',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/hjiouaj/'
                        }
                    ]
                },
                {
                    name: 'Jamal Hamilton',
                    title: 'Staff Engineer',
                    description: 'Full Stack Developer, Coastal Corolina University, Computer Science 2012',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'linkedin.com/in/jamal-e-hamilton/'
                        }
                    ]
                },
                {
                    name: 'Jou Xiong',
                    title: 'Staff Engineer',
                    description: 'U Wisconsin Pre College Advisor, Stanford IT assistant, BS Symbolic Systems, Stanford 2019',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/jouxiong/'
                        }
                    ]
                },
                {
                    name: 'Zach Luman',
                    title: 'Senior Engineer',
                    description: 'NiceLeads, Find A Game, Luman.Tech, BS Economics Utah State University 2010',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/zach-luman/'
                        }
                    ]
                },
                {
                    name: 'Lina Puentes',
                    title: 'Designer',
                    description: 'Richards Group, J. Walter Thompson World Wide, BBDO San Francisco, Firewood, Texas A&M Commerce BFA Art Direction',
                    flip_card: false,
                    social_media: [
                        {
                            icon: 'Linkedin',
                            link: 'https://www.linkedin.com/in/lina-puentes-88829452/'
                        }
                    ]
                },
            ],
            rules: {
                required: value => !!value || 'This field is required',
                general_email: [
                    value => !!value || 'Required.',
                    value => {
                        if (value && value.includes('@')) {
                            let split_email = value.split('@')
                            let split_domain = split_email[1]?.split('.')
                            if (!split_email[1].includes('.') || split_email[0] === '' || split_domain[1] === '' || split_domain[0] === '') {
                                return 'Not a valid email'
                            }
                            return true
                        } else {
                            return 'Not a valid email'
                        }
                    },
                ],
            },

        }),
        computed: {
        },
        watch: {
        },
        mounted() {
            this.handleResize()
            window.addEventListener('resize', this.handleResize)
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        },
        methods: {
            handleResize() {
                // this.sideBarClass = window.matchMedia('(max-width: 600px)').matches ? (this.active ? 'mobile-sidebar' : 'desktop-sidebar') : 'desktop-sidebar'
                this.mobile_mode = window.matchMedia('(max-width: 600px)').matches
            },
            async submit_inquiry() {
                try {
                    this.saving = true
                    const payload = { ...this.form }
                    // await this.$axios.post('/api/contact_form/', payload)
                    this.saving = false
                    this.form_sent = true
                } catch(e) {
                    if (e.response) {
                        if (e.response.status === 500) {
                            this.errors = { detail: "Error Occurred" }
                        } else {
                            this.errors = e.response.data
                        }
                    } else {
                        this.errors = { 'detail': "Error Occurred" }
                    }
                    this.$snackbar.show_message({ content: 'Please fix errors and try again', type: 'error' })
                    this.saving = false
                    console.log(this.errors)
                }
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
        opacity 50%
        position absolute
        left 0
        top 0
        z-index 0

    .xxl-header
        font-size 52px

    .about-paragraph
        max-width 50%

    .board-member
        flex 0 1 218px
        background-color transparent
        perspective 1000px

    .board-member-img
        width 218px

    .team-member
        flex 0 1 280px
        background-color transparent
        perspective 1000px
        height 390px

    .social-link:not(:last-child)
        margin-right 16px

    .flip-card-inner
        position relative
        width 100%
        height 100%
        transition transform 0.6s
        transform-style preserve-3d

    .team-member:not(.mobile-mode):hover .flip-card-inner
        transform rotateY(180deg)

    .flip-card-front, .flip-card-back
        position absolute
        width 100%
        height 100%
        -webkit-backface-visibility hidden
        backface-visibility hidden

    .flip-card-back
        transform rotateY(180deg)

        div
            bottom 20px
            left 50%
            transform translate(-50%, 0)

    .team-profile
        margin-left 35%

    .back-profile
        height 390px
        width 280px
        object-fit cover
        border-radius 5px

    .bot-stock
        width 50%

    .inquiry-form
        padding 5%
        width 50%

    .checkbox-container
        margin-top -16px

    .reach-out-btn
        width 100%

    @media only screen and (max-width: 600px)

        .about-container
            > div
                padding-left 16px !important
                padding-right 16px !important

        h1
            font-size 28px !important

        h2
            font-size 24px !important

        .about-paragraph
            max-width 100%

        .employees-container
            padding-bottom 0 !important

            .team-member
                margin-left 0 !important
                margin-right 0 !important

            .flip-mobile .flip-card-inner
                transform rotateY(180deg)


        .inquiry-form
            padding 0 !important
            width 100%

            h1
                padding-left 0 !important
                padding-right 0 !important

            p
                padding-left 0 !important
                padding-right 0 !important

            .container
                padding 0 0 48px !important
</style>
