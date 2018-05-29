<template>
  <div>
    <transition :name="popupVisible? 'filtrate-bottom':'filtrate-top'">
      <div class="toplist" v-if="popupVisible">
        <router-link to="/home">
          <img src="@/assets/img/tab1.png" alt="">
          <p>书城</p>
        </router-link>
        <router-link :to="url_b">
          <img src="@/assets/img/tab2.png" alt="">
          <p>书架</p>
        </router-link>
        <router-link :to="url_a">
          <img src="@/assets/img/tab5.png" alt="">
          <p>充值</p>
        </router-link>
      </div>
    </transition>
    <div class="mask" v-if="popupVisible" @click="clickfn"></div>
  </div>
</template>

<script>
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
export default {
  name: 'topList',
  data () {
    return {
      url_a: '',
      url_b: ''
    }
  },
  props: {
    popupVisible: {},
    clickfn: {}
  },
  mounted () {
    this.checkToken()
  },
  methods: {
    checkToken () {
      httoProxy(`${HOME_API.VERTOKEN_API}`, 'GET', {}).then(res => {
        if (res.data.code === 0) {
          this.url_a = '/recharge'
          this.url_b = '/bookshelf'
        } else {
          this.url_a = '/login'
          this.url_b = '/login'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.mask{
  width: 100%;
  max-width: 550px;/*no*/
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
  background: rgba(0,0,0,.6);
}
.toplist{
  max-width: 550px;/*no*/
  transition: all .5s ease;
  width: 100%;
  position: fixed;
  top: 90px;
  height: 230px;
  background: white;
  display: flex;
  z-index: 1000;
  padding: 47px;
  a{
    flex: 1;
    text-align: center;
    img{
      width: 119px;
      height: 115px;
    }
    p{
      font-size: 23px;
      line-height: 51px;
      color: #4b4b4d;
    }
  }
}
.filtrate-bottom-enter,
.filtrate-top-leave-active {
  opacity: 0;
  -webkit-transform: translate(0, -100%);
  transform: translate(0, -100%);
}

.filtrate-bottom-leave-active,
.filtrate-top-enter {
  opacity: 0;
  -webkit-transform: translate(0, -100%);
  transform: translate(0, -100%);
}
</style>
