<template>
  <div>
    <v-card>
      <v-form ref="form" @submit.prevent="signup">
        <v-container>
          <div>
            <span class="title">Registration Form</span>
          </div>
          <div>
            <span class="caption primary--text">*These credentials will be used when registering event</span>
          </div>
          <v-row>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field outlined label="Email" v-model="user.email"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field 
                outlined
                label="Password"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                v-model="user.password"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pt-0 pb-0">
              <v-text-field outlined label="First Name" v-model="user.firstName"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pt-0 pb-0">
              <v-text-field outlined label="Last Name" v-model="user.lastName"></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" md="7">
              <v-text-field outlined label="Address" v-model="user.address"></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" md="5">
              <v-text-field outlined label="Phone Number" v-model="user.phoneNum"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on" @click="reset">
                <v-icon>replay</v-icon>
              </v-btn>
            </template>
            <span>Reset Form</span>  
          </v-tooltip>
          <v-btn text color="primary" type="submit" :loading="btnLoading">Register</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-layout class="pt-3">
      <v-flex class="text-center">
          <span class="title mx-2 font-weight-medium">Already have an account?</span>
          <router-link class="title" to="/login">Login</router-link>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  name: 'signupcard',
  data () {
    return {
      btnLoading: false,
      showPassword: false,
      user: {}
    }
  },
  methods: {
    signup () {
      if (this.$refs.form.validate()) {
        this.btnLoading = true
        AuthService.register({ user: this.user })
          .then(() => {
            this.$store.dispatch('auth/SET_TOKEN', {
              email: this.user.email,
              password: this.user.password
            })
            .then(() => {
              this.$swal({
                icon: 'success',
                text: 'Successfully created account!',
                title: 'Success!',
                confirmButtonColor: '#5F27CD',
                confirmButtonText: 'Proceed'
              })
                .then((result) => {
                  if (result.value) {
                    this.$router.push('/')
                  }
                })
            })
          })
          .catch(err => {
            this.$swal({
              icon: 'error',
              text: 'Something went wrong'
            })
           .finally(() => {
             this.btnLoading = false
           }) 
          })
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>