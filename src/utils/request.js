import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url 基础地址，解决不同数据源 url 变化问题
  // withCredentials: true, // 跨域时若要发送 cookie 需设置该项
  timeout: 5000, // 超时
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // do something

    if (store.getters.token) {
      // 设置令牌请求头
      // 后端采用默认配置（规范: http://www.rfcreader.com/#rfc6750_line188）：
      config.headers['Authorization'] = 'Bearer' + getToken()
      // // 后端自定义如：
      // config.headers['x-token'] = getToken()
    }
    return config
  },
  (error) => {
    // 请求错误预处理
    // console.log(error) // for debug
    return Promise.reject(error)
  },
)

// 响应拦截
service.interceptors.response.use(
  // 通过自定义 code 判断响应状态，也可以通过 HTTP 状态码判定
  (response) => {
    // 仅返回数据部分
    const res = response.data
    // 使用自定义状态码判断错误：
    // code 不为 1 则判定为错误
    if (res.code !== 1) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })

      // 假设：10008-非法令牌；10012-其他客户端已登录；10014-令牌过期
      if (res.code === 10008 || res.code === 10012 || res.code === 10014) {
        MessageBox.confirm('登陆状态异常，请重新登录', '确认登录信息', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    // 使用错误码：
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
  },
)

export default service
