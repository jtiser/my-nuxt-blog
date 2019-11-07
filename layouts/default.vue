<template>
  <v-app dark>
    <core-app-bar
      v-show="showAppBar"
      :title="title"
      @nav-icon-clicked="$refs.drawer.drawer = !$refs.drawer.drawer"
    />

    <core-navigation-drawer ref="drawer" />

    <v-flex ref="scroll" class="main-container" id="scrolling-techniques">
      <v-content class="content" v-scroll:#scrolling-techniques="onScroll">
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
      <core-footer />
    </v-flex>
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
.main-container {
  max-height: calc(100vh);
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 65px;
  margin-top: 55px;
}

.content {
  min-height: 2280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
}
.content.short {
  min-height: 0;
}
</style>
