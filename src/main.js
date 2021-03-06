import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from '@/store'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
