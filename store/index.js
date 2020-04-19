// root module

/*
todo: need a token, store it in localstorage
todo: on logout: delete token from localstorage
*/

const url = 'https://jsonplaceholder.typicode.com/users/1'

export const state = () => ({
  isLoading: false,
  user: null
})

export const actions = {
  async login({ commit }, { email, password }) {
    const { data: user } = await this.$axios.get(url)
    // eslint-disable-next-line
    console.log(email, password, user)
    commit('LOGIN', user)
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
  async register({ email, password }) {
    // todo: axios request
  }
}

export const mutations = {
  LOGIN(state, user) {
    state.user = user
  },
  LOGOUT(state) {
    state.user = null
  }
}

export const getters = {
  user(state) {
    return state.user
  }
}
