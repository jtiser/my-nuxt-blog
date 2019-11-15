import actions from './actions-types'
import {
  gettersTypes as authenticationGetters,
  name as authenticationModule
} from '@/store/authentication'

const storeActions = {
  [actions.signUp]: async function(_, data = {}) {
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
  [actions.signIn]: async function(_, data = {}) {
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
  [actions.createPost]: async function({ rootGetters }, postData = {}) {
    try {
      const token =
        rootGetters[`${authenticationModule}/${authenticationGetters.token}`]
      const res = await this.$apiService.createPost(token, postData)
      return res.data
    } catch (e) {
      console.log(e)
    }
  },
  [actions.editPost]: async function({ rootGetters }, editedPost = {}) {
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

export default storeActions
