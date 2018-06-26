// import service from '../../api/unitedInterface'

const state = {
  timeout: '',
  username: '',
  orderlength: 0
}

const getters = {
  getUserName: state => state.username,
  getOrderLength: state => state.orderlength
}

const actions = {
  setCookMessage ({commit}, name) {
    commit('setUserMessage', name)
  },
  setOrderLength ({commit}, len) {
    commit('setStateOrderLength', len)
  }
}

const mutations = {
  setUserMessage (state, name) {
    state.username = name
    console.log('set user message')
  },
  setStateOrderLength (state, len) {
    state.orderlength = len
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
