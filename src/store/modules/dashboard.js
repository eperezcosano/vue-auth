import { get, handleResponse } from '../../http-common'

export const dashboard = {
    namespaced: true,
    state: {
        cache: []
    },
    mutations: {
        SET_DATA(state, data) {
            state.cache = data
        }
    },
    actions: {
        getUsers({ commit, rootGetters}) {
            const req = get('/dashboard/users', rootGetters["auth/getToken"])
            return handleResponse(req, commit, rootGetters["auth/isLogged"]).then(res => {
                commit('SET_DATA', res)
                return res
            })
        }
    },
    getters: {}

}
