<template>
  <v-card :to="postLink" :nuxt="true" hover text>
    <v-img class="white--text" height="200px" :src="post.data.image.url">
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">
              {{ $prismic.richTextAsPlain(post.data.title) }}
            </h2>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-subtitle>{{ post.first_publication_date | date }}</v-card-subtitle>
    <v-card-text class="text--primary body-2">
      <p>{{ getFirstParagraph(post) }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" text outlined dark>Continuer</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PrismicDOM from 'prismic-dom'
import LinkResolver from '~/plugins/link-resolver.js'

export default {
  name: 'PostPreview',
  data() {
    return {
      link: ''
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    id() {
      return this.post.uid
    },
    postLink() {
      return '/posts/' + this.id
    }
  },
  methods: {
    getFirstParagraph(post) {
      const textLimit = 300
      const slices = post.data.body
      let firstParagraph = ''
      let haveFirstParagraph = false

      slices.map(function(slice) {
        if (!haveFirstParagraph && slice.slice_type == 'text') {
          slice.primary.text.forEach(function(block) {
            if (block.type == 'paragraph' && !haveFirstParagraph) {
              firstParagraph += block.text
              haveFirstParagraph = true
            }
          })
        }
      })

      const limitedText = firstParagraph.substr(0, textLimit)

      if (firstParagraph.length > textLimit) {
        return limitedText.substr(0, limitedText.lastIndexOf(' ')) + '...'
      } else {
        return firstParagraph
      }
    }
  }
}
</script>
