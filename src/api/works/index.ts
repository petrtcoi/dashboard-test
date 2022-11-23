import { WorkGetDto, validateGetList, WorkCreateDto } from "../../typescript/work.type"
import { httpClient } from "../httpClient"
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


export const create = async (work: WorkCreateDto) => {

  const filledWork: Omit<WorkGetDto, 'id' | 'child'> = {
    ...work,
    equipmentCosts: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    mimExploitation: 0,
    supportCosts: 0,
    total: 0,
  }

  const result = await httpClient.post('/create', filledWork)
  if (result.status !== 200) throw new Error('Пользователь не создан')
   return result.data.current
}