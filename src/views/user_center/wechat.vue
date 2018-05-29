<template>
  <div>
    <heads :tit="'微信登录'" :wechat="wechat"></heads>
    <div  id="wechat"></div>
<!--     <div class="code_text">请使用微信扫描二维码<br/>
      登录“有狐手机阅读”
    </div> -->
    <div class="wechat_prompt">
      <b>小提示：请在微信客户端打开链接</b><br/>      
      <!-- 1、请先截图（苹果手机同时按下主页键和电源键、安卓手机<br/>一般音量键下+电源键），或者长按二维码>保存图片，将图片<br/>保留到手机。<br/>
      2、打开微信>扫一扫>右上角三个竖着的白点>从相册选取二维<br/>码>选中你保存到手机的二维码扫描。<br/>
      3、扫描成功之后，退出微信回到浏览器。<br/>
      4、等待2~3秒，页面刷新即可登录成功。<br/> -->
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'

export default {
  name: 'weChat',
  data () {
    return {
      wechat: true
    }
  },
  mounted () {
    
  },
  methods: {},
  components: {
    Heads: resolve => {
      require(['@/components/head'], resolve)
    }
  }

}

</script>
<style lang="less">
  #wechat{
    iframe{
      width: 100%;
      height: 400px;
    }
  }
  .wechat {
    width: 225px;
    height: 225px;
    background: #fff;
    box-shadow: 0px 2px 23px 0px rgba(185, 189, 200, 0.45);
    margin: 189px 0 0 262px;
  }

  .wechat img {
    width: 225px;
  }

  .code_text {
    margin: 37px 0 0 222px;
    width: 321px;
    font-size: 30px;
    line-height: 48px;
    color: #666666;
  }

  .wechat_prompt {
    width: 674px;
    margin: 77px 0 0 38px;
    line-height: 48px;
    font-size: 30px;
    text-align:center;
    color: #626262;
    b {
      font-size: 30px;
    }
  }
</style>

