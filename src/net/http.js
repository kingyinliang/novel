/** @module constants/http  */

/**
 * HTTP响应状态枚举
 * @author Nixon
 * @enum {number}
 * @readonly
 */
const HTTP_RESPONSE_STATE = {
  /**
   * 成功
   */
  SUCCESS: 99999
  // Others failure state
}

/**
 * 请求方法
 * @author Nixon
 * @enum {string}
 * @readonly
 */
const HTTP_METHOD = {
  /** GET */
  GET: 'GET',
  /** POST */
  POST: 'POST',
  /** PUT */
  PUT: 'PUT',
  /** PATCH */
  PATCH: 'PATCH',
  /** DELETE */
  DELETE: 'DELETE'
}

export {
  HTTP_RESPONSE_STATE,
  HTTP_METHOD
}
