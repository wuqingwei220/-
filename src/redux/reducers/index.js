import {combineReducers} from 'redux'

import loginReducer from './login'
import headerTitle from './header'
import product from './product'
import category from './cateGory'
export default combineReducers({
   saveUserInfo:loginReducer,
   saveHeader:headerTitle,
   productList:product,
   categoryList:category

})