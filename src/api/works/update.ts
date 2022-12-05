import * as R from "ramda"
import { ApiUpdateResponse, Work, WorkChangedDto, workDtoSchema, WorkGetDto, WorkGetListDto, WorkId, workUselessData } from "../../typescript/work.type"
import { httpClient } from "../httpClient"
import { ApiErrorResut, isApiError } from "../typings/api.type"



type UpdateProps = {
  workId: WorkId,
  data: Work
}
export const update = async (props: UpdateProps): Promise<ApiUpdateResponse> => {
  const result = await httpClient.post<ApiUpdateResponse | ApiErrorResut>(`/${props.workId}/update`, { ...workUselessData, ...props.data })

  if (isApiError(result.data)) throw new Error(`API / UPDATE : ${result.data.error}`)

  return result.data
}

