class Storage {
  /**
   * 本地存储方案
   * @class
   * @memberof module:novelutils
   * @desc 为了兼容老版本, 使用cookie作为存储介质. 你不需要new()
   * @returns {Storage}
   */
  constructor () {
    this.path = '/'
  }

  /**
   * 清除所有的Cookie
   * @function clean
   * @memberof module:novelutils.Storage#
   */
  clean () {
    console.log('清除所有cookie')

    let cookies = document.cookie.split(';')
    if (cookies.length > 0) {
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i]
        let eqPos = cookie.indexOf('=')
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=' + this.path
      }
    }
  }

  /**
   * 获取Cookie数据
   * @function getData
   * @memberof module:novelutils.Storage#
   * @param {string} key 存储数据使用的键
   * @returns {any}
   */
  getData (key) {
    let cookies = window.document.cookie.split(';')
    for (let i = 0, item = cookies[i]; item; item = cookies[++i]) {
      let [name, value] = item.split('=')
      if (key === name.trim()) {
        return unescape(value)
      } else {
        return ''
      }
    }
    // console.log(`从未设置过key为${key}的Cookie`)
  }

  /**
   * 设置Cookie数据
   * @function setData
   * @memberof module:novelutils.Storage#
   * @param {string} key 存储数据使用的键
   * @param {any} value 需要存储的数据
   * @param {number} [expires_in] 有效期
   */
  setData (key, value, expires_in = 3600000) {
    let expires = new Date()
    expires.setTime(expires.getTime() + expires_in * 1000)
    let cookieValue = `${key}=${escape(value)};expires=${expires.toGMTString()};path=${this.path}`
    window.document.cookie = cookieValue
  }

  /**
   * 获取Cookie数据对象
   * @function getObjectData
   * @memberof module:novelutils.Storage#
   * @param {string} key 存储数据使用的键
   * @returns {object}
   */
  getObjectData (key) {
    let value = this.getData(key)
    if (value) {
      return JSON.parse(value)
    } else {
      return null
    }
  }

  /**
   * 设置Cookie存储数据对象
   * @function setObjectData
   * @memberof module:novelutils.Storage#
   * @param {string} key 存储数据使用的键
   * @param {any} value 需要存储的数据
   * @param {number} [expires_in] 有效期
   */
  setObjectData (key, value, expires_in) {
    this.setData(key, JSON.stringify(value), expires_in)
  }
  /**
   * 生成游客唯一标识
   * @function generateUUID
   * @param {string} key 存储数据使用的键
   * @param {any} value 需要存储的数据
   * @param {number} [expires_in] 有效期
   */
  generateUUID () {
    var d = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
  }
}

/**
 * 存储鉴权token的key
 * @memberof module:novelutils
 * @constants
 * @type {string}
 */
export const AUTHORIZATION_KEY = 'client_authorization_token'
export const VISITORID_KEY = 'header_visitorid'

export default new Storage()
