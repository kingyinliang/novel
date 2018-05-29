export default{
  state: {
    loginToken: ''
  },
  mutations: {
    saveToken (state, msg) {
      state.loginToken = msg
    }
  },
  actions: {
    setSaveToken ({commit}, msg) {
      commit('saveToken', msg)
    }
  }
}	
