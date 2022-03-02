export default {
    state() {
        return { 
            email: null,
            set_password_key: null,
            user: null,
            webmail_user: false,
            relationship_requests: null,
            employee_confirmations: null,
            bid_invitations: null,
            all_notifications: null,
            notification_count: 0,
            error: false
        }
    },
    actions: {
        async patch_user({ commit }, payload) {
            try {
                const res = await this.$axios.patch(`/api/users/me/`, payload)
                await this.$auth.setUser(res.data)
                return res.data
            } catch (e) {
                console.error(e)
            }
        },
        async get_user({ commit }) {
            commit('set_error', false)
            try {
                const res = await this.$axios.get(`/api/users/me/`)
                this.$auth.setUser(res.data)
                commit('set_user', res.data)
                return res.data
            } catch (e) {
                console.error(e)
                if (e.response.status === 403) {
                    return this.$nuxt.error({ statusCode: 403, message: 'forbidden access' })
                }
            }
        },
        async check_restriction({ commit }) {
            try {
                const res = await this.$axios.get(`/`)
                return res.data
            } catch (e) {
                if (e.response.status === 403) {
                    commit('set_error', true)
                }
            }
        },
        async get_all_notifications({ commit }, payload) {
            try {
                const res = await this.$axios.get('/api/notifications/', {
                    ...payload
                })
                commit('set_all_notifications', res.data.results)
                return res.data
            } catch (e) {
                console.error(e)
            }
        },
        async get_relationship_notifications({ commit }) {
            try {
                const res = await this.$axios.get('/api/relationship_access_requests/', {
                    replied_by: this.$auth.user
                })
                commit('set_relationship_notifications', res.data.results)
                if (res.data.length) {
                    commit('set_notification_count', res.data.length)
                }
                return res.data.results
            } catch (e) {
                console.error(e)
            }
        },
        async patch_relationship_notifications({ commit, dispatch }, payload) {
            try {
                const res = await this.$axios.patch(`/api/relationship_access_requests/${payload.id}/`, {
                    status: payload.status
                })
                await dispatch('get_relationship_notifications')
                return res.data
            } catch (e) {
                console.error(e)
            }
        },
        async get_bid_invitations({ commit }) {
            try {
                const res = await this.$axios.get('/api/bid_invitation_requests', { replied_by: this.$auth.user.id })
                commit('set_bid_invitations', res.data)
                if (res.data.length) {
                    commit('set_notification_count', res.data.length)
                }
                return res.data
            } catch (e) {
                console.error(e)
            }
        },
        async patch_bid_invitations({ commit, dispatch }, payload) {
            try {
                const res = await this.$axios.patch(`/api/invitations_to_bid/${payload.id}/`, {
                    status: payload.status
                })
                await dispatch('get_bid_invitations')
                return res.data
            } catch (e) {
                console.error(e)
            }
        },
        async get_employee_confirmations({ commit }) {
            try {
                const res = await this.$axios.get('/api/employee_confirmation_requests', { replied_by: this.$auth.user.id })
                commit('set_employee_confirmations', res.data)
                if (res.data.length) {
                    commit('set_notification_count', res.data.length)
                }
                return res.data
            } catch (e) {
                console.error(e)
            }
        },
        async patch_employee_confirmations({ commit, dispatch }, payload) {
            try {
                const res = await this.$axios.patch(`/api/employee_confirmations/${payload.id}/`, {
                    status: payload.status
                })
                await dispatch('get_employee_confirmations')
                return res.data
            } catch (e) {
                console.error(e)
            }
        },

        set_email({ commit }, email) {
            commit('set_email', email)
        },
        set_password_key({ commit }, key) {
            commit('set_password_key', key)
        },
        set_webmail_user({ commit }, isWebmail) {
            commit('set_webmail_user', isWebmail)
        },

    },
    mutations: {
        set_error: (state, value) => {
            state.error = value
        },
        set_email(state, email) {
            state.email = email
        },
        set_password_key(state, key) {
            state.set_password_key = key
        },
        set_user(state, payload) {
            state.user = payload
        },
        set_webmail_user(state, isWebmail) {
            state.webmail_user = isWebmail
        },
        set_all_notifications(state, all_notifications) {
            state.all_notifications = all_notifications
        },
        set_bid_invitations(state, payload) {
            state.bid_invitations = payload
        },
        set_relationship_notifications(state, payload) {
            state.employee_confirmations = payload
        },
        set_employee_confirmations(state, payload) {
            state.relationship_requests = payload
        },
        set_notification_count(state, payload) {
            state.notification_count += payload
        },
        reset_notification_count(state) {
            state.notification_count = 0
        }
    }
}
