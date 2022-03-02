// Usage:
//    this.$snackbar.show_message({content: "Error saving", type: 'error'})

export default ({ app, store }, inject) => {
  inject('snackbar', {
    show_message ({ content = '', timeout = '5000', callback = null, type = null, position = {right: true}}) {
      store.commit('snackbar/show_message', {content, timeout, callback, type, position})
    },
    hide_message() {
      store.commit('snackbar/hide_message')
    }
  })
}
