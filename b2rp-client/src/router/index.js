import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Location from '../views/Location.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserDashboard from '../views/UserDashboard.vue'
import Reminder from '../views/Reminder.vue'
import UserSetting from '../views/UserSetting.vue'
import NewsAndPromo from '../views/NewsAndPromo.vue'
import Sales from '../views/Sales.vue'
import VendorSetting from '../views/VendorSetting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/userdashboard',
    name: 'UserDashboard',
    component: UserDashboard
  },
  {
    path: '/reminder',
    name: 'Reminder',
    component: Reminder
  },
  {
    path: '/usersetting',
    name: 'UserSetting',
    component: UserSetting
  },
  {
    path: '/newsandpromo',
    name: 'NewsAndPromo',
    component: NewsAndPromo
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/location',
    name: 'Location',
    component: Location
  },
  {
    path: '/sales',
    name: 'Sales',
    component: Sales
  },
  {
    path: '/vendorsetting',
    name: 'VendorSetting',
    component: VendorSetting
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
