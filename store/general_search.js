export const state = () => ({
    search_term: '',
    preview_data: {},
    data: {},
    active_category_filter: { text: 'All' }, // initializes 'All' filter to be active
    current_page: 1,
    searching: false,
    error: false,
    page_count: 50,
    filter_options: [
        { text: 'All', filter: '' },
        { text: 'Trade Partners', filter: 'Trade Partner', icon: 'sub_contractor' },
        { text: 'General Contractors', filter: 'General Contractor', icon: 'general_contractor' },
        { text: 'Architects', filter: 'Architect', icon: 'architect' },
        { text: 'Owners', filter: 'Owner', icon: 'key_outline' },
        { text: 'Manufacturers', filter: 'Manufacturer', icon: 'manufacturer' },
        { text: 'Projects', filter: 'Project', icon: 'pencil_underlined' },
    ]
})

export const actions = {
    navigate_to_page: function ({ commit, dispatch, state }, new_page) {
        commit('set_current_page', new_page)
        dispatch('search', state.search_term)
    },
    search: async function ({ commit, state }, new_term) {
        commit('set_searching', true)
        commit('search', new_term)
        commit('set_error', false)
        try {
            if (state.active_category_filter.filter) {
                // for when a specific organization-type filter is selected
                const res = await this.$axios.get('/api/search/', {
                    params: {
                        q: new_term || null,
                        type: state.active_category_filter.filter,
                        limit: state.page_count,
                        offset: state.current_page * state.page_count - state.page_count
                    }
                })
                commit('set_search_data', res.data)

            } else {
                // For 'All' filter or rather, no filter
                const results = {}
                for (const org_type of state.filter_options) {
                    if (org_type.filter) {
                        const res = await this.$axios.get('/api/search/', {
                            params: {
                                q: new_term || null,
                                type: org_type.filter,
                                limit: 5,
                            }
                        })
                        results[org_type.text] = {} // resets the object from a previous search
                        results[org_type.text].data = res.data.results
                        results[org_type.text].count = res.data.count
                    }
                }
                commit('set_preview_data', results)
            }
        } catch (e) {
            if (e.response.status === 500) {
                commit('set_error', true)
            }
            else if (e.response.status === 403) {
                commit('set_error', true)
            }
            console.error(e)
        } finally {
            commit('set_searching', false)
        }
    },
}

export const mutations = {
    set_error: (state, value) => {
        state.error = value
    },
    set_searching: (state, value) => {
        state.searching = value
    },
    search: (state, new_term) => {
        state.search_term = new_term
    },
    set_current_page: (state, page_num) => {
        state.current_page = page_num
    },
    set_search_data: (state, { count, results }) => {
        state.data = {
            count,
            data: results
        }
    },
    set_preview_data: (state, payload) => {
        state.preview_data = payload
    },
    set_active_category_filter: (state, filter) => {
        state.active_category_filter = filter
        state.data = []
        state.current_page = 1
    }
}
