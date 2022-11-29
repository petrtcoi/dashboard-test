import React from 'react'

import { useAppDispatch } from '../../redux/hooks'
import { fetchAllWorks } from '../../redux/slices/works'



export const useFetchData = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const update = async () => {
      await dispatch(fetchAllWorks())
    }
    update()
  }, [])

}

