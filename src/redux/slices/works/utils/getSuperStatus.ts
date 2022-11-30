import { WorksState } from ".."
import { WorkId, WorkMeta } from "../../../../typescript/work.type"


export function getSuperStatus(workId: WorkId, metaById: WorksState["metaById"]) {
  const meta = metaById[workId]
  const prevNode = meta?.prevNode
  const parentNode = meta?.parentNode

  if (prevNode) {
    return metaById[prevNode].superStatus
  }

  if (!parentNode) return null

  const parentMeta = metaById[parentNode]
  return {
    ...parentMeta.superStatus,
    drawBetweenUpperSiblings: (!!parentMeta.nextNode || parentMeta.superStatus.drawBetweenUpperSiblings === true) ? true : false
  }
}