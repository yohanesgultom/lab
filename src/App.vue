<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item v-for="route in $router.options.routes" :key="route.path" :to="route.path">
          <v-list-item-action>
            <v-icon>{{ route.meta.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; <a style="text-decoration: none; color: yellow;" href="https://yohanes.gultom.me">undefined</a> 2019</span>
    </v-footer>

    <v-snackbar v-model="alertMessage" :timeout="3000">
      {{ alertMessage }}
      <v-btn color="pink" text @click="alertMessage = false">Close</v-btn>
    </v-snackbar>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

  </v-app>
</template>

<script>
/* eslint-disable no-console */
import store from "./store/index"
export default {
  props: {
    source: String,
  },    
  data: () => ({
    drawer: null,
    title: 'Home',
  }),
  computed: {
    overlay: {
      get: function () {
        return store.state.overlay
      },
      set: function (val) {
        // only update when false (overlay closed)
        if (!val) {
          store.commit('update', {overlay: false})
        }
      },
    },
    alertMessage: {
      get: function () {
        return store.state.alertMessage
      },
      set: function (val) {
        // only update when false (snackbar closed)
        if (!val) {
          store.commit('update', {alertMessage: null})
        }
      },
    },
  },
  watch: {
    $route(to) {
      this.title = to.meta.title
    },
  },
}
</script>