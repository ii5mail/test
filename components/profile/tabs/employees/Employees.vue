<template>
    <div>
        <profile-toolbar
            @set_edit="on_edit_select"
        />
        <employee-list
            :editMode="editMode"
            @set_edit="on_edit_select"
            :organization="organization"
        />
    </div>
</template>

<script>
    import ProfileToolbar from "../../../ui/ProfileToolbar.vue"
    import EmployeeList from "./EmployeeList.vue"
    import { mapState } from "vuex"

    export default {
        components: { ProfileToolbar, EmployeeList },
        name: "Employees",
        data() {
            return {
                editMode: false,
            }
        },
        computed: {
            ...mapState({
                organization: state => state.organizations.current
            }),
        },
        methods: {
            on_edit_select() {
                this.$emit("set_edit", true)
            },
        },
    }
</script>

<style lang="stylus" scoped>
</style>
