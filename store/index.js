import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        )
        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get('posts.json')
          .then(data => {
            const postsArray = []
            for (const key in data) {
              postsArray.push({ ...data[key], id: key })
            }
            vuexContext.commit('setPosts', postsArray)
          })
          .catch(e => context.error(e))
      },
      addPost(vuexContext, postData) {
        const createdPost = {
          ...postData,
          updatedDate: new Date()
        }
        return this.$axios
          .$post(`posts.json?auth=${vuexContext.state.token}`, createdPost)
          .then(data => {
            vuexContext.commit('addPost', { ...createdPost, id: data.name })
          })
          .catch(e => console.log(e))
      },
      editPost(vuexContext, editedPost) {
        return this.$axios
          .$put(
            `posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,
            editedPost
          )
          .then(data => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch(e => console.log(e))
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      authenticateUser(vuexContext, authData) {
        const apiEndPoint = authData.signUp
          ? 'accounts:signUp'
          : 'accounts:signInWithPassword'
        return this.$axios
          .$post(
            `https://identitytoolkit.googleapis.com/v1/${apiEndPoint}?key=${process.env.firebaseApiKey}`,
            {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true
            }
          )
          .then(res => {
            vuexContext.commit('setToken', res.idToken)
            localStorage.setItem('token', res.idToken)
            const expirationDate = new Date().getTime() + res.expiresIn * 1000
            localStorage.setItem('tokenExpiration', expirationDate)
            Cookie.set('jwt', res.idToken)
            Cookie.set('expirationDate', expirationDate)
            vuexContext.dispatch('setLogoutTimer', res.expiresIn)
          })
          .catch(e => {
            console.log(e)
          })
      },
      setLogoutTimer(vuexContext, duration) {
        setTimeout(() => {
          vuexContext.commit('clearToken')
        }, duration)
      },
      initAuth(vuexContext, req) {
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
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
          if (new Date().getTime() > +expirationDate || !token) return
        }
        vuexContext.dispatch(
          'setLogoutTimer',
          +expirationDate - new Date().getTime
        )
        vuexContext.commit('setToken', token)
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}

export default createStore
