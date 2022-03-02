<script>
    import { VBtn } from 'vuetify/lib'
    import ArrowDownLongWhite from "./icons/ArrowDownLongWhite"
    import ArrowDownLongWhiteSmall from "./icons/ArrowDownLongWhiteSmall"
    import ArrowDownLongBlue from "./icons/ArrowDownLongBlue"

    export default {
        extends: VBtn,
        props: ['show_icon'],
        mixins: [{
            props: {
                // Override default props here
                appendIcon: { default: 'mdi-chevron-down' },
                depressed: { default: true },
                large: { default: true, type: Boolean },
                color: { default: 'primary' },
            }
        }],
        methods: {
            genContent() {
                const child_nodes = []
                if (this.show_icon !== undefined) {
                    // allows empty string prop to pass as truthy
                    const icon = this.$props.outlined ? ArrowDownLongBlue :
                        this.$props.large || this.$props.xLarge ? ArrowDownLongWhite : ArrowDownLongWhiteSmall
                    const icon_node = this.$createElement(icon, {
                        staticClass: 'mr-3'
                    })

                    child_nodes.push(icon_node)
                }

                if (!this.loading) {
                    child_nodes.push(this.$slots.default)
                }

                return this.$createElement('div', {
                    staticClass: `v-btn__content d-flex align-center ${!this.$props.large ? 'small-font' : ''}`
                }, child_nodes)
            }
        }
    }
</script>
