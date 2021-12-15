import {combineReducers} from 'redux'

import loginReducer from './login'
import headerTitle from './header'

export default combineReducers({
   saveUserInfo:loginReducer,
   saveHeader:headerTitle

})