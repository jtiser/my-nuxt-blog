import types from './mutations-types'

const mutations = {
  [types.SET_POSTS](state, posts) {
    state.loadedPosts = posts
  },
  [types.ADD_POST](state, post) {
    state.loadedPosts.push(post)
  },
  [types.EDIT_POST](state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(
      post => post.id === editedPost.id
    )
    state.loadedPosts[postIndex] = editedPost
  }
}
export default mutations
