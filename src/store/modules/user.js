import UserService from '@/services/UserService'
import axios from 'axios'
import VueCookie from 'vue-cookie'

const state = {
  user: {},
  isFetching: ''
}

const getters = {
  user (state) {
    return state.user
  },
  isFetching (state) {
    return state.isFetching
  },
  userEvents (state) {
    return state.user.events
  }
}

const mutations = {
  SET_FETCHING (state, payload) {
    state.isFetching = payload
  },
  SET_LOGGED_USER (state, payload) {
    state.user = payload.user
  },
  SET_USER_EVENTS (state, payload) {
    state.user.events = state.user.events + payload.eventId
    
  },
  REMOVE_USER_EVENT (state, payload) {
    let events = [state.user.events]
    events - payload.eventId
  },
  DELETE_USER_STATE (state) {
    state.user = {}
  }
  
}

const actions = {
  SET_LOGGED_USER ({ commit }) {
    axios.defaults.headers.common['Authorization'] = VueCookie.get('user_token')
    return new Promise((resolve, reject) => {
      commit('SET_FETCHING', true)
      UserService.getLoggedInUser()
        .then(res => {
          commit('SET_LOGGED_USER', res.data)
          VueCookie.set('userId', res.data.user._id)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
        .finally(() => {
          commit('SET_FETCHING', false)
        })
    })
  },
  SET_USER ({ commit }, payload) {
    commit('SET_LOGGED_USER', payload)
  },
  ADD_EVENT_USER ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      UserService.registerEvent({
        eventId: payload.eventId
      })
        .then(res => {
          commit('SET_USER_EVENTS', payload)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  REMOVE_EVENT_USER ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      UserService.unRegisterEvent({
        eventId: payload.eventId
      })
        .then(res => {
          commit('REMOVE_USER_EVENT', payload)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })  
  },
  DELETE_USER_STATE ({ commit }) {
    commit('DELETE_USER_STATE')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}