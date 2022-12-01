import * as R from "ramda"
import { ApiUpdateResponse, Work, WorkChangedDto, workDtoSchema, WorkGetDto, WorkGetListDto, WorkId } from "../../typescript/work.type"
import { httpClient } from "../httpClient"
import { ApiErrorResut, isApiError } from "../typings/api.type"



type UpdateProps = {
  workId: WorkId,
  data: Work
}
export const update = async (props: UpdateProps): Promise<ApiUpdateResponse> => {
  const result = await httpClient.post<ApiUpdateResponse | ApiErrorResut>(`/${props.workId}/update`, { ...uselessDataTemplate, ...props.data })

  if (isApiError(result.data)) throw new Error(`API / UPDATE : ${result.data.error}`)

  return result.data
}



const uselessDataTemplate =
{
  "equipmentCosts": 0,
  "estimatedProfit": 0,
  "machineOperatorSalary": 0,
  "mainCosts": 0,
  "materials": 0,
  "mimExploitation": 0,
  "overheads": 0,
  "rowName": "string",
  "salary": 0,
  "supportCosts": 0
}

