<template>
  <PostList :posts="loadedPosts" />
</template>

<script>
import { mapGetters } from 'vuex'
import { name as postsModule, getterTypes as postsGetters } from '@/store/posts'

import PostList from '@/components/Posts/PostList'

export default {
  components: {
    PostList
  },
  computed: {
    ...mapGetters(postsModule, [postsGetters.loadedPosts])
  }
}
</script>
