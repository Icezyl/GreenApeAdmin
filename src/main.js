import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.css'
import '@/plugins/element.js'
import vuescroll from 'vuescroll/dist/vuescroll-native'
import api from '@/api/api'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(vuescroll)
Vue.prototype.$api = api
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
