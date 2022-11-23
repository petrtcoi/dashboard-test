import React from "react"
import { useAppSelector } from "../../../../redux/hooks"
import { Work, WorkId, WorkLevel, WorkParentId } from "../../../../typescript/work.type"

 const useIsParentLastNode = (parentNode: WorkParentId, level: WorkLevel): boolean => {
  const [isParentNotLastChild, setIsParentNotLastChild] = React.useState<boolean>(false)
  React.useEffect(() => {
    if (level === 3) {
      const parent = useAppSelector(state => state.works.byId[parentNode as WorkId])
      if (parent._meta_.nextNode !== null) setIsParentNotLastChild(true)
    }
  }, [parentNode, level])
  return isParentNotLastChild
}
export default useIsParentLastNode


type NodeType = '' | 'child-last' | 'child'
export function getNodeType(
  nextNode: Work['_meta_']['nextNode'],
  level: WorkLevel): NodeType {
  return level === 1 ? '' : nextNode === null ? 'child-last' : 'child'
}

