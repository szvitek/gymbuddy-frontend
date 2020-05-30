export default {
  async getCategory({ commit, rootGetters }, id) {
    const token = rootGetters['user/token']
    const category = await this.$axios.$get(`/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    commit('SET_CATEGORY', category)
  },

  async getCategories({ commit, rootGetters }) {
    const token = rootGetters['user/token']
    const categories = await this.$axios.$get('/categories', {
      headers: { Authorization: `Bearer ${token}` }
    })
    commit('SET_CATEGORIES', categories)
  },

  async create({ rootGetters }, data) {
    const token = rootGetters['user/token']
    await this.$axios.$post('/categories', data, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  async update({ rootGetters }, data) {
    const token = rootGetters['user/token']
    const { _id } = data
    await this.$axios.$patch(`/categories/${_id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  async delete({ rootGetters }, id) {
    const token = rootGetters['user/token']
    await this.$axios.$delete(`/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}
