import axios from 'axios'
import { BACKEND_URL } from '../constants/common'

// axios configuration
export default axios.create({
  baseURL: BACKEND_URL,
})
