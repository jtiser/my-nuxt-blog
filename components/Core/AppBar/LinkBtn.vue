<template>
  <v-btn
    class="ml-2 d-none d-md-flex"
    text
    depressed
    v-bind="$attrs"
    v-on="$listeners"
    nuxt
    :to="to"
  >
    <slot />
  </v-btn>
</template>

<script>
import PrismicDOM from 'prismic-dom'
import linkResolver from '~/plugins/link-resolver'
export default {
  name: 'LinkBtn',
  inheritAttrs: false,
  props: {
    link: {
      type: Object
    }
  },
  computed: {
    to() {
      return PrismicDOM.Link.url(this.link, linkResolver)
    }
  }
}
</script>
