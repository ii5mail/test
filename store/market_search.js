import * as querystring from "querystring"

export const actions = {
    search: async function ({ commit, state }, params) {
        const res = await this.$axios.get('/api/search/', {
            params,
            paramsSerializer: params => {
                // We make all parameters lowercase and handle arrays of parameters here
                const lowercase_params = {}
                Object.keys(params).forEach(key=>{
                    if (Array.isArray(params[key])){
                        const arr = []
                        params[key].forEach((item)=>{
                            arr.push(item.toLowerCase())
                        })
                        lowercase_params[key] = arr
                    } else {
                        lowercase_params[key] = params[key].toLowerCase()
                    }
                })
                return querystring.stringify(params);
            }
        })
        return res
    }
}

