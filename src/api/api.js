let HOST = 'http://120.76.236.101:8084'
// let HOST = 'http://192.168.3.117:8082'
/*
*首页api
 */

export const HOME_API = {
  /**
   * @property {string} BANNER_API banner接口
   * @param {string} banner_type 1-首页大Banner，2-首页专题Banner，3-短篇大Banner，4-漫画大Banner，5-书籍详情Banner
   */
  BANNER_API: HOST + '/recommend/banner',
  /**
   * @property {string} CLASSIFY_API 分类列表
   */
  CLASSIFY_API: HOST + '/clazz/getClazzs',
  /**
   * @property {string} BOOKSLIST_API 图书列表
   */
  BOOKSLIST_API: HOST + '/book/books',
  /**
   * @property {string} BOOKSLIST_API 图书详情
   */
  BOOKSDETAIL_API: HOST + '/book/bookEntry',
  /**
   * @property {string} BOOKSLIST_API 获取书籍标签
   */
  BOOKLABLE_API: HOST + '/book/bookLables',
  /**
   * @property {string} BOOKCATALOGS_API 获取目录
   */
  BOOKCATALOGS_API: HOST + '/book/catalogs',
  /**
   * @property {string} BOOKCATALOGS_API 获取书籍最新章节目录
   */
  NEWBOOKCATALOGS_API: HOST + '/book/bookCatalogRecord',
  /**
   * @property {string} BOOKCONTENT_API 获取书籍内容
   */
  BOOKCONTENT_API: HOST + '/book/content',
  /**
   * @property {string} BOOKCONTENTBYNUM_API 根据章节编号获取书籍内容
   */
  BOOKCONTENTBYNUM_API: HOST + '/book/contentByNum',
  /**
   * @property {string} BOOKCOMMENT_API 获取评论
   */
  BOOKCOMMENT_API: HOST + '/review/bookReviews',
  /**
   * @property {string} ADDCOMMENT_API 添加评论
   */
  ADDCOMMENT_API: HOST + '/review/addReview',
  /**
   * @property {string} ADDBOOKRACK_API 添加书架
   */
  ADDBOOKRACK_API: HOST + '/book/setCollection',
  /**
   * @property {string} COMMENTREPLY_API 获取回复
   */
  COMMENTREPLY_API: HOST + '/review/reviewReplys',
  /**
   * @property {string} ADDREPLY_API 添加回复
   */
  ADDREPLY_API: HOST + '/review/addReply',
  /**
   * @property {string} ADDREPLY_API 获取读者信息
   */
  USERINFO_API: HOST + '/reader/info',
  /**
   * @property {string} SUBSCRIBE_API 订阅
   */
  SUBSCRIBE_API: HOST + '/book/subscribe',
  /**
   * @property {string} SUBSCRIBE_API 微信
   */
  WXCODE_API: HOST + '/weixin/weixinCodeCallback',
  /**
   * @property {string} SUBSCRIBE_API 微信
   */
  WXSHARES_API: HOST + '/weixin/weixinApiTicket',
  /**
   * @property {string} LOGIN_API 登录接口
   */
  LOGIN_API: HOST + '/login/login',
  /**
   * @property {string} SUBSCRIBETYPE_API 订阅状态
   */
  SUBSCRIBETYPE_API: HOST + '/reader/subscribeType',
  /**
   * @property {string} LOGIN_API 退出接口
   */
  LOGINOUT_API: HOST + '/login/logout',
      /**
   * @property {string} LOGIN_API 今日限免
   */
  LIMTFRREE_API: HOST + '/recommend/limtFrree',
  /**
   * @property {string} RETRIEVE_API 找回密码
   */
  RETRIEVE_API: HOST + '/login/retrieve',
  /**
   * @property {string} USERREGISTER_API 发送手机验证码
   */
  POSTPHONEMSG_API: HOST + '/common/sendCode',
  /**
   * @property {string} COLUMNS_API 获取专栏推荐
   */
  COLUMNS_API: HOST + '/recommend/columns',
  /**
   * @property {string} USERREGISTER_API 游客注册图片验证码
   */
  USERCAPTCHA_API: HOST + '/captcha',
  /**
   * @property {string} VERTOKEN_API 验证token
   */
  VERTOKEN_API: HOST + '/common/verToken',
  /**
   * @property {string} USERREGISTER_API 验证token
   */
  UPDATENICKNAME_API: HOST + '/reader/updateNickname',
  /**
   * @property {string} CHECKPHONE_API 验证原手机号
   */
  CHECKPHONE_API: HOST + '/reader/checkPhone',
  /**
   * @property {string} BINDPHONE_API 修改手机号
   */
  BINDPHONE_API: HOST + '/reader/bindPhone',
  /**
   * @property {string} USERREGISTER_API 游客注册
   */
  USERREGISTER_API: HOST + '/register/register',
  /* 获取搜索历史 */
  GETSEARCHHISTORY_API: HOST + '/search/getSearchHistory',
  /* 搜索图书 */
  SEARCH_API: HOST + '/book/search',
  /* 书架   -- 收藏*/
  COLLECTIONS_API: HOST + '/book/collections',
  /*删除书架---收藏*/
  DELCOLLECTIONS_API: HOST + '/book/delCollection',
  /*获取读者信息*/
  INFO_API: HOST + '/reader/info',
  //获取订单
  CREATE_API: HOST + '/order/create',
  //消费记录
  CONSUMERECORD_API: HOST + '/reader/consumeRecord',
  //充值记录
  RECHATGERECORD_API: HOST + '/reader/rechargeRecord'
}
