<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 lg4 pa-2>
        <PostPreview
          id="1"
          :is-admin="isAdmin"
          thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
          title="Hello there!"
          previewText="This my first post!"
        />
      </v-flex>
      <v-flex xs12 sm6 lg4 pa-2>
        <PostPreview
          id="2"
          :is-admin="isAdmin"
          thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
          title="Hello there - the second time!"
          previewText="This my second post!"
        />
      </v-flex>
      <v-flex xs12 sm6 lg4 pa-2>
        <PostPreview
          id="3"
          :is-admin="isAdmin"
          thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
          title="Hi!"
          previewText="This my third post!"
        />
      </v-flex>
    </v-layout>
  </v-container>
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
