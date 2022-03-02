<template>
    <v-dialog :value="value" width="650px">
        <v-card class="pa-10 pb-4 relative primary-text--text">
            <v-btn
                icon
                class="absolute close-btn"
                @click="$emit('input')"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-card-title class="light-weight large-font">
                {{
                    step === 1 ? `Request Pre Qual Access From: ${ organization.name }` :
                        `Enter the ${ organization.name } email address of who should receive this and we’ll do the rest.`
                }}
            </v-card-title>
            <v-card-text class="primary-text--text">
                <v-form @submit.prevent="next_step">

                    <div class="mb-5 mt-3" v-if="step === 1">
                        Include why you’re requesting access. They’ll receive your request along with your contact
                        information in your profile.
                    </div>
                    <label class="d-flex justify-space-between mt-5">
                        {{
                            step === 1 ? "Include a Message*" : "Email"
                        }}
                        <span class="xs-font grey--text" v-if="step === 2">
                        Separate By Commas
                    </span>
                    </label>
                    <v-textarea
                        v-model="message"
                        v-if="step === 1"
                        outlined
                        placeholder="Type in a Message"
                        counter="500"
                        maxlength="500"
                        no-resize
                    />
                    <cb-text-field
                        v-model="emails"
                        v-if="step === 2"
                        outlined
                        placeholder="Email"
                        name="emails"
                    />
                    <div class="d-flex justify-end">
                        <cb-btn
                            :large="false"
                            :disabled="step === 1 ? !message.length : !emails.length"
                            :loading="loading"
                            class="mt-4"
                            width="150px"
                            type="submit"
                        >
                            {{ step === 1 ? "Next" : "Send Request" }}
                        </cb-btn>
                    </div>
                </v-form>

            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import CbBtn from "../../../ui/CbBtn"
    import CbTextField from "../../../ui/CbTextField"

    export default {
        components: { CbTextField, CbBtn },
        props: {
            value: Boolean,
            organization: Object
        },
        data: () => ({
            message: '',
            emails: '',
            step: 1,
            loading: false
        }),
        methods: {
            next_step() {
                if (this.step === 1) {
                    this.step = 2
                } else {
                    this.send_request()
                }
            },
            send_request() {
                // change this emit to an api request once the backend is ready
                this.loading = true
                setTimeout(() => {
                    this.$emit('grant_access')
                    this.$emit('input')
                }, 2000)
            }
        },
    }
</script>

<style scoped lang="stylus">
    .v-card__title
        word-break break-word

    .close-btn
        right 10px
        top 10px

    .v-textarea {
        >>> fieldset {
            border: 1px solid var(--v-primary-text-base);
        }
    }
</style>
