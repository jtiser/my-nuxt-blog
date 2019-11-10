<template>
  <v-app-bar
    fixed
    dark
    color="primary darken-2"
    shrink-on-scroll
    :src="require(`~/assets/images/space02.jpeg`)"
  >
    <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), #4a148c"></v-img>
    </template>

    <v-app-bar-nav-icon class="d-md-none" @click.stop="$emit('nav-icon-clicked')"></v-app-bar-nav-icon>

    <v-toolbar-title>{{title}}</v-toolbar-title>

    <v-spacer></v-spacer>
    <search-bar class="d-none d-md-flex" ref="search"></search-bar>
    <link-btn class="ml-2 d-none d-md-flex" link="/">Home</link-btn>
    <link-btn class="ml-2 d-none d-md-flex" link="/about">About</link-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  components: {
    SearchBar: () => import('./SearchBar'),
    LinkBtn: () => import('./LinkBtn')
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    breakpointDisplayReached() {
      return this.$vuetify.breakpoint.md
    }
  }
}
</script>
