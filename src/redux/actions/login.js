import {LOGIN_TYPE,DELETE_LOGIN_TYPE} from '../contans'

export const saveUserInfo=data=>
    {
        localStorage.setItem("user",JSON.stringify(data.user))
        localStorage.setItem("token",data.token)
        return {
            type:LOGIN_TYPE,
            data
        }
        
    }
        

export const deleteUserInfo=()=>
    {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        return {
            type:DELETE_LOGIN_TYPE
        }
        
    }