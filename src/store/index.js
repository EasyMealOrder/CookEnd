import Vue from 'vue'
import Vuex from 'vuex'
import cook from './modules/cook'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    cook
  },
  strict: debug
})
