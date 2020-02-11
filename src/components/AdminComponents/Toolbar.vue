<template>
  <v-app-bar
    app
    dark
  >

  <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
          <v-btn
            pt-0
            text
            v-on="on"
          >
            Hi, {{ $store.getters['adminAuth/admin'].userName }}
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="mx-5" @click="logout">
            <v-icon>exit_to_app</v-icon>
            <v-list-item-title class="mx-2">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'adminToolbar',
  data () {
    return {
      drawer: true,
      mini: true
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('adminAuth/ADMIN_LOGOUT')
        .then(() => {
          this.$router.push('/32JNW9KQ84P47T8')
        })
      }
  }
}
</script>