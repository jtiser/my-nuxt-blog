<template>
  <v-text-field
    prepend-inner-icon="mdi-magnify"
    single-line
    hide-details
    dense
    rounded
    :label="label"
    outlined
    @focus="focus=true"
    @blur="focus=false"
  ></v-text-field>
</template>
<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      focus: false
    }
  },
  computed: {
    label() {
      return this.focus ? 'Rechercher' : ''
    }
  }
}
</script>
