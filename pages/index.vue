<template>
  <PostList :posts="loadedPosts" />
</template>

<script>
import { mapGetters } from 'vuex'
import {
  name as postsModule,
  gettersTypes as postsGetters
} from '@/store/modules/posts'

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
