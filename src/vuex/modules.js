export default{
  state: {
    classifyid: 0,
    classifyname: ''
  },
  mutations: {
    saveClassifyid (state, msg1, msg2) {
      state.classifyid = msg1
      state.classifyname = msg2
    }
  },
  actions: {
    setClassifyid ({commit}, msg1, msg2) {
      commit('saveClassifyid', msg1, msg2)
    }
  },
  getters: {
    showState (state) {
      console.log(state.classifyid)
      return state.classifyid
    }
  }
}
