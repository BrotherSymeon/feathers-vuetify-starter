import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Boards from '../views/Boards.vue'

import store from '../store'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      console.log(store)
      store.dispatch('auth/authenticate')
        .then(user => {
          console.log('user ', user)
          next('/boards')
        }).catch(() => {
          next('/login')
        })
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/boards',
    name: 'Boards',
    component: Boards,
    beforeEnter(to, from, next) {
      store.dispatch('auth/authenticate')
        .then(() => {
          next()
        }).catch(() => {
          next('/login')
        })
    }

  }
]

const router = new VueRouter({
  routes
})

export default router
