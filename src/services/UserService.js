import Api from '@/services/Api'

export default {
  getLoggedInUser (params) {
    return Api().get('/api/users/me', params)
  },
  myEvents () {
    return Api().get('/api/users/my-events')
  },
  getRegistered (params) {
    return Api().get('/api/users/registered', params)
  },
  registerEvent (params) {
    return Api().patch('/api/users/register-event', params)
  },
  unRegisterEvent (params) {
    return Api().patch('/api/users/unregister-event', params)
  }
}