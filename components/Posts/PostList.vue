<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 lg3 pa-2 v-for="post in posts" :key="post.id">
      <PostPreview :post="post" :id="post.uid" :is-admin="isAdmin" />
    </v-flex>
  </v-layout>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'

export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
