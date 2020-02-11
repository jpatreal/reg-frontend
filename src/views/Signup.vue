<template>
  <v-container>
    <v-layout>
      <v-btn text to="/">
        <v-icon large>chevron_left</v-icon>
        <span>Back to events</span>
      </v-btn>
    </v-layout>
    <v-row justify="center">
      <v-col
        cols="6"
      >
          <p class="text-center headline font-weight-medium pa-2">Sign up Account</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="6"
      >
      <SignupCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignupCard from '@/components/SignupCard'

export default {
  name: 'signup',
  components: {
    SignupCard
  }
}
</script>