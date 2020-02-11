<template>
  <v-container pa-2>
    <v-row>
      <v-col cols="4" class="headline font-weight-bold grey--text">
        <span>Events Feed</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="2"> 
        <v-select outlined label="Select Date"></v-select>
      </v-col>
      <v-col cols="2"> 
        <v-select outlined label="Category"></v-select>
      </v-col>
      <v-col cols="2"> 
        <v-select outlined label="Sort by"></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" v-for="(event, index) in events" :key="index">
          <v-card>
            <v-img height="200px">
              <v-card-title>{{ event.title }}</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0">{{ event.venue }}</v-card-subtitle>
            <v-card-text class="text--primary">
              <span class="red--text">{{ event.date | dateToWords }} 
                <span class="black--text"> @ {{ event.startTime | localTime }} - {{ event.endTime | localTime }}</span>
              </span>
              <div>{{ event.place }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-chip outlined color="error" v-if="event.cancelled">Event Cancelled</v-chip>
              <v-btn 
                text 
                color="success"
                v-if="$store.getters['auth/loggedIn'] && !event.cancelled && event.registrants != userId"
                @click="addEvent(event._id)"
                >Register
              </v-btn>
              <v-btn 
                text 
                color="error"
                v-if="$store.getters['auth/loggedIn'] && !event.cancelled && event.registrants == userId"
                >Unregister
              </v-btn>
              <v-btn text color="primary">
              See More Details
              <v-icon class="mx-1">launch</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dateToWords from '@/mixins/momentDateToWordsMixin'
import localTime from '@/mixins/momentLocalTimeMixin'
import EventService from '@/services/EventService'

export default {
  name: 'Home',
  mixins: [dateToWords, localTime],
  data () {
    return {
      loading: false,
      events: ''
    }
  },
  methods: {
    initEvents () {
      this.loading = true
      EventService.getEvents()
        .then(res => {
          this.events = res.data
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    addEvent (eventId) {
      this.$swal({
        icon: 'question',
        title: 'Would you like to proceed?',
        text: 'You will register to this event.',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        confirmButtonColor: 'rgb(23, 201, 100)',
        cancelButtonColor: '#E53935'
      })
        .then(result => {
          if (result.value) {
            this.$store.dispatch('user/ADD_EVENT_USER', { eventId })
              .then(()=> {
                this.$swal({
                  icon: 'success',
                  title: 'Successfully registered!'
                })
                this.initEvents()
              })
          }
        })
    }
  },
  created () {
    this.initEvents()
  },
  computed: {
    userId () {
      return this.$store.getters['user/user']._id
    }
  }
}
</script>

<style scoped>

</style>