<template>
    <v-snackbar v-model="show" :color="type || 'primary'" :timeout="timeout" v-bind="position" outlined>
            <div :class="`countdown ${type || 'primary'}`" :style="countdown" v-if="timeout > 0"/>
            <v-row>
                <v-col :cols="2" class="d-flex align-center justify-center">
                    <v-icon :color="type || 'primary'">
                        {{ icon }}
                    </v-icon>
                </v-col>
                <v-col class="d-flex align-center small-font">
                    {{ message }}
                </v-col>
            </v-row>
            <template v-slot:action="{ attrs }">
                <v-btn @click="close_snackbar" v-bind="attrs" icon x-small>
                    <v-icon color="black">mdi-close</v-icon>
                </v-btn>
            </template>
    </v-snackbar>
</template>

<script>
    export default {
        data() {
            return {
                show: false, //false
                message: '',
                position: {}, // i.e. {top: true, left: true} ----> https://vuetifyjs.com/en/api/v-snackbar/#props
                timeout: 5000, // default is 5 seconds. Pass -1 to disable timeout
                callback: null, // called when snackbar is closed
                type: null // danger, warning, success, info or null
            }
        },
        computed: {
            countdown: function () {
                // this allows us to pass a dynamic timeout to our styles below

                const timeout = parseInt(this.timeout)+100 // this 100 prevents flashing
                return {
                    '--snackbar-timeout': `${ timeout }ms`,
                }
            },
            icon: function () {
                switch (this.type) {
                case 'error':
                    return 'mdi-alert-circle-outline'
                case 'warning':
                    return 'mdi-alert-box-outline'
                case 'success':
                    return 'mdi-checkbox-marked-circle-outline'
                default:
                    return 'mdi-information-outline'
                }
            }
        },
        created() {
            this.$store.subscribe((mutation, context) => {
                if (mutation.type === 'snackbar/show_message') {
                    this.message = context.snackbar.message
                    this.timeout = context.snackbar.timeout || 5000
                    this.show = true
                    this.callback = context.snackbar.callback || null
                    this.type = context.snackbar.type
                    this.position = context.snackbar.position
                } else if (mutation.type === 'snackbar/hide_message') {
                    this.show = false
                }
            })
        },
        methods: {
            close_snackbar() {
                this.show = false
                if (this.callback) {
                    this.callback()
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    @keyframes countdown
        to
            width 0

    >>> .v-snack__wrapper
        position relative
        overflow auto !important
        background var(--v-main-background-base)
        border-width 1px

    .countdown
        animation infinite var(--snackbar-timeout) countdown linear
        animation-fill-mode forwards
        width 100%
        height 5px

        opacity .5
        position absolute
        left 0
        top 0px
</style>
