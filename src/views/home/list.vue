<template>
  <div class="pagesList">
    <ul class="clearfix">
      <p>{{tabname}}</p>
      <li v-for="(item,index) in list" v-bind:key="item"><a><img src="../../assets/logo.png" alt=""><p>{{item}}{{index}}</p></a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      data: '',
      list: [],
      list1: ['sdasd', 'tadasdl11', 'talfffasd12', 'talqww13', 'teqwewal14', 'tal15'],
      list2: ['tal2', 'tal2', 'tal2', 'tal2', 'tal2', 'tal2'],
      list3: ['tal3', 'tal3', 'tal3', 'tal3', 'tal3', 'tal3']
    }
  },
  created () {
    this.$on('tab', (msg) => {
      this.list = msg
    })
  },
  props: {
    tabname: {}
  }
}
</script>

<style lang="less" scoped>
  .pagesList{
    ul{
      padding: 0 6px;
    }
    li{
      margin: 33px 27px;
      float: left;
      width: 188px;
      list-style: none;
    img {
      width: 100%;
      height: 251px;
    }
    p{
      font-size: 21px;
      line-height: 28px;
      color: #666666;
    }
    }
  }
</style>
