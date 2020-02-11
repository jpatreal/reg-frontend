import Api from '@/services/Api'

export default {
  register (params) {
    return Api().post('/api/users/signup', params)
  },
  login (params) {
    return Api().post('/api/users/login', params)
  }
}