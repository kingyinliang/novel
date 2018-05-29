<template>
  <div id="userLogin">
    <heads :tit="'登录'" :rigister="'注册'"></heads>
    <div class="logo">
      <img src="../../assets/img/login_register_forgot_imgs/register_logo.png"/>
    </div>
    <div class="formLogin">
      <input type="tel" name="mobile" v-model="userPhone" placeholder="请输入手机号" maxlength="11" v-on:blur="checkPhone()"/>
      <input type="password" name="password" v-model="userPassWord" placeholder="请输入密码" maxlength="16"
             v-on:blur="checkPassWord()"/>
      <div class="pushMsg" v-if='postCodeState'>
        <input v-model="registerImgMsg" v-on:blur="checkImgMsg()" class="entry" name="entry" type="text"
               placeholder="请输入验证码"/>
        <input class="post" @click="postPicMsg" type="image" :src="picCode"/>
      </div>
    </div>
    <p class="login_p">
      <span @click="checkedChange()">
        <i class="check_true" v-show="checked"></i>
      </span>
      <a href="javascript:;" @click="checkedChange()">记住我</a>
      <router-link tag="span" class="m" to="/forgotPassword">忘记密码？点这里</router-link>
    </p>
    <button id="register" class="goRegister login_button" @click="userLogin">登 录</button>
    <span class="x">
      <a href="javascript:;" style="color:#999">登录即表示同意</a>
      <router-link tag="a" class="tab-iteam bookCity" to="/agreement">《有狐阅读服务协议》</router-link>
    </span>
    <h6 class="LoginAway_title">社交账户登录</h6>
    <ul class="LoginAway_choose">
      <li class="Login_wx" @click="gowx">
      </li>
      <li class="Login_qq">
      </li>
    </ul>
    <qrcode></qrcode>
  </div>
</template>
<script>
import '@/assets/css/base.css'
import '../../assets/css/login_register_forgotPassWord_css/comment.less'
import {Toast} from 'mint-ui'

import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import storage, {AUTHORIZATION_KEY} from '@/novelutils/storage'

