import axios from 'axios'

const BASE_URL = 'http://185.244.172.108:8081/v1/outlay-rows/entity/29959/row'

const httpClient = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true
})

export { httpClient }