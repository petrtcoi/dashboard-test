import * as R from 'ramda'
const isNotNil = R.complement(R.isNil)

export type ApiErrorResut = {
  timestamp: number,
  status: number,
  error: string,
  path: string
}

export function isApiError(data: any): data is ApiErrorResut {
  return (
    isNotNil(data.error) &&
    isNotNil(data.status) &&
    data.status !== 200
  )
}