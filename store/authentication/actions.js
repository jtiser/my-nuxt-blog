import mutations from './mutations-types'
import actions from './actions-types'
import Cookie from 'js-cookie'
import { name as apiModule, actionsTypes as apiActions } from '@/store/api'

const storeActions = {
  [actions.authenticateUser]: async function({ dispatch, commit }, authData) {
    try {
      const data = {
        email: authData.email,
        password: authData.password
      }
      let res = null
      if (authData.signUp)
        res = await dispatch(`${apiModule}/${apiActions.signUp}`, data, {
          root: true
        })
      else
        res = await dispatch(`${apiModule}/${apiActions.signIn}`, data, {
          root: true
        })
      commit(mutations.SET_TOKEN, res.idToken)
      localStorage.setItem('token', res.idToken)
      const expirationDate =
        new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
      localStorage.setItem('tokenExpiration', expirationDate)
      Cookie.set('jwt', res.idToken)
      Cookie.set('expirationDate', expirationDate)
    } catch (e) {
      console.log(e)
    }
  },

  [actions.setLogoutTimer]: ({ commit }, duration) => {
    setTimeout(() => {
      commit(mutations.CLEAR_TOKEN)
    }, duration)
  },

  [actions.initAuth]: ({ dispatch, commit }, req) => {
    let token, expirationDate
    if (req) {
      if (!req.headers.cookie) return
      const jwtCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('jwt='))
      if (!jwtCookie) return
      token = jwtCookie.split('=')[1]
      const expirationDateCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('expirationDate='))
      if (!expirationDateCookie) return
      expirationDate = expirationDateCookie.split('=')[1]
    } else if (process.client) {
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    }
    if (new Date().getTime() > +expirationDate || !token) {
      dispatch(actions.logout)
      return
    }
    commit(mutations.SET_TOKEN, token)
  },

  [actions.logout]: ({ commit }) => {
    commit(mutations.CLEAR_TOKEN)
    Cookie.remove('jwt')
    Cookie.remove('expirationDate')
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }
  }
}

export default storeActions
