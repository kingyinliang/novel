<template>
  <div id="register">
    <heads :tit="'注册'" :rigister="' '"></heads>
    <div class="logo">
      <img src="../../assets/img/login_register_forgot_imgs/register_logo.png"/>
    </div>
    <div class="formLogin">
      <input type="tel" ref="router" v-model="registerPhone" v-on:blur="checkPhone()" name="mobile" placeholder="请输入手机号" maxlength="13"/>
      <!-- <a href="javascript:;" v-show="!checkUserPhone" class="msgAlert">*手机号输入错误，请重新输入！</a> -->
      <div class="pushMsg">
        <input v-model="registerImgMsg" v-on:blur="checkImgMsg()" class="entry" name="entry" type="text" placeholder="请输入验证码"/>
        <input class="post" @click="postPicMsg" type="image" :src="picCode"/>
        <!-- <a href="javascript:;" v-show="!ImgMsg" class="msgAlert">*验证码输入错误，请重新输入！</a> -->
      </div>
      <input v-model="registerPassWord" type="password" v-on:blur="checkPassWord()" name="password" placeholder="请设置6-16位数字/字母组成的密码"/>
      <!-- <a href="javascript:;" v-show="!checkUserPass" class="msgAlert">*格式错误，请输入6-16位数字/字母组成的密码！</a> -->
      <input v-model="registerPassWordSure" type="password" v-on:blur="checkPassWordSure()" name="password" placeholder="请确认密码"/>
      <!-- <a href="javascript:;" v-show="!checkUserPassSure" class="msgAlert" >*密码不一致，请重新输入！</a> -->
      <div class="pushMsg">
        <input v-model="registerPhoneMsg" v-on:blur="checkPhoneMsg()" class="entryMsg" type="text" name="entryMsg" placeholder="请输入校验码"/>
        <span v-show="show" @click="postPhoneMsg" class="postMsg">获取验证码</span>
        <span v-show="!show" class="count postMsg">{{count}} s</span>
        <!-- <a href="javascript:;" v-show="!PhoneMsg" class="msgAlert">*校验码输入错误，请重新输入！</a> -->
      </div>
    </div>
    <div class="login_p">
      <p href="javascript:;" style="display: block;text-align: center;width:100%;">
        <a href="javascript:;">注册即表示同意</a>
        <router-link tag="a" class="tab-iteam bookCity" to="/agreement" ><i class="k">《有狐阅读服务协议》</i></router-link>
      </p>
    </div>
    <button id="registerNow" class="goRegister" @click="userResigter()">注册</button>
    <button id="toLogin" class="goLogin" @click="()=>{this.$router.goBack()}">用已有账号登录</button>
    <qrcode></qrcode>
  </div>
