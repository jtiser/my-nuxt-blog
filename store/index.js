import {
  name as postModule,
  actionsTypes as postActions
} from './modules/posts'

import modules from './modules'
export { modules }

export const actions = {
  nuxtServerInit({ dispatch }, context) {
    console.log('in this stuff')
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
