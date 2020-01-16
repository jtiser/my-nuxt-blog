<template>
  <section>
    <section v-for="(slice, index) in slices" :key="'slice-' + index">
      <template v-if="slice.slice_type === 'text'">
        <text-slice :slice="slice"></text-slice>
      </template>
      <template v-else-if="slice.slice_type === 'quote'">
        <quote-slice :slice="slice"></quote-slice>
      </template>
      <template v-else-if="slice.slice_type === 'image_with_caption'">
        <image-caption-slice :slice="slice"></image-caption-slice>
      </template>
    </section>
  </section>
</template>

<script>
// Imports for all slices
import QuoteSlice from '@/components/Posts/Slices/QuoteSlice'
import TextSlice from '@/components/Posts/Slices/TextSlice'
import ImageCaptionSlice from '@/components/Posts/Slices/ImageCaptionSlice'

export default {
  props: {
    slices: {
      type: Array,
      default: () => []
    }
  },
  name: 'slices-block',
  components: {
    QuoteSlice,
    TextSlice,
    ImageCaptionSlice
  }
}
</script>
