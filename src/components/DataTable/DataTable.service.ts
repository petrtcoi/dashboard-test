import React from "react"
import { useAppDispatch } from "../../redux/hooks"
import { preCreate } from "../../redux/slices/works"

export const useCreateFirstWork = (worksQnty: number, fetched: boolean) => {

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (fetched === false || worksQnty > 0) return
    dispatch(preCreate({
      initWorkId: null,
      createType: 'child'
    }))
  }, [fetched, worksQnty])
}