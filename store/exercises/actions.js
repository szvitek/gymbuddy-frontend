export default {
  async getGroups({ commit }) {
    const groups = await this.$axios.$get('/exercises/groups')
    commit('SET_GROUPS', groups)
  },

  async getExercise({ commit }, id) {
    const exercise = await this.$axios.$get(`/exercises/${id}`)
    commit('SET_EXERCISE', exercise)
  },

  async getExercises({ commit }) {
    const exercises = await this.$axios.$get(`/exercises`)
    commit('SET_EXERCISES', { exercises })
  },

  async create(vuexContext, data) {
    await this.$axios.$post(`/exercises`, data)
  },

  async update(vuexContext, data) {
    await this.$axios.$patch(`/exercises/${data._id}`, data)
  },

  async delete(vuexContext, id) {
    await this.$axios.$delete(`/exercises/${id}`)
  }
}
