<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="Router" ref="router" id="Router" v-if="isRouterAlive"></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import storage, { VISITORID_KEY } from '@/novelutils/storage'

Vue.prototype.gotop = function () {
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}
Vue.prototype.routerel = function () {
  return document.getElementById('Router')
}
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      transitionName: 'slide-right',
      isRouterAlive: true
    }
  },
  mounted () {
    if (!window.localStorage.getItem(VISITORID_KEY)) {
      window.localStorage.setItem(VISITORID_KEY, storage.generateUUID())
    }
    // document.addEventListener('touchmove', function (e) { e.preventDefault() }, false)
  },
  beforeCreate () {
    window.addEventListener('popstate', function () {
      this.transitionName = 'slide-right'
    }, false)
  },
  watch: {
    '$route' (to, from) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>

<style>
@import "./assets/css/base.css";
@import "./assets/icon/iconfont.css";
@import './assets/css/mint.css';
html,body,#app{
  width: 100%;
  height: 100%;
  background: #f7f7f9;
  max-width: 550px; /* no*/
  margin: auto;
}

.Router {
  position: absolute;
  transition: all .8s ease;
  height: 100%;
  width: 100%;
  max-width: 550px; /* no*/
  padding: 90px 0 129px 0;
  overflow-y: scroll;
  overflow-scrolling: touch;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>
