import auth from '@/api/auth'
const state = {
    isLogin: false,
    user: null
}

const mutations = {
    setUser(state, payload) {
        state.user = payload.user
    },
    setLogin(state, payload) {
        state.isLogin = payload.isLogin
    }
}
const actions = {
    login({ commit }, { username, password }) {
        return auth.login({ username, password })
            .then(response => {
                commit('setUser', { user: response.data })
                commit('setLogin', { isLogin: true })
            })
    },
    async register({ commit }, { username, password }) {
        let response = await auth.register({ username, password })
        if (response.status === 'ok') {
            console.log(121212)
            commit('setUser', { user: response.data })
            commit('setLogin', { isLogin: true })
        }
        return response.data
    },
    async checkLogin({ commit, state }) {
        if (state.isLogin) return true
        let response = await auth.getInfo()
        commit('setLogin', { isLogin: response.isLogin })
        if (!response.isLogin) { return false }
        commit('setUser', { user: response.data })
        return true
    },
    async logout({ commit }) {
        await auth.logout()
        commit('setUser', { user: null })
        commit('setLogin', { isLogin: false })
    }
}

const getters = {
    user(state) {
        return state.user
    },
    isLogin(state) {
        return state.isLogin
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}