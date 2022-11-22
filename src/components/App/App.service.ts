import React from 'react'
import * as api from './../../api/server'

import { isApiError } from '../../api/typings/api.type'
import { WorkGetDto, WorkGetListDto } from '../../typescript/work.type'


export const useFetchWorks = (): [works: WorkGetListDto, errorMessage: string] => {

  const [works, setWorks] = React.useState<WorkGetDto[]>([])
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  React.useEffect(() => {
    (async () => {
      const result = await api.row.getList()
      if (isApiError(result)) {
        setErrorMessage(result.error)
        return
      }
      setWorks(result)
    })()
  }, [])

  return [works, errorMessage]
}