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
    <v-row v-if="!isFetching">
      <v-col cols="4" v-for="(event, index) in events" :key="index">
          <v-card>
            <v-img height="200px">
              <v-card-title>{{ event.title }}</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0">{{ event.venue }}</v-card-subtitle>
            <v-card-text class="text--primary">
              <span class="red--text">{{ event.startDateTime | dateToWords }} 
                <span class="black--text"> @ {{ event.startDateTime | localTime }} - {{ event.endDateTime | localTime }}</span>
              </span>
              <div>{{ event.place }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-chip outlined color="error" v-if="event.cancelled">Event Cancelled</v-chip>
              <v-btn 
                text 
                :color="userEvents.indexOf(event._id) === -1 ? 'success' : 'error'"
                v-if="$store.getters['auth/loggedIn'] && !event.cancelled"
                @click="userEvents.indexOf(event._id) === -1 ? addEvent(event._id, event.title) : unRegisterEvent(event._id, event.title)"
                >{{ userEvents.indexOf(event._id) === -1 ? 'Register' : 'Unregister'}}
              </v-btn>
              <v-btn text color="primary">
              See More Details
              <v-icon class="mx-1">launch</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-col>
    </v-row>
    <div v-if="isFetching">
      <v-row>
        <v-col cols="4">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
        <v-col cols="4">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
        <v-col cols="4">
            <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import dateToWords from '@/mixins/momentDateToWordsMixin'
import localTime from '@/mixins/momentLocalTimeMixin'
import EventService from '@/services/EventService'
import UserService from '@/services/UserService'

export default {
  name: 'Home',
  mixins: [dateToWords, localTime],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    addEvent (eventId, eventTitle) {
      this.$swal({
        icon: 'info',
        title: 'Would you like to proceed?',
        text: 'You will be registered to' + ' ' + eventTitle,
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
              })
          }
        })
    },
    unRegisterEvent (eventId, eventTitle) {
      this.$swal({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'Unregister to' + ' ' + eventTitle + '?',
        showCancelButton: true,
        confirmButtonText: 'Yes, Unregister!'
      })
        .then(res => {
          if (res.value) {
            this.$store.dispatch('user/REMOVE_EVENT_USER', { eventId })
              .then(() => {
                this.$swal({
                  icon: 'success',
                  title: 'Successfully unregistered!'
                })
              })
          }
        })
    }
  },
  created () {
    this.$store.dispatch('event/GET_ALL_EVENTS')
  },
  computed: {
    userId () {
      return this.$store.getters['user/user']._id
    },
    userEvents () {
      return this.$store.getters['user/userEvents']
    },
    events () {
      return this.$store.getters['event/events']
    },
    isFetching () {
      return this.$store.getters['event/isFetching']
    }
  }
}
</script>

<style scoped>

</style>