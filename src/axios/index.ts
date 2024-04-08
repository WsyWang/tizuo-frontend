import axios from 'axios'
import { Message } from '@arco-design/web-vue'
import router from '@/router'

export const req = axios.create({
  baseURL: 'http://localhost:9090/api',
  withCredentials: true
})

req.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
req.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  router.push('/404')
  Message.error("请求失败")
  return Promise.reject(error);
});