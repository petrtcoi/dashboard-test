import { WorkId } from "../../../../typescript/work.type"
import { useAppSelector } from "../../../hooks"

export function isNodeIsLastChild(parentNode: WorkId, ) {
  const parent = useAppSelector(state => state.works.byId[parentNode as WorkId])
  return parent._meta_.nextNode !== null
}
