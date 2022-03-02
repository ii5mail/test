export const state = () => ({
    message: null,
    timeout: null,
    callback: null,
})
export const mutations = {
    show_message(context, payload) {
        context.message = payload.content
        context.timeout = payload.timeout
        context.callback = payload.callback
        context.type = payload.type
        context.position = payload.position
    },
    hide_message() {
        // We need this to close the snackbar from the plugin.
        return null
    }
}
