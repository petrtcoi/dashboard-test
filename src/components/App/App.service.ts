import React from 'react'

import { useAppDispatch } from '../../redux/hooks'
import { fetchAllWorks } from '../../redux/slices/works'



export const useFetchData = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    console.log('HELLO')
    const update = async () => {
      await dispatch(fetchAllWorks())
    }
    update()
  }, [])

  // React.useEffect(() => {
  //   console.log('HEY')
  // (async () => {
  //   await dispatch(fetchAllWorks())
  // })()
  // }, [])
}

