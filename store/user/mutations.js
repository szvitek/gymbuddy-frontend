export default {
  SET_TOKEN(state, { token }) {
    state.token = token
  },
  SET_USER(state, user) {
    state.user = user
  },
  REMOVE_TOKEN(state) {
    state.token = null
  }
}
