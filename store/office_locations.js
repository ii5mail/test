export default {
  state: () => ({
      list: [],
      current: null, // this will always hold the current user's office_location
  }),
  actions: {
      async patch_office_locations({ commit }, { id, payload, }) {
          try {
              const res = await this.$axios.patch(`/api/office_locations/${id}/`, payload)
              commit('set_current_office_location', res.data)
              return res.data
          } catch (e) {
              throw e.response
          }
      },
      async put_office_locations({ commit }, { id, payload }) {
          try {
              const res = await this.$axios.put(`/api/office_locations/${id}/`, payload)
              commit('set_current_office_location', res.data)
              return res.data
          } catch (e) {
              console.error(e)
          }
      },
      async get_office_locations({ commit }, args = {}) {
          const { name, limit, offset, ...params } = args
          try {
              const config = {
                  params: { ...params }
              }
              if (name) config.params.search = name
              if (limit) config.params.limit = limit
              if (offset) config.params.offset = offset

              const res = await this.$axios.get('/api/office_locations/', config)
              commit('set_office_locations', res.data.results)
              return res.data
          } catch (e) {
              console.error(e)
          }
      },
      async get_current({ commit }, id) {
          try {
              const res = await this.$axios.get(`/api/office_locations/${id}/`)
              commit('set_current_office_location', res.data)
              return res.data
          } catch (e) {
              console.error(e)
          }
      },
      async user_domain_match({ commit }) {
          try {
              const res = await this.$axios.get('api/office_locations/user_domain_match/')
              return res.data
          } catch (e) {
              console.error(e)

          }
      },
      edit_new({ commit }, payload) {
          commit('edit_new_office_location', payload)
      },
      clear_new({ commit }) {
          commit('clear_new_office_location')
      },
  },
  mutations: {
      set_current_office_location(state, payload) {
          state.current = payload
          // sets the org's type
          state.office_location_type = state.current?.categories[0]
              ?.supercategory?.supercategory.name
      },
      set_office_locations(state, payload) {
          state.list = payload
      }
  },
}