import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*', component: resolve => require(['@/404'], resolve)
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: resolve => require(['@/views/home/home'], resolve)
    },
    {
      path: '/list',
      component: resolve => require(['@/views/list/list'], resolve)
    },
    {
      path: '/book',
      component: resolve => require(['@/views/books/booksHome/bookhome'], resolve)
    },
    {
      path: '/login',
      component: resolve => require(['@/views/login_register_forgotPassWord/login'], resolve)
    },
    {
      path: '/register',
      component: resolve => require(['@/views/login_register_forgotPassWord/register'], resolve)
    },
    {
      path: '/forgotPassword',
      component: resolve => require(['@/views/login_register_forgotPassWord/forgotPassword'], resolve)
    },
    {
      path: '/booklist',
      component: resolve => require(['@/views/books/booksList/booksList'], resolve)
    },
    {
      path: '/bookdetail',
      component: resolve => require(['@/views/books/bookdetail/bookdetail'], resolve)
    },
    {
      path: '/bookcomment',
      component: resolve => require(['@/views/books/bookcomment/commentList'], resolve)
    },
    {
      path: '/commentdetail',
      component: resolve => require(['@/views/books/bookcomment/commentDetail'], resolve)
    },
    {
      path: '/cajviewer',
      component: resolve => require(['@/views/books/cajviewer/cajviewerhome'], resolve)
    },
    {
      path: '/subscriptioncata',
      component: resolve => require(['@/views/books/cajviewer/subscriptionCata'], resolve)
    },
    {
      path: '/search',
      component: resolve => require(['@/views/search/search'], resolve)
    },
    {
      path: '/bookshelf',
      component: resolve => require(['@/views/search/bookshelf'], resolve)
    },
    {
      path: '/recharge',
      component: resolve => require(['@/views/bill/recharge'], resolve)
    },
    {
      path: '/record',
      component: resolve => require(['@/views/bill/record'], resolve)
    },
    {
      path: '/wechat',
      component: resolve => require(['@/views/user_center/wechat'], resolve)
    },
    {
      path: '/account',
      component: resolve => require(['@/views/user_center/account'], resolve)
    },
    {
      path: '/user_center',
      component: resolve => require(['@/views/user_center/user_center'], resolve)
    },
    {
      path: '/bind_phone',
      component: resolve => require(['@/views/user_center/bind_phone'], resolve)
    },
    {
      path: '/modify_phone',
      component: resolve => require(['@/views/user_center/modify_phone'], resolve)
    },
    {
      path: '/agreement',
      component: resolve => require(['@/views/user_center/agreement'], resolve)
    },
    {
      path: '/checkPhone',
      component: resolve => require(['@/views/user_center/checkPhone'], resolve)
    }
  ]
})
