import mutations from './mutations-types'
import actions from './actions-types'
import { name as apiModule, actionsTypes as apiActions } from '@/store/api'

const storeActions = {
  [actions.addPost]: async function({ commit, dispatch }, postData) {
    const createdPost = {
      ...postData,
      updatedDate: new Date()
    }
    const data = await dispatch(
      `${apiModule}/${apiActions.createPost}`,
      createdPost,
      {
        root: true
      }
    )
    commit(mutations.ADD_POST, {
      ...createdPost,
      id: data.name
    })
  },

  [actions.editPost]: async function({ commit, dispatch }, editedPost) {
    await dispatch(`${apiModule}/${apiActions.editPost}`, editedPost, {
      root: true
    })
    commit(mutations.EDIT_POST, editedPost)
  },

  [actions.setPosts]: function({ commit }, posts) {
    commit(mutations.SET_POSTS, posts)
  }
}

export default storeActions
