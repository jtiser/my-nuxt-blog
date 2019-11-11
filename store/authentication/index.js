import getters from './getters'
import gettersTypes from './getters-types'
import actions from './actions'
import actionsTypes from './actions-types'
import mutations from './mutations'
const name = 'authentication'

const state = () => ({
  token: null
})

export { name, state, getters, actions, mutations, actionsTypes, gettersTypes }
