<template>
  <div>
    <div id="home">
      <header class="clearfix">
        <img src="../../assets/img/logo.png" class="homeLogo" alt="">
        <router-link tag="a" class="tab-iteam bookCity" :to="url_a1"><i class="iconfont novel-my"></i></router-link>
      </header>
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in swiperBanner" :key="index">
        <router-link tag="a" :to="{path:'/bookdetail',query: {datailid: item.book_serial_num}}" @click.native="$store.commit('saveDetailid', item.book_serial_num)"><img v-bind:src="item.img_path" alt=""></router-link>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div style="background: white">
        <router-link tag="a" to="/search" @click.native="$store.commit('saveSearchcontent', searchText)">
          <inform :title='searchText'></inform>
        </router-link>
      </div>
      <div class="pages">
        <div class="tit clearfix"><i></i><span>今日最热</span><a @click="change(1,1)"><b class="iconfont novel-change"></b>换一换</a>
        </div>
        <div class="pagesList">
          <ul class="clearfix">
            <li v-for="(item, index) in todayHottest" :key="index">
              <router-link tag="a"  :to="{path:'/bookdetail',query: {datailid: item.book_serial_num}}" @click.native="$store.commit('saveDetailid', item.book_serial_num)">
                <img :src="item.cover_img" alt="" v-if="item.cover_img!=null">
                <img src="@/assets/img/listimg.jpg" alt="" v-if="item.cover_img==null">
                <p>{{item.main_title.length>15?item.main_title.slice(0,15)+'...':item.main_title}}</p></router-link>
            </li>
          </ul>
        </div>
        <div class="pagesImg">
          <div v-for="(item, index) in specialBanner" :key="index">
          <router-link tag="a"  :to="{path:'/bookdetail',query: {datailid: item.book_serial_num}}" @click.native="$store.commit('saveDetailid', item.book_serial_num)">
          <img v-bind:src="item.img_path" alt=""></router-link></div>
        </div>
        <tab :tablist="pages1" :tab="tabnames(1)" :changePost='changePost'></tab>
        <div class="pagesList">
          <ul class="clearfix">
            <li v-for="(item,index) in list1" :key="index">
              <router-link tag="a"  :to="{path:'/bookdetail',query: {datailid: item.book_serial_num}}" @click.native="$store.commit('saveDetailid', item.book_serial_num)">
                <img :src="item.cover_img" alt="" v-if="item.cover_img!=null">
                <img src="@/assets/img/listimg.jpg" alt="" v-if="item.cover_img==null">
                <p>{{item.main_title.length>15?item.main_title.slice(0,15)+'...':item.main_title}}</p></router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="pages">
        <div class="tit clearfix">
          <i></i><span>今日限免</span>
          <b class='time day'>{{dataTime.day}}</b>:<b class='hour time'>{{dataTime.hour}}</b>:<b class='Minute time'>{{dataTime.Minute}}</b>:<b
          class='second time'>{{dataTime.second}}</b><a @click="change2()"><b
          class="iconfont novel-change"></b>换一换</a>
        </div>
        <div class="pagesList">
          <ul class="clearfix">
            <li v-for="(item, index) in list4" :key="index">
              <router-link tag="a"  :to="{path:'/bookdetail',query: {datailid: item.book_serial_num}}" @click.native="$store.commit('saveDetailid', item.book_serial_num)">
                <img :src="item.cover_img" alt="" v-if="item.cover_img!=null">
                <img src="@/assets/img/listimg.jpg" alt="" v-if="item.cover_img==null">
                <p>{{item.main_title.length>15?item.main_title.slice(0,15)+'...':item.main_title}}</p></router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="pages">
        <tab :tablist="pages2" :tab="tabnames(2)" :changePost='changePost'></tab>
        <div class="pagesList">
          <ul class="clearfix">
            <li v-for="(item,index) in list2" v-if="index<3" :key="index">
              <router-link tag="a"  :to="{path:'/bookdetail',query: {datailid: item.book_serial_num}}" @click.native="$store.commit('saveDetailid', item.book_serial_num)">
                <img :src="item.cover_img" alt="" v-if="item.cover_img!=null">
                <img src="@/assets/img/listimg.jpg" alt="" v-if="item.cover_img==null">
                <p>{{item.main_title.length>15?item.main_title.slice(0,15)+'...':item.main_title}}</p></router-link>
            </li>
          </ul>
        </div>
        <div class='recommend'>
          <li v-for="(item,index) in list2" v-if="index>2 && index<6" :key="index">
            <router-link tag="a"  :to="{path:'/bookdetail',query: {datailid: item.book_serial_num}}" @click.native="$store.commit('saveDetailid', item.book_serial_num)">
            <p class='category'>{{item.class_Name+'&nbsp;&nbsp;&nbsp;&nbsp;|'}}</p>
            <p class='novelNames'>{{item.main_title.length>9?item.main_title.slice(0,9)+'...':item.main_title}}</p>
            <p class='author'>{{item.author_name}}</p>
            <p class='noveState'>{{item.book_status==0?item.book_status='连载中':item.book_status='已完结'}}</p>
            </router-link>
          </li>
        </div>
      </div>
      <div class="pages">
        <div class="tit clearfix" style='margin-bottom:20px;'><i></i><span>轻小说</span>
          <router-link tag="a" to="/booklist" @click.native="$store.commit('saveClassifyid', {id:class_code, name: class_name})">更多<b class="iconfont novel-more" style="float: right;margin-right: 0"></b></router-link>
        </div>
        <tab :tablist="pages3" :tab="tabnames(3)" :changePost='changePost'></tab>
        <div class="pagesList">
          <ul class="clearfix">
            <li v-for="(item,index) in list3" :key="index">
              <router-link tag="a"  :to="{path:'/bookdetail',query: {datailid: item.book_serial_num}}" @click.native="$store.commit('saveDetailid', item.book_serial_num)">
                <img :src="item.cover_img" alt="" v-if="item.cover_img!=null">
                <img src="@/assets/img/listimg.jpg" alt="" v-if="item.cover_img==null">
                <p>{{item.main_title.length>15?item.main_title.slice(0,15)+'...':item.main_title}}</p></router-link>
            </li>
          </ul>
        </div>
      </div>
      <qrcode></qrcode>
      <gotop></gotop>
      <footerpage></footerpage>
    </div>
  </div>
