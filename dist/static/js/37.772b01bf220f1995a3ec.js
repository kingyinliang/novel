webpackJsonp([37],{CWPy:function(t,a){},Pa1F:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("Dd8w"),n=s.n(e),o=s("NYxO"),i=s("dw9j"),c=s("P9l9"),l=s("Au9i"),u={name:"setcajviewer",data:function(){return{shelvestime:"",book:{},balance:0,autosub:!0,totalCount:1,content:""}},props:{hidepage1:{},page1:{},chapterValuechage:{},chapterValue:{},fontcolor:{},background:{},showsetcaj:{},fontValue:{},gohttpstate:{},loginstate:{},sidebar:{}},watch:{gohttpstate:function(){var t=Math.ceil(this.chapterValue/100*this.totalCount);0===this.chapterValue&&(t=1),this.getcontentnum(t)}},mounted:function(){this.getcontent()},methods:{setautosub:function(){event.cancelBubble=!0,!1===this.autosub?this.autosub=!0:this.autosub=!1},getcontent:function(){var t=this;Object(i.a)(""+c.a.BOOKCONTENT_API,"GET",{catalog_code:this.catalogcode}).then(function(a){t.content=a.data,1===a.data.login_status&&t.getinfo(),1!==t.content.catalog_num?t.hidepage1():Object(i.a)(""+c.a.BOOKSDETAIL_API,"GET",{book_serial_num:t.detailid}).then(function(a){t.book=a.data,t.shelvestime=a.data.shelves_time.toString()}),Object(i.a)(""+c.a.BOOKCATALOGS_API,"GET",{book_serial_num:t.detailid,pageNo:1,pageSize:1,sortType:1}).then(function(a){t.totalCount=a.data.totalCount;var s=parseInt(t.content.catalog_num/t.totalCount*100);1===t.content.catalog_num&&(s=0),t.chapterValuechage(1,s)})})},getinfo:function(){var t=this;Object(i.a)(""+c.a.USERINFO_API,"GET",{}).then(function(a){a.data.balance?t.balance=a.data.balance:t.balance=0})},getcontentnum:function(t){var a=this;Object(i.a)(""+c.a.BOOKCONTENTBYNUM_API,"GET",{book_serial_num:this.detailid,catalog_num:t}).then(function(t){a.content=t.data,a.gotop()})},netcat:function(t){var a=this;return event.cancelBubble=!0,this.content.catalog_num+t<=0?(Object(l.Toast)("没有上一章了哦"),!1):this.content.catalog_num+t>this.totalCount?(Object(l.Toast)("没有下一章了哦"),!1):(this.chapterValuechage(t),void Object(i.a)(""+c.a.BOOKCONTENTBYNUM_API,"GET",{book_serial_num:this.detailid,catalog_num:this.content.catalog_num+t}).then(function(t){a.content=t.data,a.gotop()}))},subscription:function(){var t=this;event.cancelBubble=!0,Object(i.a)(""+c.a.SUBSCRIBETYPE_API,"POST",{subscribeType:this.autosub?1:0},!1,!0).then(function(a){Object(i.a)(""+c.a.SUBSCRIBE_API,"POST",{catalogCodes:t.catalogcode},!1,!0).then(function(a){0===a.data.code?t.$router.push({path:"/cajviewer"}):Object(l.Toast)({message:a.data.msg,duration:2e3})})})}},filters:{tofixed:function(t){return(t/=1e4).toFixed(1)}},computed:n()({},Object(o.c)({catalogcode:function(t){return t.catalogcode.catalogcode},detailid:function(t){return t.detail.detailid}}))},_={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"cajviewrmain",on:{click:t.showsetcaj}},[t.page1?s("div",{staticClass:"page1",on:{click:t.hidepage1}},[s("div",{staticClass:"page1bg"},[s("img",{staticClass:"page1bgimg",attrs:{src:t.book.cover_img,alt:""}}),t._v(" "),s("div",{staticClass:"bg"})]),t._v(" "),s("div",{staticClass:"page1main"},[s("img",{attrs:{src:t.book.cover_img,alt:""}}),t._v(" "),s("p",{staticClass:"tit"},[t._v(t._s(t.book.main_title))]),t._v(" "),s("p",{staticClass:"author"},[t._v("作者:  "+t._s(t.book.author_name)+" ")]),t._v(" "),s("div",{staticClass:"info"},[s("div",{staticClass:"infos"},[s("p",{staticClass:"infostit1"},[t._v(t._s(t.book.class_Name))]),t._v(" "),s("p",{staticClass:"infostit2"},[t._v("类型")])]),t._v(" "),s("div",{staticClass:"infos"},[s("p",{staticClass:"infostit1"},[t._v(t._s(t.shelvestime.length>8?t.shelvestime.substr(0,4)+"-"+t.shelvestime.substr(4,2)+"-"+t.shelvestime.substr(6,2):""))]),t._v(" "),s("p",{staticClass:"infostit2"},[t._v("上架时间")])]),t._v(" "),s("div",{staticClass:"infos"},[s("p",{staticClass:"infostit1"},[t._v(t._s(t._f("tofixed")(t.book.total_words))+"万")]),t._v(" "),s("p",{staticClass:"infostit2"},[t._v(t._s(0==t.book.book_status?"连载":"已完结")+"(字)")])])]),t._v(" "),t._m(0)])]):t._e(),t._v(" "),s("div",{staticClass:"readtxtmain",style:{background:t.background}},[s("div",{staticClass:"readtxt"},[s("p",{staticClass:"readtxttit",style:{color:t.fontcolor}},[t._v("第"+t._s(t.content.catalog_num)+"章  "+t._s(t.content.title))]),t._v(" "),s("p",{staticClass:"dasd",style:{"font-size":t.fontValue+"px","line-height":t.fontValue+15+"px",color:t.fontcolor}},[t._v("\n        "+t._s(t.content.content))])]),t._v(" "),0!=t.content.pay_status?s("div",{staticClass:"cajbtn"},[s("div",{staticClass:"btnitem"},[s("a",{on:{click:function(a){t.netcat(-1)}}},[t._v("上一章")])]),t._v(" "),s("div",{staticClass:"btnitem"},[s("a",{on:{click:t.sidebar}},[t._v("目录")])]),t._v(" "),s("div",{staticClass:"btnitem"},[s("a",{on:{click:function(a){t.netcat(1)}}},[t._v("下一章")])])]):t._e()]),t._v(" "),1==t.content.charge_type&&0==t.content.login_status?s("div",{class:{nologin1:t.loginstate,nologin2:!t.loginstate}},[s("div",{staticClass:"btn"},[s("router-link",{attrs:{tag:"a",to:"/login"}},[t._v("VIP章节请登录阅读")])],1)]):t._e(),t._v(" "),0==t.content.pay_status&&1==t.content.login_status?s("div",{staticClass:"subscription"},[s("div",{staticClass:"subp"},[t._m(1),t._v(" "),s("p",{staticClass:"usergold"},[t._v("价格："+t._s(t.content.catalog_price)+" 有狐币   余额："),s("span",[t._v(t._s(t.balance))]),t._v(" 有狐币 ")]),t._v(" "),s("p",{staticClass:"radio"},[s("i",{staticClass:"iconfont novel-select",class:{"novel-select":t.autosub,"novel-selectno":!t.autosub},on:{click:t.setautosub}}),s("span",[t._v("自动订阅下一章节（可在个人中心取消）")])]),t._v(" "),t.balance<t.content.catalog_price?s("router-link",{staticClass:"subbtn",attrs:{tag:"p",to:"/recharge"}},[t._v("余额不足，立即充值")]):t._e(),t._v(" "),t.balance>=t.content.catalog_price?s("p",{staticClass:"subbtn2",on:{click:t.subscription}},[t._v("立即订阅")]):t._e()],1)]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("p",{staticClass:"page1footer"},[this._v("\n        本书由有狐中文网进行电子制作与发行"),a("br"),this._v(" "),a("span",[this._v("版权所有")]),a("span",[this._v("侵权必究")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",{staticClass:"redp"},[this._v("\n        ——支持作家原创，支持正版阅读——"),a("br"),this._v("\n        需要购买后继续阅读\n      ")])}]};var r=s("VU/8")(u,_,!1,function(t){s("CWPy")},"data-v-7830d96e",null);a.default=r.exports}});