<template>
  <div>
    <header>
      <i class="iconfont novel-back goback" @click="()=>{this.$router.goBack()}"></i>
      <p class="tit">{{tit}}</p>
      <p class="headIcon" v-if="!rigister && !rechright && !wechat">
         <router-link tag="a" to="/search" @click.native="$store.commit('saveSearchcontent', '')"><i class="iconfont novel-search"></i></router-link>
        <a @click="showtoplist"><i class="iconfont novel-tab"></i></a>
      </p>
      <p class="headIcon" v-if="rigister">
        <router-link tag="a" class="toRigister" to="/register" v-if="rigister=='注册'">{{rigister}}</router-link>
        <a v-if="rigister=='全选'" @click="checkall">{{rigister}}</a>
      </p>
      <p class="headIcon" v-if="rechright">
        <router-link tag="a" class="toRigister" to="/record">{{rechright}}</router-link>
      </p>

    </header>
    <toplist :popupVisible="toplist" :clickfn="close"></toplist>
  </div>
</template>

<script>
export default {
  name: 'heads',
  data () {
    return {
      toplist: false
    }
  },
  props: {
    tit: {},
    rigister: {},
    rechright: {},
    wechat:{},
    checkall:{}
  },
  methods: {
    showtoplist () {
      if (this.toplist === true) {
        this.toplist = false
      } else {
        this.toplist = true
      }
    },
    close () {
      this.toplist = false
    }
  },
  components: {
    Toplist: resolve => {
      require(['@/components/topList'], resolve)
    }
  }
}
</script>

<style lang="less" scoped>
header{
  box-shadow: 0px 1px 19.74px 1.26px rgba(213, 221, 238, 0.45);
  z-index: 999;
  max-width: 550px;/*no*/
  width: 100%;
  height: 90px;
  padding: 0 33px;
  box-sizing: border-box;
  background: white;
  position: fixed;
  top: 0;
  line-height: 90px;
  z-index: 1010;
  .goback{
    position: absolute;
    left: 38px;
    z-index: 999;
    color: #080808;
  }
  .tit{
    position: relative;
    font-family: PingFangSC-Medium;
    font-size: 36px;
    line-height: 90px;
    color: #080808;
    text-align: center;
  }
  i{
    font-size: 40px;
    cursor: pointer;
  }
  .headIcon{
    text-align: right;
    position: absolute;
    right: 38px;
    top: 0px;
    a{
      margin-left: 30px;
      color: #626262;
      font-size: 30px;
    }
    .toRigister{
      font-size: 30px;
    }
  }
}
</style>
