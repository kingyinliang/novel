webpackJsonp([7],{NAmF:function(t,a,o){"use strict";Object.defineProperty(a,"__esModule",{value:!0});o("NYxO");var e=o("dw9j"),s=o("P9l9"),n=o("Au9i"),i={data:function(){return{book:[],Trans:!1,Manatext:!0,collections:[],arr:[],delarr:[],pageNo:1,totalCount:1,allLoaded:!1,bookBlock:!0}},components:{Heads:function(t){o.e(27).then(function(){var a=[o("2Hch")];t.apply(null,a)}.bind(this)).catch(o.oe)},Gotop:function(t){o.e(28).then(function(){var a=[o("ZrgH")];t.apply(null,a)}.bind(this)).catch(o.oe)},footerpage:function(t){o.e(32).then(function(){var a=[o("Yav9")];t.apply(null,a)}.bind(this)).catch(o.oe)}},filters:{tofixed:function(t){return(t/=1e4).toFixed(1)}},mounted:function(){document.getElementsByClassName("sheif")[0].style.width=document.getElementById("Router").offsetWidth+"px"},methods:{getCollections:function(){var t=this;window.document.getElementsByClassName("mint-loadmore-content").scrollTop=0,Object(e.a)(""+s.a.COLLECTIONS_API,"GET",{pageNo:this.pageNo,pageSize:10}).then(function(a){""==a.data.books||void 0==a.data.books?t.bookBlock=!1:(t.bookBlock=!0,t.totalCount=a.data.totalCount,t.totalCount>=4?document.getElementsByTagName("ul")[0].style.paddingBottom="75px":document.getElementsByTagName("ul")[0].style.paddingBottom="0px",1==t.pageNo?t.book=a.data.books:t.book=t.book.concat(a.data.books),t.pageNo++)})},togManagere:function(t,a){-1!==this.arr.indexOf(a)?(this.arr.splice(this.arr.indexOf(a),1),this.delarr.splice(this.delarr.indexOf(a),1)):(this.arr.push(a),this.delarr.push(t))},Manager:function(){this.Trans=!this.Trans,this.Manatext=!this.Manatext,this.arr=[],this.delarr=[]},DeList:function(){var t=this,a=this.delarr.join(",");""!=a&&(n.Indicator.open("删除中..."),Object(e.a)(""+s.a.DELCOLLECTIONS_API,"POST",{book_nums:a},!1,!0).then(function(a){t.allLoaded=!1,t.pageNo=1,t.totalCount=1,t.book=[],t.arr=[],t.delarr=[],n.Indicator.close(),t.getCollections()}))},loadMore:function(){if(this.pageNo>Math.ceil(this.totalCount/10))return this.allLoaded=!0,this.$refs.loadmore.onBottomLoaded(),this.totalCount>=4?document.getElementsByTagName("ul")[0].style.paddingBottom="75px":document.getElementsByTagName("ul")[0].style.paddingBottom="0px",Object(n.Toast)({message:"暂无更多图书",duration:1e3}),!1;this.getCollections(),this.$refs.loadmore.onBottomLoaded()}}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"bookshelf"}},[e("heads",{attrs:{tit:"我的书架"}}),t._v(" "),t.bookBlock?e("nav",{staticClass:"sheif"},[e("div",[e("span",{staticClass:"del",on:{click:t.DeList}},[e("i",{staticClass:"iconfont novel-delete"}),t._v("\n\t\t\t\t\t删除("+t._s(t.arr.length)+")\n\t\t\t\t")]),t._v(" "),e("span",{staticClass:"Manager",on:{click:function(a){t.Manager()}}},[t._v(t._s(1==t.Manatext?"管理":"完成"))])])]):t._e(),t._v(" "),t.bookBlock?e("div",{staticClass:"bookList"},[e("mt-loadmore",{ref:"loadmore",attrs:{"bottom-method":t.loadMore,"bottom-all-loaded":t.allLoaded,"auto-fill":!1}},[e("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":""}},t._l(t.book,function(a,s){return e("li",{key:s,staticClass:"clearfix"},[e("i",{staticClass:"ckbx iconfont",class:{"novel-selectno":-1==t.arr.indexOf(s),"novel-select":-1!==t.arr.indexOf(s)},attrs:{name:"$index"},on:{click:function(o){t.togManagere(a.book_serial_num,s)}}}),t._v(" "),e("router-link",{class:{Listtrans:t.Trans},attrs:{tag:"a",to:{path:"/bookdetail",query:{datailid:a.book_serial_num}}},nativeOn:{click:function(o){t.$store.commit("saveDetailid",a.book_serial_num)}}},[null!=a.cover_img?e("img",{attrs:{src:a.cover_img}}):e("img",{attrs:{src:o("R0jw"),alt:""}}),t._v(" "),e("div",{staticClass:"text"},[e("p",{staticClass:"tit"},[t._v(t._s(a.main_title))]),t._v(" "),e("p",{staticClass:"chapter"},[e("span",{staticClass:"chapter_s1"},[t._v("已读")]),t._v(" "),a.bookReadRecord?e("span",{staticClass:"chapter_s2"},[t._v("第"+t._s(a.bookReadRecord.catalog_num)+"章")]):e("span",{staticClass:"chapter_s2"},[t._v("尚未阅读")]),t._v(" "),a.bookReadRecord?e("span",{staticClass:"chapter_s3"},[t._v(t._s(a.bookReadRecord.title>10?a.bookReadRecord.title.slice(0,10)+"...":a.bookReadRecord.title))]):e("span",{staticClass:"chapter_s3"})]),t._v(" "),e("p",{staticClass:"chapter"},[e("span",{staticClass:"chapter_s1 new_s1"},[t._v("最新")]),t._v(" "),e("span",{staticClass:"chapter_s2"},[t._v("第"+t._s(a.catalogDto.catalog_num)+"章")]),t._v(" "),e("span",{staticClass:"chapter_s3"},[t._v(t._s(a.catalogDto.title.length>10?a.catalogDto.title.slice(0,10)+"...":a.catalogDto.title))])]),t._v(" "),e("p",{staticClass:"Plable"},[e("span",{staticClass:"author"},[t._v(" "+t._s(a.author_name)+" ")]),t._v(" "),e("span",{staticClass:"txtNum"},[t._v(" "+t._s(t._f("tofixed")(a.total_words))+"万字 ")]),t._v(" "),e("span",{staticClass:"state"},[t._v(t._s(0==a.book_status?"连载中":"已完结"))])])])])],1)}))])],1):t._e(),t._v(" "),t.bookBlock?t._e():e("div",{staticClass:"bookCity"},[e("img",{attrs:{src:o("q10G")}}),t._v(" "),e("p",[t._v(" 您的书架还没有书籍哦")]),t._v(" "),e("router-link",{staticClass:"btnHome",attrs:{tag:"div",to:"/home"}},[t._v("去书城看看")])],1),t._v(" "),e("footerpage"),t._v(" "),e("gotop")],1)},staticRenderFns:[]};var c=o("VU/8")(i,l,!1,function(t){o("auPH")},"data-v-95f50d9a",null);a.default=c.exports},auPH:function(t,a){},q10G:function(t,a,o){t.exports=o.p+"static/img/searchNoneIcon.e0b41a5.png"}});