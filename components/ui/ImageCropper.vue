<template>
    <v-dialog
        width="750"
        :value="value"
        :persistent="!loading"
    >
        <v-card>
            <v-card-title class="justify-space-between white">
                {{this.title}}
                <v-btn icon class="pa-0" @click="$emit('input', false)">
                    <v-icon color="primary-text">mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <div class="image-container">
                <img
                    ref="source"
                    class="image-preview"
                    :src='object_url'
                    alt="Source Image"
                >
                <div class="cropper-bg spinner-container" v-if="loading">
                    <div class="cropper-modal"></div>
                    <v-progress-circular
                        color="white"
                        indeterminate
                    />
                </div>
            </div>
            <v-card-actions class="white">
                <div>
                    <div class="body-1">Scale your logo to fit best in the bounding box.</div>
                    <v-slider
                        v-model="zoom"
                        append-icon="mdi-magnify-plus-outline"
                        prepend-icon="mdi-magnify-minus-outline"
                        :min="0"
                        :max="max"
                        @click:append="zoom_in"
                        @click:prepend="zoom_out"
                    />
                </div>
                <v-spacer/>
                <v-btn
                    color="primary"
                    width="135px"
                    large
                    depressed
                    type="submit"
                    @click="send_cropped_data"
                >
                    Continue
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import Cropper from 'cropperjs'

    export default {
        props: [
            'file',
            'aspect_ratio',
            'title',
            'value',
            'logo',
            'form_key'
        ],
        data() {
            return {
                zoom: 0,
                max: 200,
                cropper: null,
                cropped_url: null,
                selected_file: null,
                object_url: null,
                loading: false,
                debouncedUpdatePreview: _.debounce(this.get_cropped, 257)

            }
        },
        watch: {
            zoom: function () {
                this.cropper.zoomTo(this.zoom / 100)
            },
            file: function () {
                this.setup_cropper(this.file)
                this.$emit('input', true)
            },
        },
        methods: {
            zoom_out() {
                this.zoom = (this.zoom - 5) || 0
            },
            zoom_in() {
                this.zoom = (this.zoom + 5) || 100
            },
            get_uuid() {
                return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                );
            },
            setup_cropper(selected_file) {
                this.loading = true
                if (this.cropper) {
                    this.cropper.destroy()
                }

                if (this.object_url) {
                    window.URL.revokeObjectURL(this.object_url)
                }


                if (!selected_file) {
                    this.cropper = null
                    this.object_url = null
                    this.cropped_url = null
                    return
                }
                this.object_url = window.URL.createObjectURL(selected_file)
                this.$nextTick(this.setup_cropper_instance)

            },

            setup_cropper_instance() {
                if (this.$refs.source) {
                    this.$refs.source.src = this.logo || this.object_url
                    this.cropper = new Cropper(this.$refs.source, {
                        aspectRatio: this.aspect_ratio,
                        crop: this.debouncedUpdatePreview,
                        guides: false,
                        zoomable: true,
                        rotatable: false,
                        center: false,
                        highlight: false,
                        restore: false,
                        dragMode: 'move',
                        viewMode: 1, // this prevents image from leaving cropbox
                        autoCropArea: 0.90,
                        cropBoxMovable: false,
                        cropBoxResizable: false,
                        toggleDragModeOnDblclick: false,
                        zoomOnTouch: false,
                        zoomOnWheel: false,
                        minContainerWidth: 550,
                        minContainerHeight: 450,
                    })
                    const self = this

                    function listen_for_img() {
                        // This listens for when the cropper object is officially created so we can set the initial zoom
                        const img = self.cropper.getImageData()
                        if (img && JSON.stringify(img) !== '{}') {
                            const init_zoom = (img.width / img.naturalWidth) * 100
                            self.max = init_zoom * 2
                            self.zoom = init_zoom
                            setTimeout(() => self.loading = false, 500)
                        } else {
                            setTimeout(() => {
                                listen_for_img()
                            }, 100)
                        }
                    }

                    listen_for_img()
                } else {
                    console.error('Error With Source')
                }
            },
            get_cropped() {
                const canvas = this.cropper.getCroppedCanvas()
                this.cropped_url = canvas.toDataURL('image/png')
            },
            send_cropped_data() {
                const canvas = this.cropper.getCroppedCanvas()
                canvas.toBlob((blob) => {
                    const form_data = new FormData()
                    const key = this.form_key || 'logo'
                    const filename = this.get_uuid()
                    form_data.append(key, blob, `${filename}.png`)

                    this.$emit('get_cropped_url', { url: this.cropped_url, form_data })

                    this.$emit('input', false)
                })
            }
        }
    }
</script>

<style lang="stylus">
    .cropper-drag-box
        background-color var(--v-primary-text-base)

    .cropper-bg
        background-repeat repeat

    .cropper-view-box
        outline-width 3px
</style>

<style lang="stylus" scoped>

    .spinner-container
        display flex
        position absolute
        background-color var(--v-primary-text-base)
        width 100%
        align-items center
        justify-content center
        height calc(100% - 142px)
        min-height 450px

        .cropper-modal
            opacity .4

    .image-container
        width 100%
        display flex
        align-items center

    .image-preview
        display: block
        max-height: 229px
        max-width: 100%

    .v-card__title
        border-bottom 3px solid var(--v-light-purple-base)

    .v-card__actions
        border-top 3px solid var(--v-light-purple-base)

    // Slider
    >>> .v-input__slot
        margin 0

    >>> .v-messages
        display none

    .v-input
        >>> .v-icon::before
            color var(--v-primary-base)
</style>

