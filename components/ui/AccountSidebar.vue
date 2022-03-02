<template>
    <v-navigation-drawer
        permanent
        width="385px"
        max-width="30%"
        app
        id="drawer-img"
    >
        <img
            rel='preload'
            alt='sidebar construction image'
            class="background"
            :src="img_src"
        />
        <v-container class="px-3">
            <v-row class="px-8 pb-10 pt-6">
                <img
                    v-if="logo"
                    rel='preload'
                    alt="Construction Bevy Logo"
                    class="logo"
                    src="~/assets/images/logos/white-logo.png"
                >
            </v-row>
            <v-container class="px-8 content" v-if="content.type === 'registration_steps'">
                    <v-row class="align-center" :class="{'full-opacity': content.step > 0}">
                        <v-col cols="1" class="d-flex align-center pa-0">
                            <v-icon size="25px" color="white">mdi-check</v-icon>
                        </v-col>
                        <v-col class="py-1">
                            User ID
                        </v-col>
                    </v-row>
                <v-row :class="{'full-opacity': content.step > 1}">
                    <v-col cols="1" class="d-flex align-center pa-0">
                        <v-icon size="25px" color="white">mdi-check</v-icon>
                    </v-col>
                    <v-col class="py-1">
                        Password
                    </v-col>
                </v-row>
                <v-row :class="{'full-opacity': content.step > 2}">
                    <v-col cols="1" class="d-flex align-center pa-0">
                        <v-icon size="25px" color="white">mdi-check</v-icon>
                    </v-col>
                    <v-col class="py-1">
                        Name & <span :class="{'opaque': content.step === 3}">Company</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="1" class="d-flex align-center pa-0">
                        <v-icon size="25px" color="white">mdi-check</v-icon>
                    </v-col>
                    <v-col class="py-1">
                        About
                    </v-col>
                </v-row>
            </v-container>
            <v-container v-else-if="content.type === 'create_account'" class="px-8 content">
                <v-row class="full-opacity medium-font mb-4">
                    Create Free Account
                    <span class="xs-font light-weight">No credit card required</span>
                </v-row>
                <v-row class="full-opacity small-font intro-msg light-weight secondary-text--text ">
                    Create an account in minutes and get access to new business, research and stay up to date in your industry
                </v-row>
            </v-container>
        </v-container>


    </v-navigation-drawer>
</template>
<script>
    export default {
        props: {
            logo: { type: Boolean, default: true }
        },
        data() {
            return {
                content: {},
                img_url: 'building'
            }
        },
        watch: {
            $route() {
                this.get_content()
            }
        },
        computed: {
            img_src() {
                return require(`@/assets/images/sidebar_images/${ this.img_url }.png`)
            },
        },
        mounted() {
            this.get_content()
        },
        methods: {
            get_content() {
                const current_route = this.$route.fullPath.split('/')[this.$route.fullPath.split('/').length - 1]
                switch (current_route) {
                case 'email-entry':
                    this.img_url = 'cranes'
                    this.content = {
                        type: 'create_account',
                    }
                    break
                case 'validate-email':

                    this.img_url = 'cranes'
                    this.content = {
                        type: 'create_account',
                    }
                    break
                case 'create-password':
                    this.img_url = 'workers'
                    this.content = {
                        type: 'registration_steps',
                        step: 1,
                    }
                    break
                case 'add-name':
                    this.img_url = 'workers'
                    this.content = {
                        type: 'registration_steps',
                        step: 2,
                    }
                    break
                case 'workplace':
                    this.img_url = 'workers'
                    this.content = {
                        type: 'registration_steps',
                        step: 3,
                    }
                    break
                case 'categories':
                    this.img_url = 'workers'
                    this.content = {
                        type: 'registration_steps',
                        step: 3,
                    }
                    break
                case 'description':
                    this.img_url = 'workers'
                    this.content = {
                        type: 'registration_steps',
                        step: 4,
                    }
                    break
                default:
                    this.content = {
                        type: 'login',
                    }
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .content
        color white
        font-weight 700
        z-index 1
        position relative
        transition .2s

        >>> .row
            opacity .3

    .full-opacity
        opacity 1 !important

    .opaque
        opacity .3

    .intro-msg
        line-height 24px

    >>> .v-navigation-drawer__content
        background var(--v-primary-base) !important
        overflow hidden

        img.logo
            width 300px
            max-width 90%
            z-index 1

        img.background
            position absolute
            bottom 0
            z-index 0
            width 100%
</style>
