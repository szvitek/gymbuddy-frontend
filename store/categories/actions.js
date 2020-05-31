export default {
  async getCategory({ commit }, id) {
    const category = await this.$axios.$get(`/categories/${id}`)
    commit('SET_CATEGORY', category)
  },

  async getCategories({ commit }) {
    const categories = await this.$axios.$get('/categories')
    commit('SET_CATEGORIES', categories)
  },

  async create(vuexContext, data) {
    await this.$axios.$post('/categories', data)
  },

  async update(vuexContext, data) {
    const { _id } = data
    await this.$axios.$patch(`/categories/${_id}`, data)
  },

  async delete(vuexContext, id) {
    await this.$axios.$delete(`/categories/${id}`)
  }
}
