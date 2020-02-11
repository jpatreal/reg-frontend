<template>
  <v-app>
    <Toolbar />
    <adminToolbar v-if="this.$store.getters['adminAuth/admin'].isAdmin"/>
    <v-content class="my-2" style="background-color: #F5F5F5;">
      <v-container pa-0>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'

import adminToolbar from '@/components/AdminComponents/Toolbar'

export default {
  name: 'App',
  components: {
    Toolbar,
    adminToolbar
  },
  data () {
    return {
      
    }
  },
  created () {
    if (this.$cookie.get('user_token')) {
      this.$store.dispatch('user/SET_LOGGED_USER')
    }
  }
}
</script>
