import Api from '@/services/Api'

export default {
  addEvent (params) {
    return Api().post('/api/events/', params)
  },
  cancelEvent (params) {
    return Api().patch('/api/events/cancel', params)
  },
  removeEvent (params) {
    return Api().delete(`/api/events/remove/${params}`)
  }
}