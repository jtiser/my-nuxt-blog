import Cookie from 'js-cookie'
import { name as apiModule, actionTypes as apiActions } from '@/store/api'

export const name = 'authentication'

export const state = () => ({
  token: null
})

export const getterTypes = {
  isAuthenticated: 'isAuthenticated',
  token: 'token'
}

export const getters = {
  [getterTypes.isAuthenticated]: state => state.token != null,
  [getterTypes.token]: state => state.token
}

export const mutationTypes = {
  SET_TOKEN: 'SET_TOKEN',
  CLEAR_TOKEN: 'CLEAR_TOKEN'
}

export const mutations = {
  [mutationTypes.SET_TOKEN](state, token) {
    state.token = token
  },
  [mutationTypes.CLEAR_TOKEN](state) {
    state.token = null
  }
}

export const actionTypes = {
  authenticateUser: 'authenticateUser',
  setLogoutTimer: 'setLogoutTimer',
  initAuth: 'initAuth',
  logout: 'logout'
}

export const actions = {
  [actionTypes.authenticateUser]: async function(
    { dispatch, commit },
    authData
  ) {
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
      commit(mutationTypes.SET_TOKEN, res.idToken)
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

  [actionTypes.setLogoutTimer]: ({ commit }, duration) => {
    setTimeout(() => {
      commit(mutationTypes.CLEAR_TOKEN)
    }, duration)
  },

  [actionTypes.initAuth]: ({ dispatch, commit }, req) => {
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
    commit(mutationTypes.SET_TOKEN, token)
  },

  [actionTypes.logout]: ({ commit }) => {
    commit(mutationTypes.CLEAR_TOKEN)
    Cookie.remove('jwt')
    Cookie.remove('expirationDate')
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }
  }
}
