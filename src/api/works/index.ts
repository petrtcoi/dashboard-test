import * as R from "ramda"
import { workDtoSchema, WorkGetDto, WorkGetListDto, WorkId } from "../../typescript/work.type"
import { httpClient } from "../httpClient"
import { ApiErrorResut, isApiError } from "../typings/api.type"




export const getList = async (): Promise<WorkGetListDto> => {
  console.log('start')
  const result = await httpClient.get<WorkGetListDto | ApiErrorResut>('/list')
  console.log('result:', result)

  if (isApiError(result.data)) throw new Error(`API / GETLIST : ${result.data.error}`)

  console.log('not error API')

  const isValid = result.data.every(work => {
    const { error } = workDtoSchema.validate(work)
    console.log('error: ', error)
    return R.isNil(error)
  })
  console.log('isValid: ', isValid)

  if (!isValid) throw new Error(`API / GETLIST : validations`)

  return result.data
}





// export const remove = async (workId: WorkId) => {
//   const result = await httpClient.delete(`/${workId}/delete`)
//   if (result.status !== 200) throw new Error('Пользователь не удален')
//   return
// }


// export const create = async (work: WorkCreateDto) => {
//   const result = await httpClient.post('/create', work)
//   if (result.status !== 200) throw new Error('Пользователь не создан')
//   return result.data.current
// }