</template>

<script>
import '@/assets/css/swiper.css'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import storage, {AUTHORIZATION_KEY} from '@/novelutils/storage'
import {Toast, Indicator} from 'mint-ui'
export default {
  name: 'home',
  data () {
    return {
      swiperBanner: [],
      specialBanner: [],
      url_a1: '',
      searchText: '',
      todayHottest: [],
      numberTab: 2,
      pages1: [{pagestab: '新书抢先'}, {pagestab: '精品短篇'}, {pagestab: '热门推荐'}],
      list1: [],
      pages2: [{pagestab: '主编力荐'}, {pagestab: '书友最爱'}],
      list2: [],
      pages3: [{pagestab: '宅文'}, {pagestab: '同人'}, {pagestab: '女生'}],
      list3: [],
      list4: [],
      class_code:'',
      class_name:'',
      classify:[],
      dataTime: {day: '00', hour: '00', Minute: '00', second: '00'},
      swiperOption: {
        notNextTick: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        height: 'auto',
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination'
        },
        paginationClickable: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        scrollbar: '.swiper-scrollbar',
        mousewheelControl: true,
        observeParents: true,
        debugger: true
      }

    }
  },
  mounted () {
    if (!this.isWeiXin()) {
      if (storage.getData(AUTHORIZATION_KEY)) {
        httoProxy(`${HOME_API.VERTOKEN_API}`, 'GET', {}).then(res => {
          if (res.data.code !== 0) {
            if (this.$route.query.code) {
              httoProxy(`${HOME_API.WXCODE_API}`, 'GET', {
                code: this.$route.query.code,
                loginPlatform: 2
              }).then(res => {
                if (res.data.code === 0) {
                  storage.setData(AUTHORIZATION_KEY, res.data.token)
                  Toast({message: '登录成功', duration: 1000})
                  this.gethome()
                } else {
                  Toast({message: res.data.msg, duration: 1000})
                  this.gethome()
                }
              })
            } else {
              this.gethome()
            }
          } else {
            this.gethome()
          }
        })
      } else {
        if (this.$route.query.code) {
          httoProxy(`${HOME_API.WXCODE_API}`, 'GET', {
            code: this.$route.query.code,
            loginPlatform: 2
          }).then(res => {
            if (res.data.code === 0) {
              storage.setData(AUTHORIZATION_KEY, res.data.token)
              Toast({message: '登录成功', duration: 1000})
            } else {
              Toast({message: res.data.msg, duration: 1000})
            }
            this.gethome()
          })
        } else {
          this.gethome()
        }
      }
    } else {
      if (storage.getData(AUTHORIZATION_KEY)) {
        httoProxy(`${HOME_API.VERTOKEN_API}`, 'GET', {}).then(res => {
          if (res.data.code !== 0) {
            if (this.$route.query.code) {
              httoProxy(`${HOME_API.WXCODE_API}`, 'GET', {
                code: this.$route.query.code,
                loginPlatform: 1
              }).then(res => {
                if (res.data.code === 0) {
                  storage.setData(AUTHORIZATION_KEY, res.data.token)
                  Toast({message: '登录成功', duration: 1000})
                } else {
                  Toast({message: res.data.msg, duration: 1000})
                }
                this.gethome()
              })
            } else {
              this.gethome()
            }
          } else {
            this.gethome()
          }
        })
      } else {
        if (this.$route.query.code) {
          httoProxy(`${HOME_API.WXCODE_API}`, 'GET', {
            code: this.$route.query.code,
            loginPlatform: 1
          }).then(res => {
            if (res.data.code === 0) {
              storage.setData(AUTHORIZATION_KEY, res.data.token)
              Toast({message: '登录成功', duration: 1000})
            } else {
              Toast({message: res.data.msg, duration: 1000})
            }
            this.gethome()
          })
        } else {
          this.gethome()
        }
      }
    }
  },
  methods: {
    gethome () {
      //首页大Banner
      httoProxy(`${HOME_API.BANNER_API}`, 'GET', {
        banner_type: 1
      }).then(res => {
        this.swiperBanner = res.data
      })
      //首页专题Banner
      httoProxy(`${HOME_API.BANNER_API}`, 'GET', {
        banner_type: 2
      }).then(res => {
        this.specialBanner = res.data
      })
      //今日最热
      httoProxy(`${HOME_API.COLUMNS_API}`, 'GET', {
        column_type: 1,
        random: 1,
        num: 6
      }).then(res => {
        this.searchText = res.data[0].main_title
        this.todayHottest = res.data
      })
      this.changePost(2, 1, 5, 0)
      this.changePost(5, 2, 5, 1)
      this.change2()
      this.changePost(7, 3, 5, 1)
      this.formate()
      this.checkToken()
      this.storyClass()
    },
    isWeiXin () {
      var ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    },
    // 倒计时
    formate: function () {
      var today = new Date();
      today.setYear(today.getFullYear());
      today.setMonth(today.getMonth());
      today.setDate(today.getDate() + 1);
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
      var thisTime = new Date();
      today = today.getTime();
      thisTime = thisTime.getTime();
      var second_time = (today - thisTime) / 1000;
      var time = parseInt(second_time) + "秒";
      var day = hour = min = second = '';
      if (parseInt(second_time) > 60) {

        var second = parseInt(second_time) % 60;
        min = parseInt(second_time / 60);
        time = min + "分" + second + "秒";
        if (min > 60) {
          var min = parseInt(second_time / 60) % 60;
          var hour = parseInt(parseInt(second_time / 60) / 60);
          var time = hour + "小时" + min + "分" + second + "秒";
          if (hour > 24) {
            hour = parseInt(parseInt(second_time / 60) / 60) % 24;
            var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
            time = day + "天" + hour + "小时" + min + "分" + second + "秒";

          }
          if (day.toString().length == 1) {
            day = '0' + day;
          }
          if (day == '') {
            day = '00';
          }
          if (hour.toString().length == 1) {
            hour = '0' + hour;
          }
          if (min.toString().length == 1) {
            min = '0' + min;
          }
          if (second.toString().length == 1) {
            second = '0' + second;
          }
          this.dataTime.day = day;
          this.dataTime.hour = hour;
          this.dataTime.Minute = min;
          this.dataTime.second = second;
          setTimeout(this.formate, 1000)
        }
      }
    },
    // 今日最热 换一换
    change (index, num) {
      Indicator.open()
      this.tabanum = index
      httoProxy(`${HOME_API.COLUMNS_API}`, 'GET', {
        column_type: this.tabanum,
        random: 1,
        num: 6
      }).then(res => {
        if (num == 1) {
          this.searchText = res.data[0].main_title;
          this.todayHottest = res.data;
        } else if (num == 2) {
          this.list2 = res.data;
        }
        Indicator.close()
      })
    },
    change2 () {
       //今日限免
       Indicator.open()
       httoProxy(`${HOME_API.LIMTFRREE_API}`, 'GET', {
        num: 6,
      }).then(res => {
        this.list4 = res.data;
        Indicator.close()
      })
    },
    //新书抢先  精品短篇  热门推荐
    changePost(index, tabnamesNumber, numberTabs, random) {
      Indicator.open()
      if (numberTabs != '' ) {
        this.numberTab = numberTabs;
      }
      httoProxy(`${HOME_API.COLUMNS_API}`, 'GET', {
        column_type: index,
        random: random,
        num: 6
      }).then(res => {
        if (tabnamesNumber == 1) {
          this.list1 = res.data;
        } else if (tabnamesNumber == 2) {
          this.list2 = res.data;
        } else if (tabnamesNumber == 3) {
          this.list3 = res.data;
        }
        Indicator.close()
      })
    },
    tabnames(index) {
      return index;
    },
    checkToken() {
      httoProxy(`${HOME_API.VERTOKEN_API}`, 'GET', {}).then(res => {
        if (res.data.code == '0') {
          this.url_a1 = '/user_center';
          this.url_a2 = '/book';
          this.url_a3 = '/bookshelf';
        } else {
          this.url_a1 = '/login';
          this.url_a2 = '/login';
          this.url_a3 = '/login';
        }

      })
    },
    storyClass () {
      Indicator.open()
      httoProxy(`${HOME_API.CLASSIFY_API}`, 'GET').then(res => {
        Indicator.close()
        this.classify = res.data
        this.class_name = this.classify[0].clazz[2].name
        this.class_code = this.classify[0].clazz[2].class_code
      })
    }
  },
  components: {
    gotop: resolve => {
      require(['@/components/gotop'], resolve)
    },
    footerpage: resolve => {
      require(['@/components/footerpage'], resolve)
    },
    tab: resolve => {
      require(['./tab'], resolve)
    },
    list: resolve => {
      require(['./list'], resolve)
    },
    Inform: resolve => {
      require(['./components/rollInform'], resolve)
    },
    qrcode: resolve => {
      require(['./code'], resolve)
    }
  }
}

