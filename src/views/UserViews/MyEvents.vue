<template>
  <v-container>
    <v-col cols="12">
      <span class="headline font-weight-medium">Events</span>
    </v-col>
    <v-row>
      <v-col cols="4">
        <v-text-field outlined append-icon="search" label="Search Events"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-select outlined label="Filter by:"></v-select>
      </v-col>
      <v-col cols="4">
        <v-select outlined label="Filter by:"></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="(event, index) in myEvents" :key="index">
        <v-card flat class="pa-3">
          <v-row>
            <v-col cols="1" class="text-center pt-5">
              <div><span class="red--text">{{ event.startDateTime | dateOnly }}</span></div>
              <div><span class="headline font-weight-medium">{{ event.startDateTime | dayOnly }}</span></div>
            </v-col>
            <v-col cols="1">
              <v-img
                max-height="100px"
                max-width="100px"
                src="https://s3.amazonaws.com/baptist-health-sparks/wp-content/uploads/2018/10/29183342/default-profile.png">
              </v-img>
            </v-col>
            <v-col cols="3">
              <div><span class="font-weight-bold">{{ event.title }}</span></div>
              <div><span class="grey--text">{{ event.startDateTime | localTime }} - {{ event.endDateTime | localTime }}</span></div>
              <div><span>{{ event.venue }}</span></div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="2" class="text-center mt-2">
              <v-chip :color="event.cancelled ? 'error' : 'success'" large>
                {{ event.cancelled ? 'Cancelled' : 'Ongoing' }}
              </v-chip>
            </v-col>
            <v-col cols="2" class="text-center mt-3">
              <v-btn
                text
                large>
                <v-icon large>more_vert</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="loading">
      <v-skeleton-loader type="list-item-avatar-three-line" :loading="loading" class="pb-3"></v-skeleton-loader>
      <v-skeleton-loader type="list-item-avatar-three-line" :loading="loading" class="pt-3 pb-3"></v-skeleton-loader>
      <v-skeleton-loader type="list-item-avatar-three-line" :loading="loading" class="pt-3"></v-skeleton-loader>
    </div>
  </v-container>
</template>

<script>
import dateToWords from '@/mixins/momentDateToWordsMixin'
import UserService from '@/services/UserService'

export default {
  name: 'MyEvents',
  mixins: [ dateToWords ],
  data () {
    return {
      loading: false,
      myEvents: ''
    }
  },
  methods: {
    initMyEvents () {
      this.loading = true
      UserService.myEvents()
        .then(res => {
          this.myEvents = res.data.events
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  created () {
    this.initMyEvents()
  }
}
</script>