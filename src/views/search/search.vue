<template>
	<div id="search">
			<header class="search_header">
				<div class="search-top">
					<span class="search_1">
						<i class="iconfont novel-search"></i>
					</span>
					<div  class="input_place" >
						<input type="text" :placeholder="holder" id="box" autofocus="autofocus" @keyup="start">
					</div>
				    <span class="text_qx" @click="()=>{this.$router.goBack()}">取消</span>
				</div>
			</header>
			 
			<section class="search_section"  v-if="section">
				<aside>
					<i class="iconfont novel-history"></i>
					<span class="box-text">
						搜索历史：
					</span>
					<div class="clearfloat"></div> 
				</aside>
				
				<strong>
					<p  v-for="(item,$index) in getSearchList" :key="$index" @click="keyPtxt($event)">
						{{item.keywords}}
					</p>
					<div class="clearfloat"></div> 
				</strong>
			</section>
			
			<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
				<ul id="bookList" class="searchList" v-if="boxlist" 
					v-infinite-scroll="loadMore"
         		 	infinite-scroll-disabled="loading"
          			infinite-scroll-distance="">
					<li v-for="(item,$index) in bookList" :key="$index">
						<router-link tag="a"  :to="{path:'/bookdetail',query: {datailid: item.book_serial_num}}"  @click.native="$store.commit('saveDetailid', item.book_serial_num)">
				            <img :src="item.cover_img"  v-if="item.cover_img!=null">
            				<img src="../../assets/img/listimg.jpg" alt="" v-else>
				            <div class="searchText">
				              <p class="searchTit"> {{item.main_title}} </p>
				              <p class="searchTxt"> {{item.summary}}</p>
				              <p class="PlableLeft Plable">
				                <span> {{item.author_name}} </span>
				                <span> {{item.total_words | tofixed}}万字 </span>
				              </p> 
				               <p class="PlableRight Plable">
				                    <span> {{item.class_Name}} </span>
					                <span>{{ item.book_status==0? '连载中':'已完结' }}</span>
				               </p>
				            </div>
				          </router-link>
					</li>
				</ul>
			</mt-loadmore>
			
			<section class="search_section"  v-if="Nosearch">
				<img class="NoneIcon" src="../../assets/img/login_register_forgot_imgs/searchNoneIcon.png"/>
				<p class="NoText">未搜到相关书籍</p>
			</section>
			
			<div class="fot_bom">
				<qrcode v-if="DoCode"></qrcode>
			</div>
			 
			 
			 <gotop></gotop>
	</div> 
</template>

