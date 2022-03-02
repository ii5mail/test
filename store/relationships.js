export default {
    state: () => ({
        relationships_list: [],
        requests_list: []
    }),
    actions: {
        async get_relationships({ commit }, { params } = {}) {
            try {
                const res = await this.$axios.get('/api/relationships/', { params })
                commit('set_relationships_list', res.data.results)
                return res.data.results
            } catch (e) {
                throw e.response
            }
        },
        async post_relationship({ commit }, payload) {
            try {
                const res = await this.$axios.post(`/api/relationships/`, payload)
                return res.data
            } catch (e) {
                throw e.response
            }
        },
        async patch_relationship({ commit }, { id, payload }) {
            try {
                const res = await this.$axios.patch(`/api/relationships/${ id }/`, payload)
                return res.data
            } catch (e) {
                throw e.response
            }
        },

        // requests shiz (could be abstracted to separate store
        async get_requests({ commit }, params) {
            try {
                const requests = await this.$axios.get(`/api/relationship_access_requests/`, { params })
                commit('set_requests_list', requests.data.results)
                return requests.data.results
            } catch (e) {
                throw e.response
            }
        },
        async get_open_requests({ commit }) {
            try {
                const requests = await this.$axios.get(`/api/relationship_access_requests/`, {
                    params: {
                        // put open filter here
                    }
                })
                commit('set_requests_list', requests.data.results)
                return requests.data.results
            } catch (e) {
                throw e.response
            }
        },
        async patch_request({ commit }, { id, payload, }) {
            try {
                const requests = await this.$axios.patch(`/api/relationship_access_requests/${ id }/`, payload)
                return requests.data
            } catch (e) {
                throw e.response
            }
        },
    },
    mutations: {
        set_requests_list(state, payload) {
            state.requests_list = payload
        },
        set_relationships_list(state, payload) {
            state.relationships_list = payload
        }
    }
}
