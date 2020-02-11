<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn block dark color="cyan darken-4" v-on="on">+ Create Event</v-btn>
      </template>
      <v-card>
        <v-form ref="form" @submit.prevent="addEvent">
          <v-card-title>
            <span class="headline font-weight-medium">Event details</span>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field outlined label="Event Title" v-model="title"></v-text-field>
              </v-col>
              <v-col cols="4" class="pt-0">
                <v-text-field outlined label="Venue" v-model="venue"></v-text-field>
              </v-col>
              <v-col cols="8" class="pt-0">
                <v-text-field outlined label="Address" v-model="place"></v-text-field>
              </v-col>
              <v-col cols="6" class="pt-0">
                <v-text-field 
                  outlined 
                  type="datetime-local" 
                  label="Start Date/Time" 
                  v-model="startdatetime">
                </v-text-field>
              </v-col>
              <v-col cols="6" class="pt-0">
                <v-text-field 
                  outlined 
                  type="datetime-local" 
                  label="End Date/Time" 
                  v-model="enddatetime">
                </v-text-field>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-textarea outlined label="Details" v-model="details"></v-textarea>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="closeDialog">Close</v-btn>
              <v-btn text color="cyan darken-4" type="submit">Add Event</v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import EventService from '@/services/AdminServices/EventService'

export default {
  name: 'AddEventDialog',
  data () {
    return {
      dialog: false,
      title: '',
      venue: '',
      place: '',
      date: '',
      startdatetime: '',
      enddatetime: '',
      details: ''
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$refs.form.reset()
    },
    addEvent () {
      EventService.addEvent({
        title: this.title,
        venue: this.venue,
        place: this.place,
        date: this.startdatetime,
        startTime: this.startdatetime,
        endTime: this.enddatetime,
        details: this.details,
      })
        .then(() => {
          this.$swal({
            icon: 'success',
            title: 'Success!',
            text: 'Successfully created an event',
            showConfirmButton: true
          })
            .then(result => {
              if (result.value) {
                this.dialog = false
                this.$refs.form.reset()
                this.$router.go()
              }
            })
        })
        .catch((err) => {
          this.$swal({
            icon: error,
            title: 'Something wrong with the server'
          })
        })
    }
  }
}
</script>