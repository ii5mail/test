<template>
    <div
        v-if='section.filter'
        class="mt-11"
        :set="data=section.data"
    >
        <div class="primary--text heavy-weight small-font mb-2">
            {{ section.text }}
            <span v-if="data && !isNaN(section.count)">
            ({{ section.count }})
            <v-btn
                text
                color="primary"
                class="pa-1"
                small
                @click="$emit('view_all', section)"
                v-if="data.length > 0 && !hide_all_button"
            >
                View All
            </v-btn>
        </span>
        </div>
        <div v-if="data.length">
            <div class="search-result-text my-1" v-for="data_item in data" :key="i">
                <nuxt-link :to="`/profile/${data_item.id}`" class="primary-text--text remove-decoration">
                    <strong class="small-font search-link">{{ data_item.name }}</strong>
                    <span class="xs-font description">
                        <span v-if="data_item.headquarters">
                            - {{`${data_item.headquarters.city} ${data_item.headquarters.state || data_item.headquarters.country}`}}
                        </span>
                        - {{ data_item.description }}
                </span>
                </nuxt-link>
            </div>
        </div>
        <div v-else class="xs-font ml-2">
            - No Results Found
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            section: { type: Object },
            hide_all_button: { type: Boolean, default: false }
        },
    }
</script>
<style scoped lang="stylus">

    .search-result-text
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    .remove-decoration
        text-decoration none !important

        &:hover > .search-link
            text-decoration underline

    .description
        color var(--v-grey-base) !important

</style>
