<template>
  <v-card :to="postLink" :nuxt="true" hover text>
    <v-img class="white--text" height="200px" :src="thumbnail">
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">{{ title }}</h2>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-subtitle>{{date | date}}</v-card-subtitle>
    <v-card-text>
      <p class="font-weight-light body-2 post-preview">{{ displayedPreviewText }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" text outlined dark>Continuer</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PostPreview',
  props: {
    id: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    previewText: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    date: {
      type: String
    }
  },
  computed: {
    postLink() {
      return this.isAdmin ? '/admin/' + this.id : '/posts/' + this.id
    },
    displayedPreviewText() {
      const truncateValue = 450
      if (this.previewText.length < truncateValue) return this.previewText
      return this.previewText.substring(0, truncateValue) + '...'
    }
  }
}
</script>
