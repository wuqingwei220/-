import {ADD_TITLE} from '../contans'

export default function headerTitle(preData='',action){
    const {type,data}=action;
    switch (type) {
        case ADD_TITLE:
            
           return data;
    
        default:
            return preData;
    }
}