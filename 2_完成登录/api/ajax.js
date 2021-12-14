import axios from 'axios'
import qs from 'query-string'
import {message} from 'antd'
import NProgress from 'nprogress'
// 创建axios实例对象
const fetch = axios.create({
    timeout:4000
})


fetch.interceptors.request.use((config)=>{
    NProgress.start()
    
    const {method,data}=config;

    if(method==="post"){
        if(data instanceof Object){
            config.data=qs.stringify(data)
            console.log(data)
        }
    }
    return config;
})

// Promise.reject() 抛出请求错误信息
// new Promise(()=>{}) 终止promise 不走catch
fetch.interceptors.response.use((res)=>{
  NProgress.done()  
  return res.data;
},error=>{
    NProgress.done()  
    message.error(error.message,1)
  return new Promise(()=>{})
})

export default fetch;