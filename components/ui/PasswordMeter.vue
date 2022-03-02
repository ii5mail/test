<template>
    <v-card width="300px" class="py-1">
        <v-card-title class="body-1 pt-2 pb-1 heavy-weight">Password Strength</v-card-title>
        <v-card-text class="pb-2">
            <v-progress-linear
                :color="color"
                rounded
                :value="progress"
                height="7"
                background-color="light-grey"
            ></v-progress-linear>
            <div class="caption primary-text--text mt-1">
                {{ this.text }}
            </div>

        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props: {
            password: { type: String }
        },
        data() {
            return {
                data: true,
                color: 'error',
                progress: 4,
                text: 'Minimum 6 characters'
            }
        },
        watch: {
            password: function () {
                if (this.password.length < 6) {
                    this.progress = 4
                    this.color = 'error'
                    this.text = 'Give it some more thought.'
                    this.$emit('onchange', false)
                } else if (this.password.length < 9) {
                    this.progress = 30
                    this.color = 'warning'
                    this.text = 'It works, but could be better.'
                    this.$emit('onchange', true)
                } else if (this.password.length < 13) {
                    this.progress = 65
                    this.color = 'success-darker'
                    this.text = 'Great! This will do. Just don’t forget it.'
                    this.$emit('onchange', true)
                } else {
                    this.progress = 100
                    this.color = 'success-darker'
                    this.text = "Wow, that's a great one!"
                    this.$emit('onchange', true)
                }
            }
        }
    }
</script>
<style lang="stylus" scoped>
    >>> .v-progress-linear__determinate
        border-top-right-radius 100px !important
        border-bottom-right-radius 100px !important

    .v-card.v-sheet
        border 1px solid var(--v-light-purple-base)

</style>
