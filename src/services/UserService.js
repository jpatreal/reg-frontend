import Api from '@/services/Api'

export default {
  getLoggedInUser (params) {
    return Api().get('/api/users/me', params)
  },
  registerEvent (params) {
    return Api().patch('/api/users/register-event', params)
  },
  myEvents () {
    return Api().get('/api/users/my-events')
  }
}