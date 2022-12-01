import * as R from 'ramda'
import { current } from "@reduxjs/toolkit"
import { WorksState } from ".."
import { WorkId } from "../../../../typescript/work.type"

export const deleteFromState = (
  state: WorksState,
  workId: WorkId
) => {
  let currState = current(state)
  console.log(workId, currState)
  const meta = currState.metaById[workId]

  if (!meta) throw new Error('Не получилось найти работу')

  if (meta.prevNode) {
    const lensPath = R.lensPath(['metaById', meta.prevNode, 'nextNode'])
    currState = R.set(lensPath, meta.nextNode, currState)

    if (meta.nextNode) {
      const lensPath = R.lensPath(['metaById', meta.prevNode, 'prevNode'])
      currState = currState = R.set(lensPath, meta.prevNode, currState)
    }
  }


  if (meta.parentNode) {
    const lensPath = R.lensPath(['metaById', meta.parentNode, 'firstChildNode'])
    currState = R.set(lensPath, meta.nextNode, currState)
    if (meta.nextNode) {
      const lensPath = R.lensPath(['metaById', meta.nextNode, 'parentNode'])
      currState = R.set(lensPath, meta.parentNode, currState)
    }
  }

  const lensWork = R.lensPath(['workById', workId])
  currState = R.set(lensWork, undefined, currState)
  const lensMeta = R.lensPath(['metaById', workId])
  currState = R.set(lensMeta, undefined, currState)

  return currState

}