</template>
<script>
var uuid = localStorage.header_visitorid;
import '@/assets/css/base.css'
import '../../assets/css/login_register_forgotPassWord_css/comment.less'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import { Toast, MessageBox, Indicator } from 'mint-ui'
export default {
  name: 'register',
  components: {
    Heads: resolve => {
      require(['@/components/head'], resolve)
    },
    qrcode: resolve => {
      require(['../home/code'], resolve)
    }
  },
  data:function () {
    return {
      postMsgKey: true,
      checkUserPhone: true,
      checkUserPass: true,
      checkUserPassSure: true,
      ImgMsg: true,
      PhoneMsg: true,
      registerPhone: '',
      registerPassWord: '',
      registerPassWordSure: '',
      registerPhoneMsg: '',
      registerImgMsg: '',
      picCode:'',
      postPhoneMsgCode:false,
      postPhoneCode:true,
      errCount:0,
      sendInfo:true,
      show:true,
      count: '',
      timer: null,
    }
  },
  mounted () {
     this.picCodeFun(uuid)
  },
  methods: {
    picCodeFun: function(index){
        //获取图片验证码
        httoProxy(`${HOME_API.USERCAPTCHA_API}`, 'GET', {
          uuid : index
        }).then(res => {
          this.picCode = res.data
        })
    },
    checkPhone: function (e) {
      const reg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[89])[0-9]{8}$/;
      if (reg.test(this.registerPhone)) {
        this.checkUserPhone = true;
        this.postPhoneMsgCode = true;
      } else {
        this.checkUserPhone = false;
        this.postPhoneMsgCode = false;
        Toast({message: '*手机号输入错误！', duration: 1000})
      }
    },
    checkPassWord: function () {
      const reg = /^[\w]{6,12}$/
      if (reg.test(this.registerPassWord)) {
        this.checkUserPass = true;
      } else {
        this.checkUserPass = false;
        Toast({message: '*请输入6-16位数字/字母组成的密码！', duration: 1000})
      }
    },
    checkPassWordSure: function () {
      if (this.registerPassWordSure == this.registerPassWord){
        this.checkUserPassSure = true;
      } else {
        this.checkUserPassSure = false;
        console.log('test')
        Toast({message: '*密码不一致！', duration: 1000}) 
      }
    },
    checkImgMsg: function (e) {
      if(this.registerImgMsg){
        this.ImgMsg = true
      }else{
        this.ImgMsg = false;        
        Toast({message: '*验证码输入错误！', duration: 1000})
      }
    },
    checkPhoneMsg: function (e) {
      if(this.registerPhoneMsg){
        this.PhoneMsg = true
      }else{
        this.PhoneMsg = false
        Toast({message: '*请输入验证码！', duration: 1000})
      }
    },
    postPicMsg: function (e) {
      this.picCodeFun(uuid)
    },
    getCode(){
       const TIME_COUNT = 60;
       if (!this.timer) {
         this.count = TIME_COUNT;
         this.show = false;
         this.timer = setInterval(() => {
         if (this.count > 0 && this.count <= TIME_COUNT) {
           this.count--;
          } else {
           this.show = true;
           this.postPhoneCode = true;
           clearInterval(this.timer);
           this.timer = null;
          }
         }, 1000)
        }
    },
    postPhoneMsg: function (e) {
      if(this.postPhoneMsgCode && this.postPhoneCode){
          this.postPhoneCode = false;
          httoProxy(`${HOME_API.POSTPHONEMSG_API}`, 'GET', {
            uuid : uuid,
            mobile : this.registerPhone
          }).then(res => {
            if(res.data.code=='0'){
                this.getCode();
            }
          })
      }else{
        Toast({message: '手机号不正确', duration: 1000})
      }
    },
    userResigter:function(e){
      if(this.postPhoneMsgCode && this.registerPassWord && this.registerPassWordSure && this.registerImgMsg && this.registerPhoneMsg){//满足条
        if(this.sendInfo){
          this.sendInfo=false;
          Indicator.open()
          httoProxy(`${HOME_API.USERREGISTER_API}`, 'POST', {
            account_num: this.registerPhone ,
            password: this.registerPassWord ,
            true_password: this.registerPassWordSure ,
            verificate_code: this.registerImgMsg,
            mobile_code: this.registerPhoneMsg
          }).then(res => {            
            this.sendInfo=true;
            Indicator.close()
            Toast({message: res.data.msg, duration: 1000})
            if(res.data.code == 0){
              this.$router.push({path: '/login'})
            }
          })
        }
      }else{
        Toast({message: '请填写完整信息', duration: 1000})
      }
    }
  }
}
</script>

<style lang="less">
  html,body{
    margin:0 auto;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  button{
    display: block;
    width: 600px;
    height: 90px;
    margin:0 auto;
    background-color: #ff3d58;
    border-radius: 6px;
    border:none;
    outline: none;
    margin-bottom:31px;
  }
  .goLogin{
    background-color: #ffeff0;
    border-radius: 6px;
    border: solid 3px #ff3d58;
  }
  .k{
    width:100px;
    border:none;
  }
  .postMsg{
    text-align:center;
    line-height:90px;
  }
</style>
