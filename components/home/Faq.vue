<template>
    <div class="d-flex fill-height flex-column">
        <div class="white fill-height primary-text--text py-12 px-12">
            <div class="text-center my-8 mx-16">
                <p class="primary--text xs-font medium-weight mb-4">FAQs</p>
                <h1 class="xl-font mb-4">We're here to help</h1>
                <p class="font-18 primary-text--text text--lighten-2 mx-auto mb-4">Have questions? We're here to help.</p>
                <v-btn
                    class="mb-12"
                    color="primary"
                    width="204px"
                    large
                    depressed
                    to="/careers"
                >
                    See current openings
                </v-btn>
            </div>
        </div>
        <div class="white fill-height primary-text--text pa-12">
            <h2 class="xl-font text-center my-10">Frequently asked questions</h2>
            <v-container
                v-for="(questions, category) in faq_copy"
                :key="category"
                class="faq-container"
            >
                <v-row>
                    <h3 class="large-font mb-4">{{ category }}</h3>
                </v-row>
                <v-row
                    v-for="(question, index) in questions"
                    :key="index"
                    class="faq-border align-start mb-5"
                >
                    <v-col cols="11" class="pl-0">
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
        <home-footer/>
    </div>
</template>

<script>
    import HomeFooter from '../footer/FooterHome'
    import { cloneDeep } from 'lodash';
    import { mapState } from 'vuex'

    export default {
        components: { HomeFooter },
        data: () => ({
            faq_copy: null,
        }),
        computed: {
            ...mapState({
                faq_questions: state => _.cloneDeep(state.faqs.faq_questions)
            })
        },
        watch: {
        },
        mounted() {
            this.faq_copy = _.cloneDeep(this.faq_questions)
        },
        methods: {
            submit_inquiry() {

            }
        },
    }
</script>

<style scoped lang="stylus">

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

</style>
