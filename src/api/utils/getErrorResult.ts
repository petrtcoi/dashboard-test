import { ApiResultError } from "../typings/api.type"
import { AxiosResponse } from 'axios'

export const getErrorResultString = (result: AxiosResponse, status?: number): string => {
  return (
    (result.data.error) &&
    (typeof result.data.error === 'string')
  ) ?
    result.data.error :
    'Что-то пошло не так'

}