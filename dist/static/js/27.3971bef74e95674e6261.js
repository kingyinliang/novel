webpackJsonp([27],{"2Hch":function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e={name:"heads",data:function(){return{toplist:!1}},props:{tit:{},rigister:{},rechright:{},wechat:{},checkall:{}},methods:{showtoplist:function(){!0===this.toplist?this.toplist=!1:this.toplist=!0},close:function(){this.toplist=!1}},components:{Toplist:function(t){s.e(34).then(function(){var i=[s("ILqn")];t.apply(null,i)}.bind(this)).catch(s.oe)}}},c={render:function(){var t=this,i=this,s=i.$createElement,e=i._self._c||s;return e("div",[e("header",[e("i",{staticClass:"iconfont novel-back goback",on:{click:function(){t.$router.goBack()}}}),i._v(" "),e("p",{staticClass:"tit"},[i._v(i._s(i.tit))]),i._v(" "),i.rigister||i.rechright||i.wechat?i._e():e("p",{staticClass:"headIcon"},[e("router-link",{attrs:{tag:"a",to:"/search"},nativeOn:{click:function(t){i.$store.commit("saveSearchcontent","")}}},[e("i",{staticClass:"iconfont novel-search"})]),i._v(" "),e("a",{on:{click:i.showtoplist}},[e("i",{staticClass:"iconfont novel-tab"})])],1),i._v(" "),i.rigister?e("p",{staticClass:"headIcon"},["注册"==i.rigister?e("router-link",{staticClass:"toRigister",attrs:{tag:"a",to:"/register"}},[i._v(i._s(i.rigister))]):i._e(),i._v(" "),"全选"==i.rigister?e("a",{on:{click:i.checkall}},[i._v(i._s(i.rigister))]):i._e()],1):i._e(),i._v(" "),i.rechright?e("p",{staticClass:"headIcon"},[e("router-link",{staticClass:"toRigister",attrs:{tag:"a",to:"/record"}},[i._v(i._s(i.rechright))])],1):i._e()]),i._v(" "),e("toplist",{attrs:{popupVisible:i.toplist,clickfn:i.close}})],1)},staticRenderFns:[]};var o=s("VU/8")(e,c,!1,function(t){s("D9UO")},"data-v-b9577020",null);i.default=o.exports},D9UO:function(t,i){}});