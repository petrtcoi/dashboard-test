import React from "react"
import { useAppDispatch } from "../../redux/hooks"
import { preCreate } from "../../redux/slices/works"

export const useCreateFirstWork = (worksQnty: number, fetched: boolean) => {

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (fetched === false || worksQnty > 0) return
    dispatch(preCreate({
      prevNode: null,
      nextNode: null,
      parentId: null,
      level: 1
    }))
  }, [fetched, worksQnty])
}