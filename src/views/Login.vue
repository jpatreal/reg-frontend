<template>
  <v-container>
    <v-layout>
      <v-btn text to="/">
        <v-icon large>chevron_left</v-icon>
        <span>Back to events</span>
      </v-btn>
    </v-layout>
    <v-row justify="center">
      <v-col cols="6">
          <p class="text-center headline font-weight-bold pa-2">Login to Events</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <LoginCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginCard from '@/components/LoginCard'

export default {
  name: 'login',
  components: {
    LoginCard
  }
}
</script>