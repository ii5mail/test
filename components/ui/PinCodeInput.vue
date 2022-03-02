<template>
    <div class="d-flex input-container">
        <v-text-field
            outlined
            v-for="(num, i) in 6"
            :key="i"
            :autofocus="i === 0 && autofocus"
            :value="value[num-1]"
            :class="`input_${i} ${
                num === 6 ? 'last' :
                num === 1 ? 'first' : ''
            }
            ${
            error ? 'error' : null
            }
            `"
            class="input-block"
            :ref="`input_${i}`"
            large
            maxlength="1"
            @focus="active_idx = i"
            @input="val=>handle_input(val, i)"
            @keydown.backspace="handle_backspace(i)"
            @keydown="handle_arrows"
            @paste.stop="on_paste"
            type="text"
        />
    </div>
</template>

<script>

    export default {
        props: {
            'autofocus': { type: Boolean },
            'error': { type: Boolean, default: false },
            'clear_input': { type: Boolean, default: false }
        },
        data() {
            return {
                value: [],
                active_idx: 0
            }
        },
        watch: {
            error() {
                if (this.error && this.clear_input) {
                    this.value = []
                    this.active_idx = 0
                }
            },
            clear_input() {
                if (this.error && this.clear_input) {
                    this.value = []
                    this.active_idx = 0
                }
            },
            value() {
                this.$emit('onchange', this.value.join(''))
            },
            active_idx() {
                if (this.$refs[`input_${ this.active_idx }`]) {
                    //set timeouts are required for some reason
                    setTimeout(() => {
                        this.$refs[`input_${ this.active_idx }`][0].focus()
                    })
                    setTimeout(() => {
                        this.$refs[`input_${ this.active_idx }`][0].$el.querySelector('input').select()
                    })
                }
            }
        },
        methods: {
            on_paste(evt) {
                const new_value = []
                const pasted_text = evt.clipboardData.getData('text')
                if (pasted_text) {
                    for (let i = 0; i < pasted_text.split('').length; i++) {
                        if (i > 5) break
                        new_value[i] = pasted_text.split('')[i]
                    }
                }
                // This delay makes sure this block fires AFTER the @input event.
                // It allows us to paste from any of the six input fields
                // Find a better way to do it and I'll kiss you -Sam
                setTimeout(() => {
                    this.value = new_value
                })
            },
            handle_arrows({ keyCode }) {
                if (keyCode === 37 && this.active_idx > 0) {
                    this.active_idx -= 1
                    return
                }
                if (keyCode === 39 && this.active_idx < 5) {
                    this.active_idx += 1
                }
            },
            handle_backspace(i) {
                this.value[i] = null
                this.active_idx = i - 1
                this.value = [...this.value] // this forces a rerender/watcher to fire
            },
            handle_input(val, i) {
                if (val.length) {
                    this.value[i] = val
                    this.active_idx = i + 1
                    this.value = [...this.value] // this forces a rerender/watcher to fire
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .input-block.first
        border-left 1px solid var(--v-light-purple-base)
        border-top-left-radius 4px
        border-bottom-left-radius 4px

    .input-block.last
        border-top-right-radius 4px
        border-bottom-right-radius 4px

    .input-block.error
        border-color var(--v-error-light-base)

    .input-block
        border 1px solid var(--v-light-purple-base)
        border-left none
        max-width 80px
        border-radius 0
        font-size 44px


        >>> fieldset
            border none
            display none

        >>> .v-input__slot
            margin 0
            padding 0 !important

        >>> .v-text-field__slot
            input
                text-align center !important
                padding 28px 0

        >>> .v-text-field__details
            display none


</style>
