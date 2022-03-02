<template>
    <div class="d-flex justify-center">
        <Header v-if="!logged_in" not_logged_in/>
        <v-container class="pa-16 ma-0 fill-width">
            <v-card class="pa-16 rounded-lg" v-if="relationship && !loading">
                <v-row>
                    <v-col class="pb-0 pl-1 d-flex align-center">
                        <v-icon class="mx-2">$vuetify.icons.linkage</v-icon>
                        <div class="large-font light-weight">Confirm Relationships</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="small-font">
                        Steve An is asking you to confirm <strong>{{ relationship.general_contractor.name }}</strong>
                        and <strong>{{ relationship.sub_contractor.name }}</strong> have worked together.
                    </v-col>
                </v-row>
                <v-row class="mt-16">
                    <v-col class="d-flex small-font d-flex flex-column" cols="6">
                        <div class="d-flex justify-space-around">
                            <v-col class="d-flex">
                                <img
                                    :src="relationship.general_contractor.logo"
                                    width="90px"
                                    height="90px"
                                    class="mr-3 rounded"
                                />
                                <div>
                                    <span class="heavy-weight">{{ relationship.general_contractor.name }}</span><br/>
                                    {{ relationship.general_contractor_office_location.city }},
                                    {{ relationship.general_contractor_office_location.state }}<br/>
                                    {{ relationship.general_contractor.domain_name }}
                                </div>
                            </v-col>
                            <v-col class="d-flex">
                                <img
                                    :src="relationship.sub_contractor.logo"
                                    width="90px"
                                    height="90px"
                                    class="mr-3 rounded"
                                />
                                <div>
                                    <span class="heavy-weight">{{ relationship.sub_contractor.name }}</span><br/>
                                    {{ relationship.sub_contractor_office_location.city }},
                                    {{ relationship.sub_contractor_office_location.state }}<br/>
                                    {{ relationship.sub_contractor.domain_name }}
                                </div>
                            </v-col>
                        </div>
                        <div class="mt-6">
                            <v-col class="medium-font">
                                Work performed by {{ relationship.needs_confirmation_from.name }}
                                <div class="mt-4" v-for="key in Object.keys(trades)" :key="key">
                                    <div class="xxs-font heavy-weight mb-1">{{ key }}</div>
                                    <div>
                                        <v-chip
                                            small
                                            class="light-blue-grey mr-1"
                                            v-for="(trade, i) in trades[key]"
                                            :key="i"
                                        >
                                            {{ trade }}
                                        </v-chip>
                                    </div>
                                </div>
                            </v-col>
                        </div>
                    </v-col>
                    <v-col class="d-flex justify-end relative">
                        <div v-if="step > 1" class="absolute checkmark">
                            <v-icon size="70">$vuetify.icons.checkmark_circled</v-icon>
                        </div>
                        <v-card class="d-flex flex-column align-center main-background" width="400px" height="230px"
                                v-if="step === 1">
                            <v-card-title class="text-center large-font light-weight">Reference</v-card-title>
                            <v-card-actions class="d-flex flex-column">
                                <cb-btn
                                    class="px-6"
                                    height="52px"
                                    @click="confirm_relationship('yes')"
                                    :loading="loading_step === 'yes'"
                                    width="220px"
                                >
                                    Yes We Worked Together
                                </cb-btn>
                                <v-btn
                                    text
                                    class="text-decoration-underline mt-5 primary-text--text light-weight xs-font"
                                    @click="confirm_relationship('no')"
                                    :loading="loading_step === 'no'"
                                >
                                    No we have never worked together
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-card class="d-flex flex-column align-center main-background rounded-xl" width="400px"
                                height="230px" v-else-if="step === 2">
                            <v-card-title class="text-center large-font light-weight">Confirmed!</v-card-title>
                            <v-card-subtitle class="heavy-weight small-font mt-3 primary-text--text">Would you work with
                                them again?
                            </v-card-subtitle>
                            <v-card-actions class="d-flex ">
                                <button
                                    class="mr-10 rounded-lg d-flex justify-center thumb-box xs-font align-center"
                                    @click="would_work_with_them_again('thumbs-up')"
                                    :disabled="loading_step.includes('thumb')"
                                >
                                    <v-progress-circular
                                        v-if="loading_step === 'thumbs-up'"
                                        indeterminate
                                        color="primary"
                                    />
                                    <span v-else class="d-flex flex-column">
                                        <v-icon size="40">$vuetify.icons.thumbs_up</v-icon>
                                        Yes
                                    </span>
                                </button>
                                <button class="rounded-lg d-flex justify-center thumb-box xs-font align-center"
                                        @click="would_work_with_them_again('thumbs-down')"
                                        :disabled="loading_step.includes('thumb')"
                                >
                                    <v-progress-circular
                                        v-if="loading_step === 'thumbs-down'"
                                        indeterminate
                                        color="primary"
                                    />
                                    <span v-else class="d-flex flex-column ">
                                        <v-icon size="40">$vuetify.icons.thumbs_down</v-icon>
                                        No
                                    </span>
                                </button>
                            </v-card-actions>
                        </v-card>
                        <v-card class="d-flex flex-column align-center main-background rounded-xl" width="400px"
                                height="230px" v-else-if="step === 3">
                            <v-card-title class="text-center large-font light-weight">Get More Leads!</v-card-title>
                            <v-card-subtitle class="heavy-weight text-center small-font mt-3 primary-text--text">
                                Create a free business profile and start generating leads on ConstructionBevy!
                            </v-card-subtitle>
                            <v-card-actions class="text-center d-flex flex-column">
                                <cb-btn width="200px" to="/registration/email-entry">
                                    Create an Account
                                </cb-btn>
                                <span class="caption">No Credit Card Required</span>
                            </v-card-actions>
                        </v-card>
                        <v-card class="d-flex flex-column align-center main-background rounded-xl" width="400px"
                                height="230px" v-else-if="step === 4">
                            <v-card-title class="text-center large-font light-weight">Understood</v-card-title>
                            <v-card-subtitle class="heavy-weight text-center small-font mt-3 primary-text--text">
                                Create a free business profile and start generating leads on ConstructionBevy!
                            </v-card-subtitle>
                            <v-card-actions class="text-center d-flex flex-column">
                                <cb-btn width="200px" to="/registration/email-entry">
                                    Create an Account
                                </cb-btn>
                                <span class="caption">No Credit Card Required</span>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <v-divider class="my-10"/>
                <v-row>
                    <v-col class="d-flex justify-center" cols="5">
                        <img
                            src="https://via.placeholder.com/140x100"
                            height="300px"
                            width="300px"
                        />
                    </v-col>
                    <v-col class="small-font primary-text--text">
                        <div class="primary--text medium-font mb-3">What is ConstructionBevy?</div>
                        <br/>
                        ConstructionBevy is a marketplace for general contractors and subcontractors leveraging
                        Relationship
                        Intelligence and Pre Qualification to find new business and improve execution.
                        <br/>
                        <br/>
                        ConstructionBevy helps commercial General Contractors, subcontractors, and manufacturers win new
                        business.
                        <br/>
                        <br/>
                        <ul>
                            <li>Cras luctus enim non venenatis arcu mauris euismod</li>
                            <li>Tiam placerat, erat porta consequat</li>
                            <li>GCs can search for subs based on detailed criteria and verify past performance,
                                capabilities,
                                availability, and who they’re associated with to evaluate the GC’s risk.
                            </li>
                            <li>Subs generate leads they’re well positioned to win via a wiki enabling any sub to
                                feature
                                their
                                business, highlight specialities, credentials, and expertise along with maintaining
                                pre-qualification status in a workflow engine they control. This increasing sales and
                                reduces
                                admin time associated with working with GCs they want to work with.
                            </li>
                            <li>Manufacturers help subs generate new GC relationships/leads to build brand loyalty. See
                                which
                                subs are being asked to bid from each GC along with knowing the “alignment” of those
                                subs
                                preferred by the winning GC with a greater chance to win the work.
                            </li>
                        </ul>
                    </v-col>
                </v-row>
            </v-card>
            <v-row v-else class="justify-center align-center">
                <v-progress-circular
                    color="primary"
                    indeterminate
                />
            </v-row>
        </v-container>
    </div>

