import { name as postModule, actionTypes as postActions } from './posts'
import { name as layoutModule, actionTypes as layoutActions } from './layout'

export const actions = {
  async nuxtServerInit({ dispatch }, context) {
    await dispatch(
      `${layoutModule}/${layoutActions.init}`,
      {},
      {
        root: true
      }
    )
    await dispatch(
      `${postModule}/${postActions.init}`,
      {},
      {
        root: true
      }
    )
    return
  }
}
