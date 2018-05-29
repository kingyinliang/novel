export default{
  state: {
    fontsizevuex: 16,
    backgroundvuex: '#f3f3f3',
    fontcolorvuex: '#322f24'
  },
  mutations: {
    saveFontsizevuex (state, msg) {
      state.fontsizevuex = msg
    },
    saveBackgroundvuex (state, msg) {
      state.backgroundvuex = msg
    },
    saveFontcolorvuex (state, msg) {
      state.fontcolorvuex = msg
    }
  },
  actions: {
    setFontsizevuex ({commit}, msg) {
      commit('saveFontsizevuex', msg)
    },
    setBackgroundvuex ({commit}, msg) {
      commit('saveBackgroundvuex', msg)
    },
    setFontcolorvuex ({commit}, msg) {
      commit('saveFontcolorvuex', msg)
    }
  }
}
