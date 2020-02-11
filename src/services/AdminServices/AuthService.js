import Api from '@/services/Api'

export default {
  adminLogin (params) {
    return Api().post('/api/admin/auth/admin-login', params)
  },
  getLoggedAdmin () {
    return Api().get('api/admin/auth/me')
  }
}