import ajax from './ajax.js'
import { BASE_URL } from '../config/index.js'
export const reqLogin=data=>ajax.post(`${BASE_URL}/api/login`,data)

