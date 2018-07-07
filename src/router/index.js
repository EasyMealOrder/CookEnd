import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login/index.vue'
import Main from '../components/Main/index.vue'
import CookEnd from '../components/Main/CookEnd/cookEnd.vue'
import Order from '../components/Main/Order/order.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/cook/',
  // base: __dirname,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {path: 'cookEnd', name: 'CookEnd', component: CookEnd},
        {path: 'order', name: 'Order', component: Order}
      ]
    }
  ]
})
