export default function({ $axios, store, redirect }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      store.dispatch('user/logout')
      redirect('/login')
    }
  })
}