<style scoped="scoped">
@import '../../assets/css/mint.css';
	.clearfloat{
		clear:both;
	}
	.fot_bom{
		position: absolute;
		bottom: 5px;
		width: 100%;
	}
	.Router{
		padding: 0px;
	}
	.search_header{
		height: 100px;
		width: 100%;
		background: #fff;
		box-shadow: 0px 1px 19px 1px rgba(214, 221, 238, 0.45);
		-webkit-box-shadow: 0px 1px 19px 1px rgba(214, 221, 238, 0.45);
		-moz-box-shadow: 0px 1px 19px 1px rgba(214, 221, 238, 0.45);
		-ms-box-shadow: 0px 1px 19px 1px rgba(214, 221, 238, 0.45);
		position: fixed;
		top: 0px;
		z-index: 999;
	}
	.nulldiv{
		height: 100px;
	}
	.search_header .search-top{
		width: 93%;
		background: #fff;
		margin-left:3.5%;
		height: 100px;
		line-height: 100px;
		color: #999;
		font-size: 24px;
		position: relative;
	}
	.search_header .search_1{
		width: 74px;
		height: 65px;
		position: absolute;
		background: #F7F7F8;
		left: 6px;
		top:17.5px;
		position: relative;
		border-radius:15px 0 0 15px;
		display: block;
		border:0px;
	}
	.search_1 i{		
  		font-size: 42px;
  		line-height: 70px;
  		float: right;
  		padding-right:12px;
	}
	.input_place{
		height: 65px;		
		width: 530px;
		position: absolute;
		top:17.5px;
		left:78px;
		border-radius:0 15px 15px 0;
		overflow: hidden;
	}
	
	.input_place input{
		width:100%;
		height:100%;
		font-size: 24px;
		outline: none;
		border:none;
		border: 0px;
		margin:0px;
		background: #F7F7F8;
		padding: 0px;
		float: left;
		border-radius:0;
	}
	
	.input_place input::-webkit-input-placeholder{
            color:#999;
        }
    .input_place input::-moz-placeholder{
              color:#999;
        }
    .input_place input::-ms-input-placeholder{
             color:#999;
        }
	.text_qx{
		display: block;
		position: absolute;
		right: 14px;
		top:0px;
		font-size: 24px;
	}
	
	.search_section{
		width: 100%;
		background: #f7f8fa;
		margin-top:100px;
		min-height: 200px;
	}
	.search_section aside{
		width:85%;
		margin:0 auto;
		padding:60px 0 17px 0;
		color: #778093;
		border-bottom: 2px solid #e0e4eb;
	}
	
	.search_section aside span,.search_section aside i{
		display:block;
		line-height: 30px;
		float: left;
	}
	.search_section aside span{
		text-indent: 10px;
	}
	
	.search_section strong{
		padding-top:20px;
		display: block;
		color: #778093;
		width:89%;
		margin:0 auto;
	}
	.search_section strong p{
		float: left;
		height: 65px;
		line-height: 65px;
		padding: 0 25px 0 25px;
		background: #fff;
		border-radius: 45px;
		margin-top:20px;
		margin-left:25px;
		font-size: 23px;
	}
	.box-text{
		font-size: 23px;
	}
	.foot_img{
		position: fixed;
		bottom: 212px;
		left:50%;
		margin-left: -239.5px;
	}
	.search_codeImg{
		  display: block;
		  width: 479px;
	}
		
	.NoneIcon{
		display: block;
		width: 243px;
		height: 143px;
		margin: 263px auto 0 auto;
	}
	.NoText{
		width: 100%;
		text-align: center;
		padding-top: 40px;
		font-size: 29px;
		color: #454f59;
	}
	.searchList{
		  background: white;
		  width: 100%;
		  padding: 100px 38px 0 38px;
		  margin-top:0px;
		  height: auto;
	}
	.searchList li{
		list-style: none;
	    padding: 34px 0;
	    border-bottom: solid 1px #eeeeee;
	    overflow: hidden;
	    position: relative;
	}
	.searchList li a{
		display: block;
		z-index: 999;
	    transition: all 0.2s;
	    -webkit-transition: all 0.2s;;
	}

	 .ckbx{
      	position: absolute;
      	width: 40px;
		height: 40px;
		border: solid 3px #b5b5b5;
		border-radius: 50%;
		top: 50%;
		margin-top: -28px;
      }
	.searchList li img{
		width: 134px;
        height: 182px;
       float: left;
       box-shadow: 0px 2px 7.76px 0.24px rgba(181, 181, 181, 0.63);
	} 
	.searchText{
      float: left;
      margin-left: 46px;
      max-width: 483px;
      min-height: 182px;
      width: 100%;
      }
      .searchTit{
        font-size: 30px;
        color: #333333;
        margin-bottom: 18px;
        font-weight: normal;
		font-stretch: normal;
      }
	.searchTxt{
        font-size: 22px;
        line-height: 33px;
        color: #999999;
        margin-bottom: 25px;
        overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
      }
      .Plable{
      	height: 43px;
      	line-height: 43px;
        color:#666666;
        font-size: 22px;
        margin-bottom: 0px;
      }
      .PlableLeft{
          float: left;
      }
	  .PlableLeft span:nth-child(2){
	  	margin-left:15px ;
	  }
     .PlableRight{
       	float: right;
      }

      .PlableRight span{
          background-color: #f7f7f9;
          border-radius: 6px;
          padding: 10px 16px;
          margin-left: 22px;
      }
</style>



<script>
import { mapState } from 'vuex'
import httoProxy from '@/net/httpProxy'
import {HOME_API} from '@/api/api'
import {Toast, Indicator ,Loadmore } from 'mint-ui'

