<template>
  <v-app dark>
    <core-app-bar
      v-show="showAppBar"
      :title="title"
      @nav-icon-clicked="$refs.drawer.drawer = !$refs.drawer.drawer"
    />

    <core-navigation-drawer ref="drawer" />

    <v-content class="content colorized-content" id="scrolling-techniques">
      <v-container v-scroll:#scrolling-techniques="onScroll">
        <nuxt />
      </v-container>
    </v-content>

    <core-footer class="colorized-content" />
  </v-app>
</template>

<script>
export default {
  components: {
    CoreFooter: () => import('@/components/core/Footer'),
    CoreAppBar: () => import('@/components/core/AppBar'),
    CoreNavigationDrawer: () => import('@/components/core/NavigationDrawer')
  },
  data() {
    return {
      title: 'My blog using Nuxt',
      previousOffsetTop: 0,
      scrollTop: true,
      minScrollDistance: 800
    }
  },
  computed: {
    showAppBar() {
      return this.scrollTop || this.previousOffsetTop < this.minScrollDistance
    }
  },
  methods: {
    onScroll(e) {
      this.scrollTop = this.previousOffsetTop > e.target.scrollTop
      this.previousOffsetTop = e.target.scrollTop
    }
  }
}
</script>

<style scoped>
.content {
  padding-top: 75px !important;
  margin-top: 55px;
}

.colorized-content {
  background-color: rgb(236, 231, 231);
  /* background-color: rgb(219, 212, 212); */
}
</style>
