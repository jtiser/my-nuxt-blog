import {
  name as postModule,
  actionsTypes as postActions
} from './modules/posts'

const actions = {
  nuxtServerInit({ dispatch }, context) {
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

export default actions
