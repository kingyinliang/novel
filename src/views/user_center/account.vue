<template>
    <div>
      <heads :tit="'绑定账号'" :wechat="wechat"></heads>
      <div class="account">
        <ul>
            <li>
              用户昵称：
              <span><input type="text" class="userName" v-model="nickName" v-on:blur="postUpdateNickname()" placeholder="请输入昵称" maxlength="10"></span>
            </li>
            <li>
              绑定手机：
              <router-link tag="a" class="tab-iteam bookCity" :to="bindPhoneUrl"><span>{{bindPhone}}</span></router-link>
            </li>
            <li>
              绑定QQ：
              <span>点击绑定</span>
            </li>
            <li>
              绑定微信：
              <span>点击绑定</span>
            </li>
        </ul>
      </div>
    </div>
</template>

<script>
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import {Toast} from 'mint-ui'
export default {
  name: 'account',  
  data () {
    return {
      account:false,
      wechat:true,
      nickName:'',
      bindPhone:'',
      bindPhoneUrl:''
    }
  },
  mounted () {  
    this.userInof()  
  },
  methods: {
      //修改昵称
      postUpdateNickname(){
        httoProxy(`${HOME_API.UPDATENICKNAME_API}`, 'POST', {
          nickname : this.nickName
        },false,true).then(res => {
           if(res.data.code == 0){
              Toast({message: '昵称修改成功！', duration: 1000})
           }else{
              Toast({message: '昵称修改失败！', duration: 1000})
           }
        })
      },
      userInof () {
        httoProxy(`${HOME_API.USERINFO_API}`, 'GET', {}).then(res => {
            res.data.nickname!=''?this.nickName = res.data.nickname:this.nickName = '请输入昵称';//昵称
            if(res.data.phone!=''){
                this.bindPhone = res.data.phone.substr(0,3)+"****"+res.data.phone.substr(7);
                this.bindPhoneUrl='/checkPhone';
            }else{
                this.bindPhone = '点击绑定';//手机
                this.bindPhoneUrl='/bind_phone';
            }
        })
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
.account{
   width:100%;
   background:#fff;
   margin-top:20px;
   ul{
      margin:0;
      padding:0;
      li{
         width:709px;
         height:100px;
         line-height:100px;
         display:inline-block;
         margin-left:41px;
         font-size:30px;
         color:#333333;
         border-bottom:1px solid #eeeeee;
         span{
            width:300px;
            text-align:right;
            float:right;
            background:url('../../assets/img/icon_jt.gif') no-repeat center right;
            background-size:5%;
            display:inline-block;
            margin-right:38px;
            padding-right:42px;
            font-size:24px;
            color:#999999;
            .userName{
              background:none;
              border:none;
              text-align:right;
              float:right;
              height:100px;
              line-height:100px;
              color:#999999;
            }            
         }
       }

   } 
}
</style>

