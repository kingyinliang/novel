<template>
	<div id="recharge">
		<heads :tit="'充值'" :rechright="'账单'"></heads>
		
		<nav class="rec_baner">
			<p v-if="balance">{{balance}}</p>
			<p v-else="balance">0</p>
			<span>狐币余额</span>
		</nav>
		
		<section class="recher">
			<ul>
			    <li v-for="(item, $index) in rec" :key="$index" @click="togManagere(item.type,$index)">
			    	 <i class="iconfont" name="$index" v-bind:class='{"novel-selectno":arr.indexOf($index)==-1,"novel-select":arr.indexOf($index)!==-1}'></i>
			    	 <p>
			    	 	<span class="p_left">{{item.original}}狐币</span>
			    	 	<span class="p_center" v-if="item.Give" v-bind:class='{"firstNo":item.first!==0,"first":item.first==0}'>
			    	 		   	 	{{item.first!==0? '送':'首冲送' }}<span>{{item.Give}}</span>狐币
			    	 	</span>			    	 	
			    	 	<span class="p_right">{{item.hRMB}}元</span>
			    	 </p>
			    </li>
			</ul>
		</section>
		
		<footer>
			<div class="zf">
			    <img src="../../assets/img/wx.png" @click="WeChat()"/>
			    <img src="../../assets/img/zfb.png" @click="Alipay()"/>
			    <p>
			    	<i class="iconfont" v-bind:class='{"novel-selectno":!magIonc,"novel-select":magIonc}' @click="mag()"></i>
			    	<span>
			    		我同意 <router-link tag="span" to="/agreement">《有狐阅读服务协议》</router-link>
			    	</span>
			    </p>
			</div>
			
		</footer>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import {Toast, Indicator ,Loadmore ,MessageBox} from 'mint-ui'
//total_amount
export default{
		data(){
			return {
				rec_s:[],
				 rec:[
					{original:"10",Give:"",hRMB:"1",type:"10"},
					{original:"1000",Give:"",hRMB:"10",type:"100"},
                	{original:"3000", Give:"",hRMB:"30",type:"200"},  
                    {original:"5000", Give:"850",hRMB:"50",type:"300"},  
                    {original:"10000",Give:"1800",hRMB:"100",type:"400"},  
                    {original:"20000",Give:"2850",hRMB:"200",type:"500"},  
                    {original:"50000",Give:"5000",hRMB:"500",type:"600"} 
				 ],
				balance:"",
				arr:[],
				arrType:[],
				defaultImg: 'this.src="' + require('../../assets/img/qrcode.jpg') + '"',
				magIonc:true,
				first:true
			}
		},
  		components: {
		    Heads: resolve => {
		      require(['@/components/head'], resolve)
		    },
		    Gotop: resolve => {
		      require(['@/components/gotop'], resolve)
		    }
		 },
		 mounted(){
			this.getBalance()			
		 },
		 methods:{
		 	getBalance(){
				httoProxy(`${HOME_API.VERTOKEN_API}`, 'GET', {}).then(res => {
			        if (res.data.code === 0) {
			          	httoProxy(`${HOME_API.INFO_API}`, 'GET').then(res => {
					   			this.balance = res.data.balance
					   			if(res.data.recharge_num == 0){
					   					this.first = false
										this.Isfirst()
								}
			  			 })
			        } else {
			         		 MessageBox.alert('请登录后查看充值').then(action => {
				               this.$router.push({path: '/login'})
	            		    })
			         		 
			        }
			      })
		 	},
		 	Isfirst(){
					if(!this.first){
						this.rec = [  {original:"10",Give:"",hRMB:"1",type:"10",first:0},
										{original:"1000",Give:"",hRMB:"10",type:"100",first:0},
										{original:"3000", Give:"1000",hRMB:"30",type:"200",first:0},  
										{original:"5000", Give:"1750",hRMB:"50",type:"300",first:0},  
										{original:"10000",Give:"4000",hRMB:"100",type:"400",first:0},  
										{original:"20000",Give:"6750",hRMB:"200",type:"500",first:0},  
										{original:"50000",Give:"10000",hRMB:"500",type:"600",first:0}
									]
							}
		 	},
		 	togManagere(item,$index){
		 		this.arr=[]
		 		this.arrType=[]
		 		this.arr.push($index)
		 		this.arrType.push(item)
		 	},
		 	mag(){
		 		this.magIonc =! this.magIonc
		 	},
		 	Alipay(){
		 		if(this.magIonc){
		 			if(this.arrType.length==0){
		 				 Toast({message: '请选择充值金额', duration: 1000})
		 			}else{
		 				let RMBType = Number(this.arrType.join(",") )
		 				httoProxy(`${HOME_API.CREATE_API}`, 'POST',{
							amount_Type:RMBType 
		 				},false,true).then(res => { 
		 					let Order = {
		 								order_Id:res.data.order_Id,
		 								return_url:"http%3a%2f%2fwww.yhwxc.com/recharge"
		 						 } 
				      		if(Order.order_Id){
				      			window.location.href = "http://www.yhwxc.com/pay/alipay?order_Id="+Order.order_Id+"&return_url="+Order.return_url
				      		}else{
				      			 Toast({message: '支付异常请重新提交', duration: 1000})
				      		}
			   			})
		 			}
		 		}else{
		 			 Toast({message: '请阅读并勾选有狐服务协议', duration: 1500})
		 		}
		 	},
		 	WeChat(){
		 		if(this.magIonc){
		 			if(this.arrType.length==0){
		 				 Toast({message: '请选择充值金额', duration: 1000})
		 			}else{
		 				let RMBType = this.arrType.join(",")
		 				
		 				
		 				
		 				console.log(RMBType)
		 			}
		 		}else{
		 			 Toast({message: '请阅读并勾选有狐服务协议', duration: 1500})
		 		}
		 	}

		 }
}
</script>

