import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

export const name = 'layout'

export const state = () => ({
  layout: {}
})

export const getterTypes = {
  siteName: 'siteName',
  bannerUrl: 'bannerUrl',
  navItems: 'navItems'
}

export const getters = {
  [getterTypes.siteName]: state => state.layout.site_name,
  [getterTypes.bannerUrl]: state =>
    !!state.layout && !!state.layout.banner ? state.layout.banner.url : '',
  [getterTypes.navItems]: state => state.layout.header_nav_items
}

export const mutationTypes = {
  SET_LAYOUT_DATA: 'SET_LAYOUT_DATA'
}

export const mutations = {
  [mutationTypes.SET_LAYOUT_DATA](state, data) {
    state.layout = data
  }
}

export const actionTypes = {
  init: 'init'
}

export const actions = {
  async [actionTypes.init]({ commit }) {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {})
    const layout = await api.getSingle('layout')
    commit(mutationTypes.SET_LAYOUT_DATA, layout.data)
  }
}
