<!--
 Adapted from https://gist.github.com/Jonarod/7ff2fe4f81aae39e431aa7a08ce815bc



 * @usage:
 *
 *   <checkbox v-model="checked" />
 *

-->

<template>
    <label class="wrapper flex items-center" :class="{'disabled': disabled}">
        <input
            class="checkbox"
            type="checkbox"
            @change.stop="updateInput"
            :checked="checked"
            :disabled="disabled"
        />

        <span class="checkmark"></span>
    </label>
</template>

<script>
    export default {
        props: ['value', 'disabled'],
        data() {
            return {
                checked: this.value
            }
        },
        watch: {
            value() {
                this.updateInput(null, this.value)
            }
        },
        mounted() {
            this.updateInput(null, this.value)
        },
        methods: {
            updateInput(event, value) {
                let is_checked = event?.target?.checked || value
                this.checked = is_checked
                this.$emit('input', is_checked)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    /* Customize the label (the wrapper) */
    .wrapper {
        display: block;
        position: relative;
        padding-left: 30px;
        margin-bottom: 6px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-size: 16px;
    }

    /* Hide the browser's default checkbox */
    .wrapper input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 2px;
        left: 0;
        height: 21px;
        width: 21px;
        border-radius: 2px;
        background-color: var(--v-white-base);
        border: 1px solid var(--v-light-purple-base);
        transition .1s
    }

    /* On mouse-over, add a grey background color */
    .wrapper:not(.disabled):hover input ~ .checkmark {
        border-color: var(--v-primary-base);
    }

    .disabled {
        cursor default
        color var(--v-disabled-base)
    }


    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .wrapper input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .wrapper .checkmark:after {
        left: 6.3px;
        top: 0;
        width: 7px;
        height: 15px;
        border: solid var(--v-primary-text-base);
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .disabled .checkmark:after {
        border-color var(--v-light-purple-base);
    }

</style>
