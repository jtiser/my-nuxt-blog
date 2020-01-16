import {
  getterTypes as authenticationGetters,
  name as authenticationModule
} from '@/store/authentication'

export const name = 'api'

export const state = () => ({})

export const actionTypes = {
  signUp: 'signUp',
  signIn: 'signIn',
  createPost: 'createPost',
  editPost: 'editPost'
}

export const actions = {
  [actionTypes.signUp]: async function(_, data = {}) {
    try {
      const authData = {
        ...data,
        returnSecureToken: true
      }
      const res = await this.$apiService.signUp(authData)
      return res.data
    } catch (e) {
      console.log(e)
    }
  },
  [actionTypes.signIn]: async function(_, data = {}) {
    try {
      const authData = {
        ...data,
        returnSecureToken: true
      }
      const res = await this.$apiService.signIn(authData)
      return res.data
    } catch (e) {
      console.log(e)
    }
  },
  [actionTypes.createPost]: async function({ rootGetters }, postData = {}) {
    try {
      const token =
        rootGetters[`${authenticationModule}/${authenticationGetters.token}`]
      const res = await this.$apiService.createPost(token, postData)
      return res.data
    } catch (e) {
      console.log(e)
    }
  },
  [actionTypes.editPost]: async function({ rootGetters }, editedPost = {}) {
    try {
      const token =
        rootGetters[`${authenticationModule}/${authenticationGetters.token}`]
      const res = await this.$apiService.editPost(token, editedPost)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
}
