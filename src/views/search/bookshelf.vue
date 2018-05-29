<template>
	<div id="bookshelf">

 		<heads :tit="'我的书架'"></heads>

		<nav class="sheif" v-if="bookBlock">
			<div>
				<span class="del" @click="DeList">
					<i class="iconfont novel-delete"></i>
					删除({{arr.length}})
				</span>
			    <span class="Manager" @click="Manager()">{{ Manatext==true? '管理':'完成' }}</span>
			</div>
		</nav>

		<div class="bookList"  v-if="bookBlock">
			<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
			      <ul v-infinite-scroll="loadMore"
         		 	infinite-scroll-disabled="loading"
          			infinite-scroll-distance="">
			        <li class="clearfix" v-for="(item, $index) in book" :key="$index">
			            <i class="ckbx iconfont" name="$index" v-bind:class='{"novel-selectno":arr.indexOf($index)==-1,"novel-select":arr.indexOf($index)!==-1}'  @click="togManagere(item.book_serial_num, $index)"></i>
				        <router-link tag="a" :to="{path:'/bookdetail',query: {datailid: item.book_serial_num}}" v-bind:class='{"Listtrans" : Trans}' @click.native="$store.commit('saveDetailid', item.book_serial_num)">

				              <img :src="item.cover_img" v-if="item.cover_img!=null">
            				  <img src="../../assets/img/listimg.jpg" alt="" v-else>

					            <div class="text">
						              <p class="tit">{{item.main_title}}</p>
						              <p class="chapter">
						              	<span class="chapter_s1">已读</span>
							              	<span class="chapter_s2" v-if="item.bookReadRecord">第{{item.bookReadRecord.catalog_num}}章</span>
							              	<span class="chapter_s2" v-else>尚未阅读</span>
							                <span class="chapter_s3" v-if="item.bookReadRecord" >{{item.bookReadRecord.title>10? item.bookReadRecord.title.slice(0, 10)+'...':item.bookReadRecord.title}}</span>
						              		<span class="chapter_s3" v-else></span>
						              </p>
						              <p class="chapter">
						              	<span class="chapter_s1 new_s1">最新</span>
						              	<span class="chapter_s2">第{{item.catalogDto.catalog_num}}章</span>
						              	<span class="chapter_s3">{{item.catalogDto.title.length>10? item.catalogDto.title.slice(0, 10)+'...':item.catalogDto.title}}</span>
						              </p>
						              <p class="Plable">
								                <span class="author"> {{item.author_name}} </span>
								                <span class="txtNum"> {{item.total_words | tofixed}}万字 </span>
								                <span class="state">{{ item.book_status==0? '连载中':'已完结' }}</span>
								      </p>
					            </div>
				          </router-link>
			        </li>
			     </ul>
			</mt-loadmore>
	    </div>

	    <div class="bookCity"  v-if="!bookBlock">
	    		<img src="../../assets/img/login_register_forgot_imgs/searchNoneIcon.png" />
	    		<p> 您的书架还没有书籍哦</p>
	    		<router-link tag="div" to="/home" class="btnHome">去书城看看</router-link>
	    </div>

	    <footerpage></footerpage>
	    <gotop></gotop>
	</div>
</template>

<style scoped="scoped" lang="less">
@import '../../assets/css/mint.css';
	#Router{
		height:100%;
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
		.btnHome{
			width: 600px;
			height: 90px;
			background-color: #ff3d58;
			margin: 0 auto;
			border-radius: 6px;
			color: #fff;
			line-height: 90px;
			margin-top:100px;
		}
	}
	.clearfloat{
		clear:both
	}
	.Router{
		padding-bottom: 0px;
	}
	.sheif{
			background: #f7f8fa;
			width: 100%;
			height: 80px;
			position: fixed;
			z-index: 99;
			margin-top:-2px;
		 div{
			width: 89%;
			margin:0 auto;
			height: 80px;
			span{
				display: inline-block;
				height: 80px;
				line-height: 80px;
				font-size: 28px;
			}
			.del{
				color: #ff4f69;
			}
			.Manager{
				color: #626262;
				float: right;
			}

		 }
	}
