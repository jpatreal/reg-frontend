<template>
  <v-app>
    <Toolbar />
    <v-content class="my-2" style="background-color: #F5F5F5;">
      <v-container pa-0>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './views/Toolbar'

export default {
  name: 'App',
  components: {
    Toolbar
  }
};
</script>
