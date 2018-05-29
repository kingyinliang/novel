export default{
  state: {
    detailid: 0
  },
  mutations: {
    saveDetailid (state, msg) {
      state.detailid = msg
    }
  },
  actions: {
    setDetailid ({commit}, msg) {
      commit('saveDetailid', msg)
    }
  }
}
