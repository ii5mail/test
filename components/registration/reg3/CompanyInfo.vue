<template>
    <div class="fill-height">
        <account-sidebar/>
        <v-container fluid class="fill-height justify-center">
            <v-card class="transparent elevation-0" width="550px">
                <v-card-title class="pb-0">
                    <div class="display-1 lh-50">Welcome {{ user ? user.first_name : '' }}, as the first person to
                        register with
                        {{ organization ? organization.name : '' }}, share more
                        about your company.
                    </div>
                </v-card-title>
                <v-form @submit.prevent="submit">
                    <v-card-text class="pb-0">
                        <div>
                            <p class="body-1">Make it shine!</p>
                        </div>
                        <div>
                            <div>
                                <div class="caption primary-text--text">Tell Us About Your Company</div>
                                <v-tooltip right nudge-top="50px" v-model="show_tooltip">
                                    <template #activator="{ on }">
                                        <v-textarea
                                            counter="2000"
                                            maxlength="2000"
                                            no-resize
                                            v-model="description"
                                            autofocus
                                            outlined
                                            placeholder="Copy and paste from your company website"
                                            type="text"
                                            v-on="on"
                                            dense
                                        />
                                    </template>
                                    <span class="xxs-font white--text">
                                        Already have something from your website or other material? Put it here!
                                    </span>
                                </v-tooltip>
                            </div>
                            <!-- <div>
                                <div class="caption primary-text--text">Ownership Type</div>
                                <cb-select
                                    v-model="ownership_type"
                                    placeholder="Select"
                                    :menu-props="{ bottom: true, offsetY: true }"
                                    :items="list_items"
                                    item-text="value"
                                    item-value="value"
                                    autocomplete="off"
                                    :return-object="true"
                                />
                            </div> -->
                            <v-alert dense outlined type="error" v-if="errors.non_field_errors || errors.detail">
                                <ul>
                                    <li v-for="(error, i) in errors.non_field_errors" :key="i">{{ error }}</li>
                                </ul>
                                {{ errors.detail }}
                            </v-alert>
                        </div>

                    </v-card-text>
                    <v-card-actions class="py-0">
                        <v-btn @click="$router.push('/registration/categories/')" text
                               class="primary--text light-weight">
                            Go Back
                        </v-btn>
                        <v-spacer/>
                        <v-btn
                            type="submit"
                            color="primary"
                            width="135px"
                            large
                            depressed
                            :loading="loading"
                            :disabled="!description"
                        >
                            Continue
                        </v-btn>
                    </v-card-actions>
                </v-form>
                <v-card-actions class="justify-end py-0">
                    <v-btn
                        @click="submit(false)"
                        text
                        class="skip-btn primary--text light-weight"
                    >
                        Skip for now
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import AccountSidebar from "../../ui/AccountSidebar"
    import { mapState } from "vuex"
    import CbSelect from "~/components/ui/CbSelect"

    export default {
        components: { CbSelect, AccountSidebar },
        data() {
            return {
                errors: {},
                loading: false,
                show_tooltip: true,
                description: '',
                ownership_type: '',
                search_text: '',
                list_items: [],
            }
        },
        computed: {
            ...mapState({
                organization: state => state.organizations.current,
            }),
            user() {
                return this.$auth.user
            }
        },
        watch: {
            organization: {
                handler() {
                    if (this.organization) {
                        this.ownership_type = this.organization.ownership_type
                        this.description = this.organization.description
                    }
                },
                deep: true
            }
        },
        async mounted() {
            try {
                const res = await this.$axios.options('/api/organizations/')
                this.list_items = res.data.actions.POST.ownership_type.choices

                if (!this.organization){
                    await this.$store.dispatch('organizations/get_current', this.$auth.user.primary_office_location?.organization)
                }

            } catch (e) {
                console.error(e)
            }
        },
        methods: {
            async submit(description = true) {
                this.loading = true
                try {
                    if (description) {
                        const payload = {
                            description: this.description,
                            ownership_type: this.ownership_type.value
                        }

                        await this.$store.dispatch('organizations/patch_organizations', {
                            id: this.organization.id,
                            payload
                        })
                    }
                    await this.$router.push({
                        path: '/',
                        query: {
                            ftue: true,
                        }
                    })
                    this.$snackbar.show_message({ content: "Registration Complete!", type: 'success' })
                } catch (e) {
                    if (e.response) {
                        if (e.response.status === 500) {
                            this.errors = { detail: "Error Occurred" }
                        } else {
                            this.errors = e.response.data
                        }
                    } else {
                        console.error(e)
                        this.errors = { detail: "Error Occurred" }
                    }
                } finally {
                    this.loading = false
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .v-tooltip__content
        background var(--v-primary-base)
        opacity 1 !important
        max-width 200px
        margin-left 5px

        &::before
            content: ''
            position absolute
            border-radius: 4px
            top 7px
            left -13px
            z-index -1
            height 0
            width 0
            border-top 15px solid transparent
            border-bottom 15px solid transparent
            border-right 45px solid var(--v-primary-base)
            transform rotate(-90deg)

    .skip-btn
        &::before
            background-color transparent !important

        &:hover
            text-decoration underline
</style>
