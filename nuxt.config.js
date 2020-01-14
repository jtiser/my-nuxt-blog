import colors from 'vuetify/es5/util/colors'
const axios = require('axios')
import Prismic from 'prismic-javascript'
const PrismicConfig = require('./prismic.config')

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        innerHTML:
          '{ window.prismic = { endpoint: "' +
          PrismicConfig.apiEndpoint +
          '"} }'
      },
      { src: '//static.cdn.prismic.io/prismic.min.js' }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/main.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/base',
    '~/plugins/date-filter',
    '~/plugins/api-service',
    '~/plugins/link-resolver.js',
    '~/plugins/html-serializer.js',
    '~/plugins/prismic-vue.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:
      process.env.BASE_URL || 'https://my-nuxt-blog-ec514.firebaseio.com/'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.purple.darken4,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  },
  env: {
    baseUrl:
      process.env.BASE_URL || 'https://my-nuxt-blog-ec514.firebaseio.com/',
    firebaseApiKey: 'TODO'
  },

  generate: {
    routes: function() {
      // Fetch content for the homepage and generate it
      const homepage = Prismic.getApi(PrismicConfig.apiEndpoint, {}).then(
        api => {
          return api
            .query(Prismic.Predicates.at('document.type', 'homepage'))
            .then(response => {
              return response.results.map(payload => {
                return {
                  route: '/',
                  payload
                }
              })
            })
        }
      )

      // Fetch content for the about page and generate it
      const aboutPage = Prismic.getApi(PrismicConfig.apiEndpoint, {}).then(
        api => {
          return api
            .query(Prismic.Predicates.at('document.type', 'about_page'))
            .then(response => {
              return response.results.map(payload => {
                return {
                  route: '/about',
                  payload
                }
              })
            })
        }
      )

      // Fetch all the blog posts to generate the Blog page
      const blogPage = Prismic.getApi(PrismicConfig.apiEndpoint, {}).then(
        api => {
          return api
            .query(Prismic.Predicates.at('document.type', 'blog_post'))
            .then(response => {
              return [
                {
                  route: `/posts`,
                  payload: response.results
                }
              ]
            })
        }
      )

      // Fetch again all the blog posts, but this time generating each post's page
      const blogPosts = Prismic.getApi(PrismicConfig.apiEndpoint, {}).then(
        api => {
          return api
            .query(Prismic.Predicates.at('document.type', 'blog_post'))
            .then(response => {
              return response.results.map(payload => {
                return {
                  route: `/posts/${payload.uid}`,
                  payload
                }
              })
            })
        }
      )

      // Here I return an array of the results of each promise using the spread operator.
      // It will be passed to each page as the `payload` property of the `context` object,
      // which is used to generate the markup of the page.
      return Promise.all([homepage, aboutPage, blogPage, blogPosts]).then(
        values => {
          return [...values[0], ...values[1], ...values[2], ...values[3]]
        }
      )
    }
  }
}
