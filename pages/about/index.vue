<template>
  <section class="about-page">
    <v-card class="pa-5">
      <v-card-title class="headline">{{ $prismic.richTextAsPlain(document.title) }}</v-card-title>
      <!-- <slices-block :slices="slices" /> -->
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
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {})

      // Query to get about content
      const about = await api.getSingle('about')
      // Load the edit button
      return {
        document: about.data,
        slices: about.data.contenu
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>


<style scoped>
.about-page {
  width: 100%;
}

@media (min-width: 768px) {
  .about-page {
    width: 700px;
    margin: auto;
  }
}
@media (min-width: 1024px) {
  .about-page {
    width: 1000px;
    margin: auto;
  }
}
</style>
