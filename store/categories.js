export default {
    state: () => ({}),
    actions: {
        async get_categories() {
            try {
                const res = await this.$axios.get('/api/organization_categories/')
                return res.data
            } catch (e) {z
                console.error(e)
            }
        },
        async get_tertiary_categories(_, search) {
            const config = { params: { search, limit: 5 } }
            try {
                const res = await this.$axios.get('/api/tertiary_organization_categories/', config)
                return res.data.results
            } catch (e) {
                console.error(e)
            }

        },
        async get_market_segments(_, search) {
            const config = { params: { search, limit: 5 } }
            try {
                const res = await this.$axios.get('/api/market_segments/', config)
                return res.data.results
            } catch (e) {
                console.error(e)
            }

        }
    },
    mutations: {}
}
