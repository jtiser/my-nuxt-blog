<template>
  <div>
    <!-- <base-card dark>
      <v-img
        class="grey lighten-2"
        height="400"
        width="100%"
        :src="require('@/assets/articles/blurcamera.jpg')"
      >
        <v-layout fill-height align-center pa-3>
          <v-flex xs12 md7 offset-md5>
            <h1 class="display-3 font-weight-light">Get the latest tech news</h1>
            <div class="subheading text-uppercase pl-2 mb-4">Work in progress, come back later :)</div>
          </v-flex>
        </v-layout>
      </v-img>
    </base-card>-->
    <PostList :posts="loadedPosts" />
    <PostList :posts="loadedPosts" />
    <PostList :posts="loadedPosts" />
    <PostList :posts="loadedPosts" />
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'

export default {
  components: {
    PostList
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>
