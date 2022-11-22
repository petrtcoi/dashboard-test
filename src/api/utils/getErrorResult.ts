import { ApiResultError } from "../typings/api.type"
import { AxiosResponse } from 'axios'

export const getErrorResult = (result: AxiosResponse, status?: number): ApiResultError => {
  return ({
    status: status !== undefined ? status :result.status,
    error: (
      (result.data.error) &&
      (typeof result.data.error === 'string')
    ) ?
      result.data.error :
      'Что-то пошло не так'
  })
}