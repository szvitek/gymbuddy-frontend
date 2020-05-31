export default {
  async register({ commit }, registerDTO) {
    const { user, token } = await this.$axios.$post(
      '/auth/register',
      registerDTO
    )
    commit('SET_USER', user)
    commit('SET_TOKEN', { token })
    localStorage.setItem('gymbuddy-token', token)
  },

  async login({ commit }, loginDTO) {
    const { user, token } = await this.$axios.$post('/auth/login', loginDTO)
    commit('SET_USER', user)
    commit('SET_TOKEN', { token })
    localStorage.setItem('gymbuddy-token', token)
  },

  logout({ commit }) {
    commit('REMOVE_TOKEN')
    localStorage.removeItem('gymbuddy-token')
  },

  async getMe({ commit }) {
    const user = await this.$axios.$get('/users/me')
    commit('SET_USER', user)
  }
}
