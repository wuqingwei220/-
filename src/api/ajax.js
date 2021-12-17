import axios from 'axios'
import qs from 'query-string'
import {message} from 'antd'
import NProgress from 'nprogress'
import store from '../redux/store'
import {deleteUserInfo} from '../redux/actions/login'
// 创建axios实例对象
const fetch = axios.create({
    timeout:4000
})


fetch.interceptors.request.use((config)=>{
    NProgress.start()
    
    const {method,data,headers}=config;
    const {token} =store.getState().saveUserInfo;
    if(token) headers.authorization=token
    if(method==="post"){
        if(data instanceof Object){
            config.data=qs.stringify(data)
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
    if(error.response.status===401){
        message.error("校验用户名失败，请重新登录。",1)
        store.dispatch(deleteUserInfo())
    }else{
        message.error(error.message,1)
    }
    console.log("error",error)
  return new Promise(()=>{})
})

export default fetch;