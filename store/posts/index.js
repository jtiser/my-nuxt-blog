import { name as apiModule, actionTypes as apiActions } from '@/store/api'
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

export const name = 'posts'

export const state = () => ({
  loadedPosts: []
})

export const getterTypes = {
  loadedPosts: 'loadedPosts'
}

export const getters = {
  [getterTypes.loadedPosts]: state => state.loadedPosts
}

export const mutationTypes = {
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  EDIT_POST: 'EDIT_POST'
}

export const mutations = {
  [mutationTypes.SET_POSTS](state, posts) {
    state.loadedPosts = posts
  },
  [mutationTypes.ADD_POST](state, post) {
    state.loadedPosts.push(post)
  },
  [mutationTypes.EDIT_POST](state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(
      post => post.id === editedPost.id
    )
    state.loadedPosts[postIndex] = editedPost
  }
}

export const actionTypes = {
  init: 'init',
  addPost: 'addPost',
  editPost: 'editPost',
  setPosts: 'setPosts'
}

export const actions = {
  async [actionTypes.init]({ commit, dispatch }) {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {})
    const posts = await api.query(
      Prismic.Predicates.at('document.type', 'post'),
      { pageSize: 50, orderings: '[my.post.date desc]' }
    )
    dispatch(actionTypes.setPosts, posts.results)
  },

  [actionTypes.addPost]: async function({ commit, dispatch }, postData) {
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
    commit(mutationTypes.ADD_POST, {
      ...createdPost,
      id: data.name
    })
  },

  [actionTypes.editPost]: async function({ commit, dispatch }, editedPost) {
    await dispatch(`${apiModule}/${apiActions.editPost}`, editedPost, {
      root: true
    })
    commit(mutationTypes.EDIT_POST, editedPost)
  },

  [actionTypes.setPosts]: function({ commit }, posts) {
    commit(mutationTypes.SET_POSTS, posts)
  }
}
