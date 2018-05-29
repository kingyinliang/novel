import axios from 'axios'
import { HTTP_METHOD } from './http'
import storage, { AUTHORIZATION_KEY, VISITORID_KEY } from '../novelutils/storage'

/*
* @method httpProxy
* @param {string} url api地址
* @param {string} [method] {@link module:constants/http method}
* */
export default (url, method = HTTP_METHOD.GET, data = {}, credentials = false, ContentType = false) => {
  const options = {
    url,
    method,
    headers: {
      // 'Access-token': storage.getData(AUTHORIZATION_KEY) || 'token will be here'
    },
    withCredentials: credentials
  }
  if (storage.getData(AUTHORIZATION_KEY)) {
    options.headers['Access-token'] = storage.getData(AUTHORIZATION_KEY)
  }

  if (window.localStorage.getItem(VISITORID_KEY)) {
    options.headers['Tourist-uuid'] = window.localStorage.getItem(VISITORID_KEY)
  }
  if (ContentType) {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    options.transformRequest = [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  }

  // http request 拦截器
  // axios.interceptors.request.use(
  //   options => {
  //     options.headers.token = `2rwtXbMe8kDnumfj0Wl+w3bnfn+DQSITuhF1m/esVqoH6LA+3FJ+io773rc=`
  //     return options
  //   },
  //   err => {
  //     return Promise.reject(err)
  //   }
  // )
  if (method !== HTTP_METHOD.GET) {
    // options.headers['Accept'] = 'application/json';
    // options.headers['Content-Type'] = 'application/json;charset=UTF-8';
    options.data = data
  }
  if (method === HTTP_METHOD.GET) {
    options.params = data
  }

  return axios(options)
}
