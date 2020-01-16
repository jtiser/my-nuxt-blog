<template>
  <section class="about-page">
    <v-card class="pa-5">
      <div class="text-center">
        <v-avatar height="200" width="200">
          <v-img :src="picture.url"></v-img>
        </v-avatar>
      </div>
      <v-card-title class="headline">{{ $prismic.richTextAsPlain(document.title) }}</v-card-title>
      <v-card-text>
        <section v-for="(slice, index) in slices" :key="'slice-' + index">{{slice.text}}</section>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

export default {
  async asyncData({ params, error, req }) {
    try {
      // Query to get API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {})

      // Query to get about content
      const about = await api.getSingle('about')
      // Load the edit button
      return {
        document: about.data,
        slices: about.data.contenu,
        picture: about.data.picture
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
