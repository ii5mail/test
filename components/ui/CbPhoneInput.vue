<template>
    <div class="wrapper">
        <vue-phone-number-input
            valid-color="#2ECC71"
            class="phone-number"
            :class="{ 'show-error': invalid_number }"
            v-model="num_input"
            :error="(!!format_error || error) && !reset_error"
            :value="value"
            :disabled="disabled"
            :no-validator-state="no_validator_state"
            @phone-number-blur="check_valid"
            @update="create_payload"
            ref="keystroke"
        />
        <p
            v-if="formatted_number===undefined && change_made && num_input === null"
            class="empty_error"
        >
            Required.
        </p>
        <p
            v-else-if="change_made && (!!format_error || error) && !reset_error"
            class="empty_error"
        >
            Invalid Number.
        </p>
    </div>
</template>

<script>
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';

    export default {
        components: {
            VuePhoneNumberInput,
        },
        props: {
            error: Boolean,
            value: String,
            disabled: Boolean,
        },
        data() {
            return {
                invalid_number: false,
                formatted_number: '',
                country_code: '',
                format_error: false,
                reset_error: false,
                change_made: false,
            }
        },
        computed: {
            num_input: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input', val);
                }
            },
            no_validator_state() {
                if (!this.change_made) {
                    return true
                } else {
                    return false
                }
            }
        },
        watch: {
            num_input() {
                if (this.num_input === null || this.num_input === '' && !this.change_made) {
                    this.format_error = false
                }
            },
        },
        methods: {
            check_valid() {
                const element = this.$el.querySelector('.input-phone-number')
                if (!element.classList.contains('is-valid') && !this.no_validator_state) {
                    this.format_error = true
                } else {
                    this.format_error = false
                }
            },
            update_reset_error(val) {
                this.reset_error = val
                if (val) {
                    this.change_made = false
                }
            },
            create_payload(data) {
                this.formatted_number = data.formattedNumber
                this.$emit('format_number', this.formatted_number)
                if (data.formattedNumber?.length < 12 || data.formattedNumber?.length > 12) {
                    this.$emit('detect_change', true)
                    this.change_made = true
                }
                this.update_reset_error(false)
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .wrapper

        position relative

    .phone-number

        >>> input
            height 50px
            border-color black
            font-size 15px

        >>> .country-selector__country-flag
            top 26px

        >>> .country-selector__toggle__arrow
            position relative
            top 4px

        >>> label
            font-size 12px !important

        >>> .input-tel.is-disabled .input-tel__input
            background-color white
            pointer-events none

        >>> .country-selector.is-disabled .country-selector__input
            background-color white


    .show-error

        >>> .input-tel__input
            border-color red

        >>> .country-selector__input
            border-color red

    .empty_error

        line-height 12px
        color red
        position absolute
        font-size 12px
        font-weight 100
        top 55px
        left 130px



</style>
