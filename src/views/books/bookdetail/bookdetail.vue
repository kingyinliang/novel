<template>
    <div @scroll="scrollrouter" ref="router" :style="{'overflow-y': popupVisible? 'hidden':'scroll'}">
      <header :style="{ 'background': headplace ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,1)', 'box-shadow': headplace ? 'none': '0px 1px 19.74px 1.26px rgba(213, 221, 238, 0.45)'}">
        <i class="iconfont novel-back goback" @click="()=>{this.$router.goBack()}" :style="{ 'color': headplace ? 'white' : '#080808' }"></i>
        <p class="tit" :style="{ 'color': headplace ? 'white' : '#080808' }">{{ booktitle }}</p>
        <p class="headIcon">
          <a @click="share('wx')" v-if="iswx"><i class="iconfont novel-share" :style="{ 'color': headplace ? 'white' : '#080808' }"></i></a>
          <a @click="share('nowx')" v-if="!iswx"><i class="iconfont novel-share" :style="{ 'color': headplace ? 'white' : '#080808' }"></i></a>
          <a @click="showtoplist"><i class="iconfont novel-tab" :style="{ 'color': headplace ? 'white' : '#080808' }"></i></a>
        </p>
      </header>
      <toplist :popupVisible="toplist" :clickfn="close"></toplist>
      <div class="bookdetail">
        <div class="detailTop">
          <div class="bgimgdiv">
            <img :src="bookdetail.cover_img" alt="" class="bgimg" v-if="bookdetail.cover_img!=null">
            <img src="@/assets/img/listimg.jpg" alt="" class="bgimg" v-if="bookdetail.cover_img==null">
          </div>
          <div class="shade"></div>
          <div class="details clearfix">
            <img :src="bookdetail.cover_img" alt="" v-if="bookdetail.cover_img!=null">
            <img src="@/assets/img/listimg.jpg" alt="" v-if="bookdetail.cover_img==null">
            <div class="detailTxt">
              <p class="booktit">{{ bookdetail.main_title }}</p>
              <p class="author">{{ bookdetail.author_name }}</p>
              <p class="txt">{{ bookdetail.book_status==0? '连载中':'已完结' }} | {{ bookdetail.charge_type==0? '免费': bookdetail.charge_type==1?'VIP': '限免'}} | {{bookdetail.class_Name}} </p>
              <p class="txt">{{ bookdetail.total_words|tofixed }}万字  人看过 </p>
              <p class="plable">
                <span v-for="(item,index) in booklable" :key="index" v-if="index<3">{{ item.name }}</span>
              </p>
              <p class="btn clearfix">
                <router-link tag="a" to="/cajviewer" @click.native="$store.commit('saveCatalogcode', bookdetail.bookReadRecord.catalog_code)"><span style="margin-right: 0.2rem">{{txt}}</span></router-link>
                <span @click="addbookrack"><i class="iconfont novel-addread"></i>加入书架</span>
              </p>
            </div>
          </div>
        </div>
        <div class="bookdetailTxt">
          <img src="@/assets/img/bookdetail.png" alt="">
          <p>
            {{heights? summary: summary.slice(0,55)+ '...'}}
            <a @click="setheights" v-if="summary.length>55 && !heights">展开<i class="iconfont novel-bottom"></i></a>
          </p>
        </div>
        <div class="catalog" @click="sidebar">
          <span class="bl">目录</span>
          <i></i>
          <span class="bl2">最近更新：{{ catalogDto.title}}</span>
          <label class="iconfont novel-more"></label>
          <span class="times">{{catalogDto.create_time | datefiler}} </span>
        </div>
      </div>
      <div class="banner">
        <banner :bannerlist="bannerlist"></banner>
      </div>
      <div class="comment">
        <div class="tit clearfix">
          <i class="ic"></i>
          <span class="commentTit">书评区</span>
          <span class="num">{{totalCount}}条评论</span>
          <router-link tag="a" to="/bookcomment"><span class="righttit">我要留言 <i class="iconfont novel-more"></i></span></router-link>
        </div>
        <commentlist :bookcomment="bookcomment"></commentlist>
        <router-link tag="div" class="more" to="/bookcomment">
          <p>查看更多书评</p>
        </router-link>
      </div>
      <div class="qrcode">
        <img src="@/assets/img/qrcode.jpg" alt="">
        <p>
          沪ICP备  17263736号-6<br>
          武汉鹿蜀文化传媒有限公司</p>
      </div>
      <sidebar :popupVisible="popupVisible" :sidebar="sidebar"></sidebar>
      <gotop></gotop>
      <div class="sharewx" v-if="wxshare" @click="share('wx')">
        <img src="@/assets/img/sharewx.png" alt="">
        <p>右上角点击三个点，选择“发送给朋友”
          或“分享到朋友圈”发送给朋友</p>
      </div>
      <div class="sharewx nosharewx" v-if="nowxshare" @click="share('nowx')">
        <img src="@/assets/img/sharewx.png" alt="">
        <p>复制地址链接
          将链接分享给朋友</p>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import {Toast, Indicator, MessageBox} from 'mint-ui'
