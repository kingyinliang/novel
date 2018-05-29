<template>
    <div>
      <heads :tit="'选择章节'" :rigister="'全选'" :checkall="checkall"></heads>
      <div class="catalog">
        <ul>
          <li class="clearfix" v-for="(item,index) in catalogs" :key="index" @click="setactive(item.catalog_code,index)">
            <p class="item" :class="{'active':selected.indexOf(item.catalog_code)!==-1}">
              <i class="iconfont" :class="{'novel-select':selected.indexOf(item.catalog_code)!==-1,'novel-selectno':selected.indexOf(item.catalog_code) ==-1}"></i>
              <span>第{{item.catalog_num}}章：{{item.title}}</span>
            </p>
            <span class="goldnum">{{index}} 有狐币</span>
          </li>
        </ul>
      </div>
      <footer>
        <div class="cataview">
          <p class="tit">已选{{selected.length}}章/共{{totalprices}}有狐币</p>
          <p class="tit2">余额：<i>500有狐币</i></p>
        </div>
        <a class="btn">订 阅</a>
      </footer>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
export default {
  name: 'subscriptionCata',
  data () {
    return {
      pageNo: 1,
      catalogs: [],
      totalCount: 20,
      selected: [],
      noselected: [],
      totalprices: 0
    }
  },
  mounted () {
    this.getcatalog()
  },
  methods: {
    getcatalog () {
      httoProxy(`${HOME_API.BOOKCATALOGS_API}`, 'GET', {
        book_serial_num: this.detailid,
        pageNo: this.pageNo,
        pageSize: 20,
        sortType: 1
      }).then(res => {
        this.catalogs = this.catalogs.concat(res.data.catalogs)
        this.totalCount = res.data.totalCount
      })
    },
    checkall () {},
    setactive (item, index) {
      if (this.selected.indexOf(item) !== -1) {
        this.selected.splice(this.selected.indexOf(item), 1)
        this.totalprices -= index
      } else {
        this.selected.push(item)
        this.totalprices += index
      }
    }
  },
  components: {
    Heads: resolve => {
      require(['@/components/head'], resolve)
    }
  },
  computed: {
    ...mapState({
      detailid: state => state.detail.detailid
    })
  }
}
</script>

<style lang="less" scoped>
.catalog{
  width: 100%;
  li{
    border-bottom: 1px solid #eeeeee;
    background: white;
    line-height: 103px;
    padding: 0 36px;
    .goldnum{
      color: #959494;
      font-size: 24px;
      float: right;
    }
    .item{
      width: 540px;
      font-size: 24px;
      float: left;
      color: #333333;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      i{
        font-size: 35px;
        float: left;
        margin-right: 27px;
      }
    }
    .active{
      color: #fc445f;
    }
  }
}
footer{
  width: 750px;
  height: 140px;
  padding: 30px 36px;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0px 1px 19px 1px
  rgba(214, 221, 237, 0.45);
  position: fixed;
  bottom: 0;
  .btn{
    float: right;
    width: 250px;
    height: 80px;
    text-align: center;
    background-color: #fc445f;
    border-radius: 6px;
    font-size: 30px;
    color: #fffefe;
    line-height: 80px;
  }
  .cataview{
    float: left;
    width: 400px;
    .tit{
      font-size: 30px;
      line-height: 30px;
      color: #333333;
      margin-bottom: 20px;
    }
    .tit2{
      font-size: 20px;
      line-height: 20px;
      color: #999999;
      i{
        color: #fc405c;
      }
    }
  }
}
</style>
