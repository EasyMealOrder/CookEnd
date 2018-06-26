// import service from '../../api/unitedInterface'

const state = {
  timeout: '',
  username: ''
}

const getters = {
  getUserName: state => state.username
}

const actions = {
  setCookMessage ({commit}, name) {
    commit('setUserMessage', name)
  }
}

const mutations = {
  setUserMessage (state, name) {
    state.username = name
    console.log('set user message')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
