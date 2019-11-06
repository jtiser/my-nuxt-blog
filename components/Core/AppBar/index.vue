<template>
  <v-app-bar
    absolute
    color="#fcb69f"
    dark
    shrink-on-scroll
    src="https://picsum.photos/1920/1080?random"
    scroll-target="#scrolling-techniques"
  >
    <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
    </template>

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
