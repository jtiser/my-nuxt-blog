<template>
  <v-app-bar fixed dark color="primary darken-2" shrink-on-scroll>
    <!-- <template v-slot:img="{ props }">
      <v-img v-bind="props"></v-img>
    </template>-->

    <v-app-bar-nav-icon @click.stop="$emit('nav-icon-clicked')"></v-app-bar-nav-icon>

    <v-toolbar-title>{{title}}</v-toolbar-title>

    <v-spacer></v-spacer>

    <search-bar ref="search"></search-bar>
    <link-btn class="ml-2" link="/">Home</link-btn>
    <link-btn class="ml-2" link="/about">About</link-btn>
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
  }
}
</script>
