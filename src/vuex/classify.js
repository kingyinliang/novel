export default{
  state: {
    classifyid: 0,
    classifyname: ''
  },
  mutations: {
    saveClassifyid (state, msg) {
      state.classifyid = msg.id
      state.classifyname = msg.name
    }
  },
  actions: {
    setClassifyid ({commit}, msg) {
      commit('saveClassifyid', msg)
    }
  }
}
