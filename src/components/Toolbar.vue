<template>
  <div>
    <v-app-bar app dark color="cyan darken-4">
      <v-toolbar-title class="pa-4">EVENTS SVC</v-toolbar-title>

      <div px-3 v-if="$store.getters['auth/loggedIn']">
        <v-btn text to="/" class="mx-2">
          <v-icon class="mx-1">home</v-icon>
          <span>Home</span>
        </v-btn>
        <v-btn text to="/my-events" mx-2>
          <v-icon class="mx-1">event_note</v-icon>
          <span>My Events</span>
        </v-btn>
      </div>
      <v-spacer></v-spacer>

      <div v-if="!$store.getters['auth/loggedIn']">
        <v-btn
          text
          class="mx-2"
          to="/login"
        >Login</v-btn>
        <v-divider vertical></v-divider>
        <v-btn
          text
          rounded
          outlined
          class="mr-4"
          to="/signup"
        >Sign Up</v-btn>
      </div>
      <div v-else>
        <v-avatar>
          <v-img
            style="border-radius: 8%"
            src="https://s3.amazonaws.com/baptist-health-sparks/wp-content/uploads/2018/10/29183342/default-profile.png"
            aspect-ratio="1"
            alt="avatar"
          ></v-img>
        </v-avatar>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-btn
                  pt-0
                  text
                  v-on="on"
                >
                  Hi, {{ $store.getters['user/user'].firstName | slice }}
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
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'toolbar',
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/DELETE_TOKEN')
        .then(res => {
          this.$router.push('/login')
          this.$store.dispatch('user/DELETE_USER_STATE')
        })
    }
  },
  filters: {
    slice: function (value) {
      if (!value) return ''
      if (/\s/.test(value)) {
        value = value.toString()
        return value.substr(0, value.indexOf(' '))
      } else {
        return value
      }
    }
  }
}
</script>