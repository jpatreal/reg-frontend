import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminRoutes from './admin'
import UserRoutes from './user'

Vue.use(VueRouter)

const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import('../views/Signup')
  }
]

const routes = baseRoutes.concat(AdminRoutes, UserRoutes)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


