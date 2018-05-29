<template>
  <div class="caj" :style="{'height':page1||overfl?'100%':'auto','overflow':page1||overfl?'hidden':'scroll'}">
    <div class="firstin" @click="hidefirst" v-if="firstin">
      <div class="firstinitem">
        <p><img src="@/assets/img/num1.png" alt=""><span>上拉翻页</span></p>
      </div>
      <div class="firstinitem firstinitem2">
        <p><img src="@/assets/img/num2.png" alt="" class="firstimg"><span>点击页面<br>呼出工具栏即可设置</span></p>
      </div>
      <div class="firstinitem firstinitem3">
        <p><img src="@/assets/img/num3.png" alt=""><span>下拉翻页</span></p>
      </div>
    </div>
    <div v-show="switchs">
      <header>
        <i class="iconfont novel-back goback" @click="()=>{this.$router.goBack()}"></i>
        <p class="headIcon">
          <router-link tag="a" to="/bookcomment"><i class="iconfont novel-commentread"></i></router-link>
          <a @click="changepop"><i class="iconfont novel-moreread" v-if="!pop"></i><i class="iconfont novel-change" v-if="pop"></i></a>
        </p>
      </header>
      <footer>
        <div class="footeritem" @click="sidebar">
          <p class="icon"><i class="iconfont novel-menuread"><img src="@/assets/img/iconbg.png" alt="" v-if="tabindex==1"></i></p>
          <p class="icontit">目录</p>
        </div>
        <div class="footeritem" @click="showchapter">
          <p class="icon"><i class="iconfont novel-Progressread"><img src="@/assets/img/iconbg.png" alt="" v-if="tabindex==2"></i></p>
          <p class="icontit">进度</p>
        </div>
        <div class="footeritem" @click="setcolor('light')" v-if="fontcolor!=='#322f24'">
          <p class="icon"><i class="iconfont novel-lightread"><img src="@/assets/img/iconbg.png" alt="" v-if="tabindex==3"></i></p>
          <p class="icontit">白天</p>
        </div>
        <div class="footeritem" @click="setcolor('night')" v-if="fontcolor=='#322f24'">
          <p class="icon"><i class="iconfont novel-nightread"><img src="@/assets/img/iconbg.png" alt="" v-if="tabindex==3"></i></p>
          <p class="icontit">夜间</p>
        </div>
        <div class="footeritem" @click="showsetings">
          <p class="icon"><i class="iconfont novel-settingread"><img src="@/assets/img/iconbg.png" alt="" v-if="tabindex==4"></i></p>
          <p class="icontit">设置</p>
        </div>
      </footer>
      <div class="addbookrack" @click="addbookrack"><p><i class="iconfont novel-addread" style="float: left"></i>加入书架</p></div>
      <div class="pop" v-if="pop">
        <router-link tag="div" class="itempop" to="/bookdetail"><i class="iconfont novel-information"></i><span>书籍详情</span></router-link>
        <router-link tag="div" class="itempop" :to="bookshelf"><i class="iconfont novel-bookcase"></i><span>回到书架</span></router-link>
      </div>
      <div class="chapter" v-if="switchs && chapter">
        <div class="chapterbtn">
          <span @click="$refs.setcajviewer.netcat(-1)"><i class="iconfont novel-back"></i>上一章</span>
          <p>
            <span>第{{$refs.setcajviewer.content.catalog_num}}章：{{$refs.setcajviewer.content.title}}</span>
            <span>{{chapterValue}}%</span>
          </p>
          <span class="net" @click="$refs.setcajviewer.netcat(1)">下一章<i class="iconfont novel-more"></i></span>
        </div>
        <div class="chapterValue">
          <div class="father" ref="fa">
            <div class="children" :style="{'width':chapterValue+'%'}"></div>
            <div class="bos"><div class="slidingblock"  ref="drps" @touchstart="drp" :style="{'left':chapterValue+'%'}"></div></div>
          </div>
        </div>
      </div>
      <div class="setings" v-if="switchs && setings">
        <div class="fontsize">
          <span class="reduce">A <i>-</i></span>
          <span class="adds">A <i>+</i></span>
          <div class="fontvalue"><mt-range v-model="fontValue" :barHeight="3" :min="14" :max="28"></mt-range></div>
        </div>
        <div class="fontcolor">
          <div class="coloritem">
            <div class="color" style="background: #f7f7f8" @click="setfontcolor('#f7f7f8','#322f24')"></div>
          </div>
          <div class="coloritem">
            <div class="color" style="background: #decdab" @click="setfontcolor('#decdab','#4f4228')"></div>
          </div>
          <div class="coloritem">
            <div class="color" style="background: #c9d9e9" @click="setfontcolor('#c9d9e9','#2a3a4b')"></div>
          </div>
          <div class="coloritem">
            <div class="color" style="background: #d3eed4" @click="setfontcolor('#d3eed4','#132514')"></div>
          </div>
          <div class="coloritem">
            <div class="color" style="background: #644f47" @click="setfontcolor('#644f47','#d1bfb8')"></div>
          </div>
          <div class="coloritem">
            <div class="color" style="background: #375078" @click="setfontcolor('#375078','#b0bed4')"></div>
          </div>
        </div>
      </div>
    </div>
    <setcajviewer ref="setcajviewer"
      :page1="page1"
      :hidepage1="hidepage1"
      :chapterValuechage="chapterValuechage"
      :chapterValue="chapterValue"
      :showsetcaj="showsetcaj"
      :fontValue="fontValue"
      :gohttpstate="gohttpstate"
      :background="background"
      :fontcolor="fontcolor"
      :sidebar="sidebar"
      :loginstate="loginstate"></setcajviewer>
    <sidebar :popupVisible="popupVisible" :sidebar="sidebar" ref="sidebar"></sidebar>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Range, Toast, MessageBox } from 'mint-ui'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'

