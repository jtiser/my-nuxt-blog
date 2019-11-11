import types from './getters-types'

const getters = {
  [types.isAuthenticated]: state => state.token != null,
  [types.token]: state => state.token
}
export default getters
