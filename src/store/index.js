import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'

import adminAuth from './modules/admin/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,

    adminAuth
  }
})
