import {
  gettersTypes as authenticationGetters,
  name as authenticationModule
} from '@/store/modules/authentication'

export default function(context) {
  // TODO something here is broken ! getters are not working, thus the whole chain is broken :'(
  console.log('midd auth', context.store.getters)
  console.log(
    'midd auth',
    context.store.getters[
      `${authenticationModule}/${authenticationGetters.isAuthenticated}`
    ]
  )
  if (
    !context.store.getters[
      `${authenticationModule}/${authenticationGetters.isAuthenticated}`
    ]
  ) {
    console.log('???')
    context.redirect('/admin/auth')
  }
}
