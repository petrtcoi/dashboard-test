import axios from 'axios'
import { BASE_URL } from './config/api-config'

const httpClient = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true
})

export { httpClient }