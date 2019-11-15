import types from './mutations-types'

const mutations = {
  [types.SET_TOKEN](state, token) {
    state.token = token
  },
  [types.CLEAR_TOKEN](state) {
    state.token = null
  }
}
export default mutations
