import AuthService from '@/services/AuthService'
import axios from 'axios'
import VueCookie from 'vue-cookie'

const state = {
  token: VueCookie.get('user_token') || null
}

const getters = {
  loggedIn (state) {
    return state.token !== null
  }
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  DELETE_TOKEN (state, token) {
    state.token = null
  }
}

const actions = {
  SET_TOKEN (context, payload) {
    return new Promise((resolve, reject) => {
      AuthService.login({
        email: payload.email,
        password: payload.password
      })
        .then(res => {
          const token = res.data.token
          context.dispatch('user/SET_USER', res.data, { root: true })
          VueCookie.set('user_token', token)
          VueCookie.set('userId', res.data.user._id)
          context.commit('SET_TOKEN', token)
          axios.defaults.headers.common['Authorization'] = VueCookie.get('user_token')
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  DELETE_TOKEN (context) {
    if (context.getters.loggedIn) {
      try {
        VueCookie.delete('user_token')
        VueCookie.delete('userId')
        context.commit('DELETE_TOKEN')
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('Something wrong')
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

