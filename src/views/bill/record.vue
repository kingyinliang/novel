<template>
	<div id="recharge">
		<heads :tit="'账单'" :wechat="wechat"></heads>
		<ul class="tabs">
	        <li class="li-tab" v-for="(item,index) in tabsParam"  @click="toggleTabs(index)" :class="{active:index==nowIndex}">
	          <span> {{item}} </span>
	        </li>
    	</ul>
    	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
    		<div v-infinite-scroll="loadMore"
         		 infinite-scroll-disabled="loading"
          		 infinite-scroll-distance="">
				    	<div class="divTab" v-if="bookBlock">
				    		<div  v-for="(item,$index) in recordArr" :key="$index">
				    		    <p>
				    		    	<span class="leftSp" v-if="item.pay_type">
					    		 		{{item.pay_type==1? '支付宝': item.pay_type==2? '微信': item.pay_type==3? '官方补充':'官方赠送' }}	    		 		
					    		 	</span>
					    		 	
					    		 	<span class="leftSp" v-else>
					    		 		{{item.main_title}}--{{item.title}}	 		 		
					    		 	</span>
					    		 	
					    		 	<span class="timeSp">
					    		 		{{item.pay_time}}	  
					    		 	</span>
					    		 	<span class="rightSp">
					    		 		<span>
					    		 		    {{item.pay_type?"+" : "-"}}{{item.order_money}}狐币
					    		 		</span>
					    		 	</span>
				    		 	</p>
				    		</div>
				    	</div>
			</div>
		</mt-loadmore>	
		<div class="bookCity"  v-if="!bookBlock">
	    		<img src="../../assets/img/searchNull.png" />
	    		<p>{{textNull}}</p>
	    </div>
		<gotop></gotop>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import httoProxy from '@/net/httpProxy'
	import { HOME_API } from '@/api/api'
	import { Toast, Indicator, Loadmore } from 'mint-ui'

	export default {
		data() {
			return {
				wechat:true,
				bookBlock:true,
				tabsParam:['充值记录','消费记录'],
       			nowIndex:0,
       			recordA:[],
       			recordArr:[],
       			pageNo:1,
				totalCount: 1,
				allLoaded: false,
				textNull:"暂无充值记录"
			}
		},
		components: {
		    Heads: resolve => {
		      require(['@/components/head'], resolve)
		    },
		    Gotop: resolve => {
		      require(['@/components/gotop'], resolve)
		    },
		     Gotop: resolve => {
		      require(['@/components/gotop'], resolve)
		    }
		 },
		 mounted(){
			
			httoProxy(`${HOME_API.VERTOKEN_API}`, 'GET', {}).then(res => {
				
			        if (res.data.code !== 0) {
			          	 MessageBox.alert('请登录后查看').then(action => {
				               this.$router.push({path: '/login'})
	            		    })
			         }
			  })
		 },
		 methods: {
			toggleTabs:function(index){
           		 this.nowIndex=index;
           		 this.pageNo=1
				 this.totalCount=1
				 this.allLoaded=false
				 this.recordArr=[]
				 if( this.nowIndex == 0){
				 	 this.getEchatgercord()
				 }else{
				 	 this.getConsumercord()
				 }
       		},		
        	getEchatgercord(){
        		window.document.getElementsByClassName('mint-loadmore-content').scrollTop = 0
        		//充值
        		httoProxy(`${HOME_API.RECHATGERECORD_API}`, 'GET',{
        			pageNo:this.pageNo,
        			pageSize:10
        		}).then(res => {
        			 if(res.data.list=="" || res.data.list == undefined){
        				this.bookBlock = false
        				this.textNull="暂无充值记录"
        			}else{
        				this.bookBlock = true
        				this.totalCount=res.data.totalCount
						if(this.pageNo==1){
	        				this.recordArr = res.data.list
	        				this.pageNo++
	        			}else{
	        				this.recordArr = this.recordArr.concat(res.data.list)
	        				this.pageNo++
	        			}
        			}
			   })
        	},
        	getConsumercord(){
        		window.document.getElementsByClassName('mint-loadmore-content').scrollTop = 0
        		//消费
        		httoProxy(`${HOME_API.CONSUMERECORD_API}`, 'GET',{
        			pageNo:this.pageNo,
        			pageSize:10
        		}).then(res => {
        			 if(res.data.list=="" || res.data.list == undefined){
        				this.bookBlock = false
        				this.textNull="暂无消费记录"
        			}else{
        				this.bookBlock = true
	        			this.totalCount=res.data.totalCount
	        			if(this.pageNo==1){
	        				this.recordArr = res.data.list
	        				this.pageNo++
	        			}else{
	        				this.recordArr =this.recordArr.concat(res.data.list)
	        				this.pageNo++
	        			}	        			
	        		}
			   })
        	},
		    loadMore(){
		    	if (this.pageNo > Math.ceil(this.totalCount / 10)) {
					    this.allLoaded = true
					    this.$refs.loadmore.onBottomLoaded()
					    Toast({message: '暂无更多记录', duration: 1000})
					    return false
				}else {
						if(this.nowIndex==0){
							this.getEchatgercord()
						}else{
							this.getConsumercord()
						}
						
				}
		    }
		}
	}
</script>





<style scoped="scoped" lang="less">
	.Router {
		padding-bottom: 0px;
	}
	
	.bookCity{
		width: 100%;
		margin-top:260px;
		vertical-align: middle;
        text-align: center;
        font-size: 29px;
		img{
			width: 224px;
			height: 143px;
		}
		p{
			font-family: PingFangSC-Medium;
			font-weight: normal;
			font-stretch: normal;
			color: #454f59;
			padding-top: 40px;
		}
	}
	 .active{
        	span{
        		color: #fc445f !important;
				border-bottom: 3px solid #fc445f;
				height: 77px;
		   	    line-height: 77px;
        	}
       }
    .tabs{
    	width: 100%;
		 height: 80px;   	
		 background-color: #ffffff;
		li{
		   list-style: none;
		   float: left;
		   width: 50%;
		   height: 80px;
		   line-height: 80px;
		   text-align: center;
		   span{
			   	 display: block;
			   	 height: 80px;
			   	 line-height: 80px;
			   	 width:116px;
			   	 margin: 0 auto;
			   	 font-size: 27px;
			   	 color: #666666;
			   	 line-height: 80px;
		   }
		}
    }
    
    .divTab{
    	background: #fff;
    	width:100%;
    	padding: 0px;
    	margin:0;
    	div{
    		border-top: 1px solid #eeeeee;
    		width: 100%;
	    	p{
	    		height: 100px;
	    		width:89%;
	    		margin:0 auto;
	    		position: relative;
				span{
					display: block;
					float: left;
					line-height: 100px;
					font-size: 26px;
					color: #333333;
				}
				.leftSp{
					line-height: 70px;
					float: left;
					font-weight: 550;
				}
				.timeSp{
					position: absolute;
					line-height: 20px;
					top:60px;
					font-size: 16px;
					color: 999;
					color: #999999;
				}
				.rightSp{
					float: right;
					position: absolute;
					top:0;
					color: #666666;
					right: 0;
				}
	    	}
    	}
    }  
</style>

