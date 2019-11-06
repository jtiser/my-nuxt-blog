<template>
  <v-btn text depressed v-bind="$attrs" v-on="$listeners" :nuxt="link">
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'LinkBtn',
  inheritAttrs: false,
  props: {
    link: {
      type: String,
      defaul: '/'
    }
  }
}
</script>
