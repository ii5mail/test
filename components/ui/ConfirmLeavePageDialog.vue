
<template>
    <div>
        <v-dialog
            absolute
            :value="value"
            max-width="630px"
            persistent
        >
            <v-card>
                <div class="d-flex flex-row-reverse pa-4">
                    <v-btn
                        icon
                        @click="toggle"
                    >
                        <v-icon large color="primary-text">mdi-close</v-icon>
                    </v-btn>
                </div>
                <v-container class="px-16 pb-8 small-font primary-text--text">
                    <div class="mb-4 large-font light-weight primary-text--text">
                        {{ title || "Are you sure you want to leave?" }}
                        <div class="timer" v-if="!isNaN(timer)">
                            {{ (count_down / 1000).toFixed(1) }}
                        </div>
                    </div>
                    <div class="pb-12">
                        {{ msg || "Are you sure you want to leave? All progress will be lost." }}
                    </div>
                    <v-row class="py-5">
                        <v-btn
                            class="light-weight"
                            elevation="0"
                            @click="on_secondary_action"
                            min-width="134px"
                            height="55px"
                            color="primary"
                            text
                        >
                            {{ cancel_btn_text || "Cancel" }}
                        </v-btn>
                        <v-spacer/>
                        <v-btn
                            min-width="100px"
                            height="55px"
                            elevation="0"
                            color="primary"
                            depressed
                            :loading="loading"
                            @click="on_action"
                        >
                            {{ action_btn_text || "Yes" }}
                        </v-btn>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: ["value", "title", "msg", "action_btn_text", "cancel_btn_text", "timer", "loading"],
        watch: {
            value() {
                if (this.value && !isNaN(this.timer)) {
                    this.count_down = this.timer
                    this.start_countdown()
                } else if (!isNaN(this.timer)) {
                    // When modal is closed and timer exists, were going to stop the timer
                    clearInterval(this.timeout)
                }
            },
            count_down() {
                if (this.count_down <= 0) {
                    // Calls action when timer runs out
                    clearInterval(this.timeout)
                    this.on_action()
                }
            }
        },
        data() {
            return {
                count_down: this.timer,
                timeout: null // Holding the setInterval here allows us to clear the setTimeout when desired
            }
        },
        methods: {
            start_countdown() {
                this.timeout = setInterval(() => {
                    this.count_down -= 100
                }, 100)
            },
            async on_action() {
                this.$emit('on_action', this.value.id)
            },
            async on_secondary_action() {
                this.$emit('on_secondary_action', this.value.id)
                this.toggle()
            },
            toggle() {
                this.$emit('input', !this.value)
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .v-dialog
        .v-card
            .v-card__title
                color white !important
                font-weight bold
                display flex
                justify-content space-between

            .v-card__text
                border-bottom 1px solid $grey-light

    .timer
        color $grey-darker
        background $grey-lighter
        border-radius 4px
        padding 0 10px
        font-size 14px
        font-weight 100

</style>
