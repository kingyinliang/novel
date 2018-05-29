<template>
    <div>
      <heads :tit="404"></heads>
      <img src="@/assets/img/404.png" alt="">
      <p>暂无网络</p>
      <a @click="relo">刷新页面</a>
    </div>
</template>

<script>
export default {
  name: '404',
  inject: ['reload'],
  methods: {
    relo () {
      this.reload()
    }
  },
  components: {
    Heads: resolve => {
      require(['@/components/head'], resolve)
    }
  }
}
</script>

<style lang="less" scoped>
img{
  width: 223px;
  height: 188px;
  margin: auto;
  display: block;
  margin-top: 250px;
}
p{
  text-align: center;
  font-size: 29px;
  line-height: 49px;
  color: #454f59;
}
a{
  width: 600px;
  margin: auto;
  margin-top: 90px;
  text-align: center;
  height: 90px;
  background-color: #fc405c;
  border-radius: 6px;
  font-size: 29px;
  color: #ffffff;
  line-height: 90px;
  display: block;
}
</style>
