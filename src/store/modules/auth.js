import { get, post, handleResponse } from '../../http-common'

const initialState = JSON.parse(localStorage.getItem('user'))

export const auth = {
    namespaced: true,
    state: {
        user: initialState
    },
    mutations: {
        SET_DATA(state, user) {
            localStorage.setItem('user', JSON.stringify(user))
            state.user = user
        },
        LOGOUT() {
            localStorage.removeItem('user')
            state.user = null
            location.reload()
        }
    },
    actions: {
        login({ commit, getters }, credentials) {
            const req = post('/login', credentials)
            return handleResponse(req, commit, getters.isLogged).then(res => commit('SET_DATA', res))
        },
        validate({commit, getters}) {
            if (!getters.isLogged) return Promise.resolve()
            return get('/validate', getters.getToken).then(() => {
                return Promise.resolve()
            }).catch(err => {
                if (err.response.status === 401 && getters.isLogged) commit('LOGOUT')
                return Promise.reject()
            })
        },
        logout({ commit }) {
            commit('LOGOUT')
        }
    },
    getters: {
        isLogged(state) {
            return !!state.user
        },
        getToken(state) {
            return state.user?.token
        }
    }

}
