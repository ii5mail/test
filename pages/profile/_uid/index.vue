<template>
    <div>
        <profile
            v-model="change_made"
            :company="company"
            ref="profile"
        />
        <!-- <profile
            @change_made="val=>change_made=val"
            :company="company"
        /> -->
        <confirm-leave-page-dialog
            v-model="show_leave_dialog"
            @on_secondary_action="no_save_and_continue"
            @on_action="save_and_continue"
            title="There is Unsaved Data"
            msg="You have entered new information and haven't saved. Do you want to save or continue without saving?"
            action_btn_text="Save"
            cancel_btn_text="Continue, without Saving"
            :loading="saving"
            ref="leave_dialog"
        />
    </div>
</template>

<script>
    import Profile from "../../../components/profile/Profile.vue"
    import ConfirmLeavePageDialog from "../../../components/ui/ConfirmLeavePageDialog.vue"

    export default {
        auth: false,
        components: {
            Profile,
            ConfirmLeavePageDialog,
        },
        data() {
            return {
                show_leave_dialog: false,
                change_made: false,
                saving: false,
                company: { // we won't need this eventually (very soon tbh)
                    name: "MG Glass Inc",
                    location: "Atlanta, GA",
                    organization_type: "Trade Partner",
                    domain_name: "mgglass.com",
                    phone_number: "(770) 452-9494",
                    address: "3838 Green Industrial Way",
                    city: "Atlanta",
                    state: "GA",
                    zip_code: "30341",
                    ownership_type: "Private (Non Minority Owned)",
                    size: "50-100 Employees",
                    description:
                        "MG Glass services the Greater Atlanta area with the best in glass service as a commercial and residential Glass company. MG Glass delivers exceptional commercial and residential glass replacements, custom glass projects or glass repairs.",
                    trades: [
                        {
                            industry: "Windows & Glass",
                            segments: ["Interior Glazing", "Exterior"],
                        },
                        {
                            industry: "Finishes",
                            segments: ["Door, Frames and Finish Hardware"],
                        },
                    ],
                    projects: [
                        {
                            name: "Overture Hamlin",
                            type: "Multifamily",
                            location: "Orlando, FL",
                        },
                        {
                            name: "Ascent St Pete",
                            type: "Multifamily",
                            location: "St. Petersburg, FL",
                        },
                        { name: "Unity Church", type: "Commerical", location: "Seattle, WA" },
                        {
                            name: "Delith / Lenox Park",
                            type: "Multifamily",
                            location: "Atlanta, GA",
                        },
                        {
                            name: "Golden Triangle",
                            type: "Mixed Use",
                            location: "Fort Worth, TX",
                        },
                        {
                            name: "Golden Triangle 2",
                            type: "Mixed Use",
                            location: "Dallas, TX",
                        },
                        {
                            name: "Overture Hamlin 2",
                            type: "Multifamily",
                            location: "Orlando, FL",
                        },
                        {
                            name: "Ascent St Pete 2",
                            type: "Multifamily",
                            location: "St. Petersburg, FL",
                        },
                        {
                            name: "Unity Church 2",
                            type: "Commerical",
                            location: "Seattle, WA",
                        },
                        {
                            name: "Delith / Lenox Park 2",
                            type: "Multifamily",
                            location: "Atlanta, GA",
                        },
                    ],
                },
            }
        },
        beforeRouteLeave (to, from, next) {
            if (this.change_made) {
                this.show_leave_dialog = true
                this.$nextTick(() => {
                    this.$refs.leave_dialog.$once('on_secondary_action', () => {
                        this.show_leave_dialog = false
                        this.change_made = false
                        next()
                    })
                    this.$refs.leave_dialog.$once('on_action', async () => {
                        this.saving = true
                        let res = await this.$refs.profile.save_and_continue(true)
                        this.saving = false
                        if (res) {
                            next()
                        } else {
                            next(false)
                        }
                    })
                })
            } else {
                next()
            }
        },
        methods: {
            no_save_and_continue() {
                // this.show_leave_dialog = false
                // this.change_made = false
                // this.on_tab_select(this.tab_queue)
                // this.tab_queue = null
            },
            save_and_continue() {
                // this.change_made = false
                // try {
                //     this.saving = true
                //     console.log(this.show_leave_dialog)
                //     let res = await this.$refs.editLocation.save_office_location()
                //     console.log(this.show_leave_dialog)
                //     this.saving = false
                //     this.show_leave_dialog = false
                //     if (res) {
                //         this.on_tab_select(this.tab_queue)
                //         this.tab_queue = null
                //     } else {
                //         throw ('Error Occured')
                //     }
                // } catch(error) {
                //     console.log(error)
                // }
            },
        },
        head() {
            return {
                title: "Profile",
            }
        },
    }
</script>

<style scoped>
</style>
