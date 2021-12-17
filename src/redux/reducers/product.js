import {PRODUCT_TYPE} from '../contans'



export default function productReducer(preData=[],action){
  const {type,data}=action;

  switch (type) {
      case PRODUCT_TYPE:
          
          return data;
  
      default:
          return preData;
  }
}