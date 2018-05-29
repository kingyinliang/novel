<template>
<footer>
		<router-link tag="a" class="tab-iteam bookCity" to="/book" ><p>书库</p></router-link>
        <router-link tag="a" class="tab-iteam recharge" :to="url_a" ><p>充值</p></router-link>
        <router-link tag="a" class="tab-iteam bookshelf" :to="url_b" ><p>书架</p></router-link>
</footer>
</template>

<script>
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
export default {
  name: 'footerpage',
  data () {
    return {
      url_a: '',
      url_b: ''
    }
  },
  mounted (){
  	this.checkToken();
  },
  methods: {
    checkToken(){
      httoProxy(`${HOME_API.VERTOKEN_API}`, 'GET', {}).then(res => {    
        if(res.data.code=='0'){
            this.url_a = '/recharge';
            this.url_b = '/bookshelf';
        }else{
            this.url_a = '/login';
            this.url_b = '/login';
        } 

      })
    }
  }
}
</script>

<style lang="less" scoped>
	footer{
	  width: 100%;
	  max-width: 550px;/*no*/
	  height: 129px;
	  background: #ffffff;
	  position: fixed;
	  bottom: 0;
	  z-index: 9999;
	  box-shadow: 0px -2px 3px #f0f2f7;
	  .bookCity{
		 position:absolute;
		 left:83px;
		 width:80px;
		 height:92px;
		 bottom:10px;
		 background:url('../assets/img/icon1.png') no-repeat;
		 background-size:51% 51%;
		 background-position:center top;
		 color:#fd455f;
		 p{
			text-align:center;
			margin-top:60%;
		 }
	  }
	  .recharge{
		 position:absolute;
		 left:325px;
		 width:92px;
		 height:122px;
		 top:-19px;
		 background:url('../assets/img/icon2.png') no-repeat;
		 background-size:100%;
		 background-position:center top;
		 color:#666666;
		 p{
			text-align:center;
			margin-top:100%;
		 }
	  }
	  .bookshelf{
		 position:absolute;
		 right:83px;
		 width:80px;
		 height:92px;
		 bottom:10px;
		 background:url('../assets/img/icon3.png') no-repeat;
		 background-size:51% 51%;
		 background-position:center top;
		 color:#666666;
		 p{
			text-align:center;
			margin-top:60%;
		 }
	  }
	}
</style>
