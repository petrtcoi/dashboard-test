import { WorkGetDto, validateGetList } from "../../typescript/work.type"
import { httpClient } from "../httpClient"
import { ApiResult } from "../typings/api.type"
import { getErrorResultString } from "../utils/getErrorResult"


export const getList = async (): Promise<WorkGetDto[]> => {

  const result = await httpClient.get('/list')
  if (result.status !== 200) throw new Error(getErrorResultString(result))

  result.data.every(validateGetList)
  if (validateGetList.errors) {
    console.log(validateGetList.errors)
    validateGetList('Ошибка валидации входящих данных, см console')
  }

  return result.data

}