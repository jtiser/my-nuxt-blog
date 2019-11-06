<template>
  <v-app dark>
    <core-app-bar :title="title" :drawer="drawer" @nav-icon-clicked="drawer=!drawer"></core-app-bar>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-flex ref="scroll" class="main-container" id="scrolling-techniques">
      <v-content class="content">
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
    CoreAppBar: () => import('@/components/core/AppBar')
  },
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Blog',
          to: '/posts'
        },
        {
          icon: 'mdi-information',
          title: 'About',
          to: '/about'
        },
        {
          icon: 'mdi-account-settings',
          title: 'Admin',
          to: '/admin'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'My blog using Nuxt'
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
