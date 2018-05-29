<template>
  <div id="forgotPassword">
    <heads :tit="'找回密码'" :rigister="' '"></heads>
    <div class="logo">
      <img src="../../assets/img/login_register_forgot_imgs/register_logo.png"/>
    </div>
    <div class="formLogin">
      <input type="text" name="mobile" v-model="registerPhone" v-on:blur="checkPhone()" placeholder="请输入手机号"/>
      <div class="pushMsg">
        <input v-model="registerPhoneMsg" v-on:blur="checkPhoneMsg()" class="entryMsg" type="text" name="entryMsg" placeholder="请输入校验码"/>
        <span v-show="show" @click="postPhoneMsg" class="postMsg">获取验证码</span>
        <span v-show="!show" class="count postMsg">{{count}} s</span>
      </div>
      <input v-model="newPassWord" type="password" v-on:blur="checkPassWord()" name="password" placeholder="请输入新密码"/>
      <input v-model="newPassWord2" type="password" v-on:blur="checkPassWordSure()" name="password" placeholder="请确认新密码"/>
    </div>
    <button id="GoLogin" class="goRegister" style="margin:63px auto 98px auto" @click='modifyPhone'>确认修改</button>
    <qrcode></qrcode>
  </div>
</template>
<script>
import '@/assets/css/base.css'
import '@/assets/css/login_register_forgotPassWord_css/comment.less'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import { Toast, MessageBox, Indicator } from 'mint-ui'
export default {
  name: 'forgotPassword',
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
      registerPhone: '',
      newPassWord: '',
      registerPhoneMsg: '',
      checkUserPhone: true,
      PhoneMsg: true,
      postPhoneMsgCode:false,
      checkUserPass: true,
      newPassWord2: '',
      checkUserPassSure: true,
      postCode:true,
      show:true,
      count: '',
      timer: null,
      sendInfo:true,
    }
  },
  mounted () {
      
  },
  methods: {
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
      checkPassWord: function (e) {
        const reg = /^[\w]{6,12}$/
        if (reg.test(this.newPassWord)) {
          console.log(1)
          this.checkUserPass = true;
        } else {
          console.log(0)
          this.checkUserPass = false;
          Toast({message: '*请输入6-16位数字/字母组成的密码！', duration: 1000})
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
      getCode () {
         const TIME_COUNT = 60;
         if (!this.timer) {
           this.count = TIME_COUNT;
           this.show = false;
           this.timer = setInterval(() => {
           if (this.count > 0 && this.count <= TIME_COUNT) {
             this.count--;
            } else {
             this.show = true;
             this.postCode = true;
             clearInterval(this.timer);
             this.timer = null;
            }
           }, 1000)
          }
      },
      postPhoneMsg: function (e) {
        if(this.postPhoneMsgCode && this.postCode){
            this.postCode = false;
            httoProxy(`${HOME_API.POSTPHONEMSG_API}`, 'GET', {
              mobile : this.registerPhone
            }).then(res => {
              if(res.data.code==0){
                  this.getCode();
              }
            })
        }else{
          Toast({message: '手机号不正确', duration: 1000})
        }
      },      
      checkPassWordSure: function () {
        if (this.newPassWord2 == this.newPassWord){
          this.checkUserPassSure = true;
        } else {
          this.checkUserPassSure = false;
          Toast({message: '*密码不一致！', duration: 1000}) 
        }
      },
      modifyPhone: function (e) {
        // console.log(this.checkUserPhone)
        // console.log(this.checkUserPass)
        // console.log(this.PhoneMsg)
        // console.log(this.checkUserPassSure)
        if( this.checkUserPhone && this.checkUserPass && this.PhoneMsg && this.checkUserPassSure ){//满足条
          if(this.sendInfo){
            this.sendInfo=false;
            Indicator.open()
            httoProxy(`${HOME_API.RETRIEVE_API}`, 'POST', {
              account_num: this.registerPhone ,
              mobile_code: this.registerPhoneMsg ,
              password: this.newPassWord,
              true_password: this.newPassWord2
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
