import Vuex from 'vuex'
import modules from './modules'

import actions from './actions'

const createStore = () => {
  return new Vuex.Store({
    modules,
    actions
  })
}

export default createStore
