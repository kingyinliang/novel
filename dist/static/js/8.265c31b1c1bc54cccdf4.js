webpackJsonp([8],{B7qk:function(t,e){},GSpQ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("Dd8w"),s=a.n(o),i=a("NYxO"),n=a("dw9j"),c=a("P9l9"),l=a("Au9i"),r={data:function(){return{section:!1,Nosearch:!1,boxlist:!1,History:!1,DoCode:!0,holder:"请输入搜索词",bookList:[],getSearchList:[],pageNo:1,totalCount:1,allLoaded:!1,input_value:""}},components:{Gotop:function(t){a.e(28).then(function(){var e=[a("ZrgH")];t.apply(null,e)}.bind(this)).catch(a.oe)},qrcode:function(t){a.e(29).then(function(){var e=[a("VIRL")];t.apply(null,e)}.bind(this)).catch(a.oe)}},filters:{tofixed:function(t){return(t/=1e4).toFixed(1)}},mounted:function(){this.getSearchHistory(),""!=this.input_value1&&(document.getElementById("box").value=this.input_value1,this.input_value=this.input_value1),document.getElementsByClassName("search_header")[0].style.width=document.getElementById("Router").offsetWidth+"px"},methods:{getSearchHistory:function(){var t=this;Object(n.a)(""+c.a.GETSEARCHHISTORY_API,"GET").then(function(e){t.getSearchList=e.data,""!=e.data&&(t.section=!0)})},start:function(t){t=window.event||t;this.pageNo=1,13==t.keyCode&&(this.input_value=document.getElementById("box").value,""!==this.input_value&&(l.Indicator.open("搜索中..."),this.pageNo=1,this.totalCount=1,this.allLoaded=!1,this.bookList=[],this.searchList())),""==document.getElementById("box").value&&(this.section=!0,this.DoCode=!0,this.Nosearch=!1,this.boxlist=!1,this.getSearchHistory());var e=document.getElementById("box").value.length;document.getElementById("box").value.replace(/[^\x00-\xff]/g,"01").length>=32&&(document.getElementById("box").maxLength=e)},searchList:function(){var t=this;Object(n.a)(""+c.a.SEARCH_API,"GET",{pageNo:this.pageNo,pageSize:10,param:this.input_value}).then(function(e){l.Indicator.close(),""==e.data||0==e.data.books.length?(t.section=!1,t.DoCode=!0,t.boxlist=!1,t.Nosearch=!0):(t.section=!1,t.DoCode=!1,t.Nosearch=!1,t.boxlist=!0,t.bookSc=!1,t.totalCount=e.data.totalCount,t.bookList=e.data.books)})},keyPtxt:function(t){var e=t.target.innerText;this.input_value=e,document.getElementById("box").value=this.input_value,this.pageNo=1,this.totalCount=1,this.allLoaded=!1,this.bookList=[],l.Indicator.open("搜索中..."),this.searchList()},loadMore:function(){var t=this;if(this.pageNo>Math.ceil(this.totalCount/10))return this.allLoaded=!0,this.$refs.loadmore.onBottomLoaded(),Object(l.Toast)({message:"暂无更多图书",duration:1e3}),!1;Object(n.a)(""+c.a.SEARCH_API,"GET",{pageNo:this.pageNo,pageSize:10,param:this.input_value}).then(function(e){t.section=!1,t.DoCode=!1,t.Nosearch=!1,t.boxlist=!0,t.bookSc=!1,t.totalCount=e.data.totalCount,1===t.pageNo?t.bookList=e.data.books:t.bookList=t.bookList.concat(e.data.books),t.$refs.loadmore.onBottomLoaded(),t.pageNo++})}},computed:s()({},Object(i.c)({input_value1:function(t){return t.search.searchcontent}}))},d={render:function(){var t=this,e=this,o=e.$createElement,s=e._self._c||o;return s("div",{attrs:{id:"search"}},[s("header",{staticClass:"search_header"},[s("div",{staticClass:"search-top"},[e._m(0),e._v(" "),s("div",{staticClass:"input_place"},[s("input",{attrs:{type:"text",placeholder:e.holder,id:"box"},on:{keyup:e.start}})]),e._v(" "),s("span",{staticClass:"text_qx",on:{click:function(){t.$router.goBack()}}},[e._v("取消")])])]),e._v(" "),e.section?s("section",{staticClass:"search_section"},[e._m(1),e._v(" "),s("strong",[e._l(e.getSearchList,function(t,a){return s("p",{key:a,on:{click:function(t){e.keyPtxt(t)}}},[e._v("\n\t\t\t\t\t\t"+e._s(t.keywords)+"\n\t\t\t\t\t")])}),e._v(" "),s("div",{staticClass:"clearfloat"})],2)]):e._e(),e._v(" "),s("mt-loadmore",{ref:"loadmore",attrs:{"bottom-method":e.loadMore,"bottom-all-loaded":e.allLoaded,"auto-fill":!1}},[e.boxlist?s("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.loadMore,expression:"loadMore"}],staticClass:"searchList",attrs:{id:"bookList","infinite-scroll-disabled":"loading","infinite-scroll-distance":""}},e._l(e.bookList,function(t,o){return s("li",{key:o},[s("router-link",{attrs:{tag:"a",to:{path:"/bookdetail",query:{datailid:t.book_serial_num}}},nativeOn:{click:function(a){e.$store.commit("saveDetailid",t.book_serial_num)}}},[null!=t.cover_img?s("img",{attrs:{src:t.cover_img}}):s("img",{attrs:{src:a("R0jw"),alt:""}}),e._v(" "),s("div",{staticClass:"searchText"},[s("p",{staticClass:"searchTit"},[e._v(" "+e._s(t.main_title)+" ")]),e._v(" "),s("p",{staticClass:"searchTxt"},[e._v(" "+e._s(t.summary))]),e._v(" "),s("p",{staticClass:"PlableLeft Plable"},[s("span",[e._v(" "+e._s(t.author_name)+" ")]),e._v(" "),s("span",[e._v(" "+e._s(e._f("tofixed")(t.total_words))+"万字 ")])]),e._v(" "),s("p",{staticClass:"PlableRight Plable"},[s("span",[e._v(" "+e._s(t.class_Name)+" ")]),e._v(" "),s("span",[e._v(e._s(0==t.book_status?"连载中":"已完结"))])])])])],1)})):e._e()]),e._v(" "),e.Nosearch?s("section",{staticClass:"search_section"},[s("img",{staticClass:"NoneIcon",attrs:{src:a("q10G")}}),e._v(" "),s("p",{staticClass:"NoText"},[e._v("未搜到相关书籍")])]):e._e(),e._v(" "),s("div",{staticClass:"fot_bom"},[e.DoCode?s("qrcode"):e._e()],1),e._v(" "),s("gotop")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"search_1"},[e("i",{staticClass:"iconfont novel-search"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("aside",[e("i",{staticClass:"iconfont novel-history"}),this._v(" "),e("span",{staticClass:"box-text"},[this._v("\n\t\t\t\t\t\t搜索历史：\n\t\t\t\t\t")]),this._v(" "),e("div",{staticClass:"clearfloat"})])}]};var u=a("VU/8")(r,d,!1,function(t){a("B7qk")},"data-v-654d5f0e",null);e.default=u.exports},q10G:function(t,e,a){t.exports=a.p+"static/img/searchNoneIcon.e0b41a5.png"}});