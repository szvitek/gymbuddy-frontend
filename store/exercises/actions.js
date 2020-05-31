export default {
  async getGroups({ commit, rootGetters }) {
    const token = rootGetters['user/token']
    const groups = await this.$axios.$get('/exercises/groups', {
      headers: { Authorization: `Bearer ${token}` }
    })
    commit('SET_GROUPS', groups)
  },

  async getExercise({ commit, rootGetters }, id) {
    const token = rootGetters['user/token']
    const exercise = await this.$axios.$get(`/exercises/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    commit('SET_EXERCISE', exercise)
  },

  async getExercises({ commit, rootGetters }) {
    const token = rootGetters['user/token']
    const exercises = await this.$axios.$get(`/exercises`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    commit('SET_EXERCISES', { exercises })
  },

  async create({ rootGetters }, data) {
    const token = rootGetters['user/token']
    await this.$axios.$post(`/exercises`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  async update({ rootGetters }, data) {
    const token = rootGetters['user/token']
    await this.$axios.$patch(`/exercises/${data._id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  async delete({ rootGetters }, id) {
    const token = rootGetters['user/token']
    await this.$axios.$delete(`/exercises/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}
