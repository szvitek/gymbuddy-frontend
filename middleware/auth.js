export default function(context) {
  if (!context.store.getters['user/token']) {
    context.redirect('/login')
  }
}
