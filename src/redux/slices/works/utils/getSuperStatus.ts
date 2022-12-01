import * as R from 'ramda'
import { WorksState } from ".."
import { ActionStatus, WorkId } from "../../../../typescript/work.type"

const isNotNil = R.complement(R.isNil)


export function getSuperStatus(workId: WorkId, metaById: WorksState["metaById"]) {
  const meta = metaById[workId]
  const prevNode = meta?.prevNode
  const parentNode = meta?.parentNode

  if (prevNode) {
    return {...metaById[prevNode].superStatus}
  }

  if (!parentNode) return null

  const parentMeta = metaById[parentNode]
  return {
    ...parentMeta.superStatus,
    action:
      R.cond([
        [R.always(parentMeta.status.action !== ActionStatus.Idle), R.always(parentMeta.status.action)],
        [R.always(parentMeta.superStatus.action !== ActionStatus.Idle), R.always(parentMeta.superStatus.action)],
        [R.T, R.always(ActionStatus.Idle)]
      ])()
    ,
    drawBetweenUpperSiblings:
      R.ifElse(
        R.anyPass([
          R.always(isNotNil(parentMeta.nextNode)),
          R.always(parentMeta.superStatus.drawBetweenUpperSiblings === true)
        ]),
        R.always(true),
        R.always(false)
      )()
  }
}