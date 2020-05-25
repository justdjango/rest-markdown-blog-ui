import axios from 'axios'
import { api } from '../api'

const authAxios = axios.create()

authAxios.interceptors.request.use(config => {
    const newConfig = config
    const token = localStorage.getItem("token")
    newConfig.headers = {
        "Authorization": `Token ${token}`
    }
    return newConfig
})

function isAuthenticated() {
    const token = localStorage.getItem("token")
    return token !== null && token !== undefined
}

function login(username, email, password) {
    return axios.post(api.auth.login, {
        username, email, password
    })
    .then(res => {
        localStorage.setItem("token", res.data.key)
        return res
    })
}

function logout() {
    localStorage.removeItem("token")
}

const authenticationService = {
    isAuthenticated: isAuthenticated(),
    logout,
    login
}

export { authAxios, authenticationService }