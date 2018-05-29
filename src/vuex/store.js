import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Classify from '@/vuex/classify'
import Detail from '@/vuex/detail'
import comment from '@/vuex/comment'
import catalogcode from '@/vuex/catalogCode'
import search from '@/vuex/searchcontent'
import fontsizevuex from '@/vuex/fontsize'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  modules: {
    classify: Classify,
    detail: Detail,
    comment: comment,
    catalogcode: catalogcode,
    search: search,
    fontsizevuex: fontsizevuex
  },
  plugins: [vuexLocal.plugin]
})

export default store
