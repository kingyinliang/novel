<template>
    <div>
      <heads :tit="`书评详情`"></heads>
      <div class="commentdetail">
        <div class="commentMain">
          <ul>
            <li>
              <div class="userName clearfix">
                <img :src="comment.reader_portrait" alt="">
                <div class="rightdiv">
                  <p class="names">{{ comment.reader_name }}</p>
                  <p class="commentBtn">
                    <span class="commentTimes">{{ comment.review_time | datefilter }}</span>
                  </p>
                </div>
              </div>
              <div class="commentTxt">
                <p>{{comment.content}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="reply">
          <p class="tit clearfix"><i></i><span>全部回复（{{ reply.totalCount }}）</span></p>
          <div class="commentMain">
            <ul>
              <li v-for="(item,index) in list" :key="index">
                <div class="userName clearfix">
                  <img :src="item.reader_portrait" alt="">
                  <div class="rightdiv clearfix">
                    <p class="names">{{ item.reader_name }}</p>
                    <p class="commentBtn">
                      <span class="commentTimes">{{item.reply_time | datefilter}}</span>
                    </p>
                  </div>
                </div>
                <div class="commentTxt">
                  <p>{{item.content}}</p>
                </div>
              </li>
            </ul>
            <div class="nocomment" v-if="list.length ==0">
              <img src="@/assets/img/nocomment.png" alt="">
              <p>暂无回复</p>
            </div>
          </div>
        </div>
        <div class="goreply" @click="showTextarea">
          <i class="iconfont novel-commenticon"></i>
          <span>回复</span>
        </div>
        <div class="textarea" v-show="showmask">
          <p class="clearfix"><a class="close" @click="closeTextarea">取消</a><a class="goReply" @click="goReply">发表</a></p>
          <textarea maxlength="300" ref="textarea" v-model="content"></textarea>
        </div>
        <div class="mask" v-show="showmask" @click="closeTextarea"></div>
      </div>
      <gotop></gotop>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import { Toast, MessageBox } from 'mint-ui'
export default {
  name: 'commentDetail',
  data () {
    return {
      reply: {},
      list: [],
      content: '',
      tru: true,
      showmask: false
    }
  },
  filters: {
    datefilter: function (val) {
      if (val != undefined) {
        val = val.toString()
        if (val) {
          return val.substr(0, 4) + '-' + val.substr(4, 2) + '-' + val.substr(6, 2)
        }
      }
    }
  },
  mounted () {
    this.getreply()
  },
  methods: {
    getreply () {
      httoProxy(`${HOME_API.COMMENTREPLY_API}`, 'GET', {
        pageNo: 1,
        pageSize: 10,
        review_code: this.commentid
      }).then(res => {
        this.reply = res.data
        this.list = res.data.list
      })
    },
    showTextarea () {
      this.showmask = true
      this.$nextTick(function () {
        this.$refs.textarea.focus()
      })
    },
    closeTextarea () {
      this.showmask = false
    },
    goReply () {
      this.showmask = false
      if (this.content === '') {
        Toast({message: '不能回复空内容', duration: 2000})
        return false
      } else {
        httoProxy(`${HOME_API.ADDREPLY_API}`, 'POST', {
          review_code: this.commentid,
          content: this.content
        }).then(res => {
          if (res.data.code === 0) {
            Toast({message: '回复成功', duration: 2000})
            this.getreply()
          } else if (res.data.code === 20001) {
            MessageBox.alert('请登录后评论').then(action => {
              this.$router.push({path: '/login'})
            })
          } else {
            Toast({message: res.data.msg, duration: 2000})
          }
        })
      }
    }
  },
  computed: {
    ...mapState({
      commentid: state => state.comment.commentid,
      comment: state => state.comment.comment
    })
  },
  components: {
    Heads: resolve => {
      require(['@/components/head'], resolve)
    },
    Gotop: resolve => {
      require(['@/components/gotop'], resolve)
    }
  }
}
</script>

<style lang="less" scoped>
  .nocomment{
    padding: 60px 0;
    img{
      display: block;
      margin: auto;
      width: 223px;
      height: 143px;
    }
    p{
      text-align: center;
      font-size: 28px;
      color: black;
      margin-top: 20px;
    }
  }
  .commentMain{
    background: white;
    li{
      list-style: none;
      padding: 52px 0 0 42px;
      .userName{
        img{
          float: left;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
        }
        .rightdiv{
          float: left;
          margin-left: 22px;
          width: 587px;
        }
        .names{
          font-size: 24px;
          color: #666666;
          margin-bottom: 10px;
        }
        .commentBtn{
          line-height: 26px;
          a{
            line-height: 26px;
            font-size: 26px;
            float: right;
            color: #b0966d;
            i{
              margin-right: 9px;
            }
          }
        }
        .commentTimes{
          font-size: 20px;
          line-height: 26px;
          color: #999999;
        }
      }
      .commentTxt{
        margin-left: 60px;
        padding:45px 38px 50px 22px;
        border-bottom: 1px solid #eeeeee;
        p{
          font-size: 24px;
          line-height: 47px;
          color: #333333;
        }
      }
    }
    .more{
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
}
  .reply{
    background: white;
    margin-top: 20px;
    padding: 33px 0 28px 0;
    .tit{
      line-height: 36px;
      i{
        float: left;
        width: 14px;
        height: 36px;
        background-image: linear-gradient(0deg,
        #ff3853 0%,
        #ff5872 100%);
      }
      span{
        float: left;
        margin-left: 24px;
        font-size: 36px;
        line-height: 36px;
        letter-spacing: 1px;
        color: #2b1f1f;
      }
    }
    .commentMain{
      .names{
        float: left;
      }
      .commentBtn{
        float: right;
      }
      .commentTxt{
        padding-top: 0px;
      }
    }
  }
  .goreply{
    width: 10rem;
    color: white;
    cursor: pointer;
    line-height: 100px;
    height: 100px;
    position: fixed;
    bottom: 0;
    background-image: linear-gradient(9deg,
    #ff3954 1%,
    #ff5872 100%);
    text-align: center;
    font-size: 30px;
    i{
      margin-right: 26px;
    }
  }
  .textarea{
    position: fixed;
    bottom: 0;
    z-index: 11111;
    background: white;
    width: 10rem;
    height: 393px;
    padding: 41px 39px 39px 39px;
    p{
      line-height: 30px;
      font-size: 30px;
      color: #333333;
      margin-bottom: 34px;
    }
    .close{
      float: left;
    }
    .goReply{
      float: right;
      color: #ff3854;
    }
    textarea{
      width: 100%;
      padding: 36px ;
      box-sizing: border-box;
      font-size: 28px;
      line-height: 39px;
      color: #333333;
      height: 251px;
      background-color: #f0f0f5;
      border-radius: 6px;
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
</style>
