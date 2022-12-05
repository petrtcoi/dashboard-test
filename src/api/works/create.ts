import * as R from "ramda"
import { ApiCreateResponse, Work, WorkId, workUselessData } from "../../typescript/work.type"
import { httpClient } from "../httpClient"
import { ApiErrorResut, isApiError } from "../typings/api.type"



type CreateProps = {
  data: Work
  workId: WorkId
  parentId: WorkId | undefined
}
export const create = async (props: CreateProps): Promise<ApiCreateResponse> => {
  const result = await httpClient.post<ApiCreateResponse | ApiErrorResut>(`/create`, { ...workUselessData, ...props.data, parentId: props.parentId })
  if (isApiError(result.data)) throw new Error(`API / CREATE : ${result.data.error}`)

  return { ...result.data, preCreateWorkId: props.workId }
}


