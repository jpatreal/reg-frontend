<template>
  <v-container pa-2>
    <v-layout row wrap align-center>
      <v-flex>
        <span class="headline font-weight-medium grey--text">Events</span>
      </v-flex>
    </v-layout>
    <v-layout ma-3>
      <v-flex xs4 mx-2>
        <v-card>
          <v-img
            height="200px"
          >
            <v-card-title>Press Conference</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">Davao City Press Conference</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>20 Feb 2020</div>

            <div>Start Event: 8:30am</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="success"
            >
            Register
            </v-btn>
            <v-btn
              text
              color="primary"
            >
            See More Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4 mx-2>
        <v-card>

        </v-card>
      </v-flex>
      <v-flex xs4 mx-2>
        <v-card>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data () {

  }
}
</script>

<style scoped>

</style>