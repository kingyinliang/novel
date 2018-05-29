<template>
    <div @click="showsetcaj" class="cajviewrmain">
      <div class="page1" @click="hidepage1" v-if="page1">
        <div class="page1bg">
          <img :src="book.cover_img" alt="" class="page1bgimg">
          <div class="bg"></div>
        </div>
        <div class="page1main">
          <img :src="book.cover_img" alt="">
          <p class="tit">{{ book.main_title }}</p>
          <p class="author">作者:  {{ book.author_name }} </p>
          <div class="info">
            <div class="infos">
              <p class="infostit1">{{book.class_Name}}</p>
              <p class="infostit2">类型</p>
            </div>
            <div class="infos">
              <p class="infostit1">{{shelvestime.length>8? shelvestime.substr(0, 4) + '-' + shelvestime.substr(4, 2) + '-' + shelvestime.substr(6, 2):''}}</p>
              <p class="infostit2">上架时间</p>
            </div>
            <div class="infos">
              <p class="infostit1">{{book.total_words | tofixed}}万</p>
              <p class="infostit2">{{ book.book_status==0? '连载':'已完结' }}(字)</p>
            </div>
          </div>
          <p class="page1footer">
            本书由有狐中文网进行电子制作与发行<br>
            <span>版权所有</span><span>侵权必究</span>
          </p>
        </div>
      </div >
      <div class="readtxtmain" :style="{'background':background}">
        <div class="readtxt">
          <p class="readtxttit" :style="{'color':fontcolor}">第{{content.catalog_num}}章  {{content.title}}</p>
          <p :style="{'font-size':fontValue+'px', 'line-height':fontValue+15+'px','color':fontcolor}" class="dasd">
            {{ content.content }}</p>
        </div>
        <div class="cajbtn" v-if="content.pay_status!=0">
          <div class="btnitem"><a @click="netcat(-1)">上一章</a></div>
          <div class="btnitem"><a @click="sidebar">目录</a></div>
          <div class="btnitem"><a @click="netcat(1)">下一章</a></div>
        </div>
      </div>
      <div :class="{nologin1:loginstate,nologin2:!loginstate}" v-if="content.charge_type==1 && content.login_status==0">
        <div class="btn">
          <router-link tag="a" to="/login">VIP章节请登录阅读</router-link>
        </div>
      </div>
      <div class="subscription" v-if="content.pay_status==0 && content.login_status==1">
        <div class="subp">
          <p class="redp">
            ——支持作家原创，支持正版阅读——<br>
            需要购买后继续阅读
          </p>
          <p class="usergold">价格：{{content.catalog_price}} 有狐币   余额：<span>{{balance}}</span> 有狐币 </p>
          <p class="radio"><i class="iconfont novel-select" :class="{'novel-select':autosub,'novel-selectno':!autosub}" @click="setautosub"></i><span>自动订阅下一章节（可在个人中心取消）</span></p>
          <router-link tag="p" to="/recharge" class="subbtn" v-if="balance < content.catalog_price">余额不足，立即充值</router-link>
          <p class="subbtn2" v-if="balance >= content.catalog_price" @click="subscription">立即订阅</p>
          <!--<p class="gocata">选择订阅更多章节</p>-->
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import {Toast} from 'mint-ui'
export default {
  name: 'setcajviewer',
  data () {
    return {
      shelvestime: '',
      book: {},
      balance: 0,
      autosub: true,
      totalCount: 1,
      content: ''
    }
  },
  props: {
    hidepage1: {},
    page1: {},
    chapterValuechage: {},
    chapterValue: {},
    fontcolor: {},
    background: {},
    showsetcaj: {},
    fontValue: {},
    gohttpstate: {},
    loginstate: {},
    sidebar: {}
  },
  watch: {
    gohttpstate () {
      let num = Math.ceil(this.chapterValue / 100 * this.totalCount)
      if (this.chapterValue === 0) {
        num = 1
      }
      this.getcontentnum(num)
    }
  },
  mounted () {
    this.getcontent()
  },
  methods: {
    setautosub () {
      event.cancelBubble = true
      if (this.autosub === false) {
        this.autosub = true
      } else {
        this.autosub = false
      }
    },
    getcontent () {
      httoProxy(`${HOME_API.BOOKCONTENT_API}`, 'GET', {
        catalog_code: this.catalogcode
      }).then(res => {
        this.content = res.data
        if (res.data.login_status === 1) {
          this.getinfo()
        }
        // 书籍详情
        if (this.content.catalog_num !== 1) {
          this.hidepage1()
        } else {
          httoProxy(`${HOME_API.BOOKSDETAIL_API}`, 'GET', {
            book_serial_num: this.detailid
          }).then(res => {
            this.book = res.data
            this.shelvestime = res.data.shelves_time.toString()
          })
        }
        // 获取总张数
        httoProxy(`${HOME_API.BOOKCATALOGS_API}`, 'GET', {
          book_serial_num: this.detailid,
          pageNo: 1,
          pageSize: 1,
          sortType: 1
        }).then(res => {
          this.totalCount = res.data.totalCount
          let num = parseInt(this.content.catalog_num / this.totalCount * 100)
          if (this.content.catalog_num === 1) {
            num = 0
          }
          this.chapterValuechage(1, num)
        })
      })
    },
    getinfo () {
      httoProxy(`${HOME_API.USERINFO_API}`, 'GET', {}).then(res => {
        if (res.data.balance) {
          this.balance = res.data.balance
        } else {
          this.balance = 0
        }
      })
    },
    getcontentnum (num) {
      httoProxy(`${HOME_API.BOOKCONTENTBYNUM_API}`, 'GET', {
        book_serial_num: this.detailid,
        catalog_num: num
      }).then(res => {
        this.content = res.data
        this.gotop()
      })
    },
    netcat (num) {
      event.cancelBubble = true
      if ((this.content.catalog_num + num) <= 0) {
        Toast('没有上一章了哦')
        return false
      }
      if ((this.content.catalog_num + num) > this.totalCount) {
        Toast('没有下一章了哦')
        return false
      }
      this.chapterValuechage(num)
      httoProxy(`${HOME_API.BOOKCONTENTBYNUM_API}`, 'GET', {
        book_serial_num: this.detailid,
        catalog_num: this.content.catalog_num + num
      }).then(res => {
        this.content = res.data
        this.gotop()
      })
    },
    // 订阅
    subscription () {
      event.cancelBubble = true
      httoProxy(`${HOME_API.SUBSCRIBETYPE_API}`, 'POST', {
        subscribeType: this.autosub ? 1 : 0
      }, false, true).then(res => {
        httoProxy(`${HOME_API.SUBSCRIBE_API}`, 'POST', {
          catalogCodes: this.catalogcode
        }, false, true).then(res => {
          if (res.data.code === 0) {
            this.$router.push({path: '/cajviewer'})
          } else {
            Toast({message: res.data.msg, duration: 2000})
          }
        })
      })
    }
  },
  filters: {
    tofixed: function (value) {
      value = value / 10000
      return value.toFixed(1)
    }
  },
  computed: {
    ...mapState({
      catalogcode: state => state.catalogcode.catalogcode,
      detailid: state => state.detail.detailid
    })
  }
}
</script>

