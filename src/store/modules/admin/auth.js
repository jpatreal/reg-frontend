import AuthService from '@/services/AdminServices/AuthService'
import axios from 'axios'
import VueCookie from 'vue-cookie'

const state = {
  token: VueCookie.get('admin_token') || null,
  admin: '',
  loggedIn: false
}

const getters = {
  admin (state) {
    return state.admin
  }
}

const mutations = {
  SET_ADMIN (state, payload) {
    state.token = payload.token,
    state.admin = payload.admin,
    state.loggedIn = true
  },
  SET_LOGGED_ADMIN (state, payload) {
    state.admin = payload
    state.loggedIn = true
  },
  DELETE_TOKEN (state, payload) {
    state.token = null,
    state.admin = '',
    state.loggedIn = false,
    VueCookie.delete('admin_token')
    localStorage.removeItem('isAdmin')
  }
}

const actions = {
  ADMIN_LOGIN ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      AuthService.adminLogin({
        userName: payload.userName,
        password: payload.password
      })
        .then(res => {
          commit('SET_ADMIN', res.data)
          VueCookie.set('admin_token', res.data.token)
          localStorage.setItem('isAdmin', res.data.admin.isAdmin)
          axios.defaults.headers.common['Authorization'] = res.data.token
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  GET_LOGGED_ADMIN ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = VueCookie.get('admin_token')
      AuthService.getLoggedAdmin()
        .then(res => {
          commit('SET_LOGGED_ADMIN', res.data.admin)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  ADMIN_LOGOUT ({ commit }) {
    try {
      VueCookie.delete('admin_token')
      commit('DELETE_TOKEN')
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}