<template>
    <div>
        <v-dialog
            persistent
            width="630px"
            :value="value"
        >
            <v-card class="pa-10 relative">
                <v-btn icon class="absolute right top" @click="$emit('input', !value)">
                    <v-icon color="black">mdi-close</v-icon>
                </v-btn>
                <v-card-title class="large-font light-weight primary-text--text">Add Additional Market Segments
                </v-card-title>
                <v-card-text class="pt-2">
                    <div class="small-font primary-text--text">
                        Here are all the trades listed in your profile. Customize where you offer these trades in the
                        Locations tab.
                    </div>
                    <v-chip
                        class="mr-3 px-3 py-2 my-3 xs-font light-blue-grey"
                        close-icon="mdi-close"
                        close
                    >
                        <!--                        @click:close="remove_market_segment"-->
                        Door Dash Flash Bash
                    </v-chip>
                    <div class="mt-2 primary-text--text">Add a Market Segment to Your Profile</div>
                    <cb-select
                        placeholder="Country"
                        name="country"
                        type="select"
                        :menu-props="{ bottom: true, offsetY: true }"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import CbSelect from "../../../ui/CbSelect"

    export default {
        components: { CbSelect },
        props: {
            value: Boolean
        },
    }
</script>

<style scoped lang="stylus">

</style>
