<template>
  <v-text-field
    class="search-bar-input"
    prepend-inner-icon="mdi-magnify"
    solo-inverted
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

<style scoped>
.search-bar-input {
  max-width: 300px;
}
</style>
