// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'lib-flexible/flexible'
import Mint, { InfiniteScroll, Loadmore } from 'mint-ui'
import Vuex from 'vuex'
import store from './vuex/store'

Vue.use(Mint)
Vue.use(InfiniteScroll)
Vue.component(Loadmore.name, Loadmore)
Vue.use(VueAwesomeSwiper)
Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
