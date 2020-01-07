<template>
  <v-footer class="py-4 footer" height="auto">
    <v-container mx-auto>
      <v-layout wrap>
        <v-flex xs9>
          <base-btn
            v-for="({ link, icon }, index) in socialLinks"
            :key="index"
            :href="to(link)"
            class="ml-0 mr-3 mb-1"
            color="primary"
            square
            target="_blank"
          >
            <v-icon v-text="icon" />
          </base-btn>
        </v-flex>
        <v-spacer />
        <base-btn class="mr-0" square title="Go to top" @click="$vuetify.goTo(0)">
          <v-icon>mdi-chevron-up</v-icon>
        </base-btn>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  name as layoutModule,
  getterTypes as layoutGetters
} from '@/store/layout'

import PrismicDOM from 'prismic-dom'
import linkResolver from '~/plugins/link-resolver'

export default {
  name: 'Footer',
  computed: {
    ...mapGetters(layoutModule, [layoutGetters.socialLinks])
  },
  methods: {
    to(link) {
      return PrismicDOM.Link.url(link, linkResolver)
    }
  }
}
</script>
