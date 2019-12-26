<template>
  <div class="post-part single container">
    <prismic-rich-text class="textslice" :field="slice.primary.text" />
  </div>
</template>

<script>
export default {
  props: {
    slice: {
      type: Object,
      default: () => {}
    }
  },
  name: 'text-slice'
}
</script>

<style lang="sass">
.textslice
  a
    text-decoration: underline
</style>
