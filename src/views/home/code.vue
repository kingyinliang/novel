<template>
  <div>
    <div class="qrcode">
      <div class="qrcodes clearfix">
        <div class="qrcodetxt">
          <p class="p1">联系方式</p>
          <p class="p2">客服QQ： <span>1494156559</span></p>
          <p class="p3">3110438151</p>
          <p class="p4">客服邮箱：<span>1494156559@qq.com</span></p>
          <p class="p5">3110438151@qq.com</p>
        </div>
        <img src="@/assets/img/qrcode.jpg" alt="">
      </div>
      <p>
        京ICP备 17263736号-6<br>
        武汉鹿蜀文化传媒有限公司</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'qrcode'
}
</script>

<style lang="less" scoped>
  .qrcode {
    padding-top: 93px;
    padding-bottom: 20px;
    img {
      float: right;
      width: 189px;
      height: 189px;
      background-color: #ffffff;
    }
    p {
      margin-top: 45px;
      text-align: center;
      font-size: 20px;
      line-height: 40px;
      color: #aab6ce;
    }
    .qrcodes{
      padding: 33px;
      border-top: 4px solid #99b1c8;
      width: 635px;
      height: 257px;
      margin: auto;
      background-color: #ffffff;
      box-shadow: 0px 1px 19px 1px
      rgba(214, 221, 237, 0.45);
      .qrcodetxt{
        width: 340px;
        float: left;
        p{
          text-align: left;
          margin: 0;
          color: #7b8497;
          font-size: 20px;
        }
        .p1{
          font-size: 26px;
          color: #505050;
        }
        .p2{
          width: 250px;
          span{
            float: right;
          }
        }
        .p3{
          width: 250px;
          text-align: right;
        }
        .p4{
          width: 340px;
          span{
            float: right;
          }
        }
        .p5{
          width: 340px;
          text-align: right;
        }
      }
    }
  }
</style>
