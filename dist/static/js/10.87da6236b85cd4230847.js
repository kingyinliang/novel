webpackJsonp([10],{"1sOY":function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});t("Qbok"),t("HY2O");var o=t("dw9j"),r=t("P9l9"),i=t("Au9i"),n=localStorage.header_visitorid,a={name:"register",components:{Heads:function(e){t.e(27).then(function(){var s=[t("2Hch")];e.apply(null,s)}.bind(this)).catch(t.oe)},qrcode:function(e){t.e(29).then(function(){var s=[t("VIRL")];e.apply(null,s)}.bind(this)).catch(t.oe)}},data:function(){return{postMsgKey:!0,checkUserPhone:!0,checkUserPass:!0,checkUserPassSure:!0,ImgMsg:!0,PhoneMsg:!0,registerPhone:"",registerPassWord:"",registerPassWordSure:"",registerPhoneMsg:"",registerImgMsg:"",picCode:"",postPhoneMsgCode:!1,postPhoneCode:!0,errCount:0,sendInfo:!0,show:!0,count:"",timer:null}},mounted:function(){this.picCodeFun(n)},methods:{picCodeFun:function(e){var s=this;Object(o.a)(""+r.a.USERCAPTCHA_API,"GET",{uuid:e}).then(function(e){s.picCode=e.data})},checkPhone:function(e){/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[89])[0-9]{8}$/.test(this.registerPhone)?(this.checkUserPhone=!0,this.postPhoneMsgCode=!0):(this.checkUserPhone=!1,this.postPhoneMsgCode=!1,Object(i.Toast)({message:"*手机号输入错误！",duration:1e3}))},checkPassWord:function(){/^[\w]{6,12}$/.test(this.registerPassWord)?this.checkUserPass=!0:(this.checkUserPass=!1,Object(i.Toast)({message:"*请输入6-16位数字/字母组成的密码！",duration:1e3}))},checkPassWordSure:function(){this.registerPassWordSure==this.registerPassWord?this.checkUserPassSure=!0:(this.checkUserPassSure=!1,console.log("test"),Object(i.Toast)({message:"*密码不一致！",duration:1e3}))},checkImgMsg:function(e){this.registerImgMsg?this.ImgMsg=!0:(this.ImgMsg=!1,Object(i.Toast)({message:"*验证码输入错误！",duration:1e3}))},checkPhoneMsg:function(e){this.registerPhoneMsg?this.PhoneMsg=!0:(this.PhoneMsg=!1,Object(i.Toast)({message:"*请输入验证码！",duration:1e3}))},postPicMsg:function(e){this.picCodeFun(n)},getCode:function(){var e=this;this.timer||(this.count=60,this.show=!1,this.timer=setInterval(function(){e.count>0&&e.count<=60?e.count--:(e.show=!0,e.postPhoneCode=!0,clearInterval(e.timer),e.timer=null)},1e3))},postPhoneMsg:function(e){var s=this;this.postPhoneMsgCode&&this.postPhoneCode?(this.postPhoneCode=!1,Object(o.a)(""+r.a.POSTPHONEMSG_API,"GET",{uuid:n,mobile:this.registerPhone}).then(function(e){"0"==e.data.code&&s.getCode()})):Object(i.Toast)({message:"手机号不正确",duration:1e3})},userResigter:function(e){var s=this;this.postPhoneMsgCode&&this.registerPassWord&&this.registerPassWordSure&&this.registerImgMsg&&this.registerPhoneMsg?this.sendInfo&&(this.sendInfo=!1,i.Indicator.open(),Object(o.a)(""+r.a.USERREGISTER_API,"POST",{account_num:this.registerPhone,password:this.registerPassWord,true_password:this.registerPassWordSure,verificate_code:this.registerImgMsg,mobile_code:this.registerPhoneMsg}).then(function(e){s.sendInfo=!0,i.Indicator.close(),Object(i.Toast)({message:e.data.msg,duration:1e3}),0==e.data.code&&s.$router.push({path:"/login"})})):Object(i.Toast)({message:"请填写完整信息",duration:1e3})}}},c={render:function(){var e=this,s=this,t=s.$createElement,o=s._self._c||t;return o("div",{attrs:{id:"register"}},[o("heads",{attrs:{tit:"注册",rigister:" "}}),s._v(" "),s._m(0),s._v(" "),o("div",{staticClass:"formLogin"},[o("input",{directives:[{name:"model",rawName:"v-model",value:s.registerPhone,expression:"registerPhone"}],ref:"router",attrs:{type:"tel",name:"mobile",placeholder:"请输入手机号",maxlength:"13"},domProps:{value:s.registerPhone},on:{blur:function(e){s.checkPhone()},input:function(e){e.target.composing||(s.registerPhone=e.target.value)}}}),s._v(" "),o("div",{staticClass:"pushMsg"},[o("input",{directives:[{name:"model",rawName:"v-model",value:s.registerImgMsg,expression:"registerImgMsg"}],staticClass:"entry",attrs:{name:"entry",type:"text",placeholder:"请输入验证码"},domProps:{value:s.registerImgMsg},on:{blur:function(e){s.checkImgMsg()},input:function(e){e.target.composing||(s.registerImgMsg=e.target.value)}}}),s._v(" "),o("input",{staticClass:"post",attrs:{type:"image",src:s.picCode},on:{click:s.postPicMsg}})]),s._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:s.registerPassWord,expression:"registerPassWord"}],attrs:{type:"password",name:"password",placeholder:"请设置6-16位数字/字母组成的密码"},domProps:{value:s.registerPassWord},on:{blur:function(e){s.checkPassWord()},input:function(e){e.target.composing||(s.registerPassWord=e.target.value)}}}),s._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:s.registerPassWordSure,expression:"registerPassWordSure"}],attrs:{type:"password",name:"password",placeholder:"请确认密码"},domProps:{value:s.registerPassWordSure},on:{blur:function(e){s.checkPassWordSure()},input:function(e){e.target.composing||(s.registerPassWordSure=e.target.value)}}}),s._v(" "),o("div",{staticClass:"pushMsg"},[o("input",{directives:[{name:"model",rawName:"v-model",value:s.registerPhoneMsg,expression:"registerPhoneMsg"}],staticClass:"entryMsg",attrs:{type:"text",name:"entryMsg",placeholder:"请输入校验码"},domProps:{value:s.registerPhoneMsg},on:{blur:function(e){s.checkPhoneMsg()},input:function(e){e.target.composing||(s.registerPhoneMsg=e.target.value)}}}),s._v(" "),o("span",{directives:[{name:"show",rawName:"v-show",value:s.show,expression:"show"}],staticClass:"postMsg",on:{click:s.postPhoneMsg}},[s._v("获取验证码")]),s._v(" "),o("span",{directives:[{name:"show",rawName:"v-show",value:!s.show,expression:"!show"}],staticClass:"count postMsg"},[s._v(s._s(s.count)+" s")])])]),s._v(" "),o("div",{staticClass:"login_p"},[o("p",{staticStyle:{display:"block","text-align":"center",width:"100%"},attrs:{href:"javascript:;"}},[o("a",{attrs:{href:"javascript:;"}},[s._v("注册即表示同意")]),s._v(" "),o("router-link",{staticClass:"tab-iteam bookCity",attrs:{tag:"a",to:"/agreement"}},[o("i",{staticClass:"k"},[s._v("《有狐阅读服务协议》")])])],1)]),s._v(" "),o("button",{staticClass:"goRegister",attrs:{id:"registerNow"},on:{click:function(e){s.userResigter()}}},[s._v("注册")]),s._v(" "),o("button",{staticClass:"goLogin",attrs:{id:"toLogin"},on:{click:function(){e.$router.goBack()}}},[s._v("用已有账号登录")]),s._v(" "),o("qrcode")],1)},staticRenderFns:[function(){var e=this.$createElement,s=this._self._c||e;return s("div",{staticClass:"logo"},[s("img",{attrs:{src:t("SvvV")}})])}]};var g=t("VU/8")(a,c,!1,function(e){t("uTyA")},null,null);s.default=g.exports},uTyA:function(e,s){}});