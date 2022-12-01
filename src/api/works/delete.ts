import * as R from "ramda"
import { ApiUpdateResponse, Work, WorkChangedDto, workDtoSchema, WorkGetDto, WorkGetListDto, WorkId } from "../../typescript/work.type"
import { httpClient } from "../httpClient"
import { ApiErrorResut, isApiError } from "../typings/api.type"



type UpdateProps = {
  workId: WorkId
}
export const deleteWork = async (props: UpdateProps): Promise<ApiUpdateResponse> => {
  const result = await httpClient.delete<ApiUpdateResponse | ApiErrorResut>(`/${props.workId}/delete`)

  if (isApiError(result.data)) throw new Error(`API / DELETE : ${result.data.error}`)

  return result.data
}


