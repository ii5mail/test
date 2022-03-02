<template>
    <div class="d-flex fill-height flex-column">
        <div class="white fill-height primary-text--text pt-12 px-12">
            <div class="text-center my-8 mx-16">
                <p class="primary--text xs-font medium-weight mb-4">Our Blog</p>
                <h1 class="xl-font mb-4">Resources and Insights</h1>
                <p class="font-18 primary-text--text text--lighten-2 mx-auto mb-10">The latest industry news, interviews, technologies, and resources.</p>
                <v-form @submit.prevent="subscribe_email">
                    <div class="d-flex justify-center">
                        <div>
                            <cb-text-field
                                v-model="email"
                                outlined
                                placeholder="Enter your email"
                                name="email"
                                type="text"
                                class="subscribe-email mr-4"
                                :error="!!errors.email"
                            />
                            <p class="privacy-policy xs-font primary-text--text text--lighten-2 relative">We care about your data in our <span><router-link class="primary-text--text text--lighten-2" to="/">privacy policy</router-link></span></p>
                        </div>
                        <v-btn
                            class="light-weight"
                            color="primary"
                            large
                            depressed
                            type="submit"
                            :disabled="!email"
                        >
                            Subscribe
                        </v-btn>
                    </div>
                </v-form>
            </div>
        </div>
        <div class="white fill-height primary-text--text pb-12 px-12">
            <div class="mx-16">
                <img
                    :src="featured_blog.cover"
                    alt="working desk and chairs"
                    class="mt-12 mb-8 fill-width"
                />
                <p class="xs-font primary--text medium-weight mb-2">{{ featured_blog.author }} • {{ featured_blog.date_created }}</p>
                <h2 class="large-font medium-weight mb-2">{{ featured_blog.title }}</h2>
                <p class="xs-font primary-text--text text--lighten-2 mb-6">{{ featured_blog.subtitle }}</p>
                <v-chip
                    v-for="(tag, i) in featured_blog.tags"
                    :key="i"
                    class="mr-3 mb-3 px-3 py-2 xs-font"
                    :style="tag_colors[tag]"
                >
                    {{ tag }}
                </v-chip>
            </div>
        </div>
        <div class="white fill-height primary-text--text pb-12 px-12">
            <div class="mx-12 d-flex flex-wrap">
                <div
                    v-for="blog in blogs"
                    :key="blog.id"
                    class="blog-post mx-4"
                >
                    <router-link :to="`/blogs/${blog.id}`">
                        <img
                            :src="blog.cover"
                            alt="working desk and chairs"
                            class="blog-cover mb-8"
                        />
                    </router-link>
                    <p class="xs-font primary--text medium-weight mb-2">{{ blog.author }} • {{ blog.date_created }}</p>
                    <router-link class="blog-link" :to="`/blogs/${blog.id}`">
                        <h2 class="medium-font primary-text--text medium-weight mb-2">{{ blog.title }}</h2>
                        <p class="xs-font primary-text--text text--lighten-2 mb-6">{{ blog.subtitle }}</p>
                    </router-link>
                    <v-chip
                        v-for="(tag, i) in blog.tags"
                        :key="i"
                        class="mr-3 mb-3 px-3 py-2 xs-font"
                        :style="tag_colors[tag]"
                    >
                        {{ tag }}
                    </v-chip>
                </div>
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
                date_created: '20 Jan 2022',
                title: 'Staffing a Job Remotely',
                subtitle: 'How do you create a great team while you’re in another state or country? Here are some tips.',
                tags: ['Management', 'Hiring', 'Remote']
            },
            blogs: [
                {
                    id: 6,
                    cover: require('../../../assets/images/stock/stock_desk_chairs.png'),
                    author: 'Craig Kennedy',
                    date_created: '20 Jan 2022',
                    title: 'Staffing a Job Remotely',
                    subtitle: 'How do you create a great team while you’re in another state or country? Here are some tips.',
                    tags: ['Management', 'Hiring', 'Remote']
                },
                {
                    id: 2,
                    cover: require('../../../assets/images/stock/stock_desk_chairs.png'),
                    author: 'Craig Kennedy',
                    date_created: '20 Jan 2022',
                    title: 'Staffing a Job Remotely',
                    subtitle: 'How do you create a great team while you’re in another state or country? Here are some tips.',
                    tags: ['Management', 'Hiring', 'Remote']
                },
                {
                    id: 3,
                    cover: require('../../../assets/images/stock/stock_desk_chairs.png'),
                    author: 'Craig Kennedy',
                    date_created: '20 Jan 2022',
                    title: 'Staffing a Job Remotely',
                    subtitle: 'How do you create a great team while you’re in another state or country? Here are some tips.',
                    tags: ['Management', 'Remote']
                },
                {
                    id: 4,
                    cover: require('../../../assets/images/stock/stock_desk_chairs.png'),
                    author: 'Craig Kennedy',
                    date_created: '20 Jan 2022',
                    title: 'Staffing a Job Remotely',
                    subtitle: 'How do you create a great team while you’re in another state or country? Here are some tips.',
                    tags: ['Management', 'Hiring', 'Remote']
                },
                {
                    id: 5,
                    cover: require('../../../assets/images/stock/stock_desk_chairs.png'),
                    author: 'Craig Kennedy',
                    date_created: '20 Jan 2022',
                    title: 'Staffing a Job Remotely',
                    subtitle: 'How do you create a great team while you’re in another state or country? Here are some tips.',
                    tags: ['Management', 'Hiring', 'Remote']
                },
            ],
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
    .subscribe-email
        min-width 360px

    .privacy-policy
        text-align initial
        margin-top -20px
        z-index 1

    .v-chip
        height 24px
        cursor pointer

    .blog-post
        // display: grid;
        // grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
        // grid-gap: 1rem;
        max-width 384px
        img
            object-fit cover
            width 100%
            height 240px

    .blog-link
        text-decoration none

</style>