<style lang="less" scoped>
  .cajviewrmain{
    height: 100%;
    width: 100%;
    min-height: 15rem;
  }
  .page1bg{
    max-width: 550px;/*no*/
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    top: 0;
    img{
      width: 100%;
      height: 100%;
      filter:blur(15px);
    }
    .bg{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      background: rgba(255,255,255,.7 );
    }
  }
  .page1{
    max-width: 550px;/*no*/
    width: 100%;
    height: 100%;
    z-index: 99;
    position: relative;
    .page1main{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 9;
      p{
        text-align: center;
      }
      img{
        display: block;
        margin: auto;
        margin-top: 132px;
        width: 335px;
        height: 452px;
        background-color: #ffffff;
        box-shadow: 0px 1px 19px 1px
        rgba(214, 221, 237, 0.45);
        border-radius: 4px;
      }
      .tit{
        margin-top: 40px;
        font-size: 48px;
        line-height: 48px;
        letter-spacing: 1px;
        color: #151515;
      }
      .author{
        margin-top: 30px;
        font-size: 30px;
        color: #666666;
      }
      .info{
        margin: auto;
        margin-top: 85px;
        display: flex;
        width: 690px;
        height: 185px;
        background-color: #ffffff;
        box-shadow: 0px 1px 19px 1px
        rgba(214, 221, 237, 0.45);
        .infos{
          flex: 1;
          .infostit1{
            font-size: 30px;
            margin: 45px 0 30px 0;
            color: #141414;
          }
          .infostit2{
            font-size: 22px;
            color: #666666;
          }
        }
      }
      .page1footer{
        margin-top: 81px;
        font-size: 20px;
        line-height: 30px;
        color: #aab6ce;
        span{
          margin: 0 15px;
        }
      }
    }
  }
  .readtxt{
    padding: 100px 60px 0 60px;
    .readtxttit{
      font-size: 36px;
      line-height: 71px;
      color: #333333;
    }
    p{
      font-size: 36px;
      text-align: justify;
      line-height: 71px;
      color: #322f24;
      overflow: hidden;
    }
  }
  .cajbtn{
    display: flex;
    padding: 180px 0;
    .btnitem{
      flex: 1;
      a{
        display: block;
        margin: auto;
        color: white;
        background-color: #7a7a7a;
        border-radius: 10px;
        text-align: center;
        font-size: 26px;;
        width: 193px;
        height: 78px;
        line-height: 78px;
      }
    }
  }
  .readtxtmain{
    min-height: 100%;
    background: #f3f3f3;
  }
  .nologin1,.nologin2{
    max-width: 550px;/*no*/
    height: 600px;
    width: 100%;
    position: fixed;
    bottom: 0;
    .btn{
      width: 600px;
      height: 90px;
      background-color: #fc405c;
      border-radius: 6px;
      text-align: center;
      line-height: 90px;
      font-size: 29px;
      position: absolute;
      bottom: 161px;
      left: 50%;
      margin-left: -300px;
      a{
        color: white;
      }
    }
  }
  .nologin1{
    background: linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgba(251,238,238,.8) 30%,rgba(255,235,235,.9) 80%,rgba(255,235,235,.9) 100%);
  }
  .nologin2{
    background: linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgba(255,255,255,.6) 50%,rgba(255,255,255,.7) 60%,rgba(255,255,255,.9) 80%,rgba(255,255,255,1) 100%);
  }
  .subscription{
    max-width: 550px;/*no*/
    height: 700px;
    width: 100%;
    position: fixed;
    bottom: 0;
    background: linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgba(255,255,255,.6) 5%,rgba(255,255,255,.8) 20%,rgba(255,255,255,1) 30%,rgba(255,255,255,1) 35%,rgba(255,235,235,1) 80%,rgba(255,235,235,1) 100%);
    .subp{
      p{
        text-align: center
      }
      .redp{
        margin-top: 100px;
        text-align: center;
        font-size: 24px;
        line-height: 37px;
        color: #fc405c;
      }
      .usergold{
        margin-top: 50px;
        text-align: center;
        font-size: 24px;
        color: #666666;
        span{
          color: #fc405c;
        }
      }
      .radio{
        margin-top: 65px;
        text-align: center;
        font-size: 24px;
        line-height: 40px;
        color: #666666;
        i{
          font-size: 40px;
          color: #fc445f;
          margin-right: 22px;
        }
      }
      .subbtn,.subbtn2{
        width: 600px;
        height: 90px;
        background-color: #00a2e6;
        border-radius: 6px;
        margin: auto;
        margin-top: 65px;
        font-size: 29px;
        text-align: center;
        line-height: 90px;
        color: #ffffff;
      }
      .subbtn2{
        background-color: #fc445f;
      }
      .gocata{
        margin-top: 60px;
        font-size: 24px;
        line-height: 33px;
        color: #fc405c;
      }
    }
  }
</style>