<style scoped="scoped" lang="less">
.Router{
	padding-bottom: 0px;
}

.rec_baner{
	width: 750px;
	height: 230px;
	background:url(../../assets/img/navban.png) repeat;
	background-size: 100% 100%;
	color: #fff;
	text-align: center;
	p{
		font-size: 75px;
		padding-top:40px;
	}
	span{
		font-size: 24px;
		display: block;
		padding-top:10px;
	}	
}

.recher{
	width:100%;
	background: white;
	ul{
		width:89%;
		margin:0 auto;
		li:last-child{
			border-bottom: solid 0px #eeeeee !important;
		}
		li{
			list-style: none;
			border-bottom: solid 1px #eeeeee;
			height: 85px;
			line-height: 85px;
			overflow: hidden;
			i{
				font-size: 40px;
				float: left;
			}
			p{
				float: left;
				width:calc(100% - 45px);
				color: #333333;
				overflow: hidden;
				height: 85px;
				span{
					font-size: 30px;
				}
				.p_left{
					padding-left: 23px;
				}
				.p_center{
					color: #333333;
					font-size: 26px;
					position: absolute;
					span{
						font-weight: 400;
						color: #fc445f;
						padding: 0 5px 0 5px;
						font-size: 26px;
					}
				}
				.p_right{
					float: right;
					padding-right:5px;
				}
			}
		}
	}
}

.first{
	left:43%;
}
.firstNo{
	left:45%;
}
.novel-select{
	color: #fc445f !important;
}
.novel-selectno{
	color: #b5b5b5;
}
footer{
	width: 100%;
	.zf{
		width: 75%;
		margin:0 auto;
		margin-top:25px;
		img{
			width: 100%;
			height: 80px;
			margin-top: 40px;
		}
		p{
			width:100%;
			margin:50px auto;
			text-align: center;
			i{
				font-size: 30px;
			}
			span{
				font-size: 24px;
				color: #666666;
				span{
					color: #fc445f;
				}
			}
		}
	}
}

</style>
