<template>
    <div>
      <heads :tit="'新手机绑定'" :wechat="wechat"></heads>
      <div class="modifyPhone">
        <ul>
            <li>
              <input type="text" placeholder='请输入您要绑定的新手机号' v-model='newPhone' class="phone">
            </li> 
            <li>
              <input type="text" placeholder='请输入图片验证码' v-on:blur="checkImgMsg()" class="pic_Code" v-model='picCodeValue'>
              <input class="post" @click="postPicMsg" type="image" :src="picCode"/>
            </li> 
            <li>
              <input v-model="phoneCode" v-on:blur="checkPhoneMsg()" class="entryMsg" type="text" name="entryMsg" placeholder="请输入校验码"/>
              <span v-show="show" @click="postPhoneMsg" class="postMsg">获取验证码</span>
              <span v-show="!show" class="count postMsg">{{count}} s</span>
            </li>                  
        </ul>
        <button id="register" class="goRegister login_button" @click="postForm">确认绑定</button>
      </div>
    </div>
</template>

<script>
import '../../assets/css/login_register_forgotPassWord_css/comment.less'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import { Toast, MessageBox, Indicator } from 'mint-ui'
import storage, {AUTHORIZATION_KEY} from '@/novelutils/storage'
var uuid = storage.getData("client_authorization_token");
export default {
  name: 'modifyPhone',  
  data () {
    return {      
      wechat:true,
      newPhone:'',
      picCodeValue:'',
      checkphone:'',
      picCode:'',
      phoneCode:'',
      postPhoneCode:true,      
      show:true,
      count: '',
      timer: null
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
        },false,true).then(res => {
          console.log(res.data)
          this.picCode = res.data
        })
    },
    postPicMsg: function (e) {
      this.picCodeFun(uuid)
    },
    checkImgMsg: function (e) {
      if(this.picCodeValue == ''){
        Toast({message: '*请输入图片验证码！', duration: 1000})
      }
    },
    checkPhoneMsg: function (e) {
      if(this.picCodeValue == ''){
        Toast({message: '*请输入图片验证码！', duration: 1000});
        return false;
      }
      if(this.phoneCode == ''){
        Toast({message: '*请输入手机验证码！', duration: 1000});
        return false;
      }
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
      if(this.picCodeValue != '' && this.postPhoneCode){
          this.postPhoneCode = false;
          httoProxy(`${HOME_API.POSTPHONEMSG_API}`, 'GET', {
            uuid : uuid,
            mobile : this.newPhone
          }).then(res => {
            if(res.data.code=='0'){
                this.getCode();
            }
          })
      }else{
        Toast({message: '*请输入图片验证码！', duration: 1000})
      }
    },
    postForm () {
        if(this.picCodeValue !='' && this.phoneCode !=''){
          httoProxy(`${HOME_API.BINDPHONE_API}`, 'POST', {
            phone: this.newPhone ,
            captcha: this.picCodeValue, 
            mobileCode: this.phoneCode 
          }).then(res => { 
            if(res.data.code == 0){
               this.$router.push({path: '/home'})
            }else{
               Toast({message: res.data.msg, duration: 1000})
            }
          })
        }else{
          Toast({message: '*请完善信息后，在提交！', duration: 1000})
        }
    }
  },
  components: {
      Heads: resolve => {
        require(['@/components/head'], resolve)
      }
  }
}

</script>
<style lang="less">
.modifyPhone{
   width:100%;
   background:#fff;
   margin-top:20px;
   padding:20px 0 50px;
   .login_button {
      display: block;
      width: 600px;
      height: 90px;
      border-radius: 6px;
      border: none;
      outline: none;
      margin: 20px auto 31px auto;
      background-color: #ff3d58;
      color:#fff;
   }
   ul{
      margin:0;
      padding:0;

      li{
         width:600px;
         margin:20px auto 0 auto;
         font-size:30px;
         color:#333333;
         list-style:none;
         position:relative;
         input{
            width: 600px;
            height: 90px;
            background-color: #ffffff;
            border: solid 1px #e1e1e1;
            font-family: PingFangSC-Regular;
            font-size: 30px;
            color: #999999;
            text-indent: 33px;
         }
         input.pic_Code,input.code{
            width:380px;
         }
         input.post{
            width: 200px;
            border:none;
            position:absolute;
            right:0;
            bottom:0;
            text-indent: 0;
         }
         input.sendCode{
             width: 200px;             
             border-radius:5px;
             background-color:#dcdcdc;
             position:absolute;
             right:0;
             bottom:0;
             color:#181515;
             font-size:25px;
             text-indent: 0;
         }
         .phone{
            width:600px;
         }
         .pic_Code{
            width:380px;
         }
         .code{
            width:380px;
         }
       }
   } 
   .postMsg{
        position: absolute;
        right: 0;
        top: 0;
        width: 2.68rem;
        height: 1.2rem;
        font-family: PingFangSC-Regular;
        font-size: 0.32rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #000000;
        text-indent: 0;
        border: none;
        background: transparent;
        z-index: 9;
        text-align: center;
        line-height: 1.2rem;
   }
}
</style>

