import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem('token')) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
  if (to.path !== '/') {
    if (!localStorage.getItem('token')) {
      next({ name: 'login' })
    } else {
      next()
    }
  }
  next()
})

export default router
