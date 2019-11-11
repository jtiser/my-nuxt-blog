import getters from './getters'
import gettersTypes from './getters-types'
import actions from './actions'
import actionsTypes from './actions-types'
import mutations from './mutations'

const name = 'posts'

const state = {
  loadedPosts: null
}

const modulePosts = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export { name, modulePosts, actionsTypes, gettersTypes }
