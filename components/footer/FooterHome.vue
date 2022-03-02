<template>
    <div class="primary-text fill-height fill-width white--text py-16 relative">
        <v-container class="">
            <v-row>
                <img
                    rel="preload"
                    alt="Construction Bevy Logo"
                    class="mx-3 mb-8 cb-logo"
                    src="~/assets/images/logos/cbevy-all-white-logo.png"
                />
            </v-row>
            <v-row>
                <v-col class="link-col">
                    <div class="medium-weight mb-4 small-font">Stay Connected</div>
                    <p class="d-block white--text light-weight xs-font mb-6">Follow us on social media</p>
                    <div class="d-flex align-center">
                        <a href="https://twitter.com/ConstructBevy">
                            <img src="@/assets/images/logos/Twitter.png" class="social-icon"/>
                        </a>
                        <!-- <a href="https://www.instagram.com/">
                            <img src="@/assets/images/logos/Instagram.png" class="social-icon"/>
                        </a> -->
                        <a href="https://www.linkedin.com/company/constructionbevy/">
                            <img src="@/assets/images/logos/Linkedin.png" class="social-icon"/>
                        </a>
                        <!-- <a href="https://medium.com/">
                            <img src="@/assets/images/logos/Vector.png" class="social-icon"/>
                        </a> -->
                    </div>
                </v-col>
                <v-col class="link-col">
                    <div class="medium-weight mb-4 small-font">Who We Are</div>
                    <router-link to="/about" class="d-block white--text light-weight xs-font mb-1">About Us</router-link>
                    <!-- <router-link to="/careers" class="d-block white--text light-weight xs-font mb-1">Careers</router-link> -->
                    <!-- <router-link to="/" class="d-block white--text light-weight xs-font mb-1">Become a Partner</router-link>
                    <router-link to="/blogs" class="d-block white--text light-weight xs-font mb-1">Blog</router-link> -->
                    <p class="d-block grey--text light-weight xs-font mb-1">Careers</p>
                    <p class="d-block grey--text light-weight xs-font mb-1">Become a Partner</p>
                    <p class="d-block grey--text light-weight xs-font mb-1">Blog</p>
                </v-col>
                <v-col class="link-col">
                    <div class="medium-weight mb-4 small-font">What We Do</div>
                    <router-link to="/info/general-contractor" class="d-block white--text light-weight xs-font mb-1">For GCs</router-link>
                    <router-link to="/info/trade-partner" class="d-block white--text light-weight xs-font mb-1">For Trade Partners</router-link>
                    <router-link to="/info/manufacturer" class="d-block white--text light-weight xs-font mb-1">For Manufacturers</router-link>
                </v-col>
                <v-col class="link-col">
                    <div class="medium-weight mb-4 small-font">Helpful Links</div>
                    <!-- <router-link to="/faq" class="d-block white--text light-weight xs-font mb-1">FAQ</router-link> -->
                    <p class="d-block grey--text light-weight xs-font mb-1">FAQ</p>
                    <router-link to="/privacy-policy" class="d-block white--text light-weight xs-font mb-1">Privacy Policy</router-link>
                    <router-link to="/terms-of-service" class="d-block white--text light-weight xs-font mb-1">Terms & Conditions</router-link>
                    <!-- <p class="d-block grey--text light-weight xs-font mb-1">Privacy Policy</p>
                    <p class="d-block grey--text light-weight xs-font mb-1">Terms & Conditions</p> -->
                </v-col>
            </v-row>
        </v-container>
        <img src="@/assets/images/stock/stock_construction_workers_2.png" class="construction-stock"/>
    </div>
</template>

<script>
    export default {
        name: "FooterHome",
    }
</script>

<style lang="stylus" scoped>

    a:link
        text-decoration none

    a:visited
        text-decoration none

    a:hover
        text-decoration underline

    a:active
        text-decoration underline

    .container
        margin-left 32px
        padding-left 64px
        padding-right 64px
        position relative
        z-index 2

    .construction-stock
        position absolute
        right 0
        top 0
        z-index 1
        max-height 100%
        opacity 40%

    .link-col
        max-width 220px

        :first-child
            max-width 260px

    .social-icon
        margin-right 25px
        object-fit contain

    @media only screen and (max-width: 600px)
        .container
            padding-left 29px !important
            padding-right 29px !important
            margin-left 0 !important

            .cb-logo
                max-width 70%

            .link-col
                flex 1 1 100%

        .construction-stock
            bottom 0
            top revert
            width 100%

</style>
