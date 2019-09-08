import axios from 'axios';
import vue from '../main'

const api = axios.create({
  baseURL: 'http://127.0.0.1:6655/api/v1/',
  timeout: 10000,
});

//axios.interceptors
api.interceptors.request.use((config) => {
  console.log(config);
  console.log(vue.$store.state.userinfo);
  // 如果登录了  api请求携带请求头
  let token = vue.$store.state.userinfo.token
  if (token) {
    config.headers['Authorization'] = 'JWT '+token;
  }
  return config
},(err)=>{
  console.log('这是axios拦截器产生的错误');
  return Promise.reject(err)
});


export default api
