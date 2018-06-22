import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login/index.vue'
import CookEnd from '../components/cookEnd/cookEnd.vue'

Vue.use(Router)

export default new Router({mode: 'history',
  base: __dirname,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/cookEnd',
      name: 'cookEndPage',
      component: CookEnd
    }
  ]
})
