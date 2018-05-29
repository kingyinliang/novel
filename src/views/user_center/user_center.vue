<template>
    <div>
      <toplist :popupVisible="toplist" :clickfn="close"></toplist>
      <header>
          <i class="iconfont novel-back goback" @click="()=>{this.$router.goBack()}"></i>
          <p class="tit">{{tit}}</p>
          <p class="headIcon">
             <router-link tag="a" to="/search"><i class="iconfont novel-search"></i></router-link>
            <a @click="showtoplist"><i class="iconfont novel-tab"></i></a>
          </p>
      </header>      
      <div class="user_headerAll">
          <div class="userText">{{userText}}<img src="../../assets/img/vip.png" alt=""> </div>         
          <div class="userReadAge">阅龄：<span>{{endTimeNumber}}</span></div>
      </div>
      <div class="user_content">
          <ul>
            <li>
              <b>账户余额</b>
              <span><b class='reading_money red'>{{reading_money}}</b>有狐币</span>
              <router-link tag="a" to="/recharge"><span class="Recharge">充值</span></router-link>
            </li>
            <li>
              <b>我的书架</b>
              <router-link tag="a" class="tab-iteam bookCity" to="/bookshelf" ><span class="icon">&nbsp;&nbsp;</span></router-link>
            </li>
            <li>
              <b>绑定账号</b>
              <router-link tag="a" class="tab-iteam bookCity" to="/account" ><span class="icon">&nbsp;&nbsp;</span></router-link>
            </li>
            <li>
              <b>自动订阅</b>
              <span class="Subscribe_d" @click='subscribeType'><mt-switch v-model="Subscribe_value"></mt-switch></span>
            </li>
          </ul>
      </div>   
      <div class="loginOut" @click='loginOut()'>退出登录</div>   
    </div>
</template>
<script>
import { mapState } from 'vuex'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import { Switch } from 'mint-ui';
import storage, {AUTHORIZATION_KEY} from '@/novelutils/storage'
import { Toast, MessageBox, Indicator } from 'mint-ui'
var subscribeType='';
export default {
  name: 'user_center',
  data () {
    return {
      toplist: false,
      userText: '小狐狸',
      reading_money:'',
      endTimeNumber:'',
      Subscribe_value: true,
      subscribe_state:true,
      tit: '用户中心'
    }
  },  
  mounted () {  
     this.userInof()  
  },
  methods: {
      showtoplist () {
        if (this.toplist === true) {
          this.toplist = false
        } else {
          this.toplist = true
        }
      },
      close () {
        this.toplist = false
      },
      loginOut () {        
        httoProxy(`${HOME_API.LOGINOUT_API}`, 'POST', {}).then(res => {
           if(res.data.code == 0){
                storage.clean() //清除coo
                this.$router.push({path: '/home'})
           }else{
              Toast({message: '*退出失败！', duration: 1000})
           }
        })
      },
      userInof () {
        httoProxy(`${HOME_API.USERINFO_API}`, 'GET', {}).then(res => {
                res.data.nickname!=''?this.userText = res.data.nickname : this.userText = '小狐狸'+res.data.phone.substr(0,3)+"****"+res.data.phone.substr(7) //昵称
                this.reading_money = res.data.balance;//余额
                this.userTime(res.data.register_time.toString().slice(0,8)) //注册时间
                res.data.subscribe_type==1 ? this.Subscribe_value = true : this.Subscribe_value = false; //是否是自动订阅
        })
      },
      userTime (timeNumber) {
          var timeNumberA = timeNumber.slice(0,4)+'-'+timeNumber.slice(4,6)+'-'+timeNumber.slice(6,8);
          var start = new Date(timeNumberA);
          var date = new Date(); //时间对象
          var thisTime = date.getTime();
          var startTime = start.getTime();
          var endTime = parseInt((thisTime - startTime)/(1000 * 60 * 60 * 24),0); 
          this.endTimeNumber = endTime;    
      },
      subscribeType () {
          this.Subscribe_value? subscribeType=0:subscribeType=1;
          if(this.subscribe_state){
            this.subscribe_state = false;
            httoProxy(`${HOME_API.SUBSCRIBETYPE_API}`, 'POST', {
              subscribeType:subscribeType
            },false,true).then(res => {
                this.subscribe_state = true;
            })
          }
      }
  },
  components: {
    Toplist: resolve => {
      require(['@/components/topList'], resolve)
    }
  }
}

</script>

<style lang="less" scoped>
  header{
    max-width: 550px;/*no*/
    width: 100%;
    height: 90px;
    padding: 0 38px;
    box-sizing: border-box;
    background: red;
    position: fixed;
    top: 0;
    line-height: 90px;
    z-index: 999;
    background:url('../../assets/img/user_header.jpg') no-repeat;
    background-size:cover;
    .goback{
      position: absolute;
      left: 38px;
      z-index: 999;
    }
    .tit{
      position: relative;
      font-family: PingFangSC-Medium;
      font-size: 36px;
      line-height: 90px;
      color: #ffffff;
      text-align: center;
    }
    i{
      font-size: 40px;
      cursor: pointer;
      color:#ffffff;
    }
    .headIcon{
      text-align: right;
      position: absolute;
      right: 38px;
      top: 0px;
      a{
        margin-left: 30px;
        color: #ffffff;
      }
      .toRigister{
        font-size: 30px;
      }
    }
  }
  .user_headerAll{
     width:100%;
     height:256px;
     background:url('../../assets/img/user_headerAll.jpg') no-repeat;
     background-size:cover;
     margin-top:-2px;
     position:relative;
     .userText{
        position:absolute;
        left:216px;
        top:70px;
        font-size:36px;
        color:#fff;
        img{
          width:140px;
          margin-top:-2px;
          padding-left:10px;
        }
     }
     .userId{
        position:absolute;
        left:216px;
        top:141px;
        font-size:25px;
        color:#ffd9d9;
     }
     .userReadAge{
        position:absolute;
        left:216px;
        top:138px;
        font-size:25px;
        color:#ffd9d9;
     }
  }
  .user_content{
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
           .reading_money{
              padding-left:60px;
           }     
           .Recharge{
               width:130px;
               height:50px;
               border-radius:30px;
               display: inline-block;
               border: 2px solid #ff3c56;
               float:right;
               font-size:22px;
               line-height:50px;
               text-align:center;
               color:#fd455f;
               margin:24px 40px 0 0;
            }       
           .icon{
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
           }
           .red{
              color:#fd455f;
            }
           .Subscribe{
               width:130px;
               height:50px;
               border-radius:30px;
               display: inline-block;
               border: 2px solid #ff3c56;
               float:right;
               margin:24px 40px 0 0;
               b{
                  width:17px;
                  height:17px;
                  border-radius:10px;
                  background:red;
                  display:inline-block;
                  float:left;
                  margin:15px 0 0 17px;                  
               }               
           }
           .Subscribe_d{
               width:110px;
               height:50px;
               display: inline-block;
               float:right;
               margin:14px 40px 0 0;             
           }
         }

     } 
  }
  .loginOut{
     width:100%;
     height:100px;
     line-height:100px;
     color:#ff3c56;
     font-size:30px;
     text-align:center;
     background:#fff;
     margin-top:38px;     
  }
</style>

