export default{
  state: {
    searchcontent: ''
  },
  mutations: {
    saveSearchcontent (state, msg) {
      state.searchcontent = msg
    }
  },
  actions: {
    setSearchcontent ({commit}, msg) {
      commit('saveSearchcontent', msg)
    }
  }
}
