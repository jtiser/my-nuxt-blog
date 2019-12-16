import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

export const state = () => ({
  layout: {}
})

export const mutations = {
  SET_LAYOUT_DATA(state, data) {
    state.layout = data
  }
}

export const actions = {
  async init({ commit }) {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {})
    console.log(api)
    const layout = await api.getSingle('layout')
    const test = await api.getSingle('blog_home')
    console.log(test.data)

    commit('SET_LAYOUT_DATA', layout.data)
  }
}
