export default () => ({
  token: localStorage.getItem('gymbuddy-token') || null,
  user: null
})