var uuid = localStorage.header_visitorid
var data2 = JSON.parse(localStorage.getItem('key'))
export default {
  name: 'userLogin',
  components: {
    Heads: resolve => {
      require(['@/components/head'], resolve)
    },
    qrcode: resolve => {
      require(['../home/code'], resolve)
    }
  },
  data: function () {
    return {
      checked: false,
      phoneMsg: false,
      passWordMsg: false,
      userPhone: '',
      rememberMe: false,
      postCodeState: false,
      userPassWord: '',
      picCode: '',
      registerImgMsg: '',
      userCode: '',
      errCount: 0
    }
  },
  mounted () {
    this.picCodeFun(uuid)
    if (data2 != null) {
      this.userPhone = data2.userPhone
      this.userPassWord = data2.password
      this.phoneMsg = true
      this.passWordMsg = true
    }
  },
  methods: {
    isWeiXin () {
      var ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i)=="micromessenger") {
        return true
      } else {
        return false
      }
    },
    gowx () {
      if (this.isWeiXin()) {
        let obj = {
          appid: 'wx9b81631e4bbf292e',
          redirect_uri: 'http%3a%2f%2fwww.yhwxc.com',
          response_type: 'code',
          scope: 'snsapi_userinfo',
          state: 'STATE#wechat_redirect'
        }
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${obj.appid}&redirect_uri=${obj.redirect_uri}&response_type=${obj.response_type}&scope=${obj.scope}&state=${obj.state}`
        
      } else {
        this.$router.push({path: '/wechat'});
      }
    },
    picCodeFun: function (index) {
      // 获取图片验证码
      httoProxy(`${HOME_API.USERCAPTCHA_API}`, 'GET', {
        uuid: index
      }).then(res => {
        console.log(res.data)
        this.picCode = res.data
      })
    },
    postPicMsg: function (e) {
      this.picCodeFun(uuid)
    },
    checkedChange: function () {
      this.checked = !this.checked
      this.rememberMe = !this.rememberMe
    },
    checkPhone: function () {
      const reg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[89])[0-9]{8}$/
      if (this.userPhone === '') {
        Toast({message: '*手机号输入错误！', duration: 1000})
        return false
      }
      if (reg.test(this.userPhone)) {
        this.phoneMsg = true
      } else {
        this.phoneMsg = false
        Toast({message: '*手机号输入错误！', duration: 1000})
      }
    },
    checkPassWord: function () {
      const reg = /^[\w]{6,12}$/
      if (this.userPassWord === '') {
        Toast({message: '*密码格式错误！', duration: 1000})
        return false
      }
      if (reg.test(this.userPassWord)) {
        this.passWordMsg = true
      } else {
        this.passWordMsg = false
        Toast({message: '*密码格式错误！', duration: 1000})
      }
    },
    userLogin: function () {
      if (!this.phoneMsg) {
        Toast({message: '*手机号输入错误！', duration: 1000})
        return false
      }
      if (!this.userPassWord) {
        Toast({message: '*密码格式错误！', duration: 1000})
        return false
      }
      if (this.rememberMe) {
        const info = {
          userPhone: this.userPhone,
          password: this.userPassWord
        }
        localStorage.setItem('key', JSON.stringify(info))
      }
      if (this.postCodeState && this.registerImgMsg === '') {
        Toast({message: '*验证码不能为空！', duration: 1000})
        return false
      }
      if (this.phoneMsg && this.userPassWord) {
        httoProxy(`${HOME_API.LOGIN_API}`, 'POST', {
          account_num: this.userPhone,
          password: this.userPassWord,
          verificate_code: this.registerImgMsg
        }).then(res => {
          if (res.data.code === 0) {
            storage.setData(AUTHORIZATION_KEY, res.data.token)
            window.history.go(-1)
          } else if (res.data.login_num > 3) {
            this.postCodeState = true
          } else if (res.data.code === 20008) {
            Toast({message: '*账户已锁定！', duration: 1000})
            return false
          } else {
            Toast({message: res.data.msg, duration: 1000})
            return false
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .LoginAway_title {
    width: 163px;
    height: 22px;
    text-align: center;
    font-family: NotoSansHans-Regular;
    font-size: 23px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 0px;
    color: #666666;
    margin: 71px auto 41px auto;
    position: relative;
    overflow: visible;
  }

  .LoginAway_title:before {
    content: "";
    position: absolute;
    height: 2px;
    width: 54px;
    top: 10px;
    left: -54px;
    background: #c9c9c9;
  }

  .LoginAway_title:after {
    content: "";
    position: absolute;
    height: 2px;
    width: 54px;
    top: 10px;
    right: -54px;
    background: #c9c9c9;
  }

  .LoginAway_choose {
    width: 265px;
    height: 96px;
    display: block;
    margin: 0 auto;
    li {
      width: 96px;
      height: 96px;
      float: left;
      list-style: none;
      background: url("../../assets/img/login_register_forgot_imgs/LoginAway.png") no-repeat;
      -webkit-background-size: auto 100%;
      background-size: auto 100%;
      background-position: left;
    }
    .Login_qq {
      float: right;
      background: url("../../assets/img/login_register_forgot_imgs/LoginAway.png") no-repeat;
      -webkit-background-size: auto 100%;
      background-size: auto 100%;
      background-position: right;
    }
  }

  .check_true {
    display: block;
    width: 80%;
    height: 70%;
    margin: 10% 10%;
    background: #ff3d58;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  p {
    .m {
      width: auto;
      float: right;
      height: 28px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 28px;
      letter-spacing: 0px;
      color: #ff415c;
      border: none;
    }
  }

  .x {
    display: block;
    width: 600px;
    height: 23px;
    margin: 0 auto;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
    .bookCity {
      color: #ff415c;
    }
  }
</style>