</template>

<script>
    import CbBtn from "../ui/CbBtn"
    import Header from "../header/Header"

    export default {
        components: { CbBtn, Header },
        data: () => ({
            step: 1,
            loading_step: '', // holds UID string for which button is loading
            relationship: null
        }),
        computed: {
            logged_in() {
                return this.$auth.loggedIn
            },
            uuid() {
                return this.$route.params?.uuid
            },
            url() {
                return `/api/relationships/${ this.uuid }`
            },
            trades() {
                if (this.relationship) {
                    const trades_by_super = {}
                    if (this.relationship?.trades_performed) {
                        this.relationship.trades_performed.forEach(({ name, supercategory }) => {
                            if (trades_by_super[supercategory.name]) {
                                trades_by_super[supercategory.name].push(name)
                            } else {
                                trades_by_super[supercategory.name] = [name]
                            }
                        })
                    }
                    return trades_by_super
                }
                return {}
            }
        },
        watch: {
            uuid: {
                immediate: true,
                async handler() {
                    this.loading = true
                    try {
                        const res = await this.$axios.get(
                            this.url,
                            {
                                transformRequest: (data, headers) => {
                                    delete headers.common['Authorization']
                                    delete headers['Authorization']
                                    return data
                                },
                            }
                        )
                        this.relationship = res.data
                        // const access_request = await this.$axios.patch(
                        //     '/api/relationship_access_requests/11/',
                        //     {
                        //         status: 'Approved'
                        //     }
                        // )
                    } catch (e) {
                        console.error(e)
                    } finally {
                        this.loading = false
                    }
                }
            }
        },
        methods: {
            async confirm_relationship(yes_or_no) {
                this.loading_step = yes_or_no
                const yes = yes_or_no === 'yes'
                try {
                    await this.$axios.patch(`${ this.url }/confirm/`, { confirmed: yes })
                    // await this.$axios.patch(`${ this.url }confirm/`, { confirmed: yes }, {
                    //     transformRequest: [(data, headers) => {
                    //         delete headers.common['Authorization']
                    //         delete headers['Authorization']
                    //         return data
                    //     }, ...this.$axios.defaults.transformRequest]
                    // })
                    this.step = yes ? 2 : 4
                } catch (e) {
                    console.error(e)
                    this.$snackbar.show_message({ content: "Error Occurred!", type: 'error' })
                } finally {
                    this.loading_step = ''
                }
            },
            async would_work_with_them_again(yes_or_no) {
                this.loading_step = yes_or_no
                const yes = yes_or_no === 'thumbs-up'
                try {
                    await this.$axios.patch(`${ this.url }/confirm/`, { would_work_with_them_again: yes }, {
                        transformRequest: [(data, headers) => {
                            delete headers.common['Authorization']
                            delete headers['Authorization']
                            return data
                        }, ...this.$axios.defaults.transformRequest]
                    })
                    this.step = yes ? 3 : 4
                } catch (e) {
                    console.error(e)
                    this.$snackbar.show_message({ content: "Error Occurred!", type: 'error' })

                } finally {
                    this.loading_step = ''
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
    .v-card
        border 1px solid var(--v-border-grey-base)

    .checkmark
        z-index: 1;
        left 40px
        top -10px
        background white
        border-radius 65px

        .v-icon
            opacity .4

    .thumb-box
        border 1px solid var(--v-inactive-base)
        background var(--v-white-base)
        transition .1s
        height 82px
        width: 79px;

        &:hover
            transform scale(1.03)
</style>
