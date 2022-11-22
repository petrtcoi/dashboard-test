import { WorkGetDto, validateGetList } from "../../typescript/work.type"
import { httpClient } from "../httpClient"
import { ApiResult } from "../typings/api.type"
import { getErrorResult } from "../utils/getErrorResult"


export const getList = async (): Promise<ApiResult<WorkGetDto[]>> => {

  const result = await httpClient.get('/list')
  if (result.status !== 200) return getErrorResult(result)


  // TODO: нужно? насколько надежен сервер? Сделал для getList для примера
  result.data.every(validateGetList)
  if (validateGetList.errors) {
    console.log(validateGetList.errors)
    return { error: 'Ошибка валидации входящих данных, см console', status: 0 }
  }

  return result.data

}