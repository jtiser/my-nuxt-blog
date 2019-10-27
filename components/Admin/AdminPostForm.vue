<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="elevation-12">
        <v-card-text>
          <v-form>
            <v-text-field
              name="author"
              label="Author Name"
              id="author-name"
              v-model="editedPost.author"
            ></v-text-field>
            <v-text-field name="title" label="Title" id="title" v-model="editedPost.title"></v-text-field>
            <v-text-field
              name="thumbnail-link"
              label="Thumbnail Link"
              id="thumbnail-link"
              v-model="editedPost.thumbnail"
            ></v-text-field>
            <v-textarea label="Content" name="content" v-model="editedPost.content"></v-textarea>
            <v-textarea label="Preview" name="previewText" v-model="editedPost.previewText"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onSave">Save</v-btn>
          <v-btn color="primary">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            author: '',
            title: '',
            thumbnail: '',
            content: '',
            previewText: ''
          }
    }
  },
  methods: {
    onSave() {
      // Save the post
      this.$emit('submit', this.editedPost)
    },
    onCancel() {
      // Navigate back
      this.$router.push('/admin')
    }
  }
}
</script>
