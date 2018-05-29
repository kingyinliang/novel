<template>
  <div class="commentMain">
    <ul>
      <li v-for="(item,index) in bookcomment" :key="index">
        <div class="userName clearfix">
          <img :src="item.reader_portrait" alt="" v-if="item.reader_portrait">
          <img src="@/assets/img/userimg.png" alt="" v-if="!item.reader_portrait">
          <div class="rightdiv">
            <p class="names">{{ item.reader_name }}</p>
            <p class="commentBtn">
              <span class="commentTimes">{{ item.review_time | datefilter}}</span>
              <router-link tag="a" to="/commentdetail" @click.native="$store.commit('saveCommentid', item)"><i class="iconfont novel-comment"></i>{{item.reply_count}}</router-link>
            </p>
          </div>
        </div>
        <div class="commentTxt">
          <p>{{item.content}}</p>
        </div>
      </li>
    </ul>
    <div class="nocomment" v-if="bookcomment.length ==0">
      <img src="@/assets/img/nocomment.png" alt="">
      <p>暂无评论</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentlist',
  props: {
    bookcomment: {}
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
  }
</style>
