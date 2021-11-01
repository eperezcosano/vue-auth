import { get, handleResponse } from '../../http-common'

export const dashboard = {
    namespaced: true,
    state: {
        userList: []
    },
    mutations: {
        SET_USER_LIST(state, data) {
            state.userList = data
        }
    },
    actions: {
        getUsers({ commit, rootGetters}) {
            const req = get('/dashboard/users', rootGetters["auth/getToken"])
            return handleResponse(req, commit, rootGetters["auth/isLogged"])
                .then(res => {
                    commit('SET_USER_LIST', res)
                    return res
                })
        }
    },
    getters: {
        getUsersList(state) {
            return state.userList
        }
    }

}
