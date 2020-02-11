<template>
  <div>
    <v-card>
      <v-form ref="form" @submit.prevent="login">
        <v-container>
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-text-field outlined label="Email" v-model="user.email"></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-text-field 
                outlined
                label="Password" 
                v-model="user.password"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword" 
              ></v-text-field>
            </v-col>
          </v-row>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn 
              text 
              block 
              large 
              class="primary pt-0" 
              type="submit"
              :loading="btnLoading"
            >
            Login
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
    <v-layout class="pt-3">
      <v-flex class="text-center">
        <span class="subtitle-1 font-weight-medium">Don't have an account?</span>
        <router-link class="subtitle-1 font-weight-medium mx-2" to="/signup">Sign Up</router-link>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'logincard',
  data () {
    return {
      btnLoading: false,
      showPassword: false,
      user: {}
    }
  },
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        this.btnLoading = true
        this.$store.dispatch('auth/SET_TOKEN', this.user)
          .then(res => {
            this.$router.push('/')
          })
          .catch(err => {
            this.$swal({
              icon: 'error',
              title: 'Invalid Login!',
              showConfirmButton: false,
              showCloseButton: true
            })
          })
          .finally(() => {
            this.btnLoading = false
          })
      }
    },
  }
}
</script>