<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  name as postsModule,
  gettersTypes as postsGetters,
  actionsTypes as postsActions
} from '@/store/posts'

import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm
  },
  asyncData(context) {
    return context.app.$axios
      .$get('posts/' + context.params.postId + '.json')
      .then(data => {
        return {
          loadedPost: { ...data, id: context.params.postId }
        }
      })
      .catch(e => context.error(e))
  },
  methods: {
    ...mapActions(postsModule, [postsActions.editPost]),

    async onSubmitted(editedPost) {
      await this.editPost(editedPost)
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
