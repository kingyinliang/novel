<template>
  <div class="inform">
    <div class="informText clearfix">
      <a href='javascript:;' class='inputText'>
        <p>
          <i class='iconfont  novel-search'></i>
          <span>{{title}}</span>
        </p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'searchName',
  data () {
    return {
    }
  },
  props: {
    title:{}
  }
}
</script>

<style lang="less" scoped>
  .inform{
    background: white;
    padding: 28px 0;
    .inputText{
      margin: 0 0.51rem;
      height: 1.067rem;
      line-height: 1.067rem;
      background-color: #f7f7f9;
      border-radius: 0.08rem;
      border:none;
      width: 9rem;
      display:block;
      font-size: 0.32rem;
      color: #4b4b4d;
      text-align:center;
      p{
        width: auto;
        margin: auto;
        position: relative;
        span{
          margin-left: 0.453rem;
        }
      }
      i{
        width: 0.453rem;
        height: 0.453rem;
        position: absolute;
        top: 2px;
      }
    }
  }
</style>
