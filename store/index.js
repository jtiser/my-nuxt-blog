import { name as postModule, actionsTypes as postActions } from './posts'
import { actions as layoutActions } from './layout'

export const actions = {
  nuxtServerInit({ dispatch }, context) {
    dispatch(
      `layout/init`,
      {},
      {
        root: true
      }
    )
    return context.app.$axios
      .$get('posts.json')
      .then(data => {
        const postsArray = []
        for (const key in data) {
          postsArray.push({ ...data[key], id: key })
        }
        dispatch(`${postModule}/${postActions.setPosts}`, postsArray, {
          root: true
        })
      })
      .catch(e => context.error(e))
  }
}
