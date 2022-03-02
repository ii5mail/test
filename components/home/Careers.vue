<template>
    <div class="d-flex fill-height flex-column">
        <div class="top-div fill-height primary-text--text py-12 px-12">
            <div class="text-center my-8 mx-16">
                <p class="sub-text xs-font medium-weight mb-4">Our values</p>
                <h1 class="xl-font mb-4">How We Work at ConstructionBevy</h1>
                <p class="font-18 primary-text--text text--lighten-2 mx-auto mb-12">Our shared values keep us connected and guide us as one team.</p>
                <v-container>
                    <v-row class="mb-12">
                        <v-col>
                            <img src="@/assets/images/icons/Careers_team_icon.png" class="mb-4"/>
                            <h5 class="font-18 mb-3">Care about our team</h5>
                            <p class="small-font primary-text--text text--lighten-2">Understand what matters to our employees. Give them what they need to do their best work.</p>
                        </v-col>
                        <v-col>
                            <img src="@/assets/images/icons/Careers_heart_icon.png" class="mb-4"/>
                            <h5 class="font-18 mb-3">Be excellent to each other</h5>
                            <p class="small-font primary-text--text text--lighten-2">No games. No bullshit. We rely on our peers to improve. Be open, honest and kind.</p>
                        </v-col>
                        <v-col>
                            <img src="@/assets/images/icons/Careers_trend_icon.png" class="mb-4"/>
                            <h5 class="font-18 mb-3">Pride in what we do</h5>
                            <p class="small-font primary-text--text text--lighten-2">Value quality and integrity in everything we do. At all times. No exceptions.</p>
                        </v-col>
                    </v-row>
                    <v-row class="mt-4">
                        <v-col>
                            <img src="@/assets/images/icons/Careers_smile_icon.png" class="mb-4"/>
                            <h5 class="font-18 mb-3">Don't #!&$ the customer</h5>
                            <p class="small-font primary-text--text text--lighten-2">Understand customers' stated and unstated needs. Make them wildly successful.</p>
                        </v-col>
                        <v-col>
                            <img src="@/assets/images/icons/Careers_flag_icon.png" class="mb-4"/>
                            <h5 class="font-18 mb-3">Do the impossible</h5>
                            <p class="small-font primary-text--text text--lighten-2">Be energized by difficult problems. Revel in unknowns. Ask "Why?", but always question, "Why not?"</p>
                        </v-col>
                        <v-col>
                            <img src="@/assets/images/icons/Careers_lightning_icon.png" class="mb-4"/>
                            <h5 class="font-18 mb-3">Sweat the small stuff</h5>
                            <p class="small-font primary-text--text text--lighten-2">We believe the best products come from the best attention to detail. Sweat the small stuff.</p>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </div>
        <div class="white fill-height primary-text--text py-16 px-12">
            <div class="text-center mt-8 mb-16 mx-16">
                  <v-chip class="sub-text mb-4 px-3 py-2 xs-font">
                      Open positions
                  </v-chip>
                <h1 class="xl-font mb-4">We're looking for talented people</h1>
                <p class="font-18 primary-text--text text--lighten-2 mx-auto mb-12">We’re a 100% remote team spread all across the world. Join us!</p>
                <img src="@/assets/images/stock/stock_careers_coworkers.png" alt="coworkers sitting around table"/>
            </div>
            <div class="d-flex flex-column align-center">
                <div class="job-container mb-16" v-for="(i, cat_index) in job_listing" :key="cat_index">
                    <h5 class="font-18 medium-weight mb-6">{{ i.job_category }}</h5>
                    <div class="job-listing mb-4 pa-6" v-for="(j, job_index) in i.jobs" :key="job_index">
                        <h5 class="small-font medium-weight mb-2">{{ j.title }}</h5>
                        <p class="xs-font primary-text--text text--lighten-2 mb-5">{{ j.description }}</p>
                        <div class="d-flex">
                            <img src="@/assets/images/icons/Careers_clock_icon.png" class="mr-1"/>
                            <p class="xs-font primary-text--text text--lighten-2 mr-4 mb-0">{{ j.job_type }}</p>
                            <img src="@/assets/images/icons/Careers_money_icon.png" class="mr-1"/>
                            <p class="xs-font primary-text--text text--lighten-2 mb-0">{{ j.salary_range }}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <home-footer/>
    </div>
</template>

<script>
    import HomeFooter from '../footer/FooterHome'

    export default {
        components: { HomeFooter },
        data: () => ({
            job_listing: [
                {
                    job_category: 'Design',
                    jobs: [
                        {
                            title: 'UX Designer',
                            description: 'We\'re looking for a mid-level UX designer to join our team.',
                            job_type: 'Full-time',
                            salary_range: '80k - 100k'
                        }
                    ]
                },
                {
                    job_category: 'Software Development',
                    jobs: [
                        {
                            title: 'Engineering Manager',
                            description: 'We\'re looking for an experienced engineering manager to join our team.',
                            job_type: 'Full-time',
                            salary_range: '80k - 100k'
                        },
                        {
                            title: 'Frontend Developer',
                            description: 'We\'re looking for an experienced frontend developer to join our team.',
                            job_type: 'Full-time',
                            salary_range: '80k - 100k'
                        },
                        {
                            title: 'Backend Developer',
                            description: 'We\'re looking for an experienced backend developer to join our team.',
                            job_type: 'Full-time',
                            salary_range: '80k - 100k'
                        },
                    ]
                },
                {
                    job_category: 'Customer Success',
                    jobs: [
                        {
                            title: 'Customer Success Manager',
                            description: 'We\re looking for a mid-level customer success manager to join our team',
                            job_type: 'Full-time',
                            salary_range: '80k - 100k'
                        }
                    ]
                },
            ],
            phone_number: '',

        }),
        computed: {
        },
        watch: {
        },
        mounted() {
        },
        methods: {
            submit_inquiry() {

            }
        },
    }
</script>

<style scoped lang="stylus">

    .top-div
        background-color #F9FAFB

    .sub-text
        color #6941C6 !important

    .v-chip
        background-color #F9F5FF !important

    .v-chip:hover
        background-color #F9F5FF

    .job-container
        width 50%

    .job-listing
        border-radius 10px
        border 1px solid #E4E7EC

</style>
