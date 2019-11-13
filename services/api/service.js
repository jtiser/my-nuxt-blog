import conf from './config'

// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
export default $axios => _ => ({
  query(params, resource, slug = null) {
    const url = !slug ? resource : `${resource}/${slug}`
    return $axios.get(url, { params })
  },

  get(resource, slug = '') {
    return $axios.get(`${resource}/${slug}`)
  },

  post(resource, params) {
    return $axios.post(`${resource}`, params)
  },

  update(resource, slug, params) {
    return $axios.put(`${resource}/${slug}`, params)
  },

  put(resource, params) {
    return $axios.put(`${resource}`, params)
  },

  delete(resource, slug) {
    return $axios.delete(`${resource}/${slug}`)
  },

  async signUp(authData) {
    return this.post(
      `${conf.BASE_ACCOUNT}${conf.SIGN_UP}?key=${process.env.firebaseApiKey}`,
      authData
    )
  },

  async signIn(authData) {
    return this.post(
      `${conf.BASE_ACCOUNT}${conf.SIGN_IN}?key=${process.env.firebaseApiKey}`,
      authData
    )
  },

  async createPost(token, createdPost) {
    return this.post(`${conf.POSTS_ENDPOINT}.json?auth=${token}`, createdPost)
  },

  async editPost(token, editedPost) {
    return this.post(
      `${conf.POSTS_ENDPOINT}/${editedPost.id}.json?auth=${token}`,
      editedPost
    )
  },

  async getPosts() {
    return this.post(`${conf.POSTS_ENDPOINT}.json`)
  }
})
