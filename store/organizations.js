export default {
    state: () => ({
        list: [],
        current: null, // this will always hold the current user's organization
        new_organization: null, // allows us to slowly compile new organization data
        organization_type: null,
        user_in_organization: null
    }),
    actions: {
        async patch_organizations({ commit }, { id, payload, }) {
            try {
                const res = await this.$axios.patch(`/api/organizations/${ id }/`, payload)
                commit('set_current_organization', res.data)
                return res.data
            } catch (e) {
                throw e.response
            }
        },
        async put_organizations({ commit }, { id, payload }) {
            try {
                const res = await this.$axios.put(`/api/organizations/${ id }/`, payload)
                commit('set_current_organization', res.data)
                return res.data
            } catch (e) {
                console.error(e)
            }
        },
        async get_organizations({ commit }, args = {}) {
            const { name, limit, offset, ...params } = args
            try {
                const config = {
                    params: {...params}
                }
                if (name) config.params.search = name
                if (limit) config.params.limit = limit
                if (offset) config.params.offset = offset

                const res = await this.$axios.get('/api/organizations/', config)
                commit('set_organizations', res.data.results)
                return res.data
            } catch (e) {
                console.error(e)
            }
        },
        async get_current({ commit }, id) {
            try {
                const res = await this.$axios.get(`/api/organizations/${ id }/`)
                commit('set_current_organization', res.data)
                return res.data
            } catch (e) {
                console.error(e)
            }
        },
        async get_user_in_organization({ commit }, id) {
            try {
                const res = await this.$axios.get(`api/organizations/${ id }/user_in_organization/`)
                commit('set_user_in_organization', res.data)
                return res.data
            } catch (e) {
                console.error(e)
            }
        },
        async user_domain_match({ commit }) {
            try {
                const res = await this.$axios.get('api/organizations/user_domain_match/')
                return res.data
            } catch (e) {
                console.error(e)

            }
        },
        async post_profile_duplicate({ commit }, payload) {
            try {
                const res = await this.$axios.post(`/api/duplicate_profiles/`, payload)
                return res.data
            } catch (e) {
                throw e.response
            }
        },
        async post_claim_organization({ commit }, id) {
            try {
                const res = await this.$axios.post(`api/organizations/${id}/claim_organization/`)
                commit('set_organizations', res.data)
                return res.data
            } catch (e) {
                console.error(e)
            }
        },
        edit_new({ commit }, payload) {
            commit('edit_new_organization', payload)
        },
        clear_new({ commit }) {
            commit('clear_new_organization')
        },
    },
    mutations: {
        set_current_organization(state, payload) {
            state.current = payload
            // sets the org's type
            state.organization_type = state.current.organization_type?.name
        },
        set_user_in_organization(state, payload) {
            state.user_in_organization = payload
        },
        clear_new_organization(state) {
            state.new_organization = null
        },
        edit_new_organization(state, { key, value }) {
            // creates new org if it hasn't been started yet
            if (state.new_organization) {
                state.new_organization[key] = value
            } else {
                state.new_organization = { [key]: value }
            }
        },
        set_organizations(state, payload) {
            state.list = payload
        }
    },
}
