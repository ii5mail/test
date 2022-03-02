<!-- Usage:
        <confirm-dialog
            v-model="show_back_modal"
            @on_action="back_to_project"
            :title="`Back to project: ${project.title}`"
            msg="Are you sure?"
            action_btn_text="Confirm"
            cancel_btn_text="Cancel"
        />

-->
<template>
    <div>
        <v-dialog
            absolute
            :value="value"
            max-width="500"
            persistent
        >
            <v-card>
                <v-card-title class="primary primary--text">
                    {{ title || "Are you sure you want to leave?" }}
                    <div class="timer" v-if="!isNaN(timer)">
                        {{ (count_down / 1000).toFixed(1) }}
                    </div>
                </v-card-title>
                <v-card-text class="pa-5">
                    {{ msg || "Are you sure you want to leave? All progress will be lost." }}
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        elevation="0"
                        @click="toggle"
                        class="xs-font"
                        min-width="100px"
                        height="30px"
                    >
                        {{ cancel_btn_text || "Cancel" }}
                    </v-btn>
                    <v-spacer/>
                    <v-btn
                        class="xs-font"
                        min-width="100px"
                        height="30px"
                        elevation="0"
                        color="primary"
                        @click="on_action"
                    >
                        {{ action_btn_text || "Yes" }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: ["value", "title", "msg", "action_btn_text", "cancel_btn_text", 'timer'],
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
