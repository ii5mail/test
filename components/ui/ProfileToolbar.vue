<template>
    <div class="d-flex justify-end mt-5 mr-9" v-if="is_users_parent_org">
        <v-btn
            class="xs-font py-3 lh-20 primary-text--text text-decoration-underline light-weight"
            @click="on_edit_select"
            text
            x-small
        >
            <v-icon small class="primary-text--text mr-2">
                $vuetify.icons.pencil_underlined
            </v-icon>
            Edit
        </v-btn>
    </div>
</template>

<script>
    import { mapState } from "vuex"

    export default {
        name: "ProfileToolbar",
        computed: {
            ...mapState({
                organization: state => state.organizations.current
            }),
            is_users_parent_org() {
                 if (this.$auth.user){
                return this.$auth.user.primary_office_location?.organization === this.organization.id
                 }
                 else{
                     return false
                 }
            },
        },
        methods: {
            on_edit_select() {
                this.$emit("set_edit")
            },
        },
    }
</script>

<style lang="stylus" scoped></style>
