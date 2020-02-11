<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 class="pt-2">
        <span class="headline font-weight-medium">Event Dashboard</span>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 sm4>
        <v-text-field
          single-line
          hide-details
          outlined
          append-icon="search"
          label="Search"
          v-model="search"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout class="ma-4">
      <AddEventDialog />
    </v-layout>
    <v-data-table
      :loading="tableLoading"
      :headers="headers"
      :items="events"
      :search="search"
    >
      <template v-slot:item.cancelled="{ item }">
        <v-chip 
          dark
          :color="item.cancelled ? 'red' : 'green'"
        >{{ item.cancelled ? 'Cancelled' : 'Approved' }}
        </v-chip>
      </template>
      <template v-slot:item.action="{ item }">
        <v-menu right bottom transition="slide-x-transition">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item 
              v-for="(opt, i) in options" 
              :key="i"
              @click="actionMethods(opt.title, item._id)">
              <v-list-item-title>{{ opt.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:item.date="{ item }">
        <span>{{ item.date | dateToWords }}</span>
      </template>
      <template v-slot:item.startTime="{ item }">
        <span>{{ item.startTime | localTime }} - {{ item.endTime | localTime }}</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import EventService from '@/services/EventService'
import AdminEventService from '@/services/AdminServices/EventService'
import AddEventDialog from '@/components/AdminComponents/AddEventDialog'
import dateToWords from '@/mixins/momentDateToWordsMixin'
import localTime from '@/mixins/momentLocalTimeMixin'

export default {
  name: 'AdminDashboard',
  mixins: [ dateToWords, localTime ],
  components: {
    AddEventDialog
  },
  data () {
    return {
      tableLoading: false,
      search: '',
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Date', value: 'date' },
        { text: 'Time', value: 'startTime' },
        { text: 'Status', value: 'cancelled' },
        { text: 'Actions', value: 'action' }
      ],
      events: [],
      options: [
        { title: 'View Details' },
        { title: 'Cancel Event' },
        { title: 'Remove Event' }
      ]
    }
  },
  methods: {
    initEvents () {
      this.tableLoading = true
      EventService.getEvents()
        .then(res => {
          this.events = res.data
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    actionMethods (dialog, eventId) {
      if (dialog === 'Cancel Event') {
        this.$swal({
          icon: 'warning',
          title: 'Are you sure?',
          text: 'Event will be cancelled! Proceed?',
          confirmButtonText: 'Proceed!',
          showCancelButton: true
        })
          .then(result => {
            if (result.value) {
              AdminEventService.cancelEvent({ eventId: eventId })
                .then(() => {
                  this.$swal({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Event has been cancelled.'
                  })
                  .then(res => {
                    if (res.value) {
                      this.initEvents()
                    }
                  })
                  
                })
            }
          })
      }
      if (dialog === 'Remove Event') {
        this.$swal({
          icon: 'warning',
          title: 'Are you sure?',
          text: 'Event will be removed!! Proceed?',
          confirmButtonText: 'Proceed!',
          confirmButtonColor: '#E53935',
          showCancelButton: true
        })
          .then(res => {
            if (res.value) {
              AdminEventService.removeEvent(eventId)
                .then(() => {
                  this.$swal({
                    icon: 'success',
                    text: 'Event has been removed.'
                  })
                  .then(doc => {
                    if (doc.value) {
                      this.initEvents()
                    }
                  })
                })
            }
          })
      }
    }
  },
  created () {
    this.$store.dispatch('adminAuth/GET_LOGGED_ADMIN')
    this.initEvents()
  }
}
</script>