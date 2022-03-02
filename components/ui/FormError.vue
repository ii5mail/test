<template>
    <v-alert outlined :type="warning ? 'warning' : 'error'"
             v-if="show"
             class="mt-5" dense
    >
        <ul v-if="typeof msg !== 'string'">
            <li
                v-for="(err, i, j) in msg"
                :key="i"
                :set="info = Array.isArray(err) ? err[0] : err "
                v-if="err !== msg.detail &&
                (i < 6 || j < 6)"
            >
                <span v-if="!info.includes('field is required')">{{ info }}</span>
                <span v-else> Error Occurred </span>
            </li>
        </ul>
        <span v-else>
            {{ msg }}
        </span>
        <span v-if="msg.detail">
            {{ msg.detail }}
        </span>
    </v-alert>
</template>

<script>
    export default {
        props: ['msg', 'warning'],
        name: 'FormError',
        computed: {
            show() {
                if (
                    (typeof this.msg === 'string' && this.msg.length) || // checks for strings
                    (Array.isArray(this.msg) && this.msg.length) || //checks for array of messages
                    (!(this.msg instanceof Array) && Object.keys(this.msg).length && typeof this.msg === 'object' && this.msg) //checks or object of messages
                ) {
                    return true
                }
                return false
            }
        },
    }
</script>

<style scoped lang="stylus">
    >>> .v-icon {
        align-self center
    }

</style>