.novel-select{
	color: #fc445f !important;
}
.bookList{
  width: 100%;
  margin-top:80px;
  position: relative;
  z-index: 9;
  height: auto;
  ul{
     padding: 0 38px;
     background: white;
     height: auto;
   }

  li{
    list-style: none;
    padding: 44px 5px;
    border-bottom: solid 1px #eeeeee;
    overflow: hidden;
	position: relative;
    a{
		display: block;
		position: relative;
		z-index: 999;
	    transition: all 0.2s;
	    -webkit-transition: all 0.15s;
	}
	.Listtrans{
		 transform:translate(70px);
	}
    img{
      width: 134px;
      height: 182px;
      float: left;
      background: white;
      box-shadow: 0px 2px 7.76px 0.24px rgba(181, 181, 181, 0.63);
    }
    .text{
       float: left;
       margin-left: 46px;
       max-width: 483px;
       width: 100%;
      .tit{
        font-size: 30px;
        color: #333333;
        margin-bottom: 10px;
        font-family: PingFangSC-Medium;

      }

     .chapter{
     	height: 50px;
     	span{
     		display:inline-block;
     		text-align: center;
     		font-size: 22px;
     		color: #999999;
     	}
     	.chapter_s1{
     		padding: 3px 15px;
     		line-height: 32px;
     		background: #fff;
     		border-radius: 15px;
			border: solid 2px #eeeeee;
     	}
     	.chapter_s2{
     		margin-left:20px
     	}
     	.chapter_s3{
     		margin-left:30px;
     	}
     	.new_s1{
     		background-color: #ff86a0;
     		color: #fff;
     	}
     }

     .Plable{
      	height: 43px;
      	line-height: 43px;
        color:#666666;
        font-size: 22px;
        width: 100%;
        .txtNum{
        	margin-left:20px
        }
        .state{
        	float: right;
        	padding:5px 15px;
        	background-color: #f7f7f9;
			border-radius: 6px;
        }
      }
    }
     .ckbx{
      	position: absolute;
      	font-size: 40px;
		top: 50%;
		margin-top: -28px;
		color:#b5b5b5;
      }
  }
  li:last-child{
  	border-bottom: solid 0px;
  }
}
</style>
<script>
import { mapState } from 'vuex'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import {Toast,Indicator,Loadmore,MessageBox} from 'mint-ui'
export default{
		data(){
			return {
				book:[],
				Trans:false,
				Manatext:true,
				collections:[],
				arr:[],
				delarr:[],
				pageNo:1,
				totalCount: 1,
				allLoaded: false,
				bookBlock:true
			}
		},
  		components: {
		    Heads: resolve => {
		      require(['@/components/head'], resolve)
		    },
		    Gotop: resolve => {
		      require(['@/components/gotop'], resolve)
		    },
		    footerpage: resolve => {
     	 	require(['@/components/footerpage'], resolve)
    		}
		 },
		  filters: {
		    tofixed: function (value) {
		      value = value / 10000
		      return value.toFixed(1)
		    }
		  },
		mounted(){
			document.getElementsByClassName("sheif")[0].style.width = document.getElementById('Router').offsetWidth +"px"
		},
		methods:{
			getCollections:function(){
				window.document.getElementsByClassName('mint-loadmore-content').scrollTop = 0
				/*获取收藏*/
				httoProxy(`${HOME_API.COLLECTIONS_API}`, 'GET',{
					pageNo:this.pageNo,
					pageSize:10
				}).then(res => {
					 if(res.data.books=="" || res.data.books == undefined){
					 	this.bookBlock = false
					 }else{
					 		this.bookBlock = true
	          				this.totalCount = res.data.totalCount
	          				if(this.totalCount >= 4){
								document.getElementsByTagName("ul")[0].style.paddingBottom=75+"px"
	          				}else{
	          					document.getElementsByTagName("ul")[0].style.paddingBottom=0+"px"
	          				}
					      	if(this.pageNo==1){
					      		this.book = res.data.books
					      	}else{
					      		this.book = this.book.concat(res.data.books)
					      	}
					      	this.pageNo++
				     }

			  })
			},
			togManagere:function(item,$index){
				if (this.arr.indexOf($index)!==-1){
					this.arr.splice(this.arr.indexOf($index),1)
					this.delarr.splice(this.delarr.indexOf($index),1)
				}else{
					this.arr.push($index)
					this.delarr.push(item)
				}
			},
			Manager:function(){
				this.Trans = !this.Trans
				this.Manatext = !this.Manatext
				this.arr=[]
				this.delarr=[]
			},
			DeList:function(){
				 let book_nums  =  this.delarr.join(",")
				 if(book_nums!= ""){
				 		Indicator.open('删除中...')
					 	httoProxy(`${HOME_API.DELCOLLECTIONS_API}`, 'POST',{
							book_nums:book_nums
						 },false,true).then(res => {
						 	  this.allLoaded = false
						 	  this.pageNo = 1
						 	  this.totalCount=1
						 	  this.book=[]
						      this.arr=[]
							  this.delarr=[]
							  Indicator.close()
						      this.getCollections()							  
				   		})
				 }
			},
		    loadMore(){
		    	if (this.pageNo > Math.ceil(this.totalCount / 10)) {
					    this.allLoaded = true
					    this.$refs.loadmore.onBottomLoaded()
					   if(this.totalCount >= 4){
							document.getElementsByTagName("ul")[0].style.paddingBottom=75+"px"
          				}else{
          					document.getElementsByTagName("ul")[0].style.paddingBottom=0+"px"
          				}
					    Toast({message: '暂无更多图书', duration: 1000})
					    return false
				}else {
						this.getCollections()
				        this.$refs.loadmore.onBottomLoaded()
				       }
		    }
		}
	}
</script>
