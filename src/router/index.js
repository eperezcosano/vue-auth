import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'test',
        component: Dashboard,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  const authRequired = to.matched.some(record => record.meta.requiresAuth)
  if (!authRequired) {
    return next()
  }
  if (!store.getters['auth/isLogged']) {
    return next('/')
  }
  return store.dispatch('auth/validate')
      .then(() => { return next() })
      .catch(() => { return next('/')})

})

export default router
