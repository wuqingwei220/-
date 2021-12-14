import {LOGIN_TYPE} from '../constans'
const initDate={
    token:"",
    username:""
}
export default function login (preData=initDate,action){
    const {type,data}=action;
    console.log(preData,data);
    switch (type) {
        case LOGIN_TYPE:
         return  data;
        default:
         return preData;
    }
}