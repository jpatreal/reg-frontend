import AdminEventService from '@/services/AdminServices/EventService'
import EventService from '@/services/EventService'

const state = {
  events: [],
  isFetching: ''
}

const getters = {
  events (state) {
    return state.events
  },
  isFetching (state) {
    return state.isFetching
  }
}

const mutations = {
  SET_EVENTS (state, payload) {
    state.events = state.events + payload
  },
  SET_ISFETCHING (state, payload) {
    state.isFetching = payload
  },
  GET_EVENTS (state, payload) {
    state.events = payload
  }
}

const actions = {
  ADD_EVENT ({ commit }, payload) {
    return new Promise((resolve , reject) => {
      AdminEventService.addEvent({
        title: payload.title,
        venue: payload.venue,
        place: payload.place,
        details: payload.details,
        startDateTime: payload.startDateTime,
        endDateTime: payload.endDateTime
      })
        .then(res => {
          commit('SET_EVENTS', res.data)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  GET_ALL_EVENTS ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_ISFETCHING', true)
      EventService.getEvents()
        .then(res => {
          commit('GET_EVENTS', res.data)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
        .finally(() => {
          commit('SET_ISFETCHING', false)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}