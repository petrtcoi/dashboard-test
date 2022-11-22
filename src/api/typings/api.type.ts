export type ApiResultError = { error: string, status: number }

export type ApiResult<T> = T | ApiResultError


export function isApiError  (result: ApiResult<any>): result is ApiResultError  {
  return result.error ? true : false
}
