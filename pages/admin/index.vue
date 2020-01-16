<template>
  <div class="admin-page">
    <section class="new-post">
      <v-btn color="primary" @click="$router.push('/admin/new-post')"
        >Create Post</v-btn
      >
      <v-btn color="primary" @click="onLogout">Logout</v-btn>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <PostList isAdmin :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { name as postsModule, getterTypes as postsGetters } from '@/store/posts'
import {
  actionTypes as authenticationActions,
  name as authenticationModule
} from '@/store/authentication'

import PostList from '@/components/Posts/PostList'

export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {
    PostList
  },
  computed: {
    ...mapGetters(postsModule, [postsGetters.loadedPosts])
  },
  methods: {
    ...mapActions(authenticationModule, [authenticationActions.logout]),
    onLogout() {
      this.logout()
      this.$router.push('/admin/auth')
    }
  }
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
