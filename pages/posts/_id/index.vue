<template>
  <section class="post">
    <v-card class="pa-5">
      <v-img class="white--text" height="200px" :src="document.image.url">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <!-- Button to edit document in dashboard -->
            <v-flex xs1>
              <h2 class="headline">
                <prismic-edit-button :documentId="documentId" />
              </h2>
            </v-flex>
            <v-flex xs11 align-end flexbox>
              <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">
                {{ $prismic.richTextAsPlain(document.title) }}
              </h2>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
      <v-card-subtitle>{{ lastPublicationDate | date }}</v-card-subtitle>
      <slices-block :slices="slices" />
    </v-card>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import SlicesBlock from '~/components/Posts/Slices/SlicesBlock'

export default {
  components: {
    SlicesBlock
  },
  async asyncData({ params, error, req }) {
    try {
      // Query to get API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

      // Query to get post content
      const post = await api.getByUID('post', params.id)

      // Load the edit button
      if (process.client) window.prismic.setupEditButton()
      // Returns data to be used in template
      return {
        document: post.data,
        documentId: post.id,
        slices: post.data.body,
        lastPublicationDate: post.last_publication_date
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style scoped>
.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 700px;
    margin: auto;
  }
}
@media (min-width: 1024px) {
  .post {
    width: 1000px;
    margin: auto;
  }
}
</style>
