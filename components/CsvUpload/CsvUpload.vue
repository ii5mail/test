<template>
    <v-container
        class="d-flex align-center justify-center fill-height"
    >
        <v-card
            width="1100px"
            max-width="90%"
            class="pa-10 elevation-3"
        >
            <v-card-title class="d-flex justify-space-between">
                <div class="light-weight large-font">Upload a CSV for Trade Partners</div>
                <v-stepper class="elevation-0">
                    <v-stepper-header>
                        <v-stepper-step step="" complete/>
                        <v-divider width="65"/>
                        <v-stepper-step step="" :complete="step >= 2"/>
                        <v-divider width="65"/>
                        <v-stepper-step step="" :complete="step >= 3"/>
                    </v-stepper-header>
                </v-stepper>
            </v-card-title>
            <v-card-subtitle v-if="step === 1">
                Upload your .csv file and prepare for magic. Next, you'll be matching the headers so
                everything works. <a href="#">Tell me more.</a>
            </v-card-subtitle>
            <v-card-text>
                <v-container
                    class="light-grey upload-container align-center justify-center d-flex fade-in"
                    @drop.prevent="on_drop($event)"
                    @dragover.prevent="dragover = true"
                    @dragenter.prevent="dragover = true"
                    @dragleave.prevent="dragover = false"
                    :class="{ 'grey lighten-2': dragover }"
                    v-if="step === 1"
                >
                    <v-btn v-if="!!uploaded_file"
                           text
                           small
                           class="back-btn px-1 py-0 grey--text text--darken-2"
                           @click="uploaded_file = null, wrong_file_type = false"
                    >
                        <v-icon small>mdi-chevron-left</v-icon>
                        Upload Different File
                    </v-btn>

                    <div v-if="!uploaded_file"
                         class="d-flex align-center justify-center text-center flex-column">
                        <div v-if="!wrong_file_type">
                            <v-icon large color="primary-lighter">mdi-cloud-upload-outline</v-icon>
                            <p class="small-font">Upload a CSV</p>
                        </div>
                        <div v-else class="d-flex flex-column align-center">
                            <unknown-file/>
                            <div class="small-font error--text">Unsupported File Type</div>
                        </div>
                        <p class="xs-font">
                            Drag your file here or
                            <v-btn text small class="pa-0 mb-1 light-weight primary--text" @click="on_btn_click">
                                click here
                            </v-btn>

                            (max 100MB)
                        </p>
                        <p class="xs-font">CSV File must be a UTF-8 Format</p>
                        <input
                            ref="uploader"
                            class="d-none"
                            type="file"
                            accept="text/csv"
                            @change="on_file_changed"
                        >
                    </div>

                    <div v-else class="d-flex align-center justify-center text-center flex-column">
                        <csv-svg/>
                        <p>{{ uploaded_file ? uploaded_file.name : 'test file name.csv' }}</p>
                    </div>

                </v-container>
                <confirm-headers v-else-if="step === 2" @step="step = 3"/>
                <success v-else-if="step === 3"/>
            </v-card-text>
            <v-card-actions class="justify-space-between pa-4" v-if="step === 1">
                <v-btn text small class="pa-0 px-0 mb-1 light-weight primary--text">
                    Download the template file
                </v-btn>
                <v-spacer />
                <cb-btn :disabled="!uploaded_file || wrong_file_type" width="100px" :loading="loading"
                        @click="upload_file">
                    Next
                </cb-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import CbBtn from "../ui/CbBtn"
    import CsvSvg from "../../assets/images/misc/csv-svg"
    import UnknownFile from "../../assets/images/misc/unknown-file"
    import ConfirmHeaders from "./ConfirmHeaders"
    import Success from "./Success"

    export default {
        components: { Success, UnknownFile, CsvSvg, CbBtn, ConfirmHeaders },
        data: () => ({
            dragover: false,
            uploaded_file: null,
            loading: false,
            wrong_file_type: false,
            step: 1
        }),
        methods: {
            upload_file() {
                this.loading = true

                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.loading = false
                        this.step = 2
                        resolve()
                    }, 1000)
                })
            },
            on_drop(e) {
                this.wrong_file_type = false
                this.dragover = false
                if (e.dataTransfer.files.length > 1) {
                    alert("Please only upload one file at a time")

                } else {
                    const file = e.dataTransfer.files[0]

                    if (file.type !== "text/csv") {
                        this.wrong_file_type = true
                        this.uploaded_file = null
                    } else {
                        this.uploaded_file = file
                    }
                }
            },
            on_btn_click() {
                this.$refs.uploader.click()
            },
            on_file_changed(e) {
                this.wrong_file_type = false

                const file = e.target.files[0]

                if (file.type !== "text/csv") {
                    this.wrong_file_type = true
                    this.uploaded_file = null
                } else {
                    this.uploaded_file = file
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .back-btn
        position: absolute;
        top: 5px
        left 5px

    >>> .v-stepper__step__step
        width 12px !important
        min-width: 0 !important;
        height 12px
        font-size 9px
        margin-right 0

        .v-icon
            font-size 12px !important

    .upload-container
        position relative
        border 1px solid var(--v-grey-lighten2) !important
        border-radius 4px
        min-height 300px

        p
            color var(--v-primary-text-base) !important
            margin 0
</style>
