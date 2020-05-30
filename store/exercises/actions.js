export default {
  async getGroups({ commit, rootGetters }) {
    const token = rootGetters['user/token']
    const groups = await this.$axios.$get('/exercises/groups', {
      headers: { Authorization: `Bearer ${token}` }
    })
    commit('SET_GROUPS', groups)
  },

  async getExercises({ commit, rootGetters }) {
    const token = rootGetters['user/token']
    const exercises = await this.$axios.$get(`/exercises`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    commit('SET_EXERCISES', { exercises })
  },

  async create({ dispatch, rootGetters }, data) {
    const token = rootGetters['user/token']
    await this.$axios.$post(`/exercises`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    dispatch('getExercises')
  }

  // async fetchExercise({ commit }, id) {
  //   const { data: exercise } = await this.$axios.get(`${url}/${id}`)
  //   commit('SET_EXERCISE', exercise)
  // }
}
