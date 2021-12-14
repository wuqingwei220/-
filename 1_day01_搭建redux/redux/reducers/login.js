import {LOGIN_TYPE} from '../constans'
const initDate='hello'
export default function login (preData=initDate,action){
    const {type,data}=action;
    switch (type) {
        case LOGIN_TYPE:
         return  preData+data;
    
        default:
         return preData;
    }


}