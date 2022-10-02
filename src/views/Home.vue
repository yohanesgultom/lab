<template>
  <div class="container is-fluid">
    <p class="title pl-4">Experimental Apps</p>
    <v-list>
      <v-list-item v-for="route in appRoutes" :key="route.path" :to="route.path">
        <v-list-item-action>
          <v-icon>{{ route.meta.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  computed: {
    appRoutes: function () {
      return this.$router.options.routes.filter(r => {
        return r.name.toLowerCase() != 'home'
      })
    }
  }
}
</script>
