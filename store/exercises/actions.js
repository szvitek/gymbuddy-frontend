const url = 'http://localhost:5000/exercises'

export default {
  async fetchExercises({ commit }) {
    const { data: exercises } = await this.$axios.get(url)
    commit('SET_EXERCISES', { exercises })
  },

  async fetchExercise({ commit }, id) {
    const { data: exercise } = await this.$axios.get(`${url}/${id}`)
    commit('SET_EXERCISE', exercise)
  }
}
