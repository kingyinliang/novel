<template>
    <div>
      <heads :tit="`书评区（共${totalCount}条）`"></heads>
      <div class="textarea">
        <textarea placeholder="输入文字如下" maxlength="300" @input="chages" ref="textareas" v-model="commentmain"></textarea>
        <span>{{ number }}/300字</span>
        <a @click="addcomment">发表评论</a>
      </div>
      <div class="tab clearfix">
        <a class="active">
          <span>最新书评</span>
          <i></i>
        </a>
      </div>
      <commentlist :bookcomment="bookcomment"></commentlist>
      <div class="more" @click="getmore">
        <p>查看更多书评</p>
      </div>
      <gotop></gotop>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import { Toast, MessageBox, Indicator } from 'mint-ui'
export default {
  name: 'commentList',
  data () {
    return {
      pageNo: 1,
      commentmain: '',
      number: 0,
      bookcomment: [],
      totalCount: 0
    }
  },
  mounted () {
    this.getcomment()
  },
  methods: {
    getcomment () {
      Indicator.open()
      httoProxy(`${HOME_API.BOOKCOMMENT_API}`, 'GET', {
        pageNo: this.pageNo,
        pageSize: 10,
        book_serial_num: this.detailid
      }).then(res => {
        Indicator.close()
        this.bookcomment = res.data.list
        this.totalCount = res.data.totalCount
      })
    },
    getmore () {
      this.pageNo++
      if (this.pageNo > Math.ceil(this.totalCount / 10)) {
        Toast({message: '暂无更多评论', duration: 1000})
        return false
      } else {
        Indicator.open()
        httoProxy(`${HOME_API.BOOKCOMMENT_API}`, 'GET', {
          pageNo: this.pageNo,
          pageSize: 10,
          book_serial_num: this.detailid
        }).then(res => {
          Indicator.close()
          this.bookcomment = this.bookcomment.concat(res.data.list)
          this.totalCount = res.data.totalCount
        })
      }
    },
    chages () {
      this.number = this.commentmain.length
    },
    addcomment () {
      if (this.commentmain.length === 0) {
        return false
      } else {
        Indicator.open()
        httoProxy(`${HOME_API.ADDCOMMENT_API}`, 'POST', {
          book_serial_num: this.detailid,
          content: this.commentmain
        }).then(res => {
          Indicator.close()
          if (res.data.code === 0) {
            Toast({message: '评论成功', duration: 2000})
            this.getcomment()
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
      detailid: state => state.detail.detailid
    })
  },
  components: {
    Heads: resolve => {
      require(['@/components/head'], resolve)
    },
    Commentlist: resolve => {
      require(['../components/commentlist'], resolve)
    },
    Gotop: resolve => {
      require(['@/components/gotop'], resolve)
    }
  }
}
</script>

<style lang="less" scoped>
.textarea{
  box-sizing: border-box;
  width: 100%;
  height: 450px;
  background: white;
  padding: 43px 38px;
  textarea{
    width: 100%;
    height: 250px;
    box-sizing: border-box;
    padding: 36px ;
    background-color: #f0f0f5;
    border-radius: 6px;
    font-size: 28px;
    line-height: 39px;
    color: #333333;
    margin-bottom: 34px;
  }
  a{
    text-align: center;
    float: right;
    width: 250px;
    height: 80px;
    background-color: #ff415c;
    border-radius: 6px;
    font-size: 30px;
    line-height: 80px;
    color: #fffefe;
  }
}
.tab{
  margin-top: 20px;
  width: 100%;
  height: 95px;
  background-color: #ffffff;
  border: solid 1px #eeeeee;
  display: flex;
  a{
    flex: 1;
    position: relative;
    float: left;
    font-size: 27px;
    line-height: 95px;
    color: #666666;
    text-align: center;
    i{
      display: block;
      width: 116px;
      height: 4px;
      background-color: #ff415c;
      border-radius: 1px;
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -58px;
    }
  }
}
.more{
  background: white;
  border-top: 1px solid #eeeeee;
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
</style>
