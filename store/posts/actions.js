import mutations from './mutations-types'
import actions from './actions-types'

import {
  gettersTypes as authenticationGetters,
  name as authenticationModule
} from '~/store/authentication'

const storeActions = {
  [actions.addPost]: async function(
    { commit, _rootState, rootGetters },
    postData
  ) {
    const createdPost = {
      ...postData,
      updatedDate: new Date()
    }
    const token =
      rootGetters[`${authenticationModule}/${authenticationGetters.token}`]

    const data = await this.$apiService.createPost(token, createdPost)

    commit(mutations.ADD_POST, {
      ...createdPost,
      id: data.name
    })
  },

  [actions.editPost]: async function(
    { commit, _rootState, rootGetters },
    editedPost
  ) {
    const token =
      rootGetters[`${authenticationModule}/${authenticationGetters.token}`]

    await this.$apiService.editPost(token, editedPost)

    commit(mutations.EDIT_POST, editedPost)
  },

  [actions.setPosts]: function({ commit }, posts) {
    commit(mutations.SET_POSTS, posts)
  }
}

export default storeActions
