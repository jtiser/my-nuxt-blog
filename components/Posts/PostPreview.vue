<template>
  <v-card :to="postLink" :nuxt="true" hover text>
    <v-img class="white--text" height="200px" :src="thumbnail.url">
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">
              {{ $prismic.richTextAsPlain(title) }}
            </h2>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-subtitle>{{ date | date }}</v-card-subtitle>
    <v-card-text class="text--primary body-2">
      <!-- <p>{{ test }}</p> -->
      <!-- <p>{{ PrismicDOM.RichText.asText(previewText).substring(0, 158) }}</p> -->
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" text outlined dark>Continuer</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PrismicDOM from 'prismic-dom'
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
      type: Array,
      required: true
    },
    previewText: {
      type: Array,
      required: true
    },
    thumbnail: {
      type: Object,
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
    // displayedPreviewText() {
    //   const truncateValue = 450
    //   if (this.previewText.length < truncateValue) return this.previewText
    //   return this.previewText.substring(0, truncateValue) + '...'
    // }
    test() {
      return PrismicDOM.RichText.asText(this.previewText).substring(0, 158)
    }
  }
}
</script>
