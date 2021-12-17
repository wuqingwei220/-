import {CATE_GORY_TYPE} from '../contans'
export default  function test(preDatet=[],action){
   const {type,data}=action;

   switch (type) {
       case CATE_GORY_TYPE:
           
           return data;
   
       default:

           return preDatet;
   }
}