import wx from 'weixin-js-sdk'

export default {
  name: 'bookdetail',
  data () {
    return {
      iswx: false,
      wxshare: false,
      nowxshare: false,
      txt: '免费试读',
      heights: true,
      summary: '',
      newbookcatalogs: [],
      bannerlist: [],
      popupVisible: false,
      toplist: false,
      headplace: true,
      booktitle: '',
      catalogDto: {},
      bookdetail: {},
      booklable: [],
      totalCount: 0,
      bookcomment: []
    }
  },
  filters: {
    tofixed: function (value) {
      value = value / 10000
      return value.toFixed(1)
    },
    datefiler: function (val) {
      if (val != undefined) {
        val = val.toString()
        if (val) {
          return `${val.substr(4, 2)}-${val.substr(6, 2)}  ${val.substr(8, 2)}:${val.substr(10, 2)}`
        }
      }
    }
  },
  mounted () {
    this.isWeiXin()
    if (this.$route.query.datailid !=undefined) {
      this.setDetailid(this.$route.query.datailid)
    }
    httoProxy(`${HOME_API.WXSHARES_API}`, 'GET', {
      url: encodeURIComponent(window.location.href)
    }).then(res => {
      const that = this
      wx.config({
        debug: false,
        appId: res.data.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.noncestr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名，见附录1
        jsApiList: [
          'onMenuShareAppMessage', 'onMenuShareTimeline',
          'onMenuShareQQ', 'onMenuShareQZone'
        ]
      })

      // 处理验证失败的信息
      wx.error(function (res) {
        console.log(res)
        // logUtil.printLog('验证失败返回的信息:', res)
      })
      // 处理验证成功的信息
      wx.ready(function () {
        // 分享到朋友圈
        wx.onMenuShareTimeline({
          title: that.bookdetail.main_title, // 分享标题
          link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: that.bookdetail.cover_img, // 分享图标
          success: function (res) {
            // 用户确认分享后执行的回调函数
            // logUtil.printLog("分享到朋友圈成功返回的信息为:", res)
            // _this.showMsg("分享成功!")
          },
          cancel: function (res) {
            // 用户取消分享后执行的回调函数
            // logUtil.printLog("取消分享到朋友圈返回的信息为:", res)
          }
        })
        // 分享给朋友
        wx.onMenuShareAppMessage({
          title: that.bookdetail.main_title, // 分享标题
          desc: that.summary, // 分享描述
          link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: that.bookdetail.cover_img, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function (res) {
            // 用户确认分享后执行的回调函数
            // logUtil.printLog("分享给朋友成功返回的信息为:", res)
          },
          cancel: function (res) {
            // 用户取消分享后执行的回调函数
            // logUtil.printLog("取消分享给朋友返回的信息为:", res)
          }
        })
        // 分享到QQ
        wx.onMenuShareQQ({
          title: that.bookdetail.main_title, // 分享标题
          desc: that.summary, // 分享描述
          link: window.location.href.split('#')[0], // 分享链接
          imgUrl: that.bookdetail.cover_img, // 分享图标
          success: function (res) {
            // 用户确认分享后执行的回调函数
            // logUtil.printLog("分享到QQ好友成功返回的信息为:",res)
          },
          cancel: function (res) {
            // 用户取消分享后执行的回调函数
            // logUtil.printLog("取消分享给QQ好友返回的信息为:",res)
          }
        })

        // 分享到QQ空间
        wx.onMenuShareQZone({
          title: that.bookdetail.main_title, // 分享标题
          desc: that.desc, // 分享描述
          link: window.location.href.split('#')[0], // 分享链接
          imgUrl: that.bookdetail.cover_img, // 分享图标
          success: function (res) {
            // 用户确认分享后执行的回调函数
            // logUtil.printLog("分享到QQ空间成功返回的信息为:",res)
          },
          cancel: function (res) {
            // 用户取消分享后执行的回调函数
            // logUtil.printLog("取消分享到QQ空间返回的信息为:",res)
          }
        })
      })
    })
    Indicator.open()
    // 书籍信息获取
    httoProxy(`${HOME_API.BOOKSDETAIL_API}`, 'GET', {
      book_serial_num: this.detailid
    }).then(res => {
      Indicator.close()
      let datas = res.data
      if (datas.bookReadRecord === null) {
        httoProxy(`${HOME_API.BOOKCATALOGS_API}`, 'GET', {
          book_serial_num: this.detailid,
          pageNo: 1,
          pageSize: 1,
          sortType: 1
        }).then(res => {
          datas.bookReadRecord = {}
          datas.bookReadRecord.catalog_code = res.data.catalogs[0].catalog_code
          this.bookdetail = datas
          this.summary = this.bookdetail.summary
          if (datas.summary.length > 55) {
            this.heights = false
          } else {
            this.heights = true
          }
        })
        this.catalogDto = datas.catalogDto
      } else {
        this.txt = '继续阅读'
        this.bookdetail = datas
        this.summary = this.bookdetail.summary
        if (datas.summary.length > 55) {
          this.heights = false
        } else {
          this.heights = true
        }
        this.catalogDto = datas.catalogDto
      }
    })
    // 书籍标签获取
    httoProxy(`${HOME_API.BOOKLABLE_API}`, 'GET', {
      book_serial_num: this.detailid
    }).then(res => {
      this.booklable = res.data
    })
    // 评论获取
    httoProxy(`${HOME_API.BOOKCOMMENT_API}`, 'GET', {
      pageNo: 1,
      pageSize: 3,
      book_serial_num: this.detailid
    }).then(res => {
      this.bookcomment = res.data.list
      this.totalCount = res.data.totalCount
    })
    // banner图获取
    httoProxy(`${HOME_API.BANNER_API}`, 'GET', {
      banner_type: 5
    }).then(res => {
      this.bannerlist.push(res.data[0])
    })
  },
  methods: {
    ...mapActions({
      setDetailid: 'setDetailid'
    }),
    isWeiXin () {
      var ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.iswx = true
      } else {
        this.iswx = false
      }
    },
    share (str) {
      if (str === 'nowx') {
        if (this.nowxshare === true) {
          this.nowxshare = false
        } else {
          this.nowxshare = true
        }
      } else {
        if (this.wxshare === true) {
          this.wxshare = false
        } else {
          this.wxshare = true
        }
      }
    },
    scrollrouter (e) {
      let tpScrollTop = this.$refs.router.scrollTop
      if (tpScrollTop > 30) {
        if (this.bookdetail.main_title.length > 10) {
          this.booktitle = this.bookdetail.main_title.slice(0, 10) + '...'
        } else {
          this.booktitle = this.bookdetail.main_title
        }
        this.headplace = false
      } else {
        this.booktitle = ''
        this.headplace = true
      }
    },
    showtoplist () {
      if (this.toplist === true) {
        this.headplace = true
        this.booktitle = ''
        this.toplist = false
      } else {
        this.headplace = false
        this.booktitle = this.bookdetail.main_title
        this.toplist = true
      }
    },
    addbookrack () {
      httoProxy(`${HOME_API.ADDBOOKRACK_API}`, 'POST', {
        book_serial_num: this.detailid
      }, false, true).then(res => {
        if (res.data.code === 0) {
          Toast({message: '加入成功', duration: 2000})
        } else if (res.data.code === 20001) {
          MessageBox.alert('请登录后加入书架').then(action => {
            this.$router.push({path: '/login'})
          })
        } else {
          Toast({message: res.data.msg, duration: 2000})
        }
      })
    },
    close () {
      this.toplist = false
      this.headplace = true
      this.booktitle = ''
    },
    setheights () {
      if (this.heights) {
        this.heights = false
      } else {
        this.heights = true
      }
    },
    sidebar () {
      if (this.popupVisible === true) {
        this.popupVisible = false
      } else {
        this.popupVisible = true
      }
    }
  },
  computed: {
    ...mapState({
      detailid: state => state.detail.detailid
    })
  },
  components: {
    Toplist: resolve => {
      require(['@/components/topList'], resolve)
    },
    Commentlist: resolve => {
      require(['../components/commentlist'], resolve)
    },
    Gotop: resolve => {
      require(['@/components/gotop'], resolve)
    },
    Sidebar: resolve => {
      require(['../components/sidebar'], resolve)
    },
    Banner: resolve => {
      require(['@/components/banner'], resolve)
    }
  }
}
</script>

