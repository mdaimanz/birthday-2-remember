import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import {loadStripe} from '@stripe/stripe-js'
import store from '@/store/store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

sync(store, router)

new Vue({
  router,
  vuetify,
  store,
  loadStripe,
  render: h => h(App)
}).$mount('#app')
