<template>
    <div class="fill-width">
        <div class="d-flex flex-column align-center text-center">
            <div v-if="is_user_organization">
                <p class="mb-1">You have no relationships added yet</p>
                <p class="mb-4">Let people know who you've worked with to win new business.</p>
            </div>
            <div v-else-if="isLoggedIn">
                <p class="link-paragraph mb-4 relative">They have no relationships yet. Have you worked with them? <span><router-link :to="{ path: `/profile/${organization_id}`, query: {edit: 'relationships', add: 'true'}}">Add that here!</router-link></span></p>
            </div>
            <div v-else>
                <p class="link-paragraph mb-4 relative">They have no relationships yet. Have you worked with them? <span><router-link :to="`/profile/${organization_id}`">Login</router-link></span> or <span><router-link to="/registration/email-entry">register</router-link></span> to add them!</p>
            </div>

            <v-btn
                v-if="is_user_organization"
                class="primary"
                color="white"
                depressed
                text
                @click="$emit('set_edit')"
            >
                + Add New Relationships
            </v-btn>
            <img
                src="@/assets/images/stock/stock_construction_sketch_bg.png"
                class="empty-relation-img"
                alt="construction sketch background"
            />
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({

        }),
        computed: {
            user() {
                return this.$auth.user || {}
            },
            isLoggedIn() {
                return this.$auth.loggedIn
            },
            organization_id() {
                return this.user.primary_office_location?.organization
            },
            uid() {
                return this.$route.params?.uid
            },
            is_user_organization() {
                return this.organization_id == Number(this.uid)
            },
        }
    }
</script>

<style scoped lang="stylus">

    .empty-relation-img
        margin-top -36px

    .link-paragraph
        z-index 1

</style>
