import {
  gettersTypes as authenticationGetters,
  name as authenticationModule
} from '~/store/authentication'

export default function(context) {
  if (
    !context.store.getters[
      `${authenticationModule}/${authenticationGetters.isAuthenticated}`
    ]
  ) {
    context.redirect('/admin/auth')
  }
}
