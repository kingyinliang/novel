<template>
  <div class="pagesTab">
    <a :class="{active:selected==index}" v-for="(item,index) in tablist" v-bind:key="item.pagestab" @click="change(index,tab)">{{item.pagestab}}</a>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      selected: 0
    }
  },
  props: {
    tablist: {},
    changePost: {},
    tab:{}
  },
  methods: {
    change (index,tabnamesNumber) {
      this.selected = index
      if(tabnamesNumber==1){
        this.changePost(index+2,tabnamesNumber,'',0);
      }else if(tabnamesNumber==2){
        this.changePost(index+5,tabnamesNumber,index+5,1);
      }else if(tabnamesNumber==3){
        this.changePost(index+7,tabnamesNumber,'',1);
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .pagesTab{
    width: 674px;
    height: 78px;
    border-radius: 10px;
    border: solid 2px #fe546e;
    display: flex;
    margin: 0 33px;
    a{
      border-left: 1px solid #fe546e;
      border-right: 1px solid #fe546e;
      flex: 1;
      text-align: center;
      font-size: 28px;
      line-height: 78px;
      color: #999999;

    }
    .active{
      color: white;
      background: #fe546e;
      font-weight: 550;
    }
  }
</style>
