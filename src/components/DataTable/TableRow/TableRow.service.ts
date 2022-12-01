import React from 'react'

import { WorkId } from "../../../typescript/work.type"
import { useAppSelector, useAppDispatch } from '../../../redux/hooks/index'
import { selectSuperStatus } from "../../../redux/slices/works/selectors/selectSuperStatus"
import { setSuperStatus } from '../../../redux/slices/works'
import { shallowEqual } from 'react-redux'

export const watchSuperStatus = (workId: WorkId) => {

  const dispatch = useAppDispatch()
  const superStatus = useAppSelector(selectSuperStatus(workId), shallowEqual)

  React.useEffect(() => {
    if (superStatus === null) return
    // dispatch(setSuperStatus({ workId, status: superStatus }))
  }, [])
  

}