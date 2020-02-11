<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
          <p class="text-center headline font-weight-medium pa-2">Admin Login</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-card>
          <v-container>
            <v-form ref="form" @submit.prevent="login">
              <v-col class="pa-0">
                <v-text-field outlined label="Username" v-model="admin.userName"></v-text-field>
              </v-col>
              <v-col class="pa-0">
                <v-text-field 
                  outlined 
                  label="Password" 
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'visibility_off' : 'visibility'" 
                  :loading="isLoading"
                  v-model="admin.password"
                  @click:append="showPassword = !showPassword">
                </v-text-field>
              </v-col>
              <v-card-actions>
                <v-btn block outlined color="primary" type="submit">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AdminLogin',
  data () {
    return {
      showPassword: false,
      isLoading: false,
      admin: {}
    }
  },
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.$store.dispatch('adminAuth/ADMIN_LOGIN', this.admin)
          .then(() => {
            this.$router.push('/XWCHQDMYC9WN2C')
          })
          .catch((error) => {
            this.$swal({
              icon: 'error',
              text: error.response ? error.response.data : '',
              showConfirmButton: false,
              showCloseButton: true
            })
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    }
  }
}
</script>