export default{
		data(){
			return {
				 section:false,
				 Nosearch:false,
				 boxlist:false,
				 History:false,
				 DoCode:true,
				 holder:"请输入搜索词",
				 bookList:[],
				 getSearchList:[],
				 pageNo:1,
				 totalCount: 1,
				 allLoaded: false,
				 input_value:""
			}
		},
		components: {
		    Gotop: resolve => {
		      require(['@/components/gotop'], resolve)
		    },
		    qrcode: resolve => {
		      require(['../home/code'], resolve)
		    }
		 },
		filters: {
		    tofixed: function (value) {
		      value = value / 10000
		      return value.toFixed(1)
		    }
		 },
		mounted(){
			this.getSearchHistory();
			if(this.input_value1!=''){
				document.getElementById('box').value = this.input_value1
				this.input_value = this.input_value1
//				this.searchList()
			}	
			document.getElementsByClassName("search_header")[0].style.width = document.getElementById('Router').offsetWidth +"px"
		},
		methods:{
			getSearchHistory(){	
				/*搜索历史*/
				httoProxy(`${HOME_API.GETSEARCHHISTORY_API}`, 'GET').then(res => {
					this.getSearchList = res.data
			      	if( res.data != ""){
			      		this.section=true
			      	}
			    })
	  		},
			start:function(evt){
					 	var evt = window.event || evt;
					 	this.pageNo = 1					 	
					 	if(evt.keyCode == 13){	
				 	 	 	 this.input_value = document.getElementById('box').value
				 	 	 	  if(this.input_value !== ""){	
				 	 	 	  		Indicator.open('搜索中...')
					 	 	 	  	this.pageNo = 1
					 	 	 	  	this.totalCount=1
									this.allLoaded = false
									this.bookList=[]
				 	 	 			this.searchList()
							  }
						}
					 	if(document.getElementById('box').value == ""){
									this.section=true
									this.DoCode=true
									this.Nosearch=false
									this.boxlist=false
									this.getSearchHistory()	
						}
					 	 let maxlength= document.getElementById('box').value.length 
					 	if(document.getElementById('box').value.replace(/[^\x00-\xff]/g, '01').length >= 32){
							 document.getElementById('box').maxLength=maxlength
						}
			},
			searchList:function(){
				        httoProxy(`${HOME_API.SEARCH_API}`, 'GET',{
								pageNo:this.pageNo,
								pageSize:10,
								param:this.input_value
						}).then(res => {
							Indicator.close()
							if(res.data == "" || res.data.books.length==0){
								this.section=false
					 			this.DoCode=true
					 			this.boxlist=false
					 			this.Nosearch=true
							}else{
								this.section=false
					 			this.DoCode=false
					 			this.Nosearch=false
					 			this.boxlist=true
					 			this.bookSc = false
					 			this.totalCount = res.data.totalCount
							 	this.bookList =res.data.books
							}
						})
			}, 
			keyPtxt:function(e){
				var dom =e.target.innerText
				this.input_value = dom
				document.getElementById('box').value = this.input_value
				this.pageNo = 1
				this.totalCount=1
				this.allLoaded = false
				this.bookList=[]
				Indicator.open('搜索中...')
				this.searchList()
			},
		    loadMore(){
		    	if (this.pageNo > Math.ceil(this.totalCount / 10)) {
					    this.allLoaded = true
					    this.$refs.loadmore.onBottomLoaded()
					    Toast({message: '暂无更多图书', duration: 1000})
					    return false
				}else{
						httoProxy(`${HOME_API.SEARCH_API}`, 'GET',{
								pageNo:this.pageNo,
								pageSize:10,
								param:this.input_value
						}).then(res => {
								this.section=false
					 			this.DoCode=false
					 			this.Nosearch=false
					 			this.boxlist=true
					 			this.bookSc = false
					 			this.totalCount = res.data.totalCount
					 			if(this.pageNo === 1){
							 		this.bookList = res.data.books
							 	}else{
							 		this.bookList =this.bookList.concat(res.data.books)
							 	}
							 	this.$refs.loadmore.onBottomLoaded()
							 	this.pageNo++
						 })
				   }
		    }
		},
		computed:{
			...mapState({
			    input_value1: state => state.search.searchcontent
			 })
		}
	}
</script>
