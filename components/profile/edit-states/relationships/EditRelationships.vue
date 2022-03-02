<template>
    <div>
        <back-button @on_back="on_back_select"/>
        <div class="px-0">
            <v-btn
                v-if="step > 1"
                text
                small
                class="mx-12 mt-4 light-weight"
                color="primary"
                @click="step--"

            >
                Previous Step
            </v-btn>
            <intro
                v-if="step === 1"
                @next_step="step++"
            />
            <relationships-table
                v-if="step === 2"
                @next_step="step++"
                :organization="organization"
                :current_relationships="relationship_data"
                :loading="fetching"
            />
            <keep-alive>
                <add-relationship
                    v-if="step === 3"
                    @on_back="on_back_select"
                />
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import Intro from "./Intro"
    import AddRelationship from "./AddRelationship"
    import RelationshipsTable from "./RelationshipsTable"
    import BackButton from "../../../ui/BackBtn"

    export default {
        components: { BackButton, RelationshipsTable, AddRelationship, Intro },
        props: {
            organization: Object,
            add_relation: Boolean,
        },
        data: () => ({
            step: 1,
            relationship_data: [],
            data: [],
            fetching: false
        }),
        async mounted() {
            try {
                this.fetching = true
                if (this.add_relation) {
                    this.step = 3
                }
                await this.$store.dispatch('relationships/get_requests')

                this.relationship_data = await this.$store.dispatch('relationships/get_relationships')
            } catch (e) {
                console.error(e)
            } finally {
                this.fetching = false
            }
        },
        methods: {
            async on_back_select() {
                if (this.$route.query.add) {
                    await this.$router.replace({path: this.$route.path})
                }
                this.$emit("set_edit", false)
            },
        },
    }
</script>

<style scoped lang="stylus">
</style>
