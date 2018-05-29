<template>
    <div>
      <div class="mask" v-show="popupVisible" @click="sidebar"></div>
      <transition :name="popupVisible? 'filtrate-left':'filtrate-right'">
        <div class="bookfiltrate" v-show="popupVisible">
          <div class="tit">
            <span class="btit">目录</span>
            <span class="total">共{{totalCount}}章</span>
            <a @click="sorttype"><i class="iconfont novel-sort"></i>排序</a>
          </div>
          <ul v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="">
            <!--<router-link tag="a" @click.native="$store.commit('saveCatalogcode', item.catalog_code)" to="/cajviewer">-->
              <li @click="gocajviewer(item.catalog_code)"  v-for="(item,index) in catalogs" :key="index">第{{ item.catalog_num }}章：{{item.title}} <span v-if="item.charge_type == 1"><i class="vip">vip</i></span></li>
            <!--</router-link>-->
          </ul>
        </div>
      </transition>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import {Toast} from 'mint-ui'
export default {
  name: 'sidebar',
  data () {
    return {
      pageNo: 1,
      catalogs: [],
      totalCount: 20,
      sortType: 1
    }
  },
  props: {
    popupVisible: {},
    sidebar: {}
  },
  mounted () {
  },
  methods: {
    gocajviewer (code) {
      // this.$store.dispatch('setSearchcontent', code)
      this.setCatalogcode(code)
      if (window.location.href.indexOf('bookdetail') !== -1) {
        this.$router.push({path: '/cajviewer'})
      } else {
        this.$router.go(0)
      }
    },
    sorttype () {
      if (this.sortType === 1) {
        this.sortType = 2
      } else {
        this.sortType = 1
      }
      this.pageNo = 1
      httoProxy(`${HOME_API.BOOKCATALOGS_API}`, 'GET', {
        book_serial_num: this.detailid,
        pageNo: this.pageNo,
        pageSize: 20,
        sortType: this.sortType
      }).then(res => {
        this.catalogs = res.data.catalogs
        this.totalCount = res.data.totalCount
      })
    },
    getcatalog () {
      httoProxy(`${HOME_API.BOOKCATALOGS_API}`, 'GET', {
        book_serial_num: this.detailid,
        pageNo: this.pageNo,
        pageSize: 20,
        sortType: this.sortType
      }).then(res => {
        this.catalogs = this.catalogs.concat(res.data.catalogs)
        this.totalCount = res.data.totalCount
      })
    },
    loadMore () {
      if (this.pageNo > Math.ceil(this.totalCount / 20)) {
        this.loading = true
        Toast({message: '暂无更多章节', duration: 8000})
        return false
      } else {
        this.getcatalog()
      }
      this.pageNo++
    },
    ...mapActions({
      setCatalogcode: 'setCatalogcode'
    })
  },
  computed: {
    ...mapState({
      detailid: state => state.detail.detailid
    })
  }
}
</script>

<style lang="less" scoped>
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background: rgba(0,0,0,.6);
  }
  .bookfiltrate{
    transition: all .5s ease;
    position: fixed;
    width: 639px;
    height: 100%;
    background: white;
    top: 0;
    left: 50%;
    margin-left: -259px;
    z-index: 9999;
    .tit{
      position: absolute;
      top: 0;
      width: 100%;
      background: white;
      z-index: 99;
      padding: 0 38px 0 51px;
      line-height: 130px;
      border-bottom:1px solid #eeeeee;
      .btit{
        font-size: 36px;
        letter-spacing: 1px;
        color: #333333;
      }
      .total{
        margin-left: 33px;
        font-size: 28px;
        color: #646464;
      }
      a{
        float: right;
        font-size: 28px;
        color: #646464;
      }
    }
    ul{
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      padding-top: 135px;
      position: absolute;
      top: 0;
    }
    li{
      height: 102px;
      line-height: 102px;
      padding-left: 47px;
      width: 100%;
      border-bottom:1px solid #eeeeee;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      color: #333333;
      .vip{
        font-size: 24px;
        color: white;
        background: #fc405c;
        display: inline-block;
        border-radius: 16px;
        width: 50px;
        text-align: center;
        height: 32px;
        line-height: 32px;
      }
    }
  }
  .filtrate-left-enter,
  .filtrate-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  .filtrate-left-leave-active,
  .filtrate-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }
</style>
