import axios from 'axios'

const baseURL = 'http://localhost:3000'

function setHeaders(token) {
    return {
        headers: token ? { Authorization: 'Bearer ' + token } : {}
    }
}

export function handleResponse(promise, commit, isLogged) {
    return promise.then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        if (err.response.status === 401 && isLogged) commit('auth/LOGOUT', null, {root: true})
        return Promise.reject(err.response.data?.msg)
    })
}

export function post(path, body, token) {
    return axios.post(baseURL + path, body, setHeaders(token))
}

export function get(path, token) {
    return axios.get(baseURL + path, setHeaders(token))
}