</script>
<style lang="less" scoped>
  .Router{
    height:auto;
  }
  #home {
    .swiper-container {
      height: 300px;
    }
    header {
      box-sizing: inherit;
      position: fixed;
      top: 0;
      z-index: 9999;
      width: 100%;
      max-width: 550px; /*no*/
      height: 90px;
      background-color: #ffffff;
      padding: 0 38px;
      box-shadow: 0px 2px 3px #f0f2f7;
      .homeLogo {
        float: left;
        width: 215px;
      }
      a {
        a:nth-child(1) {
          margin-right: 40px;
        }
        float: right;
        i {
          float: right;
          font-size: 42px;
          line-height: 90px;
          color: #626262;
        }
      }
    }

    .swiper-slide {
      width: 100%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .tab {
      background: white;
      padding: 35px 18px;
      display: flex;
      a {
        flex: 1;
        font-size: 24px;
        line-height: 51px;
        color: #4b4b4d;
        text-align: center;
        img {
          width: 119px;
          height: 116px;
        }
      }
    }
    .inform {
      background: white;
      padding: 28px 0;
      .informText {
        margin: 0 38px;
        height: 60px;
        background-color: #f7f7f9;
        border-radius: 30px;
        i {
          float: left;
          width: 36px;
          height: 29px;
          margin: 0 36px;
          font-size: 36px;
          line-height: 60px;
        }
        a {
          float: left;
          font-size: 24px;
          line-height: 60px;
          margin-left: 20px;
          color: #4b4b4d;
        }
      }
    }
    .pages {
      background: white;
      margin-top: 18px;
      padding: 33px 0;
      .tit {
        height: 35px;
        line-height: 35px;
        .time {
          width: 33px;
          height: 33px;
          text-align: center;
          line-height: 33px;
          display: inline-block;
          color: #fff;
          margin: 0 5px;
        }
        .day {
          background: #fd425d;
          margin-left: 25px;
        }
        .hour, .Minute, .second {
          background: #33373d
        }
        i {
          float: left;
          height: 100%;
          width: 13px;
          background-image: linear-gradient(0deg,
          #fc3b57 0%,
          #ff5a74 100%);
        }
        span {
          font-weight: 550;
          float: left;
          margin-left: 21px;
          font-size: 35px;
          letter-spacing: 1px;
          color: #2b1f1f;
        }
        a {
          b{
            margin-right: 10px;
            float: left;
          }
          float: right;
          margin-right: 39px;
          font-size: 24px;
          line-height: 35px;
          color: #999999;
        }
      }
      .pagesImg {
        width: 100%;
        margin: 0.32rem 0 0.613333rem;
        img {
          width: 100%;
        }
      }

      .recommend{
          width:670px;
          border-top:1px solid #eeeeee;
          margin:0 0 7px 40px;
          padding-top:20px;
          li{
            display:block;
            list-style:none;
            width:670px;
            a{
              width: 100%;
            }
            p{
               display:inline-block;
               font-size:22px;
               margin-top:13px;
                width: 100%;
            }
            .category{
               color:#b0966d;
               width:20%;
            }
            .novelNames{
               color:#666666;
               width:45%;
            }
            .author{
               color:#999999;
               width:21%;
               text-align:right;
            }
            .noveState{
               color:#b0966d;
               width:10%;
               text-align:right;
            }
         }
      }
      .pagesList, .pagesList2 {
        ul {
          padding: 33px 6px 0;
        }
        li {
          margin: 0 27px;
          margin-bottom: 20px;
          float: left;
          width: 188px;
          list-style: none;
          img {
            width: 100%;
            height: 251px;
          }
          p {
            font-size: 26px;
            line-height: 38px;
            height:96px;
            color: #666666;
            padding-top: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
