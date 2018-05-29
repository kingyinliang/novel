<template>
    <div>
      <heads :tit="'书库'"></heads>
      <div class="classifyMain">
        <div v-for="(item1,index) in classify" :key="index">
          <div class="classify" v-for="(item2,index) in item1.clazz" :key="index">
            <div class="tit">
              <i></i>
              <router-link tag="span" to="/booklist" @click.native="$store.commit('saveClassifyid', {id:item2.class_code, name: item2.name})">{{item2.name}}</router-link>
            </div>
            <div class="clearfix classifyTwo">
              <router-link tag="a" to="/booklist" @click.native="$store.commit('saveClassifyid', {id:items.class_code, name: items.name})" :class="{active: active== items.class_code }" v-for="(items,indexs) in item2.clazz" :key="indexs">{{items.name}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import { Indicator } from 'mint-ui'

export default {
  name: 'bookhome',
  data () {
    return {
      active: 41,
      classify: []
    }
  },
  mounted () {
    Indicator.open()
    httoProxy(`${HOME_API.CLASSIFY_API}`, 'GET').then(res => {
      Indicator.close()
      this.classify = res.data
      this.active = this.classify[0].clazz[0].clazz[0].class_code
    })
  },
  components: {
    Heads: resolve => {
      require(['@/components/head'], resolve)
    }
  }
}
</script>

<style lang="less" scoped>
  .classifyMain{
    margin-top: 20px;
    padding: 54px 0;
    background: white;
    .tit{
      i{
        float: left;
        width: 14px;
        height: 36px;
        background-image: linear-gradient(0deg,
        #ff3853 0%,
        #ff5872 100%);
      }
      span{
        font-size: 36px;
        line-height: 36px;
        margin-left: 25px;
        letter-spacing: 1px;
        color: #2b1f1f;
      }
    }
    .classifyTwo{
      padding: 15px 34px;
      .active{
        color: #ff415c;
        background-color: #ffe8eb;
        border-radius: 10px;
        border: solid 2px #ff415c;
      }
      a{
        float: left;
        height: 67px;
        line-height: 67px;
        margin: 7px 4px;
        font-size: 24px ;
        padding: 0 30px;
        color: #666666;
        line-height: 67px;
        border-radius: 10px;
        border: solid 2px #efefef;
      }
    }
  }

</style>
