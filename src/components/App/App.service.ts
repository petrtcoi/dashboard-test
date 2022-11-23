import React from 'react'
import * as api from './../../api'

import { isApiError } from '../../api/typings/api.type'
import { WorkGetDto, WorkGetListDto } from '../../typescript/work.type'
import { useAppDispatch } from '../../redux/hooks'
import { fetchAllWorks, setFetchedStatus } from '../../redux/slices/works'



export const useFetchData = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    (async () => {
      await dispatch(fetchAllWorks())
      dispatch(setFetchedStatus(true))
    })()
  }, [])
}

