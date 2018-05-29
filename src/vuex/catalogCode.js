export default{
  state: {
    catalogcode: 0
  },
  mutations: {
    saveCatalogcode (state, msg) {
      state.catalogcode = msg
    }
  },
  actions: {
    setCatalogcode ({commit}, msg) {
      commit('saveCatalogcode', msg)
    }
  }
}
