<template>
  <div :style="{'overflow-y': popupVisible? 'hidden':'scroll'}" id="container">
    <heads :tit="classifyname"></heads>
    <div class="tab clearfix">
      <div class="filtrate" @click="bookfiltrate">
        <i class="iconfont novel-sift"></i>
        <span>筛选</span>
      </div>
      <div class="tabs">
        <a :class="{active: tabanum == index}" v-for="(item,index) in taba" :key="item" @click="change(index)">
          <span>{{ item }}</span>
          <i></i>
        </a>
      </div>
    </div>
    <div class="bookList">
      <mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="">
        <li class="clearfix" v-for="(item, index) in book" :key="index">
          <router-link tag="a" :to="{path:'/bookdetail',query: {datailid: item.book_serial_num}}" @click.native="$store.commit('saveDetailid', item.book_serial_num)">
            <a  v-if="item.cover_img!=null">
              <img :src="item.cover_img" alt="小说封面" v-if="item.cover_img!=null" v-lazy="item.cover_img" v-lazy.container="item.cover_img">
            </a>
            <img src="@/assets/img/listimg.jpg" alt="小说封面" v-if="item.cover_img==null">
            <div class="text">
              <p class="tit">{{ item.main_title }}</p>
              <p class="txt">{{ item.summary.length>40? item.summary.slice(0, 40)+'...':item.summary }}</p>
              <p class="plable clearfix">
                <i>{{ item.author_name }}</i>
                <i>{{ item.total_words | tofixed }}万字</i>
                <span>{{item.class_Name}}</span>
                <span style="margin: 0">{{ item.book_status==0? '连载中':'已完结' }}</span>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
      </mt-loadmore>
    </div>
    <div class="mask" v-show="popupVisible" @click="close"></div>
    <transition :name="popupVisible? 'filtrate-left':'filtrate-right'">
      <div class="bookfiltrate" v-show="popupVisible">
        <div class="shadeMain">
          <p class="shadeTit">筛选</p>
          <p class="txt">作品字数</p>
          <div class="optionBox clearfix">
            <span :class="{active:bookfilters.words_type_num==index}" v-for="(item,index) in bookfilters.words_type" :key="index" @click="chagefile1(index)">{{ item }}</span>
          </div>
          <p class="txt">收费状态</p>
          <div class="optionBox clearfix">
            <span :class="{active:bookfilters.charge_type_num==index}" v-for="(item,index) in bookfilters.charge_type" :key="index" @click="chagefile2(index)">{{ item }}</span>
          </div>
          <p class="txt">作品状态</p>
          <div class="optionBox clearfix">
            <span :class="{active:bookfilters.book_status_num==index}" v-for="(item,index) in bookfilters.book_status" :key="index" @click="chagefile3(index)">{{ item }}</span>
          </div>
          <p class="txt">更新状态</p>
          <div class="optionBox clearfix">
            <span :class="{active:bookfilters.update_type_num==index}" v-for="(item,index) in bookfilters.update_type" :key="index" @click="chagefile4(index)">{{ item }}</span>
          </div>
        </div>
        <div class="filtratebtn">
          <a @click="resetfiltra">重 置</a>
          <a class="truego" @click="updateList">完 成</a>
        </div>
      </div>
    </transition>
    <gotop :gotopswith="true"></gotop>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import {Toast, Indicator, Lazyload} from 'mint-ui'
