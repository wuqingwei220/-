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
// 添加分类
export const reqAddCategory=(data)=>ajax.post(`${BASE_URL}/api/manage/category/add`,data)
// 获取商品分页列表
export const reqProductList=(params)=>ajax.get(`${BASE_URL}/api/manage/product/list`,{params})

// 上下架商品manage/product/updateStatus
export const reqUpdateStatus=(data)=>ajax.post(`${BASE_URL}/api/manage/product/updateStatus`,data)

// 商品搜索

export  const reqProductListSearch=(params)=>ajax.get(`${BASE_URL}/api/manage/product/search`,{params})

// 获取商品的详情信息
export const reqProductInfo=(params)=>ajax.get(`${BASE_URL}/api/manage/product/info`,{params})

// 根据分类获取商品的分类
export const reqProductCategory=(params)=>ajax.get(`${BASE_URL}/api/manage/category/info`,{params})


// 删除图片

export const reqDeletePic=(data)=>ajax.post(`${BASE_URL}/api/manage/img/delete`,data)

// 添加商品

export const reqProductAdd=(data)=>ajax.post(`${BASE_URL}/api/manage/product/add`,data)

// 修改商品

export const reqUpdateProduct=(data)=>ajax.post(`${BASE_URL}/api/manage/category/update`,data)


// 获取角色的列表
export const reqRoleList=(params)=>ajax.get(`${BASE_URL}/api/manage/role/list`,{params})

// 新增角色


export const reqRoleAdd=(data)=>ajax.post(`${BASE_URL}/api/manage/role/add`,data)


//给角色分配权限
export const reqRoleAuth=(data)=>ajax.post(`${BASE_URL}/api/manage/role/update`,{...data,auth_time:Date.now()})


// 用户列表
export const reqUserList=()=>ajax.get(`${BASE_URL}/api/manage/user/list`)

// 添加用户

export const reqUserAdd=(data)=>ajax.post(`${BASE_URL}/api/manage/user/add`,data)

// 修改用户
export const reqUserUpdate=(data)=>ajax.post(`${BASE_URL}/api/manage/user/update`,data)


// 删除用户manage/user/delete

export const reqUserDelete=(data)=>ajax.post(`${BASE_URL}/api/manage/user/delete`,data)











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





