<template>
  <v-app dark>
    <core-app-bar
      v-show="showAppBar"
      :title="siteName"
      :background-img="bannerUrl"
      :nav-items="navItems"
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
import { mapGetters } from 'vuex'
import {
  name as layoutModule,
  getterTypes as layoutGetters
} from '@/store/layout'

export default {
  components: {
    CoreFooter: () => import('@/components/Core/Footer'),
    CoreAppBar: () => import('@/components/Core/AppBar'),
    CoreNavigationDrawer: () => import('@/components/Core/NavigationDrawer')
  },
  data() {
    return {
      previousOffsetTop: 0,
      scrollTop: true,
      minScrollDistance: 800
    }
  },
  computed: {
    ...mapGetters(layoutModule, [
      layoutGetters.siteName,
      layoutGetters.bannerUrl,
      layoutGetters.navItems
    ]),
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
