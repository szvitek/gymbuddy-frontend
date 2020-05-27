export default function(context) {
  if (!context.store.getters['user/token']) {
    // todo check if token is not expired
    context.redirect('/login')
  }
}
