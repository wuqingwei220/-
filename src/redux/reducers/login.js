import {LOGIN_TYPE,DELETE_LOGIN_TYPE} from '../contans' 

let user=JSON.parse(localStorage.getItem("user")) 
let token=localStorage.getItem("token")
const inintData={
    user:user||'',
    token:token ||'',
    islogin:user&&token? true: false
}
export default function login(predata=inintData,action){

    const {type,data}=action;

    switch (type) {
        case LOGIN_TYPE:
            return {
                user:data.user,
                token:data.token,
                islogin:true
            };
        case DELETE_LOGIN_TYPE:
            return {
                user:'',
                token:'',
                islogin:false
            };
        default:
           return predata;
    }
}