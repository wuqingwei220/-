import ajax from './ajax.js'
import { BASE_URL,AK,DISTRICT_ID,DATA_TYPE} from '../config/index.js'
// import jsonp from 'jsonp'
// import {message} from 'antd'
export const reqLogin=data=>ajax.post(`${BASE_URL}/api/login`,data)
// 获取所有用户列表
export const userList=()=>ajax.get(`${BASE_URL}/api/manage/user/list`)

// 获取天气预报
export const getWeather=()=>ajax.get(`${BASE_URL}/getWeather/weather/v1/`,{
    params:{
        district_id:DISTRICT_ID,
        data_type:DATA_TYPE,
        ak:AK
    }
})

//获取商品的分类
export const getCategory=()=>ajax.get(`${BASE_URL}/api/manage/category/list`)
//修改商品分类
export const reqModifyCategory=(data)=>ajax.post(`${BASE_URL}/api/manage/category/update`,data)

// export const getWeather=()=>{
    // return new Promise((resolve)=>{
    //     jsonp(`https://api.map.baidu.com/weather/v1/?district_id=${DISTRICT_ID}&data_type=${DATA_TYPE}&ak=${AK}`
    //     ,(err,data)=>{
    //         if(err){
    //             message.error("获取天气信息失败，清联系管理员。",1)
    //             return new Promise(()=>{})
    //         }else{
    //             resolve(data)
    //         }
    //     })
    // })
// }