<style lang="less" scoped>
.Router{
  padding: 0;
}
.nosharewx{
  img{
    left: 50%;
    margin-left: -64px;
  }
}
.sharewx{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  img{
    width: 128px;
    height: 111px;
    position: absolute;
    right: 0;
    top: 0;
  }
  p{
    width: 100%;
    text-align: center;
    padding: 0 33px;
    color: white;
    font-size: 28px;
    line-height: 45px;
    position: absolute;
    top: 130px;
  }
}
header{
  box-sizing: border-box;
  background: rgba(255,255,255,0);
  width: 100%;
  max-width: 550px;/*no*/
  padding: 0 38px;
  height: 90px;
  position: fixed;
  top: 0;
  line-height: 90px;
  z-index: 999;
  .tit{
    position: relative;
    font-family: PingFangSC-Medium;
    font-size: 36px;
    line-height: 90px;
    color: white;
    text-align: center;
  }
  .goback{
    position: absolute;
    left: 38px;
    z-index: 999;
  }
  i{
    font-size: 40px;
    color: white;
  }
  .headIcon{
    text-align: right;
    position: absolute;
    right: 38px;
    top: 0px;
    a{
      margin-left: 30px;
      color: #626262;
    }
    .toRigister{
      font-size: 30px;
    }
  }
}
.detailTop{
  height: 425px;
  position: relative;
  z-index: 99;
  .shade{
    background: rgba(0,0,0,.45);
    height: 425px;
    width: 100%;
    position: absolute;
    top: 0;
  }
  .bgimgdiv{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    overflow: hidden;
  }
  .bgimg{
    width: 100%;
    z-index: -1;
    filter: blur(30px);
  }
  .details{
    position: relative;
    padding: 0 33px;
    padding-top: 90px;
    img{
      float: left;
      width: 285px;
      height: 376px;
      box-shadow: 0px 0px 12px 0px
      rgba(101, 59, 61, 0.54);
    }
    .detailTxt{
      width: 359px;
      overflow: hidden;
      float: left;
      margin-left: 40px;
      .booktit{
        letter-spacing: 1px;
        font-size: 30px;
        line-height: 40px;
        color: white;
        margin-bottom: 15px;
      }
      .author{
        min-height: 24px;
        font-size: 24px;
        color: #b1afaf;
        margin-bottom: 15px;
      }
      .txt{
        min-height: 20px;
        font-size: 20px;
        color: #b1afaf;
        margin-bottom: 15px;
      }
      .plable{
        min-height: 33px;
        span{
          display: inline-block;
          line-height: 33px;
          border-radius: 4px;
          border: solid 1px #e9e9e9;
          padding: 0 9px;
          color: #b1afaf;
          font-size: 20px;
          margin-right: 7px;
        }
      }
      .btn{
        margin-top: 20px;
        position: absolute;
        bottom: 0;
        right: 33px;
        span{
          font-size: 24px;
          color: #ffffff;
          float: left;
          line-height: 78px;
          padding: 0 26px;
          height: 78px;
          background-image: linear-gradient(0deg,
          #fc3f5a 0%,
          #fd8e9d 100%);
          box-shadow: 0px 4px 9px 0px
          rgba(252, 66, 93, 0.34);
          border-radius: 38px;
          i{
            margin-right: 10px;
            float: left;
          }
        }
      }
    }
  }
}
.bookdetailTxt{
  background: white;
  padding: 101px 36px 70px 36px;
  position: relative;
  border-bottom: 1px solid #eeeeee;
  p{
    text-indent: 50px;
    text-align: justify;
    font-size: 24px;
    line-height: 47px;
    color: #666666;
    overflow: hidden;
    position: relative;
    a{
      text-indent: initial;
      width: 100px;
      text-align: center;
      height: 47px;
      line-height: 47px;
      position: absolute;
      bottom: 0px;
      right: 4px;
      border-radius: 3px;
      background: #eeeeee;
      i{
        color: #9999;
        font-size: 12px;
        margin-left: 6px;
      }
    }
  }
  img{
    position: absolute;
    width: 32px;
    height: 24px;
    left: 45px;
  }
}
.catalog{
  cursor: pointer;
  background: white;
  height: 98px;
  padding: 34px 36px 34px 45px;
  .bl{
    font-weight: 550;
    height: 24px;
    line-height: 24px;
    float: left;
    font-size: 30px;
    color: #666666;
  }
  i{
    height: 24px;
    width: 1px;
    float: left;
    background: #333;
    margin: 0 10px;
  }
  label{
    float: right;
    color: #999999;
    line-height: 24px;
  }
  .times{
    float: right;
    color: #999999;
    line-height: 24px;
  }
  .bl2{
    line-height: 24px;
    float: left;
    font-size: 24px;
    color: #666666;
  }
}
.banner{
  margin-top: 20px;
  width: 100%;
  background: white;
}
.comment{
  padding-top: 45px;
  background: white;
  .tit{
    .ic{
      float: left;
      width: 14px;
      height: 36px;
      background-image: linear-gradient(0deg,
      #ff3853 0%,
      #ff5872 100%);
    }
    .commentTit{
      font-size: 36px;
      line-height: 36px;
      margin-left: 25px;
      letter-spacing: 1px;
      color: #2b1f1f;
      font-weight: 550;
      float: left;
    }
    .num,.righttit{
      margin-left: 20px;
      font-size: 24px;
      color: #999999;
      line-height: 42px;
      float: left;
      display: inline-block;
    }
    .righttit{
      font-size: 24px;
      cursor: pointer;
      float: right;
      i{
        font-size: 30px;
        float: right;
        margin-right: 33px;
      }
    }
  }
}
.qrcode{
  padding-top: 93px;
  padding-bottom: 145px;
  img{
    display: block;
    margin: auto;
    width: 225px;
    height: 226px;
    background-color: #ffffff;
    box-shadow: 0px 2px 23px 0px
    rgba(185, 189, 200, 0.45);
  }
  p{
    margin-top: 45px;
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    color: #aab6ce;
  };
}
.more{
  background: white;
  border-top: 1px solid #eeeeee;
  height: 100px;
  width: 100%;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  p{
    font-size: 24px;
    color: #b0966d;
  }
}
</style>