Vue.component(Range.name, Range)

export default {
  name: 'cajviewerhome',
  data () {
    return {
      page1: true,
      overfl: true,
      bookshelf: '/login',
      firstin: false,
      pop: false,
      tabindex: 0,
      background: '#f3f3f3',
      fontcolor: '#322f24',
      chapterValue: 18.3,
      fontValue: 12,
      chapter: false,
      setings: false,
      switchs: false,
      popupVisible: false,
      loginstate: true,
      gohttpstate: false
    }
  },
  watch: {
    fontValue (curVal, oldVal) {
      this.setFontsizevuex(curVal)
    },
    background (curVal, oldVal) {
      this.setBackgroundvuex(curVal)
    },
    fontcolor (curVal, oldVal) {
      this.setFontcolorvuex(curVal)
    }
  },
  mounted () {
    this.fontValue = this.fontsizevuex
    this.background = this.backgroundvuex
    this.fontcolor = this.fontcolorvuex
    httoProxy(`${HOME_API.VERTOKEN_API}`, 'GET', {}).then(res => {
      if (res.data.code === 0) {
        this.bookshelf = '/bookshelf'
      } else {
        this.bookshelf = '/login'
      }
    })
    if (window.localStorage.getItem('first')) {
      this.firstin = false
    } else {
      this.firstin = true
      window.localStorage.setItem('first', 1)
    }
  },
  methods: {
    ...mapActions({
      setFontsizevuex: 'setFontsizevuex',
      setBackgroundvuex: 'setBackgroundvuex',
      setFontcolorvuex: 'setFontcolorvuex'
    }),
    hidepage1 () {
      this.page1 = false
      this.overfl = false
    },
    hidefirst () {
      this.firstin = false
    },
    chapterValuechage (num, str) {
      if (this.$refs.setcajviewer.content.catalog_num === 1) {
        this.chapterValue = 0
      } else {
        this.chapterValue = parseInt((this.$refs.setcajviewer.content.catalog_num + num) / this.$refs.sidebar.totalCount * 100)
      }
      if (str) {
        this.chapterValue = str
      }
    },
    drp (e) {
      let that = this
      let oDiv = this.$refs.drps
      let disX = e.touches[0].clientX
      let disLeft = oDiv.offsetLeft
      document.ontouchmove = function (e) {
        let X = e.touches[0].clientX - disX
        let l = disLeft + X
        if (l < 0) {
          l = 0
        }
        if (l > that.$refs.fa.offsetWidth - oDiv.offsetWidth) {
          l = that.$refs.fa.offsetWidth - oDiv.offsetWidth
        }
        that.chapterValue = parseInt((l / (that.$refs.fa.offsetWidth - oDiv.offsetWidth)) * 100)
      }
      document.ontouchend = function (e) {
        if (that.gohttpstate === false) {
          that.gohttpstate = true
        } else {
          that.gohttpstate = false
        }
        document.ontouchmove = null
        document.ontouchend = null
      }
    },
    changepop () {
      if (this.pop === true) {
        this.pop = false
      } else {
        this.pop = true
      }
    },
    showchapter () {
      if (this.chapter === true) {
        this.chapter = false
        this.tabindex = 0
      } else {
        this.tabindex = 2
        this.chapter = true
        this.setings = false
      }
    },
    showsetings () {
      if (this.setings === true) {
        this.setings = false
        this.tabindex = 0
      } else {
        this.tabindex = 4
        this.setings = true
        this.chapter = false
      }
    },
    showsetcaj () {
      if (this.switchs === false) {
        this.switchs = true
      } else {
        this.switchs = false
        this.pop = false
      }
    },
    setfontcolor (str1, str2) {
      this.background = str1
      this.fontcolor = str2
      if (str1 === '#f7f7f8') {
        this.loginstate = true
      } else {
        this.loginstate = false
      }
    },
    setcolor (str) {
      this.chapter = false
      this.setings = false
      this.tabindex = 3
      if (str === 'light') {
        this.setfontcolor('#f7f7f8', '#322f24')
      } else if (str === 'night') {
        this.setfontcolor('#313131', '#8d8e92')
      }
      const that = this
      setTimeout(function () {
        that.tabindex = 0
      }, 200)
    },
    sidebar (event) {
      event.cancelBubble = true
      if (this.popupVisible === true) {
        this.popupVisible = false
        this.tabindex = 0
        this.overfl = false
      } else {
        this.popupVisible = true
        this.tabindex = 1
        this.overfl = true
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
    }
  },
  computed: {
    ...mapState({
      detailid: state => state.detail.detailid,
      fontsizevuex: state => state.fontsizevuex.fontsizevuex,
      backgroundvuex: state => state.fontsizevuex.backgroundvuex,
      fontcolorvuex: state => state.fontsizevuex.fontcolorvuex
    })
  },
  components: {
    Setcajviewer: resolve => {
      require(['../components/setcajviewer'], resolve)
    },
    Sidebar: resolve => {
      require(['../components/sidebar'], resolve)
    }
  }
}
</script>

<style lang="less" scoped>
  .caj{
    padding: 0;
    min-height: 100%;
  }
  .addbookrack{
    width: 188px;
    height: 65px;
    background-color: rgba(0, 0, 0, 0.74);
    border-radius: 32px 0 0 32px;
    font-size: 24px;
    color: white;
    position: fixed;
    top: 183px;
    right: 0;
    text-align: center;
    p{
      line-height: 65px;
      i{
        margin-left: 20px;
      }
    }
  }
  .firstin{
    max-width: 550px;/*no*/
    width: 100%;
    height: 100%;
    max-height: 1334px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.84);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999;
    .firstinitem{
      position: relative;
      flex: 1;
      font-size: 30px;
      line-height: 58px;
      color: #ffffff;
      p{
        position: absolute;
        bottom: 75px;
        left: 50%;
        margin-left: -150px;
        font-size: 30px;
        width: 500px;
      }
      .firstimg{
        width: 59px;
        height: 59px;
      }
      img{
        float: left;
        height: 108px;
        width: 58px;
        margin-right: 64px;
      }
    }
    .firstinitem2{
      border-bottom: 1px solid rgba(112, 112, 112, 0.46);
      border-top: 1px solid rgba(112, 112, 112, 0.46);
      p{
        font-size: 30px;
        line-height: 37px;
        top: 50%;
        margin-top: -37px;
      }
    }
    .firstinitem3{
      p{
        line-height: 118px;
        top: 75px;
      }
    }
  }
  header{
    font-size: 36px;
    box-sizing: border-box;
    width: 100%;
    max-width: 550px;/*no*/
    height: 90px;
    position: fixed;
    z-index: 999;
    top: 0;
    padding: 0 38px;
    color: white;
    line-height: 90px;
    background-color: #242424;
    box-shadow: 0px 1px 19px 1px
    rgba(36, 36, 36, 0.45);
    i{
      cursor: pointer;
    }
    .headIcon{
      float: right;
      i{
        font-size: 36px;
        margin-left: 10px;
      }
    }
    a{
      font-size: 36px;
      color: white;
    }
  }
  footer{
    max-width: 550px;/*no*/
    width: 100%;
    height: 114px;
    position: fixed;
    bottom: 0;
    z-index: 999;
    display: flex;
    background-color: rgba(0, 0, 0, 0.85);
    .footeritem{
      flex: 1;
      p{
        text-align: center;
      }
      .icon{
        margin-top: 15px;
        line-height: 50px;
        i{
          font-size: 45px;
          color: white;
          position: relative;
          img{
            position: absolute;
            width: 150px;
            height: 150px;
            top: -50px;
            left: -50px;
          }
        }
      }
      .icontit{
        font-size: 24px;
        line-height: 30px;
        color: #ffffff;
      }
    }
  }
  .chapter{
    max-width: 550px;/*no*/
    padding: 0 26px;
    box-sizing: border-box;
    width: 100%;
    height: 248px;
    position: fixed;
    z-index: 999;
    bottom: 114px;
    background-color: rgba(0, 0, 0, .85);
    .mt-range-progress{
      background-color:#fd5971;
    }
    .chapterValue{
      padding: 30px 30px;
    }
    .chapterbtn{
      color: white;
      font-size: 24px;
      line-height: 114px;
      display: flex;
      p{
        flex: 1;
        font-size: 24px;
        line-height: 35px;
        padding: 22px 50px;
        span{
          width: 100%;
          max-width: 380px;
          display: block;
          float: none;
          text-align: center;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
      i{
        font-size: 36px;
        float: left;
      }
      span{
        float: left;
      }
      .net{
        float: right;
        i{
          float: right;
        }
      }
    }
  }
  .setings{
    max-width: 550px;/*no*/
    padding: 0 36px;
    line-height: 40px;
    box-sizing: border-box;
    width: 100%;
    height: 248px;
    position: fixed;
    z-index: 999;
    bottom: 114px;
    background-color: rgba(0, 0, 0, .85);
    .mt-range-progress{
      background-color:#969696;
    }
    .fontsize{
      padding: 37px 0;
    }
    .reduce{
      line-height: 40px;
      color: white;
      font-size: 45px;
      float: left;
    }
    .adds{
      color: white;
      font-size: 45px;
      line-height: 40px;
      float: right;
    }
    span{
      position: relative;
      i{
        font-size: 30px;
        position: absolute;
        top: -10px;
        right: -10px;
      }
    }
    .fontvalue{
      width: 528px;
      margin: auto;
    }
    .fontcolor{
      padding: 20px 0;
      display: flex;
      .coloritem{
        flex: 1;
        .color{
          width: 74px;
          height: 74px;
          border-radius: 50%;
          margin: auto;
        }
      }
    }
  }
  .father{
    position: relative;
    width: 638px;
    height: 6px;
    background: #959595;
    .children{
      background: #fd5971;
      width: 50%;
      height: 6px;
    }
    .bos{
      width: 588px;
      height: 6px;
      position: relative;
      margin-top: -6px;
    }
    .slidingblock{
      width: 50px;
      height: 50px;
      background-color: #ffffff;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: -22px;
      z-index: 99;
    }
  }
  .pop{
    position: fixed;
    right: 0;
    top: 90px;
    width: 312px;
    background-color: #242424;
    .itempop{
      height: 70px;
      line-height: 70px;
      font-size: 24px;
      color: white;
      padding-left: 40px;
      i{
        margin-right: 27px;
      }
    }
  }
</style>
