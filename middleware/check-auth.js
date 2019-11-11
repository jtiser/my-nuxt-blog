import {
  actionsTypes as authenticationActions,
  name as authenticationModule
} from '@/store/modules/authentication'

export default function(context) {
  context.store.dispatch(
    `${authenticationModule}/${authenticationActions.initAuth}`,
    context.req,
    {
      root: true
    }
  )
}
