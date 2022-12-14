import * as R from 'ramda'
import { WorksState } from ".."
import { ActionStatus, WorkId } from "../../../../typescript/work.type"
import { extractDrawSiblingsLines } from './updateSuperStatusDownfall'

const isNotNil = R.complement(R.isNil)


export function getSuperStatus(workId: WorkId, metaById: WorksState["metaById"]) {
  const meta = metaById[workId]
  if (!meta) return null
  const { prevNode, parentNode } = meta

  if (prevNode) return R.clone(metaById[prevNode]?.superStatus)
  if (!parentNode) return null


  

  const parentMeta = metaById[parentNode]



  return {
    ...R.clone(parentMeta.superStatus),
    action:
      R.cond([
        [R.always(parentMeta.status?.action !== ActionStatus.Idle), R.always(parentMeta.status.action)],
        [R.always(parentMeta.superStatus?.action !== ActionStatus.Idle), R.always(parentMeta.superStatus.action)],
        [R.T, R.always(ActionStatus.Idle)]
      ])()
    ,
    drawBetweenUpperSiblings: extractDrawSiblingsLines(parentMeta)
  }
}