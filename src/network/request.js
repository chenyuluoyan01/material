import axios from 'axios'
import Qs from 'qs'

// 相对路径设置
axios.defaults.baseURL = '/api'
// 设置默认请求头
axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded"     // 设置传输类型(json,form表单)
    // "token": localStorage.getItem('token')    // token
}
  
axios.defaults.timeout = 10000  // 响应时间
export default {
    /**
     * 封装get方法
     * @param url
     * @param params
     * @returns {Promise}
     */

    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {params: params})
                .then(res => {
                    resolve(res.data)
                })
                .catch(res => {
                    reject(res)
                })
        })
    },

    /**
     * post方法，对应post请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */

    post(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, Qs.stringify(params))
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
}
