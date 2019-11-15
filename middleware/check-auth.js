import {
  actionsTypes as authenticationActions,
  name as authenticationModule
} from '~/store/authentication'

export default function(context) {
  context.store.dispatch(
    `${authenticationModule}/${authenticationActions.initAuth}`,
    context.req,
    {
      root: true
    }
  )
}
