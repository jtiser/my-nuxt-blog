import createRepository from '~/services/api/service'
export default (ctx, inject) => {
  // inject the repository in the context (ctx.app.$apiService)
  // And in the Vue instances (this.$repository in your components)
  const repositoryWithAxios = createRepository(ctx.$axios)
  inject('apiService', repositoryWithAxios())
}