export default {
  name: 'booksList',
  data () {
    return {
      allLoaded: false,
      pageNo: 1,
      totalCount: 1,
      popupVisible: false,
      taba: ['人气', '收藏', '推荐', '字数', '时间'],
      tabanum: 0,
      book: [],
      bookfilters: {
        words_type_num: 'no',
        charge_type_num: 'no',
        book_status_num: 'no',
        update_type_num: 'no',
        words_type: ['30万以下', '30~50万', '50~100万', '100~200万', '200万以上'],
        charge_type: ['免费', '限免', 'VIP'],
        book_status: ['连载中', '已完结'],
        update_type: ['三天内', '七天内', '半月内', '一月内']
      }
    }
  },
  mounted () {
    document.getElementById('Router').scrollTop = 0
  },
  computed: {
    ...mapState({
      classifyname: state => state.classify.classifyname,
      classifyid: state => state.classify.classifyid
    })
  },
  components: {
    Heads: resolve => {
      require(['@/components/head'], resolve)
    },
    Gotop: resolve => {
      require(['@/components/gotop'], resolve)
    }
  },
  filters: {
    tofixed: function (value) {
      value = value / 10000
      return value.toFixed(1)
    }
  },
  methods: {
    getbooklist () {
      httoProxy(`${HOME_API.BOOKSLIST_API}`, 'POST', {
        class_code: this.classifyid,
        pageNo: 1,
        pageSize: 10,
        sort_type: this.tabanum + 1
      }).then(res => {
        Indicator.close()
        this.book = res.data.books
        this.totalCount = res.data.totalCount
      })
    },
    change (index) {
      Indicator.open()
      this.tabanum = index
      this.pageNo = 1
      this.getbooklist()
    },
    chagefile1 (index) {
      this.bookfilters.words_type_num = index
    },
    chagefile2 (index) {
      this.bookfilters.charge_type_num = index
    },
    chagefile3 (index) {
      this.bookfilters.book_status_num = index
    },
    chagefile4 (index) {
      this.bookfilters.update_type_num = index
    },
    resetfiltra () {
      this.bookfilters.words_type_num = 'no'
      this.bookfilters.charge_type_num = 'no'
      this.bookfilters.book_status_num = 'no'
      this.bookfilters.update_type_num = 'no'
    },
    setobjdata () {
      let objdata = {}
      objdata.class_code = this.classifyid
      objdata.pageNo = this.pageNo
      objdata.pageSize = 10
      objdata.sort_type = this.tabanum + 1
      if (this.bookfilters.words_type_num !== 'no') {
        objdata.words_type = this.bookfilters.words_type_num + 1
      }
      if (this.bookfilters.charge_type_num !== 'no') {
        objdata.charge_type = this.bookfilters.charge_type_num
      }
      if (this.bookfilters.book_status_num !== 'no') {
        objdata.book_status = this.bookfilters.book_status_num
      }
      if (this.bookfilters.update_type_num !== 'no') {
        objdata.update_type = this.bookfilters.update_type_num
      }
      return objdata
    },
    updateList () {
      this.pageNo = 1
      this.popupVisible = false
      Indicator.open()
      httoProxy(`${HOME_API.BOOKSLIST_API}`, 'POST', this.setobjdata()).then(res => {
        Indicator.close()
        this.gotop()
        this.book = res.data.books
        this.totalCount = res.data.totalCount
      })
    },
    loadMore () {
      if (this.pageNo > Math.ceil(this.totalCount / 10)) {
        this.allLoaded = true
        Toast({message: '暂无更多图书', duration: 1000})
        this.$refs.loadmore.onBottomLoaded()
        return false
      } else {
        httoProxy(`${HOME_API.BOOKSLIST_API}`, 'POST', this.setobjdata()).then(res => {
          this.book = this.book.concat(res.data.books)
          this.totalCount = res.data.totalCount
          this.$refs.loadmore.onBottomLoaded()
        })
      }
      this.pageNo++
    },
    bookfiltrate () {
      this.popupVisible = true
    },
    close () {
      this.popupVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.Router{
  height: 100%;
  padding-bottom: 0;
  padding-top: 200px;
}
.tab{
  position: fixed;
  top: 90px;
  z-index: 999;
  background: white;
  height: 96px;
  width: 100%;
  max-width: 550px;/*no*/
  padding: 0 38px;
  box-shadow: 0px 1px 19.74px 1.26px rgba(213, 221, 238, 0.45);
  .tabs{
    width: 520px;
    display: flex;
  }
  a{
    flex: 1;
    position: relative;
    float: left;
    font-size: 28px;
    line-height: 96px;
    color: #999999;
    text-align: center;
    i{
      display: block;
      width: 25px;
      height: 4px;
      border-radius: 2px;
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -12.5px;
    }
  }
  .active{
    color: #ff415c;
    i{
      background-color: #ff415c;
    }
  }
  .filtrate{
    width: 155px;
    height: 96px;
    position: absolute;
    right: 0;
    color: #646464;
    font-size: 28px;
    z-index: 99;
    line-height: 96px;
    background: white;
    box-shadow: -1px 0px 19.74px 1.26px rgba(213, 221, 238, 0.86);
    i{
      margin:0 8px 0 28px;
      font-size: 28px;
    }
  }
}
.bookList{
  padding-top: 80px;
  background: white;
  width: 100%;
  background: white;
  ul{
    padding: 0 38px;
  }
  li{
    list-style: none;
    padding: 44px 0;
    border-bottom: solid 1px #eeeeee ;
    img{
      width: 134px;
      height: 182px;
      float: left;
      box-shadow: 0px 2px 7.76px 0.24px rgba(181, 181, 181, 0.63);
    }
    .text{
      float: left;
      margin-left: 46px;
      max-width: 483px;
      width: 483px;
      .tit{
        font-size: 30px;
        color: #333333;
        margin-bottom: 18px;
      }
      .txt{
        font-size: 22px;
        line-height: 33px;
        color: #999999;
        margin-bottom: 22px;
      }
      .plable{
        height: 43px;
        line-height: 43px;
        i{
          font-size: 22px;
          color: #666666;
          margin-right: 15px;
        }
        span{
          color: #666666;
          background-color: #f7f7f9;
          border-radius: 6px;
          float: right;
          padding: 0 16px;
          margin-left: 22px;
        }
      }
    }
  }
}
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
  width: 689px;
  height: 100%;
  background: white;
  top: 0;
  left: 50%;
  margin-left: -314px;
  z-index: 9999;
  .shadeMain{
    height: 100%;
    overflow-y: scroll;
    padding: 35px 0px 98px 48px;
    .shadeTit{
      font-family: PingFangSC-Medium;
      font-size: 36px;
      letter-spacing: 1px;
      color: #333333;
      margin-bottom: 40px;
    }
    .txt{
      background: white;
      width: 120px;
      font-size: 24px;
      line-height: 24px;
      color: #333333;
      margin-bottom: -12px;
      position: relative;
      z-index: 99;
    }
    .optionBox{
      padding: 48px 0;
      border-top: 1px solid #eeeeee;
      span{
        cursor: pointer;
        float: left;
        width: 163px;
        text-align: center;
        color: #666666;
        font-size: 23px;
        height: 67px;
        margin-right: 36px;
        margin-bottom: 16px;
        line-height: 67px;
        border-radius: 10px;
        border: solid 2px #efefef;
      }
      .active{
        border: solid 2px #ff415c;
        background-color: #ffe8eb;
        color: #ff415c;
      }
    }
  }
  .filtratebtn{
    position: absolute;
    bottom: 0;
    z-index: 999;
    left: 0;
    display: flex;
    text-align: center;
    width: 100%;
    cursor: pointer;
    height: 98px;
    background-color: #ffffff;
    box-shadow: 0px 1px 19px 1px
    rgba(222, 223, 224, 0.45);
    a{
      flex: 1;
      line-height: 98px;
      float: left;
      font-size: 30px;
      color: #666666;
    }
    .truego{
      background-image: linear-gradient(9deg,
      #ff3954 1%,
      #ff5872 100%);
      color: white;
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
