<template>
  <div class="topparent">
    <div class="gotop" v-if="showtop && !gotopswith" @click="gotop">
      <i class="iconfont novel-up"></i>
    </div>
    <div class="gotop" v-if="showtop && gotopswith" @click="gotop2">
      <i class="iconfont novel-up"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gotop',
  data () {
    return {
      showtop: false
    }
  },
  props: {
    gotopswith: {}
  },
  mounted () {
    // console.log(this.$parent.$parent.$refs.router.scrollTop)
    // this.$parent.$parent.$refs.router.addEventListener('scroll', this.gotop)
    if (this.gotopswith) {
      this.routerel().addEventListener('scroll', this.eventlistenrouter2)
    } else {
      window.addEventListener('scroll', this.eventlistenrouter)
    }
  },
  methods: {
    gotop2 () {
      document.getElementById('Router').scrollTop = 0
    },
    eventlistenrouter () {
      // let tpScrollTop = this.routerel().scrollTop
      let tpScrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (tpScrollTop > 100) {
        this.showtop = true
      } else {
        this.showtop = false
      }
    },
    eventlistenrouter2 () {
      let tpScrollTop = this.routerel().scrollTop
      if (tpScrollTop > 100) {
        this.showtop = true
      } else {
        this.showtop = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.topparent{
  position: absolute;
  right: 100px;
}
.gotop{
  cursor: pointer;
  position: fixed;
  bottom: 200px;
  width: 90px;
  z-index: 9999999;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0px 1px 19px 1px
  rgba(214, 221, 237, 0.45);
  text-align: center;
  i{
    color: #aab6ce;
    font-size: 44px;
    line-height: 90px;
    text-align: center;
  }
}
</style>
