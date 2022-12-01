import * as R from "ramda"
import { workDtoSchema, WorkGetDto, WorkGetListDto, WorkId } from "../../typescript/work.type"
import { httpClient } from "../httpClient"
import { ApiErrorResut, isApiError } from "../typings/api.type"




export const getList = async (): Promise<WorkGetListDto> => {
  const result = await httpClient.get<WorkGetListDto | ApiErrorResut>('/list')

  if (isApiError(result.data)) throw new Error(`API / GETLIST : ${result.data.error}`)

  const isValid = result.data.every(work => {
    const { error } = workDtoSchema.validate(work)
    return R.isNil(error)
  })

  if (!isValid) throw new Error(`API / GETLIST : validations`)

  return result.data
}


