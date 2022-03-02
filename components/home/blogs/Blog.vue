<template>
    <div class="d-flex fill-height flex-column">
        <div class="white fill-height primary-text--text py-16 px-12">
            <div class="header-section align-center px-16">
                <div class="pr-4">
                    <v-chip class="read-length mb-6">{{ featured_blog.length }} read</v-chip>
                    <h1 class="title mb-10">{{ featured_blog.title }}</h1>
                    <p class="medium-font light-weight primary-text--text text--lighten-2 mb-8">{{ featured_blog.subtitle }}</p>
                    <div class="d-flex align-center mb-6">
                        <img :src="featured_blog.profile" class="author-profile mr-3"/>
                        <div>
                            <p class="font-18 medium-weight mb-0">{{ featured_blog.author }}</p>
                            <p class="font-18 light-weight primary-text--text text--lighten-2 mb-0">{{ featured_blog.date_created }}</p>
                        </div>
                    </div>
                </div>
                <img :src="featured_blog.cover" class="cover-photo"/>
            </div>
        </div>
        <div class="white fill-height primary-text--text pb-12 px-12">
            <div class="mx-16 my-12">
            </div>
        </div>
        <home-footer/>
    </div>
</template>

<script>
    import CbTextField from '../../ui/CbTextField.vue'
    import HomeFooter from '../../footer/FooterHome'

    export default {
        components: { CbTextField, HomeFooter },
        data: () => ({
            errors: {},
            email: '',
            tag_colors: {
                'Management': {
                    color: '#6941C6',
                    backgroundColor: '#F9F5FF'
                },
                'Hiring': {
                    color: '#3538CD',
                    backgroundColor: '#EEF4FF'
                },
                'Remote': {
                    color: '#C11574',
                    backgroundColor: '#FDF2FA'
                }
            },
            featured_blog: {
                id: 1,
                cover: require('../../../assets/images/stock/stock_desk_chairs.png'),
                author: 'Craig Kennedy',
                profile: require('../../../assets/images/profiles/Rick_Tridal_profile.png'),
                date_created: '20 Jan 2022',
                title: 'Staffing a Job Remotely',
                subtitle: 'How do you create a great team while you’re in another state or country? Here are some tips.',
                body: '',
                length: '8 min',
                tags: ['Management', 'Hiring', 'Remote']
            },
            rules: {
                general_email: [
                    value => {
                        if (value && value.includes('@')) {
                            let split_email = value.split('@')
                            let split_domain = split_email[1]?.split('.')
                            if (!split_email[1].includes('.') || split_email[0] === '' || split_domain[1] === '' || split_domain[0] === '') {
                                return 'Not a valid email'
                            }
                            return true
                        } else if (value === '') {
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
        },
        methods: {
            submit_inquiry() {

            }
        },
    }
</script>

<style scoped lang="stylus">

    .title
        font-size 56px !important
        line-height 56px

    .author-profile
        width 56px

    .header-section
        display grid
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    .cover-photo
        object-fit cover
        width 100%

    .privacy-policy
        text-align initial
        margin-top -20px
        z-index 1

    .v-chip
        height 24px
        cursor pointer

    .v-chip.read-length
        cursor none
        height 32px
        background-color #F9F5FF
        color #6941C6

    .blog-post
        max-width 384px
        img
            object-fit cover
            width 100%
            height 240px

    .blog-link
        text-decoration none

</style>
